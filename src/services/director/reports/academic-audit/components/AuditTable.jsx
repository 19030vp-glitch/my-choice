import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FileViewer from '../../../../../components/FileViewer'
import FilterModal from '../../../../faculty/reports/cas/components/FilterModal'
import Actions from './Actions'
import getData, { getDirectorData } from './audit-services'

const AuditTable = ({ tableHead, classes = '', fetchData = false, fetchDetails, tableChildHead, fetchFrom = "faculty", state, setState, id, children, cellAsInput = true, type = "complex", stateHead, inputName, editTitle, isForm = true, options, proof = false, setAutoSaveLoader }) => {

    const [serverData, setServerData] = useState(null)
    const [serverDirData, setServerDirData] = useState(null)
    const auditYear = useSelector(state => state.academicAudit.auditYear)
    const [dataFilterModal, setDataFilterModal] = useState(false)



    useEffect(() => {
        if (fetchFrom === 'faculty') {
            if (fetchData) {
                getData(fetchDetails.model, fetchDetails.school, auditYear, setServerData)
            }
        } else if (fetchFrom === "director") {
            if (fetchData) {
                getDirectorData(fetchDetails.model, fetchDetails.school, setServerDirData)
            }
        }
    }, [auditYear])



    return (
        <div>
            {
                (fetchData && auditYear) && <div className=" flex items-center justify-between mb-3 bg-blue-100 rounded-lg p-2 border-2 border-blue-700">
                    <p className='text-muted text-sm'>Fetching data from Faculty / Director</p>
                    <div className='flex flex-col items-end justify-start '>
                        <div className="btn-group" role="group" aria-label="Fetch years">
                            <button type="button" className="btn border-blue-900 border bg-blue-700 rounded-xl text-white hover:bg-blue-600 duration-200 ease-in-out" onClick={() => { setDataFilterModal({ year: auditYear, isOpen: true }); }}>Fetch {auditYear} Data</button>
                        </div>
                        <p className='text-muted text-xs'>You can Fetch & Filter specific items by clicking on this button.</p>
                    </div>

                </div>
            }

            {
                (fetchData && auditYear) && <FilterModal title={editTitle} data={fetchFrom === 'faculty' ? serverData : serverDirData} setDataFilterModal={setDataFilterModal} dataFilterModal={dataFilterModal} model={fetchDetails.model} state={state} setState={setState} isConsolidated={true} fetchFrom={fetchFrom} />

            }

            <div className='table-responsive'>


                <table className={`table ${classes} table-bordered overflow-auto change__scrollbar w-full ${(!cellAsInput || fetchData) && 'css-serial'}`}>
                    <thead className='bg-primary text-white '>
                        <tr>
                            {
                                tableHead.map((element, index) => {
                                    return <th scope="col" key={`head-${index}`}>{element}</th>
                                })
                            }
                        </tr>
                    </thead>
                    {
                        !fetchData ?
                            <tbody>

                                {
                                    !cellAsInput ?
                                        <>

                                            {type === 'simple' ?

                                                <>

                                                    {/* // new table data code */}
                                                    {state && state[id] && state[id][`${id}-data`] && state[id][`${id}-data`].map((item, index) => {
                                                        return <tr key={index}>
                                                            <td></td>
                                                            <td>{item[id]}</td>
                                                            <td><Actions size="small" key={item} item={item} itemIndex={index} state={state} type="simple" setState={setState} id={id} inputName={inputName} editTitle={editTitle} isForm={isForm} setAutoSaveLoader={setAutoSaveLoader} /></td>
                                                        </tr>
                                                    })}

                                                </>
                                                :
                                                <>
                                                    {state?.data && state?.data.map((item, index) => {
                                                        return <tr key={index}>
                                                            <td></td>
                                                            {
                                                                tableChildHead.map((keys, index) => {
                                                                    return <td key={index}>{keys === 'proof' ? <FileViewer fileName={item[keys]}
                                                                        serviceName="AAA"
                                                                        replace={{ target: 'Feedback', with: auditYear }}
                                                                    /> : item[keys]}</td>
                                                                })
                                                            }
                                                            <td><Actions size="small" key={item} itemIndex={index} item={item} state={state} type="complex" setState={setState} options={options} isForm={isForm} editTitle={editTitle} setAutoSaveLoader={setAutoSaveLoader} /></td>
                                                        </tr>
                                                    })}
                                                </>
                                            }

                                        </>

                                        :
                                        <>
                                            {/* table with cell as input fields */}
                                            {children}
                                        </>
                                }
                            </tbody>
                            :
                            <tbody>



                                {
                                    fetchFrom === "faculty" ?

                                        <>
                                            {state?.data && state?.data.map((item, index) => {
                                                return <tr key={index}>
                                                    <td className="flex items-start justify-start gap-1"> <Actions size="small" key={item} itemIndex={index} item={item} state={state} type="complex" setState={setState} options={options} isForm={isForm} editTitle={editTitle} setAutoSaveLoader={setAutoSaveLoader} /></td>
                                                    <td>{item.name}</td>
                                                    {
                                                        tableChildHead.map((keys, index) => {
                                                            return <td key={index}>{item[keys]}</td>
                                                        })
                                                    }
                                                </tr>
                                            })}


                                            {
                                                serverData && serverData.map((item, index) => {

                                                    return state?.dataMap?.includes(item._id) && <tr key={index}>
                                                        <td></td>
                                                        <td>{item.userId.name}</td>
                                                        {
                                                            tableChildHead.map((keys, index) => {
                                                                return <td key={index}>{item[keys]}</td>
                                                            })
                                                        }
                                                    </tr>

                                                })}

                                        </>
                                        :
                                        <>
                                            {state?.data && state?.data.map((item, index) => {
                                                return <tr key={index}>

                                                    <td className="flex items-start justify-start gap-1"><Actions size="small" key={item} itemIndex={index} item={item} state={state} type="complex" setState={setState} options={options} isForm={isForm} editTitle={editTitle} setAutoSaveLoader={setAutoSaveLoader} /></td>

                                                    {
                                                        stateHead.map((keys, index) => {
                                                            return <td key={index}>{item[keys]}</td>
                                                        })
                                                    }
                                                </tr>
                                            })}



                                            {serverDirData && serverDirData.map((item, index) => {
                                                return state?.dataMap?.includes(item._id) && <tr key={index}>
                                                    <td></td>
                                                    {
                                                        tableChildHead.map((keys, index) => {
                                                            return <td key={index}>{item[keys]}</td>
                                                        })
                                                    }
                                                </tr>
                                            })
                                            }
                                        </>
                                }


                            </tbody>
                    }
                </table>
            </div>
        </div>
    )
}

export default AuditTable

