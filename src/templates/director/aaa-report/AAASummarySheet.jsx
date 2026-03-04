import React from 'react'
import { useEffect } from 'react'
import EmptyBox from '../../../components/EmptyBox'
import { categorywiseTables, reportTables } from '../../../services/director/reports/academic-audit/components/TableData'
import { ViewFile } from '../../faculty/cas-report/Tables'
import { EditableTd, SectionTitle } from './AAATables'
import CallMissedOutgoingRoundedIcon from '@mui/icons-material/CallMissedOutgoingRounded';

const AAASummarySheet = ({ auditData }) => {

    return (
        <div>
            <p className="aaa-break"></p>

            <div>
                <div>

                    <SectionTitle title="SECTION 1: SUMMARY SHEET" className="mt-2 mb-5" />

                    {/* // TABLE */}
                    {
                        auditData?.[0] && <div>
                            <table className="table mx-auto mt-3 table-bordered text-sm md:text-base css-serial">
                                <thead className='bg-[#009879] text-white'>
                                    <tr>
                                        <th scope="col" className='w-16'>Sr No.</th>
                                        <th scope="col">Title</th>

                                        {/* mapping of years */}
                                        {auditData?.map((item) => { return (<th className="w-[20%]">{item?.auditYear}</th>); })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        reportTables.map((table) => {
                                            return <>

                                                {table.tableFromAAA === 'schoolInfoTables' && (auditData?.[0]?.AAAData?.schoolInfoTables?.[table.tableName]?.data?.length > 0) ? <tr id={`SummarySheet-${table.tableName}`}>
                                                    <td scope="row"></td>
                                                    <td><a href={`#${table.tableName}`} className="text-blue-700">{table.title}</a></td>
                                                    <td className='font-bold text-[#009879]'>{auditData?.[0]?.AAAData?.schoolInfoTables?.[table.tableName]?.data?.length}</td>
                                                </tr> : null}

                                                {table.tableFromAAA === 'fileFeedback' && (auditData?.[0]?.AAAData?.fileFeedback?.[table.tableName]?.data?.length > 0) ? (<tr id={`SummarySheet-${table.tableName}`}>
                                                    <td scope="row"></td>
                                                    <td><a href={`#${table.tableName}`} className="text-blue-700">{table.title}</a></td>
                                                    <td className='font-bold text-[#009879]'>{auditData?.[0]?.AAAData?.fileFeedback?.[table.tableName]?.data?.length}</td>

                                                </tr>) : null}

                                                {table.tableFromAAA === 'facultyTables' && (
                                                    (auditData?.[0]?.AAAData?.facultyTables?.[table.tableName]?.data?.length > 0 ? auditData?.[0]?.AAAData?.facultyTables?.[table.tableName]?.data?.length : 0) + (auditData?.[0]?.AAAData?.facultyTables?.[table.tableName]?.dataMap?.length > 0 ? auditData?.[0]?.AAAData?.facultyTables?.[table.tableName]?.dataMap?.length : 0)) > 0 ? (<tr id={`SummarySheet-${table.tableName}`}>
                                                        <td scope="row"></td>
                                                        <td><a href={`#${table.tableName}`} className="text-blue-700">{table.title}</a></td>
                                                        <td className='font-bold text-[#009879]'>{(
                                                            (auditData?.[0]?.AAAData?.facultyTables?.[table.tableName]?.data?.length > 0 ? auditData?.[0]?.AAAData?.facultyTables?.[table.tableName]?.data?.length : 0) + (auditData?.[0]?.AAAData?.facultyTables?.[table.tableName]?.dataMap?.length > 0 ? auditData?.[0]?.AAAData?.facultyTables?.[table.tableName]?.dataMap?.length : 0))}
                                                        </td>
                                                    </tr>) : null}

                                                {table.tableFromAAA === 'directorTables' && (
                                                    (auditData?.[0]?.AAAData?.directorTables?.[table.tableName]?.data?.length > 0 ? auditData?.[0]?.AAAData?.directorTables?.[table.tableName]?.data?.length : 0) + (auditData?.[0]?.AAAData?.directorTables?.[table.tableName]?.dataMap?.length > 0 ? auditData?.[0]?.AAAData?.directorTables?.[table.tableName]?.dataMap?.length : 0)) > 0 ? (<tr id={`SummarySheet-${table.tableName}`}>
                                                        <td scope="row"></td>
                                                        <td><a href={`#${table.tableName}`} className="text-blue-700">{table.title}</a></td>

                                                        <td className='font-bold text-[#009879]'>{(
                                                            (auditData?.[0]?.AAAData?.directorTables?.[table.tableName]?.data?.length > 0 ? auditData?.[0]?.AAAData?.directorTables?.[table.tableName]?.data?.length : 0) + (auditData?.[0]?.AAAData?.directorTables?.[table.tableName]?.dataMap?.length > 0 ? auditData?.[0]?.AAAData?.directorTables?.[table.tableName]?.dataMap?.length : 0))}
                                                        </td>

                                                    </tr>) : null}


                                                {table.tableFromAAA === 'cellAsInputTables' && (<tr id={`SummarySheet-${table.tableName}`}>
                                                    <td scope="row"></td>
                                                    <td><a href={`#${table.tableName}`} className="text-blue-700">{table.title}</a></td>
                                                    <td className='font-bold text-[#009879]'>{<a href={`#${table.tableName}`}><CallMissedOutgoingRoundedIcon /></a>}</td>
                                                </tr>)}

                                                {table.tableFromAAA === 'richTextTables' && (<tr id={`SummarySheet-${table.tableName}`}>
                                                    <td scope="row"></td>
                                                    <td><a href={`#${table.tableName}`} className="text-blue-700">{table.title}</a></td>
                                                    <td className='font-bold text-[#009879]'>{<a href={`#${table.tableName}`}><CallMissedOutgoingRoundedIcon /></a>}</td>
                                                </tr>)}



                                            </>
                                        })
                                    }


                                </tbody>
                            </table>
                        </div>
                    }

                </div>
            </div>



        </div>
    )
}

export default AAASummarySheet


