import React, { useState } from 'react'
import AdminProgressionPlacement from './AdminProgressionPlacement'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import programsByNIRF from '../../director/reports/nirf/js/programsByNIRF';
import SchoolsProgram from '../../../components/SchoolsProgram';
import useNIRFGetProgram from '../../../hooks/director-hooks/useNIRFGetProgram';


const AdminProgressionNIRF = ({ academicYear, module = "progression" }) => {
    const [expandedAccordion, setExpandedAccordion] = useState();
    const [childData, setChildData] = useState({});

    const handleChangeAccordion = (index) => {
        setExpandedAccordion(index === expandedAccordion ? null : index);
    };

    const { programs } = useNIRFGetProgram(null, academicYear, module === "progression", true)

    return (
        <div>
            <div>
                {
                    Object.keys(programsByNIRF).map((singleProgram, index) => {
                        return <div className={`border-[#8c8cd9] rounded-lg p-1 border-2 my-3 text-sm lg:text-base w-full`}>
                            <Accordion sx={{ boxShadow: 'none' }} TransitionProps={{ unmountOnExit: singleProgram.shouldUnmount ? singleProgram.shouldUnmount : true }} expanded={expandedAccordion === index} onChange={() => handleChangeAccordion(index)}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`content-${index}`}
                                    id={`accordion-${index}`}
                                >
                                    <Typography sx={{ color: 'blue', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> {programsByNIRF?.[singleProgram].name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div>
                                        {
                                            Object.keys(SchoolsProgram).map((school) => {

                                                return programs?.[school]?.programs.includes(singleProgram) &&
                                                    <AdminProgressionPlacement key={school} forYear={programsByNIRF[singleProgram].year} academicYear={academicYear} program={programsByNIRF[singleProgram]} school={school} type={singleProgram} />

                                            })
                                        }
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    })
                }

            </div>


        </div>
    )
}

export default AdminProgressionNIRF








import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import UserLoading from '../../../pages/UserLoading';

let tableHead = { decrementedAY: "Academic Year", noOfIntake: "No. of first Year students intake in the year", noOfAdmitted: "No. of first year students admitted in the year", decrementedAY2: "Academic Year", leteralEntry: "No. of students admitted through Lateral entry", academicYear: "Academic Year", noOfGraduating: "No. of students graduating in minimum stipulated time", placed: "No. of students placed", salary: "Median salary of placed graduates per annum (Amount in Rs.)", salaryInWords: "Medián salary of placed graduates per annum (Amount in Words)", noOfHEStudents: "No. of students selected for Higher Studies" }

function privYear(academicYear, numYears) {
    const startYear = parseInt(academicYear.slice(0, 4));
    const previousYear = startYear - numYears;
    const previousAcademicYear = `${previousYear}-${(previousYear + 1).toString().slice(-2)}`;
    return previousAcademicYear;
}

const AdminProgressionPlacement = ({ forYear, academicYear, type, school, program }) => {
    const tempTableHead = { ...tableHead };
    if (!(type.includes("UG"))) {
        delete tempTableHead.decrementedAY2;
        delete tempTableHead.leteralEntry;
    }
    const model = "PlacemntAndHEForPriv3Year"
    const module = "nirf"
    const privYearby1 = privYear(academicYear, 1);
    const privYearby2 = privYear(academicYear, 2);
    let filter = { academicYear: { $in: [academicYear, privYearby1, privYearby2] }, school, type }
    const params = { model, module, filter }
    const { data, isLoading } = useQuery([model, params], () => getReq(params), { refetchOnWindowFocus: false })
    const preInitialState = { school, type, noOfIntake: null, noOfAdmitted: null, leteralEntry: null, noOfGraduating: null, placed: null, salary: null, salaryInWords: null, noOfHEStudents: null }
    const initialstate = { [academicYear]: preInitialState, [privYearby1]: preInitialState, [privYearby2]: preInitialState }
    const [values, setValues] = useState(initialstate);

    const yearArray = [privYearby2, privYearby1, academicYear]

    useEffect(() => {
        data?.data.forEach((e) => {
            setValues(prev => {
                return { ...prev, [e.academicYear]: { ...e, school: e.school || school, type: e.type || type } }
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])


    return (
        isLoading ? <div className='w-full flex justify-center'>
            <UserLoading title="Fetching Placement and HE Content" /></div> :
            <div className="my-3 border-2 rounded-md p-2">
                <p className="my-3 font-medium">{program.name} - {school} </p>

                <div className="table-responsive">
                    <table className="table table-bordered" >
                        <thead className='bg-primary text-light'>
                            <tr>
                                {Object.values(tempTableHead)?.map((e, i) => <th key={`head${i}`}>{e}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                yearArray.map((e, i) => {
                                    return (<tr key={`tr-${i}`}>
                                        <th>{forYear === 1 ? e : privYear(e, forYear - 1)}</th>
                                        <td>{values[e]?.noOfIntake}</td>
                                        <td>{values[e]?.noOfAdmitted}</td>
                                        {
                                            (type.includes("UG")) ? <>
                                                <th>{privYear(e, forYear - 2)}</th>
                                                <td>{values?.[e]?.leteralEntry}</td>
                                            </> : null
                                        }
                                        <th>{e}</th>
                                        <td>{values[e]?.noOfGraduating}</td>
                                        <td> {values[e]?.placed}</td>
                                        <td>{values[e]?.salary}</td>
                                        <td>{values[e]?.salaryInWords}</td>
                                        <td>{values[e]?.noOfHEStudents}</td>

                                    </tr>)
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </div>
    )
}
export default AdminProgressionPlacement
