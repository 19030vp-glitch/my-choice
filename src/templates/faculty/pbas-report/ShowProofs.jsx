import React, { useEffect, useState } from 'react'
import { CASActivities } from '../cas-report/Tables'
import serverLinks from '../../../js/serverLinks'



const ShowProofs = ({ academicData, casArray, forPrintOut = false }) => {
    return (
        <div>
            <p>shaikh sajed</p>
            {/* // form activity 1-3 */}
            <div className="mx-auto">
                {CASActivities.map((activity) => {
                    return <div className="bg-white overflow-hidden sm:rounded-lg mt-5 border">


                        <div className={`${forPrintOut === 'true' && "px-1"}`}>
                            <table className={`table table-bordered`}>
                                <thead className={`${forPrintOut === 'false' && "bg-[#009879] text-white"}`}>
                                    <tr>
                                        <th scope="col">Year</th>
                                        <th scope="col">{activity.colName}</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {casArray.map((casItem) => {
                                        return (
                                            <tr className="table-light">
                                                <th scope="row" className='w-20 text-sm text-[#009879]'>{casItem.casYear}</th>
                                                <td>

                                                    <table className={`table table-bordered ${forPrintOut === 'true' && "border-dark"}`}>
                                                        <thead className={`${forPrintOut === 'false' && "bg-[#009879] text-white"}`}>
                                                            <tr>
                                                                <th scope="col">Sr.</th>
                                                                <th>Proofs</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody className='text-sm'>

                                                            {
                                                                academicData[activity.model]?.filter((a) => { return casItem.academicData?.[activity.casName]?.dataMap?.includes(a._id) }).map((modelItem, index) => {
                                                                    return <tr>
                                                                        <th scope="row">{index + 1}</th>

                                                                        {console.log('sajed')}

                                                                        <td>{
                                                                            <EmbeddedPDF pdfUrl={serverLinks.showFile(modelItem['proof'], 'faculty')} />
                                                                        }

                                                                            {console.log(serverLinks.showFile(modelItem['proof'], 'faculty'))}
                                                                        </td>


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
                })}

            </div>
        </div>
    )
}

export default ShowProofs


function EmbeddedPDF({ pdfUrl }) {
    const [numPages, setNumPages] = useState(0);

    useEffect(() => {
        const countPages = async () => {
            try {
                const response = await fetch(pdfUrl);
                const blob = await response.blob();

                const reader = new FileReader();
                reader.onload = function (event) {
                    const data = event.target.result;
                    const regex = /\/Type\s*\/Page[^s]/g;
                    const result = data.match(regex);
                    const pageCount = result ? result.length : 0;
                    setNumPages(pageCount);
                };
                reader.readAsBinaryString(blob);
            } catch (error) {
                console.error('Error loading PDF:', error);
            }
        };

        countPages();
    }, [pdfUrl]);


    return (
        <div>
            <h1>Embedded PDF with Multiple Pages</h1>
            <p>Number of Pages: {numPages}</p>
            {
                [...Array(numPages ? numPages : 0)].map((item, i) => {
                    return <iframe src={`${pdfUrl}#page=${i}`} frameborder="0" width="100%" height="500px"></iframe>
                })
            }
        </div>
    );
}

export { EmbeddedPDF };
