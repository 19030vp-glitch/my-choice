import React, { useEffect } from 'react'

const OtherInfo = ({ forPrintOut, casArray, academicData }) => {


    useEffect(() => {
        console.log("academicData in other info :", academicData)
    }, [academicData])

    return (
        <div>
            <div>
                <p className={`text-center ${forPrintOut === 'false' && "bg-[#00987936] text-[#009879]"} p-2`}>
                    <span className="font-bold">Other Relevant Information</span></p>

                <div className={`${forPrintOut === 'true' && "px-1"} mt-2`}>
                    <table className={`table table-bordered`}>
                        <thead className={`${forPrintOut === 'false' && "bg-[#009879] text-white"}`}>
                            <tr>
                                <th scope="col">Year</th>
                                <th scope="col">Details of any other credential, significant contributions, awards received etc. not mentioned earlier </th>
                            </tr>
                        </thead>
                        <tbody>

                            {casArray.map((casItem) => {
                                return (
                                    <tr className={`${forPrintOut === 'true' ? "text-black" : "table-light"} `}>
                                        <th scope="row" className='w-20 text-sm text-[#009879]'>{casItem.casYear}</th>
                                        <td>

                                            <table className={`table table-bordered ${forPrintOut === 'true' && "border-dark"}`}>
                                                <thead className={`${forPrintOut === 'false' && "bg-[#009879] text-white"}`}>
                                                    <tr>
                                                        <th scope="col">Sr.</th>
                                                        <th>Details</th>

                                                    </tr>
                                                </thead>
                                                <tbody className='text-sm'>

                                                    {
                                                        casItem?.otherInfo?.map((infoItem, index) => {
                                                            return <tr>
                                                                <th scope="row">{index + 1}</th>


                                                                <td>{infoItem}</td>


                                                            </tr>
                                                        })
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

            <div className='border mt-5 p-3'>
                <p className='mb-3 font-semibold'>List of enclosures </p>
                <hr />

                <div>
                    <ol className="grid grid-cols-2 gap-4 mt-3 px-5">
                        <li className="p-1 list-decimal">Proof of Research Degree</li>
                        {
                            academicData?.Online?.length > 0 && <li className="p-1 list-decimal">Proofs of Orientation / Refresher course & FDP</li>
                        }
                        {
                            academicData?.ResearchPaper?.length > 0 && <li className="p-1 list-decimal">Proofs of Research Papers</li>
                        }
                        {
                            academicData?.BookAndChapter?.length > 0 && <li className="p-1 list-decimal">Proofs of Publications</li>
                        }
                        {
                            academicData?.PhdAwarded?.length > 0 && <li className="p-1 list-decimal">Proofs of Ph.D. Awarded to students</li>
                        }
                        {
                            academicData?.ResearchProject?.length > 0 && <li className="p-1 list-decimal">Proofs of Research Projects</li>
                        }
                        {
                            academicData?.ConsultancyServices?.length > 0 && <li className="p-1 list-decimal">Proofs of Consultancies</li>
                        }
                        {
                            academicData?.AwardRecognition?.length > 0 && <li className="p-1 list-decimal">Proofs of Awards and Recognition</li>
                        }
                        {
                            academicData?.InvitedTalk?.length > 0 && <li className="p-1 list-decimal">Proofs of Invited of Invited Talks</li>
                        }
                        <li className="p-1 list-decimal"> Proofs of involved activities</li>
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default OtherInfo