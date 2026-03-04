import React, { useEffect, useState } from 'react'
import AdminProgressionPlacement, { privYear } from './AdminProgressionPlacement'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import programsByNIRF from '../../director/reports/nirf/js/programsByNIRF';
import SchoolsProgram from '../../../components/SchoolsProgram';
import useNIRFGetProgram from '../../../hooks/director-hooks/useNIRFGetProgram';
import PatentNirf from '../../director/reports/nirf/components/PatentNirf';
import ConsultancyNirf from '../../director/reports/nirf/components/ConsultancyNirf';
import DevelopmentProgramNirf from '../../director/reports/nirf/components/DevelopmentProgramNirf';


const AdminProgressionNIRF = ({ academicYear, module = "progression" }) => {
    const [expandedAccordion, setExpandedAccordion] = useState();
    const [childData, setChildData] = useState({});
    const privYearby1 = privYear(academicYear, 1);
    const privYearby2 = privYear(academicYear, 2);

    const keysObject = {
        progression: { noOfIntake: 0, noOfAdmitted: 0, leteralEntry: 0, noOfGraduating: 0, placed: 0, salary: 0, noOfHEStudents: 0 },
        patents: { noOfpublished: 0, noOfGranted: 0 },
        consultancy: { Consultancy: 0, clientOrganization: 0, amountReceived: 0, amountInWords: 0 },
        'programs-organized': { NoOfEDPMDP: 0, participants: 0, earnings: 0, earningsInWords: 0 }
    }

    const keys = keysObject[module];
    const yearWiseData = { [academicYear]: keys, [privYearby1]: keys, [privYearby2]: keys }
    const [parentData, setParentData] = useState(module === "progression" ? { PG2: yearWiseData, UG4: yearWiseData, PG3: yearWiseData, UG3: yearWiseData, PG1: yearWiseData } : yearWiseData);

    const handleChangeAccordion = (index) => {
        setExpandedAccordion(index === expandedAccordion ? null : index);
    };

    const { programs } = useNIRFGetProgram(null, academicYear, module === "progression", true)

    useEffect(() => {
        if (module === "progression") {
            Object.keys(childData).forEach((program) => {
                Object.keys(yearWiseData).forEach((year) => {
                    let allSchoolOneYearData = { ...keys }
                    Object.keys(childData[program]).forEach((school) => {
                        Object.keys(allSchoolOneYearData).forEach((key) => {
                            allSchoolOneYearData[key] += isNaN(childData[program][school][year][key]) ? 0 : childData[program][school][year][key]
                        })
                    })
                    setParentData(prev => {
                        return {
                            ...prev, [program]: {
                                ...prev[program], [year]: allSchoolOneYearData
                            }
                        }
                    })
                })

            })
        } else {
            Object.keys(yearWiseData).forEach((year) => {
                let allSchoolOneYearData = { ...keys }
                Object.keys(childData).forEach((school) => {
                    Object.keys(allSchoolOneYearData).forEach((key) => {
                        allSchoolOneYearData[key] += isNaN(childData?.[school]?.[year]?.[key]) ? 0 : childData?.[school]?.[year]?.[key]
                    })
                })
                setParentData(prev => {
                    return {
                        ...prev, [year]: allSchoolOneYearData
                    }
                })
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [childData])


    return (
        <div>

            {module === 'progression' ? <div>
                {
                    Object.keys(programsByNIRF).map((singleProgram, index) => {
                        return <div key={`${singleProgram}-${index}`} className={`border-[#8c8cd9] rounded-lg p-1 border-2 my-3 text-sm lg:text-base w-full`}>
                            <Accordion sx={{ boxShadow: 'none' }} TransitionProps={{ unmountOnExit: singleProgram.shouldUnmount ? singleProgram.shouldUnmount : true }} expanded={expandedAccordion === index} onChange={() => handleChangeAccordion(index)}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`content-${index}`}
                                    id={`accordion-${index}`}
                                >
                                    <Typography sx={{ color: 'blue', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> {programsByNIRF?.[singleProgram].name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div>
                                        <AdminProgressionPlacement key={`srtmun${programs}`} forYear={programsByNIRF[singleProgram].year} academicYear={academicYear} program={programsByNIRF[singleProgram]} school={'Consolidated Data'} type={singleProgram} parentData={parentData[singleProgram]} />
                                        {
                                            Object.keys(SchoolsProgram).map((school) => {

                                                return programs?.[school]?.programs.includes(singleProgram) &&
                                                    <AdminProgressionPlacement key={school} forYear={programsByNIRF[singleProgram].year} academicYear={academicYear} program={programsByNIRF[singleProgram]} school={school} type={singleProgram} setChildData={setChildData} />

                                            })
                                        }
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    })
                }

            </div> : module === 'patents' ? <div>
                <PatentNirf key={'Univerisity Consolidated'} year={academicYear} school={'Consolidated Data'} parentData={parentData} program="Patents Published" />
                {
                    Object.keys(SchoolsProgram).map((school) => {

                        return <PatentNirf key={school} year={academicYear} school={school} setChildData={setChildData} program="Patents Published" />

                    })
                }
            </div> : module === 'consultancy' ? <div>
                <ConsultancyNirf key={'Univerisity Consolidated'} year={academicYear} school={'Consolidated Data'} parentData={parentData} program="Consultancy Projects" />
                {
                    Object.keys(SchoolsProgram).map((school) => {

                        return <ConsultancyNirf key={school} year={academicYear} school={school} setChildData={setChildData} program="Consultancy Projects" />

                    })
                }
            </div> : module === 'programs-organized' ? <div>
                <DevelopmentProgramNirf key={'Univerisity Consolidated'} year={academicYear} school={'Consolidated Data'} parentData={parentData} program="Executive development programs / Management programs / Workshop / Training programs" />
                {
                    Object.keys(SchoolsProgram).map((school) => {

                        return <DevelopmentProgramNirf key={school} year={academicYear} school={school} setChildData={setChildData} program="Executive development programs / Management programs / Workshop / Training programs" />

                    })
                }
            </div> : null}

        </div>
    )
}

export default AdminProgressionNIRF