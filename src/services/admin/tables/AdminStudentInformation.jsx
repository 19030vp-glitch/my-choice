import { upperCase } from 'lodash';
import React from 'react'
import sortByAcademicYear from '../../../js/sortByAcademicYear';
import Loader from '../../../components/Loader';
import EmptyBox from '../../../components/EmptyBox';

const AdminStudentInformation = ({ data, year, isLoading, tableHead, tableHeight= "100%", forPDF, headColor = '#ae7e28' }) => {
    const alignment = {alignContent: "center", fontSize: "13px", fontWeight: "bold"}

    const totaldata = {male: 0, female: 0, total: 0};
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
                    const values = {...element.totalValues}
                    delete values.total
                    const totalValues = Object.keys(values)
                    const length = totalValues.length
                    return <>
                      {totalValues.map((e, i) => (<tr key={`${e}${i}`} >
                            {
                                i===0&& <>
                                    <td rowSpan={length+1} style={alignment}>{index+1}</td>
                                    {tableHead.hasOwnProperty("SchoolName")&&<td rowSpan={length+1} style={alignment}>{element.schoolName}</td>}
                                    <td rowSpan={length+1} style={alignment}>{element.year}</td>
                                </>
                            }
                            <td style={alignment}>{upperCase(e)}</td>
                            <td>{element?.totalValues?.[e]?.male}</td>
                            <td>{element?.totalValues?.[e]?.female}</td>
                            <td>{element?.totalValues?.[e]?.total}</td>

                        </tr>    
                      ))}
                      <tr>
                        <td style={alignment}>Total</td>
                            <td style={alignment}>{element?.totalValues?.total?.male}</td>
                            <td style={alignment}>{element?.totalValues?.total?.female}</td>
                            <td style={alignment}>{element?.totalValues?.total?.total}</td>
                      </tr>
                  </>
                })
            }
        </tbody>
      </table>
      {isLoading && <Loader /> }
      {(!isLoading && data?.length === 0) && <EmptyBox /> }
    </div>
  )
}

export default AdminStudentInformation
