import React from 'react'
import CASDataTable from '../services/faculty/reports/cas/components/CASDataTable'
import { ViewFile } from '../templates/faculty/cas-report/Tables'
import EmptyBox from './EmptyBox'

const TableComponent = ({ tableHeads, tableCells, data, children, tableColor = 'bg-blue-700', showProof = false, takeFromModal = false, model = null, color = "text-white", tableCSS = "" }) => {



    return (
        <div>
            <div className="table-responsive">
                <table className={`table table-bordered css-serial ${tableCSS}`}>
                    <thead className={`${tableColor} ${color}`} >
                        <tr>
                            <th scope="col">Sr. No.</th>
                            {
                                !takeFromModal ? tableHeads.map((head) => {
                                    return <th scope="col">{head}</th>
                                }) : <>
                                    <th scope="col">Faculty Name</th>
                                    {CASDataTable[model]?.tableHeads.map((head) => {
                                        return <>{head.includes('pload') || head.includes('roof') || head.includes('Order') ? showProof ? <th scope="col">{head}</th> : null : <th scope="col">{head}</th>}
                                        </>
                                    })}
                                </>
                            }
                        </tr>
                    </thead>
                    <tbody>

                        {
                            tableCells || model ? data?.map((item) => {
                                return <tr>
                                    <td></td>
                                    {
                                        !takeFromModal ? tableCells.map((cell) => {
                                            return <td>{item?.[cell]}</td>
                                        }) : <>
                                            <td>{item.userId.salutation} {item.userId.name}</td>
                                            {
                                                CASDataTable[model]?.tableCells.map((cell) => {
                                                    return (<>{cell === 'proof' ? showProof ?
                                                        <td><ViewFile fileName={item['proof']} /></td> : null : cell === 'link' ?
                                                        <td><ViewFile fileName={item['link']}
                                                            type="linkURL" /></td> : <td>{item[cell]}</td>}</>);
                                                })
                                            }
                                        </>
                                    }
                                </tr>
                            })
                                :
                                children
                        }


                    </tbody>
                </table>

                {
                    data?.length === 0 && <EmptyBox />
                }

            </div>
        </div>
    )
}

export default TableComponent