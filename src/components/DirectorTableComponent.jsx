import React from 'react'
import CASDataTable from '../services/faculty/reports/cas/components/CASDataTable'
import { ViewFile } from '../templates/faculty/cas-report/Tables'
import EmptyBox from './EmptyBox'
import TableData from '../services/director/reports/academic-audit/components/TableData'

const DirectorTableComponent = ({ data, tableColor = 'bg-blue-700', model = null, color = "text-white", tableCSS = "" }) => {



    return (
        <div>
            <div className="table-responsive">
                <table className={`table table-bordered css-serial ${tableCSS}`}>
                    <thead className={`${tableColor} ${color}`} >
                        <tr>
                            {TableData[model]?.auditHead.map((head) => {
                                return <>{<th scope="col">{head}</th>}
                                </>
                            })}
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data?.map((item) => {
                                return <tr>
                                    <td></td>
                                    {
                                        TableData[model]?.childHead.map((cell) => {
                                            return <td>{item[cell]}</td>
                                        })
                                    }
                                </tr>
                            })
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

export default DirectorTableComponent