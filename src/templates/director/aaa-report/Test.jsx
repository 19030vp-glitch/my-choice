import React from 'react'
import { useEffect } from 'react'
import EmptyBox from '../../../components/EmptyBox'
import { categorywiseTables } from '../../../services/director/reports/academic-audit/components/TableData'
import { ViewFile } from '../../faculty/cas-report/Tables'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { IconButton } from '@mui/material'


const AAATables = ({ auditData, academicData, directorData }) => {


    const facultyDirectorObj = [
        {
            title: 'Faculty Information',
            tableNameInMainObject: 'facultyTables',
            fetchFrom: 'academicData',
            showName: true,
            serial: 3,
            cellHeadNameForManualEntry: 'childHead',
            cellHeadNameForServerEntry: 'childHead'
        },
        {
            title: 'Director Information',
            tableNameInMainObject: 'directorTables',
            fetchFrom: 'directorData',
            showName: false,
            serial: 4,
            cellHeadNameForManualEntry: 'stateHead',
            cellHeadNameForServerEntry: 'childHead'
        }
    ]


    useEffect(() => {
        // adding text 
        Object.keys(categorywiseTables.richTextTables)?.forEach((table) => {


            auditData?.forEach((aaaItem) => {
                document.getElementById(`${categorywiseTables['richTextTables'][table]['title']}-${aaaItem.auditYear}`).innerHTML = aaaItem.AAAData?.['richTextTables'][table]?.content
            })

        })
    }, [auditData, academicData, directorData])



    const dataObj = { academicData, directorData }

    useEffect(() => {
        console.log('UGC : ', directorData?.Award)
    }, [directorData])

    return (
        <div>

            {/* 1. General School / Department Information (6. file feedback is added here) */}
            <div>
                <p className="aaa-break mt-5"></p>
                <SectionTitle title="SECTION 2: DETAILED INFORMATION" className="mt-2 mb-5" />

                <div>
                    <SectionTitle title="1. General School / Department Information" />
                    <div className='css-serial'>
                        {
                            Object.keys(categorywiseTables.schoolInfoTables)?.map((table, index) => {

                                return <div className="bg-white overflow-hidden sm:rounded-lg mt-5" id={table} key={index}>

                                    <div className="p-2 bg-[#009879] text-white flex items-center justify-between">
                                        <div><h3 className="text-base font-semibold leading-6 text-white">
                                            <span className='add-serial-here mr-3'>.</span>
                                            {categorywiseTables.schoolInfoTables[table]['title']}</h3>
                                        </div>

                                        <div>
                                            <a href={`#SummarySheet-${table}`}>
                                                <ArrowBackRoundedIcon />
                                            </a>
                                        </div>
                                    </div>



                                    <div>
                                        <table className="table table-bordered">
                                            <thead className="bg-[#009879] text-white">
                                                <tr>
                                                    <th scope="col" className='font-medium'>Year</th>
                                                    <th scope="col" className='font-medium'>Data</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {auditData?.map((aaaItem,) => {
                                                    return (
                                                        <tr className="table-light">
                                                            <th scope="row" className='w-20 text-sm text-[#009879]'>{aaaItem.auditYear}</th>
                                                            <td>

                                                                <table className="table table-bordered css-serial">
                                                                    <thead className="bg-[#009879] text-white">
                                                                        <tr>
                                                                            {categorywiseTables.schoolInfoTables?.[table]?.tableInfo?.auditHead?.map((item) => {
                                                                                return (item !== 'Action' ? <th className="font-medium">{item}</th> : null);
                                                                            })
                                                                            }

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody className='text-sm'>

                                                                        {
                                                                            aaaItem?.AAAData?.[categorywiseTables.schoolInfoTables[table].takeFrom ?
                                                                                categorywiseTables.schoolInfoTables[table].takeFrom : 'schoolInfoTables'][table]?.data?.length > 0 ? aaaItem.AAAData?.[categorywiseTables.schoolInfoTables[table].takeFrom ? categorywiseTables.schoolInfoTables[table].takeFrom : 'schoolInfoTables'][table]?.data?.map((tableItem) => {

                                                                                    return <tr>
                                                                                        <td scope="row"></td>

                                                                                        {categorywiseTables.schoolInfoTables?.[table]?.tableInfo?.childHead?.map((item) => {
                                                                                            return (<td>{item === 'proof' ?
                                                                                                <ViewFile fileName={tableItem['proof']} type="aaaDirURL" customTitle={table === 'courseOutcomes' ? `View: ${tableItem['proof'].replace('Feedback', aaaItem.auditYear)}` : 'View Proof'} /> : tableItem[item]}</td>);
                                                                                        })}



                                                                                    </tr>
                                                                                }) : <tr>
                                                                                <th colspan="20" className="text-center font-medium text-gray-600"><EmptyBox /></th>
                                                                            </tr>
                                                                        }
                                                                    </tbody>

                                                                </table>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            })
                        }
                    </div>
                </div>
            </div>

            {/* 2 & 3 Faculty and Director Information */}
            <div>
                {
                    facultyDirectorObj.map((mainItem, mainIndex) => {
                        return <div key={mainIndex}>
                            <p className="aaa-break mt-5"></p>
                            <div>
                                <SectionTitle title={`${mainItem.serial}. ${mainItem.title}`} />
                                <div className='css-serial'>
                                    {
                                        Object.keys(categorywiseTables[mainItem.tableNameInMainObject])?.map((table, index) => {
                                            return <div className="bg-white overflow-hidden sm:rounded-lg mt-5" key={index} id={table}>

                                                <div className="p-2 bg-[#009879] text-white flex items-center justify-between">
                                                    <div><h3 className="text-base font-semibold leading-6 text-white"> <span className='add-serial-here mr-3'>.</span>
                                                        {categorywiseTables[mainItem.tableNameInMainObject][table]['title']}</h3>
                                                    </div>
                                                    <div>
                                                        <a href={`#SummarySheet-${table}`}>
                                                            <ArrowBackRoundedIcon />
                                                        </a>
                                                    </div>
                                                </div>

                                                <div>
                                                    <table className="table table-bordered">
                                                        <thead className="bg-[#009879] text-white">
                                                            <tr>
                                                                <th scope="col" className='font-medium'>Year</th>
                                                                <th scope="col" className='font-medium'>Data</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {auditData?.map((aaaItem) => {
                                                                return (
                                                                    <tr className="table-light">
                                                                        <th scope="row" className='w-20 text-sm text-[#009879]'>{aaaItem.auditYear}</th>
                                                                        <td>

                                                                            <table className="table table-bordered css-serial">
                                                                                <thead className="bg-[#009879] text-white">
                                                                                    <tr>
                                                                                        {categorywiseTables[mainItem.tableNameInMainObject]?.[table]?.tableInfo?.auditHead?.map((item) => {
                                                                                            return (item !== 'Action' ? <th className="font-medium">{item}</th> : null);
                                                                                        })
                                                                                        }

                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody className='text-sm'>

                                                                                    {
                                                                                        aaaItem.AAAData?.[mainItem.tableNameInMainObject][table]?.data?.length > 0 && academicData || aaaItem.AAAData?.[mainItem.tableNameInMainObject][table]?.dataMap?.length > 0 ?

                                                                                            <>
                                                                                                {
                                                                                                    aaaItem.AAAData?.[mainItem.tableNameInMainObject][table]?.data?.map((tableItem, index) => {
                                                                                                        return <tr>
                                                                                                            <td scope="row"></td>
                                                                                                            {
                                                                                                                mainItem.showName && <td>{tableItem['name']}</td>
                                                                                                            }

                                                                                                            {categorywiseTables[mainItem.tableNameInMainObject]?.[table]?.tableInfo?.[[mainItem.cellHeadNameForManualEntry]]?.map((item) => {
                                                                                                                return (<td>{item === 'proof' ?
                                                                                                                    <ViewFile fileName={tableItem['proof']} type="aaaDirURL" customTitle={table === 'courseOutcomes' ? `View: ${tableItem['proof'].replace('Feedback', aaaItem.auditYear)}` : 'View Proof'} /> : tableItem[item]}</td>);
                                                                                                            })}



                                                                                                        </tr>
                                                                                                    })
                                                                                                }


                                                                                                {
                                                                                                    (directorData && academicData) && dataObj[mainItem.fetchFrom][categorywiseTables[mainItem.tableNameInMainObject][table]['model']]?.map((serverItem, index) => {
                                                                                                        return aaaItem.AAAData?.[mainItem.tableNameInMainObject][table]?.dataMap?.includes(serverItem._id) &&
                                                                                                            <tr key={index}>
                                                                                                                <td></td>
                                                                                                                {mainItem.showName && <td>{serverItem.userId.name}</td>}
                                                                                                                {categorywiseTables[mainItem.tableNameInMainObject]?.[table]?.tableInfo?.[[mainItem.cellHeadNameForServerEntry]].map((item) => {
                                                                                                                    return <td>{serverItem[item]}</td>
                                                                                                                })
                                                                                                                }
                                                                                                            </tr>

                                                                                                    })}

                                                                                            </>
                                                                                            : <tr>
                                                                                                <th colspan="20" className="text-center font-medium text-gray-600"><EmptyBox /></th>
                                                                                            </tr>

                                                                                    }

                                                                                </tbody>

                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>

            {/* 4. Table as input  */}
            <div>
                <p className="aaa-break mt-5"></p>
                <SectionTitle title="4. Teaching posts, programme & Award Details" />
                <div className="css-serial">

                    {
                        Object.keys(categorywiseTables.cellAsInputTables)?.map((table, index) => {
                            return <div className="bg-white overflow-hidden sm:rounded-lg my-4" key={index}>

                                <div className="p-2 bg-[#009879] text-white flex items-center justify-between">
                                    <div><h3 className="text-base font-semibold leading-6 text-white"> <span className='add-serial-here mr-3'>.</span>
                                        {categorywiseTables['cellAsInputTables'][table]['title']}</h3>
                                    </div>
                                </div>

                                <div>
                                    <table className="table table-bordered">
                                        <thead className="bg-[#009879] text-white">
                                            <tr>
                                                <th scope="col" className='font-medium'>Year</th>
                                                <th scope="col" className='font-medium'>Data</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {auditData?.map((aaaItem) => {
                                                return (
                                                    <tr className="table-light">
                                                        <th scope="row" className='w-20 text-sm text-[#009879]'>{aaaItem.auditYear}</th>
                                                        <td>

                                                            <table className="table table-bordered css-serial">
                                                                <thead className="bg-[#009879] text-white">
                                                                    <tr>
                                                                        {categorywiseTables['cellAsInputTables']?.[table]?.tableHead?.map((item) => {
                                                                            return <th className="font-medium">{item}</th>
                                                                        })}

                                                                    </tr>
                                                                </thead>
                                                                <tbody className='text-sm'>


                                                                    {
                                                                        aaaItem.AAAData?.['cellAsInputTables'][table] ?

                                                                            <>

                                                                                {
                                                                                    table === 'teachingPosts' && <>
                                                                                        <EditableTd data={aaaItem.AAAData?.['cellAsInputTables']['teachingPosts']} keyName='seniorProf' title='Senior Professor' />
                                                                                        <EditableTd data={aaaItem.AAAData?.['cellAsInputTables']['teachingPosts']} keyName='prof' title='Professor' />
                                                                                        <EditableTd data={aaaItem.AAAData?.['cellAsInputTables']['teachingPosts']} keyName='associateProf' title='Associate Professor' />
                                                                                        <EditableTd data={aaaItem.AAAData?.['cellAsInputTables']['teachingPosts']} keyName='assistantProf' title='Assistant Professor' />
                                                                                        <tr>
                                                                                            <th scope="row">Total</th>
                                                                                            <th scope="row">{(aaaItem.AAAData?.['cellAsInputTables']['teachingPosts'].seniorProf.sanctioned === '' ? 0 : parseInt(aaaItem.AAAData?.['cellAsInputTables']['teachingPosts'].seniorProf.sanctioned)) + (aaaItem.AAAData?.['cellAsInputTables']['teachingPosts'].prof.sanctioned === '' ? 0 : parseInt(aaaItem.AAAData?.['cellAsInputTables']['teachingPosts'].prof.sanctioned)) + (aaaItem.AAAData?.['cellAsInputTables']['teachingPosts'].assistantProf.sanctioned === '' ? 0 : parseInt(aaaItem.AAAData?.['cellAsInputTables']['teachingPosts'].assistantProf.sanctioned)) + (aaaItem.AAAData?.['cellAsInputTables']['teachingPosts'].associateProf.sanctioned === '' ? 0 : parseInt(aaaItem.AAAData?.['cellAsInputTables']['teachingPosts'].associateProf.sanctioned))}</th>
                                                                                            <th scope="row">{(aaaItem.AAAData?.['cellAsInputTables']['teachingPosts'].seniorProf.filled === '' ? 0 : parseInt(aaaItem.AAAData?.['cellAsInputTables']['teachingPosts'].seniorProf.filled)) + (aaaItem.AAAData?.['cellAsInputTables']['teachingPosts'].prof.filled === '' ? 0 : parseInt(aaaItem.AAAData?.['cellAsInputTables']['teachingPosts'].prof.filled)) + (aaaItem.AAAData?.['cellAsInputTables']['teachingPosts'].assistantProf.filled === '' ? 0 : parseInt(aaaItem.AAAData?.['cellAsInputTables']['teachingPosts'].assistantProf.filled)) + (aaaItem.AAAData?.['cellAsInputTables']['teachingPosts'].associateProf.filled === '' ? 0 : parseInt(aaaItem.AAAData?.['cellAsInputTables']['teachingPosts'].associateProf.filled))}</th>
                                                                                            <th scope="row">{(aaaItem.AAAData?.['cellAsInputTables']['teachingPosts'].seniorProf.cas === '' ? 0 : parseInt(aaaItem.AAAData?.['cellAsInputTables']['teachingPosts'].seniorProf.cas)) + (aaaItem.AAAData?.['cellAsInputTables']['teachingPosts'].prof.cas === '' ? 0 : parseInt(aaaItem.AAAData?.['cellAsInputTables']['teachingPosts'].prof.cas)) + (aaaItem.AAAData?.['cellAsInputTables']['teachingPosts'].assistantProf.cas === '' ? 0 : parseInt(aaaItem.AAAData?.['cellAsInputTables']['teachingPosts'].assistantProf.cas)) + (aaaItem.AAAData?.['cellAsInputTables']['teachingPosts'].associateProf.cas === '' ? 0 : parseInt(aaaItem.AAAData?.['cellAsInputTables']['teachingPosts'].associateProf.cas))}</th>

                                                                                        </tr>
                                                                                    </>
                                                                                }

                                                                                {
                                                                                    table === 'mphilPrograms' && <tr>
                                                                                        <EditableTd data={aaaItem.AAAData?.['cellAsInputTables']['mphilPrograms']} keyName='applications' title='MPSC/UPSC' tableName='civil' />
                                                                                        <EditableTd data={aaaItem.AAAData?.['cellAsInputTables']['mphilPrograms']} keyName='intake' title='NET/SET' tableName='civil' />
                                                                                        <EditableTd data={aaaItem.AAAData?.['cellAsInputTables']['mphilPrograms']} keyName='admissions' title='GATE' tableName='civil' />
                                                                                        <EditableTd data={aaaItem.AAAData?.['cellAsInputTables']['mphilPrograms']} keyName='male' title='Other Exams' tableName='civil' />
                                                                                        <EditableTd data={aaaItem.AAAData?.['cellAsInputTables']['mphilPrograms']} keyName='female' title='Other Exams' tableName='civil' />
                                                                                        <EditableTd data={aaaItem.AAAData?.['cellAsInputTables']['mphilPrograms']} keyName='others' title='Other Exams' tableName='civil' />

                                                                                        <th scope="row">{(aaaItem.AAAData?.['cellAsInputTables']['mphilPrograms'].intake === '' ? 0 : parseInt(aaaItem.AAAData?.['cellAsInputTables']['mphilPrograms'].intake))
                                                                                            + (aaaItem.AAAData?.['cellAsInputTables']['mphilPrograms'].admissions === '' ? 0 : parseInt(aaaItem.AAAData?.['cellAsInputTables']['mphilPrograms'].admissions))
                                                                                            + (aaaItem.AAAData?.['cellAsInputTables']['mphilPrograms'].male === '' ? 0 : parseInt(aaaItem.AAAData?.['cellAsInputTables']['mphilPrograms'].male))
                                                                                            + (aaaItem.AAAData?.['cellAsInputTables']['mphilPrograms'].female === '' ? 0 : parseInt(aaaItem.AAAData?.['cellAsInputTables']['mphilPrograms'].female))
                                                                                            + (aaaItem.AAAData?.['cellAsInputTables']['mphilPrograms'].others === '' ? 0 : parseInt(aaaItem.AAAData?.['cellAsInputTables']['mphilPrograms'].others))
                                                                                        }
                                                                                        </th>
                                                                                    </tr>
                                                                                }

                                                                                {
                                                                                    table === 'phdPrograms' && <tr>
                                                                                        <EditableTd data={aaaItem.AAAData?.['cellAsInputTables']['phdPrograms']} keyName='applications' title='MPSC/UPSC' tableName='civil' />
                                                                                        <EditableTd data={aaaItem.AAAData?.['cellAsInputTables']['phdPrograms']} keyName='intake' title='NET/SET' tableName='civil' />
                                                                                        <EditableTd data={aaaItem.AAAData?.['cellAsInputTables']['phdPrograms']} keyName='admissions' title='GATE' tableName='civil' />
                                                                                        <EditableTd data={aaaItem.AAAData?.['cellAsInputTables']['phdPrograms']} keyName='male' title='Other Exams' tableName='civil' />
                                                                                        <EditableTd data={aaaItem.AAAData?.['cellAsInputTables']['phdPrograms']} keyName='female' title='Other Exams' tableName='civil' />
                                                                                        <EditableTd data={aaaItem.AAAData?.['cellAsInputTables']['phdPrograms']} keyName='others' title='Other Exams' tableName='civil' />

                                                                                        <th scope="row">{(aaaItem.AAAData?.['cellAsInputTables']['phdPrograms'].intake === '' ? 0 : parseInt(aaaItem.AAAData?.['cellAsInputTables']['phdPrograms'].intake))
                                                                                            + (aaaItem.AAAData?.['cellAsInputTables']['phdPrograms'].admissions === '' ? 0 : parseInt(aaaItem.AAAData?.['cellAsInputTables']['phdPrograms'].admissions))
                                                                                            + (aaaItem.AAAData?.['cellAsInputTables']['phdPrograms'].male === '' ? 0 : parseInt(aaaItem.AAAData?.['cellAsInputTables']['phdPrograms'].male))
                                                                                            + (aaaItem.AAAData?.['cellAsInputTables']['phdPrograms'].female === '' ? 0 : parseInt(aaaItem.AAAData?.['cellAsInputTables']['phdPrograms'].female))
                                                                                            + (aaaItem.AAAData?.['cellAsInputTables']['phdPrograms'].others === '' ? 0 : parseInt(aaaItem.AAAData?.['cellAsInputTables']['phdPrograms'].others))
                                                                                        }
                                                                                        </th>
                                                                                    </tr>
                                                                                }

                                                                                {
                                                                                    table === 'mphilPhd' &&
                                                                                    <>
                                                                                        <EditableTd data={aaaItem.AAAData?.['cellAsInputTables']['mphilPhd']} keyName='phd' title='Ph.D.' tableName='mphilphd' />
                                                                                        <EditableTd data={aaaItem.AAAData?.['cellAsInputTables']['mphilPhd']} keyName='mphil' title='M.Phil.' tableName='mphilphd' />
                                                                                    </>
                                                                                }

                                                                                {
                                                                                    table === 'facultyAwardsDegree' &&
                                                                                    <tr>
                                                                                        <EditableTd data={aaaItem.AAAData?.['cellAsInputTables']['facultyAwardsDegree']} keyName='mphil' tableName='civil' />
                                                                                        <EditableTd data={aaaItem.AAAData?.['cellAsInputTables']['facultyAwardsDegree']} keyName='phd' tableName='civil' />
                                                                                        <EditableTd data={aaaItem.AAAData?.['cellAsInputTables']['facultyAwardsDegree']} keyName='dsc' tableName='civil' />
                                                                                        <EditableTd data={aaaItem.AAAData?.['cellAsInputTables']['facultyAwardsDegree']} keyName='dlit' tableName='civil' />

                                                                                    </tr>
                                                                                }










                                                                            </>
                                                                            : <tr>
                                                                                <th colspan="20" className="text-center font-medium text-gray-600"><EmptyBox /></th>
                                                                            </tr>

                                                                    }

                                                                </tbody>

                                                            </table>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        })
                    }

                </div>



            </div>

            <div>
                <p className="aaa-break mt-5"></p>
                <SectionTitle title="5. School highlights, strengths, weaknesses & future plans" />
                <div className="css-serial">
                    {
                        Object.keys(categorywiseTables.richTextTables)?.map((table, index) => {
                            return <div className="bg-white overflow-hidden sm:rounded-lg my-4" key={index}>

                                <div className="p-2 bg-[#009879] text-white flex items-center justify-between">
                                    <div><h3 className="text-base font-semibold leading-6 text-white"> <span className='add-serial-here mr-3'>.</span>
                                        {categorywiseTables['richTextTables'][table]['title']}</h3>
                                    </div>
                                </div>

                                <div>

                                    <div>
                                        <table className="table table-bordered">
                                            <thead className="bg-[#009879] text-white">
                                                <tr>
                                                    <th scope="col" className='font-medium'>Year</th>
                                                    <th scope="col" className='font-medium'>Details</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {auditData?.map((aaaItem) => {
                                                    return (
                                                        <tr className="table-light">
                                                            <th scope="row" className='w-20 text-sm text-[#009879]'>{aaaItem.auditYear}</th>
                                                            <td>
                                                                <div id={`${categorywiseTables['richTextTables'][table]['title']}-${aaaItem.auditYear}`}>

                                                                </div>

                                                            </td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </table>
                                    </div>

                                </div>

                            </div>
                        })}
                </div>

            </div>



        </div>
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
                <td className='p-1'>{data[keyName]}</td>
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




{
    mainTable.tableFromAAA === 'facultyTables' &&
        aaaItem.AAAData?.[mainTable.tableFromAAA]?.[mainTable.tableName]?.data?.length > 0 && academicData || aaaItem.AAAData?.[mainTable.tableFromAAA]?.[mainTable.tableName]?.dataMap?.length > 0 ?

        <>
            {
                aaaItem.AAAData?.[mainTable.tableFromAAA]?.[mainTable.tableName]?.data?.map((tableItem, index) => {
                    return <tr key={index}>
                        <td scope="row"></td>
                        <td>{tableItem['name']}</td>
                        {mainTable.tableInfo?.['childHead']?.map((item) => {
                            return (<td>{item === 'proof' ?
                                <ViewFile fileName={tableItem['proof']} type="aaaDirURL" customTitle={mainTable.tableName === 'courseOutcomes' ? `View: ${tableItem['proof'].replace('Feedback', aaaItem.auditYear)}` : 'View Proof'} /> : tableItem[item]}</td>);
                        })}



                    </tr>
                })
            }


            {
                academicData && academicData?.[mainTable.model]?.map((serverItem, index) => {
                    return aaaItem.AAAData?.[mainTable.tableFromAAA][mainTable.tableName]?.dataMap?.includes(serverItem._id) &&
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
        : null

}

{
    mainTable.tableFromAAA === 'directorTables' &&
        (aaaItem.AAAData?.[mainTable.tableFromAAA]?.[mainTable.tableName]?.data?.length > 0 && directorData || aaaItem.AAAData?.[mainTable.tableFromAAA]?.[mainTable.tableName]?.dataMap?.length > 0) ?

        <>
            {
                aaaItem.AAAData?.[mainTable.tableFromAAA]?.[mainTable.tableName]?.data?.map((tableItem, index) => {
                    return <tr key={index}>
                        <td scope="row"></td>
                        {mainTable.tableInfo?.['stateHead']?.map((item) => {
                            return (<td>{item === 'proof' ?
                                <ViewFile fileName={tableItem['proof']} type="aaaDirURL" customTitle={mainTable.tableName === 'courseOutcomes' ? `View: ${tableItem['proof'].replace('Feedback', aaaItem.auditYear)}` : 'View Proof'} /> : tableItem[item]}</td>);
                        })}



                    </tr>
                })
            }


            {
                directorData && directorData?.[mainTable.model]?.map((serverItem, index) => {
                    return aaaItem.AAAData?.[mainTable.tableFromAAA]?.[mainTable.tableName]?.dataMap?.includes(serverItem._id) &&
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
