import React from 'react'
import { useEffect } from 'react'
import EmptyBox from '../../../components/EmptyBox'
import { categorywiseTables, reportTables } from '../../../services/director/reports/academic-audit/components/TableData'
import { ViewFile } from '../../faculty/cas-report/Tables'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { IconButton } from '@mui/material'


const AAATables = ({ auditData, academicData, directorData, academicYear }) => {



    useEffect(() => {
        if (auditData?.[0]) {
            console.log(auditData?.[0])
            // adding text 
            Object.keys(categorywiseTables.richTextTables)?.forEach((table) => {
                document.getElementById(`${categorywiseTables['richTextTables'][table]['title']}-${academicYear}`).innerHTML = auditData[0]?.AAAData?.['richTextTables'][table]?.content
            })
        }
    }, [auditData, academicData, directorData])


    return (
        <div>
            <p className="aaa-break"></p>
            {
                auditData?.[0] && <div className="css-serial">
                    {
                        reportTables.map((mainTable, mainIndex) => {
                            return <div>


                                {/* 1. School info tables */}
                                {mainTable.tableFromAAA === 'schoolInfoTables' && auditData[0]?.AAAData?.['schoolInfoTables'][[mainTable.tableName]]?.data?.length > 0 ?
                                    <div className="bg-white overflow-hidden sm:rounded-lg mt-5 " id={mainTable.tableName} key={mainIndex}>

                                        <div className="p-2 bg-[#009879] text-white flex items-center justify-between">
                                            <div><h3 className="text-base font-semibold leading-6 text-white">
                                                <span className='add-serial-here mr-3'>.</span>
                                                {mainTable['title']}</h3>
                                            </div>

                                            <div>
                                                <a href={`#SummarySheet-${mainTable.tableName}`}>
                                                    <ArrowBackRoundedIcon />
                                                </a>
                                            </div>
                                        </div>

                                        <div>

                                            <div>
                                                <table className="table table-bordered css-serial">
                                                    <thead className="bg-[#009879] text-white">
                                                        <tr>
                                                            {mainTable?.tableInfo?.auditHead?.map((item) => {
                                                                return (item !== 'Action' ? <th className="font-medium">{item}</th> : null);
                                                            })
                                                            }

                                                        </tr>
                                                    </thead>
                                                    <tbody className='text-sm'>

                                                        {auditData?.[0]?.AAAData?.['schoolInfoTables'][[mainTable.tableName]]?.data?.length > 0 ? auditData?.[0]?.AAAData?.['schoolInfoTables'][mainTable.tableName]?.data?.map((tableItem) => {

                                                            return <tr>
                                                                <td scope="row"></td>

                                                                {mainTable.tableInfo?.childHead?.map((item) => {
                                                                    return (<td>{item === 'proof' &&
                                                                        mainTable.tableName === 'courseOutcomes' ?
                                                                        <ViewFile fileName={tableItem['proof']} type="aaaDirURL" customTitle={mainTable.tableName === 'courseOutcomes' ? `View: ${tableItem['proof'].replace('Feedback', academicYear)}` : 'View Proof'} /> : tableItem[item]}</td>);
                                                                })}

                                                            </tr>
                                                        }) : null
                                                        }





                                                    </tbody>

                                                </table>
                                            </div>

                                        </div>

                                    </div > : null}



                                {/* 2. File Feedback tables */}
                                {
                                    mainTable.tableFromAAA === 'fileFeedback' && auditData[0]?.AAAData?.['fileFeedback'][[mainTable.tableName]]?.data?.length > 0 ? <div className="bg-white overflow-hidden sm:rounded-lg mt-5 " id={mainTable.tableName} key={mainIndex}>

                                        <div className="p-2 bg-[#009879] text-white flex items-center justify-between">
                                            <div><h3 className="text-base font-semibold leading-6 text-white">
                                                <span className='add-serial-here mr-3'>.</span>
                                                {mainTable['title']}</h3>
                                            </div>

                                            <div>
                                                <a href={`#SummarySheet-${mainTable.tableName}`}>
                                                    <ArrowBackRoundedIcon />
                                                </a>
                                            </div>
                                        </div>

                                        <div>

                                            <div>
                                                <table className="table table-bordered css-serial">
                                                    <thead className="bg-[#009879] text-white">
                                                        <tr>
                                                            {mainTable?.tableInfo?.auditHead?.map((item) => {
                                                                return (item !== 'Action' ? <th className="font-medium">{item}</th> : null);
                                                            })
                                                            }

                                                        </tr>
                                                    </thead>
                                                    <tbody className='text-sm'>

                                                        {auditData?.[0]?.AAAData?.['fileFeedback'][[mainTable.tableName]]?.data?.length > 0 ? auditData?.[0]?.AAAData?.['fileFeedback'][mainTable.tableName]?.data?.map((tableItem) => {

                                                            return <tr>
                                                                <td scope="row"></td>

                                                                {mainTable.tableInfo?.childHead?.map((item) => {
                                                                    return (<td>{item === 'proof' ?
                                                                        null : tableItem[item]}</td>);
                                                                })}

                                                            </tr>
                                                        }) : null
                                                        }





                                                    </tbody>

                                                </table>
                                            </div>

                                        </div>

                                    </div>
                                        : null}



                                {/* 3. Faculty tables */}
                                {
                                    mainTable.tableFromAAA === 'facultyTables' && (auditData[0]?.AAAData?.[mainTable.tableFromAAA]?.[mainTable.tableName]?.data?.length > 0 && academicData || auditData[0]?.AAAData?.[mainTable.tableFromAAA]?.[mainTable.tableName]?.dataMap?.length > 0) ? <div className="bg-white overflow-hidden sm:rounded-lg mt-5 " id={mainTable.tableName} key={mainIndex}>

                                        <div className="p-2 bg-[#009879] text-white flex items-center justify-between">
                                            <div><h3 className="text-base font-semibold leading-6 text-white">
                                                <span className='add-serial-here mr-3'>.</span>
                                                {mainTable['title']}</h3>
                                            </div>

                                            <div>
                                                <a href={`#SummarySheet-${mainTable.tableName}`}>
                                                    <ArrowBackRoundedIcon />
                                                </a>
                                            </div>
                                        </div>

                                        <div>

                                            <div>
                                                <table className="table table-bordered css-serial">
                                                    <thead className="bg-[#009879] text-white">
                                                        <tr>
                                                            {mainTable?.tableInfo?.auditHead?.map((item) => {
                                                                return (item !== 'Action' ? <th className="font-medium">{item}</th> : null);
                                                            })
                                                            }

                                                        </tr>
                                                    </thead>
                                                    <tbody className='text-sm'>

                                                        {
                                                            <>
                                                                {
                                                                    auditData[0]?.AAAData?.[mainTable.tableFromAAA]?.[mainTable.tableName]?.data?.map((tableItem, index) => {
                                                                        return <tr key={index}>
                                                                            <td scope="row"></td>
                                                                            <td>{tableItem['name']}</td>
                                                                            {mainTable.tableInfo?.['childHead']?.map((item) => {
                                                                                return (<td>{item === 'proof' ?
                                                                                    <ViewFile fileName={tableItem['proof']} type="aaaDirURL" customTitle={mainTable.tableName === 'courseOutcomes' ? `View: ${tableItem['proof'].replace('Feedback', academicYear)}` : 'View Proof'} /> : tableItem[item]}</td>);
                                                                            })}



                                                                        </tr>
                                                                    })
                                                                }


                                                                {
                                                                    academicData && academicData?.[mainTable.model]?.map((serverItem, index) => {
                                                                        return auditData[0]?.AAAData?.[mainTable.tableFromAAA][mainTable.tableName]?.dataMap?.includes(serverItem._id) &&
                                                                            <tr key={index}>
                                                                                <td></td>
                                                                                <td>{serverItem.userId.name}</td>
                                                                                {mainTable?.tableInfo?.['childHead'].map((item) => {
                                                                                    return <td>{serverItem[item]}</td>
                                                                                })
                                                                                }
                                                                            </tr>

                                                                    })}

                                                            </>
                                                        }





                                                    </tbody>

                                                </table>
                                            </div>

                                        </div>

                                    </div>
                                        : null}


                                {/* 4. Director tables */}
                                {
                                    mainTable.tableFromAAA === 'directorTables' && (auditData[0]?.AAAData?.[mainTable.tableFromAAA]?.[mainTable.tableName]?.data?.length > 0 && directorData || auditData[0]?.AAAData?.[mainTable.tableFromAAA]?.[mainTable.tableName]?.dataMap?.length > 0) ? <div className="bg-white overflow-hidden sm:rounded-lg mt-5 " id={mainTable.tableName} key={mainIndex}>

                                        <div className="p-2 bg-[#009879] text-white flex items-center justify-between">
                                            <div><h3 className="text-base font-semibold leading-6 text-white">
                                                <span className='add-serial-here mr-3'>.</span>
                                                {mainTable['title']}</h3>
                                            </div>

                                            <div>
                                                <a href={`#SummarySheet-${mainTable.tableName}`}>
                                                    <ArrowBackRoundedIcon />
                                                </a>
                                            </div>
                                        </div>

                                        <div>

                                            <div>
                                                <table className="table table-bordered css-serial">
                                                    <thead className="bg-[#009879] text-white">
                                                        <tr>
                                                            {mainTable?.tableInfo?.auditHead?.map((item) => {
                                                                return (item !== 'Action' ? <th className="font-medium">{item}</th> : null);
                                                            })
                                                            }

                                                        </tr>
                                                    </thead>
                                                    <tbody className='text-sm'>

                                                        {
                                                            (auditData[0]?.AAAData?.[mainTable.tableFromAAA]?.[mainTable.tableName]?.data?.length > 0 && directorData || auditData[0]?.AAAData?.[mainTable.tableFromAAA]?.[mainTable.tableName]?.dataMap?.length > 0) ?

                                                                <>
                                                                    {
                                                                        auditData[0]?.AAAData?.[mainTable.tableFromAAA]?.[mainTable.tableName]?.data?.map((tableItem, index) => {
                                                                            return <tr key={index}>
                                                                                <td scope="row"></td>
                                                                                {mainTable.tableInfo?.['stateHead']?.map((item) => {
                                                                                    return (<td>{item === 'proof' ?
                                                                                        <ViewFile fileName={tableItem['proof']} type="aaaDirURL" customTitle={mainTable.tableName === 'courseOutcomes' ? `View: ${tableItem['proof'].replace('Feedback', academicYear)}` : 'View Proof'} /> : tableItem[item]}</td>);
                                                                                })}

                                                                            </tr>
                                                                        })
                                                                    }


                                                                    {
                                                                        directorData && directorData?.[mainTable.model]?.map((serverItem, index) => {
                                                                            return auditData[0]?.AAAData?.[mainTable.tableFromAAA]?.[mainTable.tableName]?.dataMap?.includes(serverItem._id) &&
                                                                                <tr key={index}>
                                                                                    <td></td>
                                                                                    {mainTable?.tableInfo?.['childHead'].map((item) => {
                                                                                        return <td>{serverItem[item]}</td>
                                                                                    })
                                                                                    }
                                                                                </tr>

                                                                        })}

                                                                </>
                                                                : null

                                                        }

                                                    </tbody>

                                                </table>
                                            </div>

                                        </div>

                                    </div>
                                        : null}


                                {/* 5. Cell as input tables */}
                                {
                                    mainTable.tableFromAAA === 'cellAsInputTables' && <div className="bg-white overflow-hidden sm:rounded-lg mt-5 " id={mainTable.tableName} key={mainIndex}>

                                        <div className="p-2 bg-[#009879] text-white flex items-center justify-between">
                                            <div><h3 className="text-base font-semibold leading-6 text-white">
                                                <span className='add-serial-here mr-3'>.</span>
                                                {mainTable['title']}</h3>
                                            </div>

                                            <div>
                                                <a href={`#SummarySheet-${mainTable.tableName}`}>
                                                    <ArrowBackRoundedIcon />
                                                </a>
                                            </div>
                                        </div>

                                        <div>

                                            <div>
                                                <table className="table table-bordered">
                                                    <thead className="bg-[#009879] text-white">
                                                        <tr>
                                                            {mainTable.tableHead?.map((item) => {
                                                                return <th className="font-medium">{item}</th>
                                                            })}

                                                        </tr>
                                                    </thead>
                                                    <tbody className='text-sm'>


                                                        {
                                                            auditData[0]?.AAAData?.['cellAsInputTables'][mainTable.tableName] ?

                                                                <>

                                                                    {
                                                                        mainTable.tableName === 'teachingPosts' && <>
                                                                            <EditableTd data={auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts']} keyName='seniorProf' title='Senior Professor' />
                                                                            <EditableTd data={auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts']} keyName='prof' title='Professor' />
                                                                            <EditableTd data={auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts']} keyName='associateProf' title='Associate Professor' />
                                                                            <EditableTd data={auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts']} keyName='assistantProf' title='Assistant Professor' />
                                                                            <tr>
                                                                                <th scope="row">Total</th>
                                                                                <th scope="row">{(auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts'].seniorProf.sanctioned === '' ? 0 : parseInt(auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts'].seniorProf.sanctioned)) + (auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts'].prof.sanctioned === '' ? 0 : parseInt(auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts'].prof.sanctioned)) + (auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts'].assistantProf.sanctioned === '' ? 0 : parseInt(auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts'].assistantProf.sanctioned)) + (auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts'].associateProf.sanctioned === '' ? 0 : parseInt(auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts'].associateProf.sanctioned))}</th>
                                                                                <th scope="row">{(auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts'].seniorProf.filled === '' ? 0 : parseInt(auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts'].seniorProf.filled)) + (auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts'].prof.filled === '' ? 0 : parseInt(auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts'].prof.filled)) + (auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts'].assistantProf.filled === '' ? 0 : parseInt(auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts'].assistantProf.filled)) + (auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts'].associateProf.filled === '' ? 0 : parseInt(auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts'].associateProf.filled))}</th>
                                                                                <th scope="row">{(auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts'].seniorProf.cas === '' ? 0 : parseInt(auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts'].seniorProf.cas)) + (auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts'].prof.cas === '' ? 0 : parseInt(auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts'].prof.cas)) + (auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts'].assistantProf.cas === '' ? 0 : parseInt(auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts'].assistantProf.cas)) + (auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts'].associateProf.cas === '' ? 0 : parseInt(auditData[0]?.AAAData?.['cellAsInputTables']['teachingPosts'].associateProf.cas))}</th>

                                                                            </tr>
                                                                        </>
                                                                    }

                                                                    {
                                                                        mainTable.tableName === 'mphilPrograms' && <tr>
                                                                            <EditableTd data={auditData[0]?.AAAData?.['cellAsInputTables']['mphilPrograms']} keyName='applications' title='MPSC/UPSC' tableName='civil' />
                                                                            <EditableTd data={auditData[0]?.AAAData?.['cellAsInputTables']['mphilPrograms']} keyName='intake' title='NET/SET' tableName='civil' />
                                                                            <EditableTd data={auditData[0]?.AAAData?.['cellAsInputTables']['mphilPrograms']} keyName='admissions' title='GATE' tableName='civil' />
                                                                            <EditableTd data={auditData[0]?.AAAData?.['cellAsInputTables']['mphilPrograms']} keyName='male' title='Other Exams' tableName='civil' />
                                                                            <EditableTd data={auditData[0]?.AAAData?.['cellAsInputTables']['mphilPrograms']} keyName='female' title='Other Exams' tableName='civil' />
                                                                            <EditableTd data={auditData[0]?.AAAData?.['cellAsInputTables']['mphilPrograms']} keyName='others' title='Other Exams' tableName='civil' />

                                                                            <th scope="row">{(auditData[0]?.AAAData?.['cellAsInputTables']['mphilPrograms'].intake === '' ? 0 : parseInt(auditData[0]?.AAAData?.['cellAsInputTables']['mphilPrograms'].intake))
                                                                                + (auditData[0]?.AAAData?.['cellAsInputTables']['mphilPrograms'].admissions === '' ? 0 : parseInt(auditData[0]?.AAAData?.['cellAsInputTables']['mphilPrograms'].admissions))
                                                                                + (auditData[0]?.AAAData?.['cellAsInputTables']['mphilPrograms'].male === '' ? 0 : parseInt(auditData[0]?.AAAData?.['cellAsInputTables']['mphilPrograms'].male))
                                                                                + (auditData[0]?.AAAData?.['cellAsInputTables']['mphilPrograms'].female === '' ? 0 : parseInt(auditData[0]?.AAAData?.['cellAsInputTables']['mphilPrograms'].female))
                                                                                + (auditData[0]?.AAAData?.['cellAsInputTables']['mphilPrograms'].others === '' ? 0 : parseInt(auditData[0]?.AAAData?.['cellAsInputTables']['mphilPrograms'].others))
                                                                            }
                                                                            </th>
                                                                        </tr>
                                                                    }

                                                                    {
                                                                        mainTable.tableName === 'phdPrograms' && <tr>
                                                                            <EditableTd data={auditData[0]?.AAAData?.['cellAsInputTables']['phdPrograms']} keyName='applications' title='MPSC/UPSC' tableName='civil' />
                                                                            <EditableTd data={auditData[0]?.AAAData?.['cellAsInputTables']['phdPrograms']} keyName='intake' title='NET/SET' tableName='civil' />
                                                                            <EditableTd data={auditData[0]?.AAAData?.['cellAsInputTables']['phdPrograms']} keyName='admissions' title='GATE' tableName='civil' />
                                                                            <EditableTd data={auditData[0]?.AAAData?.['cellAsInputTables']['phdPrograms']} keyName='male' title='Other Exams' tableName='civil' />
                                                                            <EditableTd data={auditData[0]?.AAAData?.['cellAsInputTables']['phdPrograms']} keyName='female' title='Other Exams' tableName='civil' />
                                                                            <EditableTd data={auditData[0]?.AAAData?.['cellAsInputTables']['phdPrograms']} keyName='others' title='Other Exams' tableName='civil' />

                                                                            <th scope="row">{(auditData[0]?.AAAData?.['cellAsInputTables']['phdPrograms'].intake === '' ? 0 : parseInt(auditData[0]?.AAAData?.['cellAsInputTables']['phdPrograms'].intake))
                                                                                + (auditData[0]?.AAAData?.['cellAsInputTables']['phdPrograms'].admissions === '' ? 0 : parseInt(auditData[0]?.AAAData?.['cellAsInputTables']['phdPrograms'].admissions))
                                                                                + (auditData[0]?.AAAData?.['cellAsInputTables']['phdPrograms'].male === '' ? 0 : parseInt(auditData[0]?.AAAData?.['cellAsInputTables']['phdPrograms'].male))
                                                                                + (auditData[0]?.AAAData?.['cellAsInputTables']['phdPrograms'].female === '' ? 0 : parseInt(auditData[0]?.AAAData?.['cellAsInputTables']['phdPrograms'].female))
                                                                                + (auditData[0]?.AAAData?.['cellAsInputTables']['phdPrograms'].others === '' ? 0 : parseInt(auditData[0]?.AAAData?.['cellAsInputTables']['phdPrograms'].others))
                                                                            }
                                                                            </th>
                                                                        </tr>
                                                                    }

                                                                    {
                                                                        mainTable.tableName === 'mphilPhd' &&
                                                                        <>
                                                                            <EditableTd data={auditData[0]?.AAAData?.['cellAsInputTables']['mphilPhd']} keyName='phd' title='Ph.D.' tableName='mphilphd' />
                                                                            <EditableTd data={auditData[0]?.AAAData?.['cellAsInputTables']['mphilPhd']} keyName='mphil' title='M.Phil.' tableName='mphilphd' />
                                                                        </>
                                                                    }

                                                                    {
                                                                        mainTable.tableName === 'facultyAwardsDegree' &&
                                                                        <tr>
                                                                            <EditableTd data={auditData[0]?.AAAData?.['cellAsInputTables']['facultyAwardsDegree']} keyName='mphil' tableName='civil' />
                                                                            <EditableTd data={auditData[0]?.AAAData?.['cellAsInputTables']['facultyAwardsDegree']} keyName='phd' tableName='civil' />
                                                                            <EditableTd data={auditData[0]?.AAAData?.['cellAsInputTables']['facultyAwardsDegree']} keyName='dsc' tableName='civil' />
                                                                            <EditableTd data={auditData[0]?.AAAData?.['cellAsInputTables']['facultyAwardsDegree']} keyName='dlit' tableName='civil' />

                                                                        </tr>
                                                                    }
                                                                </>
                                                                : null

                                                        }
                                                    </tbody>

                                                </table>
                                            </div>

                                        </div>

                                    </div>
                                }


                                {/* 6. Rich text tables */}
                                {
                                    mainTable.tableFromAAA === 'richTextTables' && (auditData[0]?.AAAData?.[mainTable.tableFromAAA]?.[mainTable.tableName]?.content === null || '' || undefined || ' ' || '<p>Nil</p>' || '<p>Nil</p>' | '<p>Nil</p>' || '<p>Nil</p>') ? <div className="bg-white overflow-hidden mt-5 " id={mainTable.tableName} key={mainIndex}>

                                        <div className="p-2 bg-[#009879] text-white flex items-center justify-between rounded-t-md">
                                            <div><h3 className="text-base font-semibold leading-6 text-white">
                                                <span className='add-serial-here mr-3'>.</span>
                                                {mainTable['title']}</h3>
                                            </div>

                                            <div>
                                                <a href={`#SummarySheet-${mainTable.tableName}`}>
                                                    <ArrowBackRoundedIcon />
                                                </a>
                                            </div>
                                        </div>

                                        <div className="border p-2">

                                            <div>
                                                <div id={`${mainTable['title']}-${academicYear}`}>

                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                        : null}



                            </div >

                        })
                    }
                </div>
            }
        </div >
    )
}

export default AAATables


const SectionTitle = ({ title, className }) => {
    return <p className={`text-center bg-[#00987936] text-[#009879] p-2 rounded-md ${className}`}>
        <span className="font-bold">{title}</span>
    </p>
}

const EditableTd = ({ title, data, keyName, tableName = 'program' }) => {
    return (
        tableName === 'program' ?
            <tr >
                <th scope="row">{title}</th>
                <td className='p-1'>{data[keyName].sanctioned}</td>
                <td className='p-1'>{data[keyName].filled}</td>
                <td className='p-1'>{data[keyName].cas}</td>
            </tr>
            : tableName === 'civil' ?
                <th className='p-1 font-medium'>{data[keyName]}</th>
                : tableName === 'mphilphd' ?
                    <tr >
                        <th scope="row">{title}</th>
                        <td className='p-1'>{data[keyName].male}</td>
                        <td className='p-1'>{data[keyName].female}</td>
                        <th scope="row">{(data[keyName].male === '' ? 0 : parseInt(data[keyName].male)) + (data[keyName].female === '' ? 0 : parseInt(data[keyName].female))}</th>
                    </tr> : null

    )
}

export { SectionTitle, EditableTd }