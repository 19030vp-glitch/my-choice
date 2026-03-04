import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import UserLoading from '../../../pages/UserLoading';
import { numberToWord } from '../../../js/numberToWord';
import capitalizeText from '../../../js/capitalizeText';

let tableHead = { decrementedAY: "Academic Year", noOfIntake: "No. of first Year students intake in the year", noOfAdmitted: "No. of first year students admitted in the year", decrementedAY2: "Academic Year", leteralEntry: "No. of students admitted through Lateral entry", academicYear: "Academic Year", noOfGraduating: "No. of students graduating in minimum stipulated time", placed: "No. of students placed", salary: "Median salary of placed graduates per annum (Amount in Rs.)", salaryInWords: "Medián salary of placed graduates per annum (Amount in Words)", noOfHEStudents: "No. of students selected for Higher Studies" }

function privYear(academicYear, numYears) {
    const startYear = parseInt(academicYear.slice(0, 4));
    const previousYear = startYear - numYears;
    const previousAcademicYear = `${previousYear}-${(previousYear + 1).toString().slice(-2)}`;
    return previousAcademicYear;
}

const AdminProgressionPlacement = ({ forYear, academicYear, type, school, program, setChildData = false, parentData = false }) => {
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
    const { data, isLoading, refetch } = useQuery(`${model}-${school}-${academicYear}-${program}`, () => getReq(params), { refetchOnWindowFocus: false, enabled: !parentData })
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

    useEffect(() => {
        if (setChildData) {
            setChildData((prev) => {
                return { [type]: { ...prev[type], [school]: values } }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values])

    useEffect(() => {
        refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parentData])

    return (
        isLoading ? <div className='w-full flex justify-center'>
            <UserLoading title="Fetching Placement and HE Content" /></div> :
            <div className="my-3 border-2 rounded-md p-2">
                <p className="my-3 font-medium">{program.name} - {school} </p>

                <div className="table-responsive">
                    <table className="table table-bordered" >
                        <thead className={`bg-[#ae7e28] text-light`}>
                            <tr>
                                {Object.values(tempTableHead)?.map((e, i) => <th key={`head${i}`}>{e}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                yearArray.map((e, i) => {
                                    return (<tr key={`tr-${i}`}>
                                        <th>{forYear === 1 ? e : privYear(e, forYear - 1)}</th>
                                        <td>{parentData ? parentData[e]?.noOfIntake : values[e]?.noOfIntake}</td>
                                        <td>{parentData ? parentData[e]?.noOfAdmitted : values[e]?.noOfAdmitted}</td>
                                        {
                                            (type.includes("UG")) ? <>
                                                <th>{privYear(e, forYear - 2)}</th>
                                                <td>{parentData ? parentData[e]?.leteralEntry : values?.[e]?.leteralEntry}</td>
                                            </> : null
                                        }
                                        <th>{e}</th>
                                        <td>{parentData ? parentData[e]?.noOfGraduating : values[e]?.noOfGraduating}</td>
                                        <td> {parentData ? parentData[e]?.placed : values[e]?.placed}</td>
                                        <td>{parentData ? parentData[e]?.salary : values[e]?.salary}</td>
                                        <td>{capitalizeText(numberToWord(parentData ? parentData[e]?.salary : values[e]?.salary))}</td>
                                        <td>{parentData ? parentData[e]?.noOfHEStudents : values[e]?.noOfHEStudents}</td>

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
export { privYear }