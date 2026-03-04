import React from 'react'
import { stageObj } from '../../../services/faculty/reports/cas/components/ApplyLevel'
import { ViewFile } from './Tables'
import TableComponent from '../../../components/TableComponent'
import useFetchData from '../../../hooks/useFetchData'
import CASDataTable from '../../../services/faculty/reports/cas/components/CASDataTable'

const Eligibility = ({ eligData, level, userCasDuration, forPrintOut, userId }) => {

    console.log(eligData, level)

    const filter = { userId: userId }
    const { data: researchPapers } = useFetchData("ResearchPaper", "faculty", filter, true, () => { }, false)

    return (
        <div>
            <p className="academic-start"></p>
            <p className={`text-center ${forPrintOut === 'false' && 'bg-[#00987936] text-[#009879]'} p-2`}>
                <span className="font-bold">Your Eligibility</span>

                {
                    userCasDuration && <p className="font-bold text-sm my-2">{`(CAS Duration: ${userCasDuration})`} </p>
                }

            </p>

            <div className='mt-3 mb-5'>
                <p className='text-center mb-3 mt-5'>Applying for <b>{stageObj?.[level]?.title}</b></p>
                <TableComponent tableHeads={["Title", "Proof"]} tableColor={forPrintOut === 'false' && "bg-[#009879]"} color={forPrintOut === 'false' ? "text-white" : "text-black bordered"}
                    tableCSS={forPrintOut === 'false' ? "" : "border-black"} >
                    {
                        level !== 'stage4' && stageObj?.[level]?.inputData?.map((inputData) => {
                            return inputData.type !== 'table' && (<tr>
                                <td></td>
                                <td className='w-[70%]'>{inputData.title}</td>
                                <td >{eligData?.[inputData.name]?.[0]?.filename ? <ViewFile fileName={eligData?.[inputData.name]?.[0]?.filename} type="casDirURL" /> : 'Yes'}</td>
                            </tr>)
                        })
                    }

                    {
                        level === 'stage4' && stageObj?.[level]?.inputData?.map((inputData, index) => {
                            return inputData.type !== 'table' && (index === 2 && (eligData['supervisor'] === 'Main Supervisor' || !eligData['supervisor'])) ? null : <tr>
                                <td></td>
                                <td className='w-[70%]'>{inputData.title} {inputData.name?.includes('guideProof') && <span className='font-semibold mx-3'>{`(${eligData['supervisor'] || 'Main Supervisor'})`}</span>} </td>
                                <td >{eligData?.[inputData.name]?.[0]?.filename ? <ViewFile fileName={eligData?.[inputData.name]?.[0]?.filename} type="casDirURL" /> : 'Yes'}</td>
                            </tr>
                        })
                    }


                </TableComponent>
                {
                    ((level === 'stage4' || level === 'stage3') && eligData?.["researchPapers"]) && <div>
                        <p className='mt-5 mb-2 text-center'>Proof of having minimum of <span className='font-bold'>{level === 'stage4' ? 10 : 7}</span> Research Papers including <span className='font-bold'>3</span> of the assessment period.</p>
                        <table className="table table-bordered text-sm css-serial">
                            <thead className='bg-[#009879] text-white'>
                                <tr>
                                    <th>Sr. No.</th>
                                    {
                                        CASDataTable["ResearchPaper"].tableHeads.map((head) => {
                                            return <th>{head}</th>
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    researchPapers?.data.map((researchPaper, index) => {
                                        return eligData?.["researchPapers"]?.includes(researchPaper._id) && <tr>
                                            <td></td>
                                            {
                                                CASDataTable["ResearchPaper"].tableCells.map((head) => {
                                                    return <td>{head.includes('roof') ?
                                                        <ViewFile fileName={researchPaper[head]} /> : researchPaper?.[head]}</td>
                                                })
                                            }
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    )
}

export default Eligibility