import React from 'react'
import { upperCase } from 'lodash'
import sortByAcademicYear from '../../../js/sortByAcademicYear'
import Loader from '../../../components/Loader'
import EmptyBox from '../../../components/EmptyBox'


const AdminPublicationCitation = ({ data, year, isLoading, tableHead, tableHeight= "100%", forPDF, headColor = '#ae7e28' }) => {

    const alignment = {alignContent: "center", fontSize: "13px", fontWeight: "bold"}
      
  return (
    <div className='table-responsive' style={{ maxHeight: tableHeight }}>
      <table className={`table table-bordered ${forPDF && 'table-sm text-sm'}`} >
          <thead className="sticky-top" style={{ background: headColor, color: '#FFF' }}>
            <tr>
            {
                Object.values(tableHead)?.map(item => {
                  return <th>{item}</th>
                })
              }
            </tr>
        </thead>
        <tbody>
            {
                data && sortByAcademicYear(data, year).map((element, index) => {
                    return Object.keys(element.citationData).map((e, i) => (
                            <tr key={`${e}${i}`} >
                                {
                                   i===0&& <>
                                        <td rowSpan={4} style={alignment}>{index+1}</td>
                                        {tableHead.hasOwnProperty("userId.name") && tableHead.hasOwnProperty("userId.department") && (
                                          <>
                                              <td rowSpan={4} style={alignment}>{element.userId.name}</td>
                                              <td rowSpan={4} style={alignment}>{element.userId.department}</td>
                                          </>
                                        )}

                                        <td rowSpan={4} style={alignment}>{element.year}</td>
                                        </>
                                }
                                <td style={alignment}>{upperCase(e)}</td>
                                <td>{element?.citationData?.[e]?.citation}</td>
                                <td>{element?.citationData?.[e]?.["h-index"]}</td>
                                <td>{element?.citationData?.[e]?.["i-10-index"]}</td>
                                <td>{element?.citationData?.[e]?.aif}</td>
                            </tr>
                        ))
                })
            }
        </tbody>
      </table>
      {isLoading && <Loader /> }
      {(!isLoading && data?.length === 0) && <EmptyBox /> }
    </div>
  )
}

export default AdminPublicationCitation
