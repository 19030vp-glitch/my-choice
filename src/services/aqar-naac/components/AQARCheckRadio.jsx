import React, { useEffect, useState } from 'react'
import ArrowButton from '../../../components/ArrowButton'
import { fetchAQARRadioInfo, saveAQARRadioInfo } from '../js/fetchAQARRadio'
import { useQuery } from 'react-query'

const AQARCheckRadio = ({ questionMatter, options, radioId, academicYear, school, isAdmin, type = "check" }) => {

    const [radioInfo, setRadioInfo] = useState([])
    const [schoolWiseRadioInfo, setSchoolWiseRadioInfo] = useState([])

    console.log('radio :', radioInfo)
    const filter = { academicYear, radioId, school }

    const { data, refetch } = useQuery(`AQAR-RadioInfo-${academicYear}-${radioId}-${school}`, () => fetchAQARRadioInfo(filter, isAdmin), { refetchOnWindowFocus: false })


    const submit = (e) => {

        e.preventDefault();
        const formData = {
            radioInfo: JSON.stringify(radioInfo), radioId, academicYear, school
        }
        saveAQARRadioInfo(formData, refetch)

    }

    useEffect(() => {
        if (data?.data?.data?.radioInfo && !isAdmin) {
            let info = JSON.parse(data?.data?.data?.radioInfo) || []
            setRadioInfo(() => info)
        } else if (data?.data?.data && isAdmin) {
            setSchoolWiseRadioInfo(data?.data?.data)
        }

    }, [data])

    return (
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 mt-3 p-3">
            {questionMatter && <div className="my-2">
                <ul className='font-semibold'>
                    {questionMatter?.map((item, index) => {
                        return <li>{index + 1}. {item}</li>
                    })}
                </ul>
            </div>}
            {
                isAdmin ?
                    <div>
                        {options && <div className="my-2">
                            <p className="mt-3 font-medium"> Options:</p>
                            <ul className='ml-3'>
                                {options?.map((item, index) => {
                                    return <li>{index + 1}. {item}</li>
                                })}
                            </ul>
                        </div>}

                        <table className="table table-bordered mt-2">
                            <thead className="bg-primary text-light">
                                <tr>
                                    <td>School / Department Name</td>
                                    <td>Selected Option(s)</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    schoolWiseRadioInfo?.map((item, index) => {

                                        let radioInfo = JSON.parse(item?.radioInfo)

                                        return <tr key={index}>
                                            <td>{item.school}</td>
                                            <td>
                                                <ul>
                                                    {
                                                        radioInfo?.length > 0 ? radioInfo?.map((item) => {
                                                            return <li>- {item}</li>
                                                        }) : <li>N/A</li>
                                                    }
                                                </ul>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                        {
                            schoolWiseRadioInfo.length === 0 && <div>
                                <p className="text-center my-3 text-yellow-500">No data available</p>
                            </div>
                        }
                    </div>
                    :
                    <div>
                        <p className="mb-2 font-medium">Select option(s)</p>
                        {options && <div className="mb-2 mt-4">
                            {options?.map((item) => {
                                return type === "radio" ? <Radio setRadioInfo={setRadioInfo} radioInfo={radioInfo} item={item} /> : <CheckBox setRadioInfo={setRadioInfo} radioInfo={radioInfo} item={item} />
                            })}
                        </div>}

                        <ArrowButton title="Submit Details" className="mt-4" onClickFunction={submit} />
                    </div>
            }


        </div>
    )
}

export default AQARCheckRadio

const Radio = ({ item, setRadioInfo, radioInfo }) => {
    return <div className="form-check">
        <input className="form-check-input" type="radio" name="aqarradio" id={item} onChange={() => setRadioInfo([item])} checked={radioInfo?.[0] === item} />
        <label className="form-check-label" htmlFor={item}>
            {item}
        </label>
    </div>
}

const CheckBox = ({ item, setRadioInfo, radioInfo }) => {

    const handleCheckboxChange = () => {
        const isSelected = radioInfo.includes(item);

        if (isSelected) {
            setRadioInfo((prevItems) => prevItems.filter((prevItem) => prevItem !== item));
        } else {
            setRadioInfo((prevItems) => [...prevItems, item]);
        }
    };


    return <div class="form-check">
        <input class="form-check-input" type="checkbox" onChange={handleCheckboxChange} value={item} id={item} checked={radioInfo.includes(item)} />
        <label className="form-check-label" htmlFor={item}>
            {item}
        </label>
    </div>
}
