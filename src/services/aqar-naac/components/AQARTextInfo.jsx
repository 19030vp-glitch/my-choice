import React from "react";
import ArrowButton from "../../../components/ArrowButton";
import { useState } from "react";
import { useQuery } from "react-query";
import { fetchAQARTextInfo, saveAQARTextInfo } from "../js/fetchAQARTextInfo";
import { useEffect } from "react";

const AQARTextInfo = ({ tableInfo, academicYear, tableId, isAdmin, school, singleTextField = false }) => {

    const [info, setInfo] = useState({})
    const [schoolWiseInfo, setSchoolWiseInfo] = useState([])

    const filter = { academicYear, tableId, school }

    const { data, isLoading, refetch } = useQuery(`AQAR-TextInfo-${academicYear}-${tableId}-${school}`, () => fetchAQARTextInfo(filter, isAdmin), { refetchOnWindowFocus: false })

    const submit = (e) => {

        e.preventDefault();

        const formData = {
            tableData: JSON.stringify(info), tableId, academicYear, school
        }

        saveAQARTextInfo(formData, refetch)

    }

    useEffect(() => {
        if (data?.data?.data?.tableData && !isAdmin) {
            let state = {}
            let tableData = JSON.parse(data?.data?.data?.tableData)
            if (tableData) {
                tableInfo.map((item) => {
                    state[item.cell] = tableData[item.cell] || ''
                })

                setInfo(() => state)
            }
        } else if (data?.data?.data && isAdmin) {
            setSchoolWiseInfo(data?.data?.data)
        }

    }, [data])




    return (
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 mt-3 p-3">
            <table className="table table-bordered">
                <thead className="bg-primary text-light">
                    <tr>
                        <th>School / Department Name</th>

                        {tableInfo?.map((item) => {
                            return <th>{item.head}</th>;
                        })}
                    </tr>
                </thead>

                {
                    isAdmin ? <tbody>
                        {
                            schoolWiseInfo?.map((infoItem) => {
                                const tableData = JSON.parse(infoItem?.tableData)
                                return <tr>
                                    <td>{infoItem?.school}</td>

                                    {tableInfo?.map((item) => {
                                        return (
                                            <td>
                                                {tableData[item.cell] || ''}
                                            </td>
                                        );
                                    })}
                                </tr>
                            })
                        }
                    </tbody> :
                        <tbody>
                            <tr>
                                <td>{school}</td>

                                {tableInfo?.map((item) => {
                                    return (
                                        <td>
                                            <input
                                                onChange={(e) => setInfo(() => {
                                                    return { ...info, [item.cell]: e.target.value }
                                                })}

                                                onBlur={(e) => {
                                                    if (singleTextField) {
                                                        const formData = {
                                                            tableData: JSON.stringify({ ...info, [item.cell]: e.target.value }), tableId, academicYear, school
                                                        }
                                                        saveAQARTextInfo(formData, refetch)
                                                    }
                                                }}

                                                value={info[item.cell] || ''}
                                                type="text"
                                                className="p-2 border-2 rounded-md border-blue-400"
                                            />
                                        </td>
                                    );
                                })}
                            </tr>
                        </tbody>
                }

            </table>

            {
                isAdmin && schoolWiseInfo.length === 0 && <div>
                    <p className="text-center my-3 text-yellow-500">No data available</p>
                </div>
            }

            {
                !isAdmin && (!singleTextField && <ArrowButton title="Submit Info" onClickFunction={submit} />)
            }
        </div>
    );
};

export default AQARTextInfo;
