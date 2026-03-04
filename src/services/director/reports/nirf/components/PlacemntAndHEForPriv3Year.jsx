import React, { useEffect, useState } from 'react'
import getReq from '../../../../../components/requestComponents/getReq';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';
import axios from 'axios';
import UserLoading from '../../../../../pages/UserLoading';
import ArrowButton from '../../../../../components/ArrowButton';
import { api } from '../../../../../js/api';
import capitalizeText from '../../../../../js/capitalizeText';
import { numberToWord } from '../../../../../js/numberToWord';

let tableHead = { decrementedAY: "Academic Year", noOfIntake: "No. of first Year students intake in the year", noOfAdmitted: "No. of first year students admitted in the year", decrementedAY2: "Academic Year", leteralEntry: "No. of students admitted through Lateral entry", academicYear: "Academic Year", noOfGraduating: "No. of students graduating in minimum stipulated time", placed: "No. of students placed", salary: "Median salary of placed graduates per annum (Amount in Rs.)", salaryInWords: "Medián salary of placed graduates per annum (Amount in Words)", noOfHEStudents: "No. of students selected for Higher Studies" }

const { decrementedAY, decrementedAY2, salaryInWords, ...tableHeadForValidation } = tableHead

function privYear(academicYear, numYears) {
    const startYear = parseInt(academicYear.slice(0, 4));
    const previousYear = startYear - numYears;
    const previousAcademicYear = `${previousYear}-${(previousYear + 1).toString().slice(-2)}`;
    return previousAcademicYear;
}

const PlacemntAndHEForPriv3Year = ({ forYear, academicYear, type, school, program }) => {
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
    const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params), { refetchOnWindowFocus: false })
    const preInitialState = { school, type, noOfIntake: null, noOfAdmitted: null, leteralEntry: null, noOfGraduating: null, placed: null, salary: null, salaryInWords: null, noOfHEStudents: null }
    const initialstate = { [academicYear]: preInitialState, [privYearby1]: preInitialState, [privYearby2]: preInitialState }
    const [values, setValues] = useState(initialstate);
    const [btnLoading, setBtnLoading] = useState({ [privYearby2]: false, [privYearby1]: false, [academicYear]: false })
    const yearArray = [privYearby2, privYearby1, academicYear]

    useEffect(() => {
        data?.data.forEach((e) => {
            setValues(prev => {
                return { ...prev, [e.academicYear]: { ...e, school: e.school || school, type: e.type || type } }
            })
        })
    }, [data])


    return (
        isLoading ? <div className='w-full flex justify-center'><UserLoading title="Fetching Placement and HE Content" /></div> : <div className="my-3 border-2 rounded-md p-2">
            <p className="my-3 font-medium">{program.name}</p>

            <div className="table-responsive">
                <table className="table table-bordered" >
                    <thead className='bg-primary text-light'>
                        <tr>
                            {Object.values(tempTableHead)?.map((e, i) => <th key={`head${i}`}>{e}</th>)}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            yearArray.map((e, i) => {
                                return (<tr key={`tr-${i}`}>
                                    <th>{forYear === 1 ? e : privYear(e, forYear - 1)}</th>
                                    <td><Text type="number" name="noOfIntake" fieldName={e} setValues={setValues} value={values[e]?.noOfIntake} /></td>
                                    <td><Text type="number" name="noOfAdmitted" fieldName={e} setValues={setValues} value={values[e]?.noOfAdmitted} /></td>
                                    {
                                        (type.includes("UG")) && <>
                                            <th>{privYear(e, forYear - 2)}</th>
                                            <td><Text type="number" name="leteralEntry" fieldName={e} setValues={setValues} value={values?.[e]?.leteralEntry} /></td>
                                        </>
                                    }
                                    <th>{e}</th>
                                    <td><Text type="number" name="noOfGraduating" fieldName={e} setValues={setValues} value={values[e]?.noOfGraduating} /></td>
                                    <td> <Text type="number" name="placed" fieldName={e} setValues={setValues} value={values[e]?.placed} /></td>
                                    <td><Text type="number" name="salary" fieldName={e} setValues={setValues} value={values[e]?.salary} /></td>
                                    <td>{capitalizeText(numberToWord(isNaN(values[e]?.salary) ? 0 : values[e]?.salary))}</td>
                                    <td><Text type="number" name="noOfHEStudents" fieldName={e} setValues={setValues} value={values[e]?.noOfHEStudents} /></td>
                                    <td><Submit values={values[e]} model={model} module={module} academicYear={e} refetch={refetch} years={forYear} setBtnLoading={setBtnLoading} btnLoading={btnLoading} setValues={setValues} valdateArr={Object.keys(tableHeadForValidation)} /></td>

                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}
export default PlacemntAndHEForPriv3Year

const Text = ({ type = "text", name, fieldName, setValues, value }) => {

    return <input id="fname" type={type}
        className="p-2 border-2 border-blue-200 w-full rounded-md focus:border-blue-500 outline-none auto-expanding-textarea "
        onChange={(e) => {
            setValues((pri) => {
                return {
                    ...pri, [fieldName]: {
                        ...pri[fieldName], [name]: e.target.value
                    }
                }
            })
        }}
        value={value} />
}


const Submit = ({ values, model, module, refetch, years = 1, btnLoading, setBtnLoading, academicYear, valdateArr }) => {


    const btnLoadingToggle = (state) => {
        setBtnLoading((pri) => {
            return {
                ...pri, [academicYear]: state
            }
        })
    }

    const validateAndSubmit = () => {
        btnLoadingToggle(true);
        let breakFlag = false;
        for (let i = 0; i < valdateArr.length; i++) {
            const fieldName = valdateArr?.[i];
            if (values?.[fieldName] === null) {
                if (years !== 4 && fieldName === "leteralEntry") {
                    continue;
                }
                btnLoadingToggle(false);
                toast.error(`Incomplete fields`);
                breakFlag = true;
                break;
            }
        }

        if (!breakFlag) {
            values.academicYear = academicYear;
            axios
                .post(`${api}/${module}/${!values.hasOwnProperty("_id") ? "threeYearSubmit" : "threeYearEdit"}/${model}`, values).then(res => {
                    if (res.status === 200) {
                        toast.success(res.data)
                    }
                    if (res.status === 500) {
                        toast.error("Error while submiting data pleae try again")
                    }
                }).catch((err) => {
                    console.log(err);
                    toast.error("Something Went Wrong");
                }).finally(() => {
                    refetch();
                })
        }
        btnLoadingToggle(false);
    }
    return <ArrowButton showArrow={false} title="Save" onClickFunction={validateAndSubmit} disabled={btnLoading[academicYear]} />
}

export { Text, privYear, Submit }