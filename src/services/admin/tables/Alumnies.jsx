import { Avatar } from '@mui/material'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import EmptyBox from '../../../components/EmptyBox'
import Loader from '../../../components/Loader'
import getReq from '../../../components/requestComponents/getReq'
import AdminAcordinTable from '../components/AdminAcordinTable'
import { api } from '../../../js/api'

const Alumnies = ({ id, setState, yearFilter, schoolName, Heading, setLoaded }) => {
  const SendReq = "StudentUser"
  const module = "Admin"

  let filter = yearFilter.length === 0 && schoolName === 'All Schools' ? {isAlumni: true} : yearFilter.length !== 0 && schoolName === 'All Schools' ? { doCompletion: {$in: yearFilter}, isAlumni: true } : yearFilter.length === 0 && schoolName !== 'All Schools' ? { schoolName: schoolName, isAlumni: true } : { schoolName: schoolName, doCompletion: { $in: yearFilter }, isAlumni: true }

  const params = { model: SendReq, id: "", module, filter }

  const { data, isLoading } = useQuery(`${SendReq} ${JSON.stringify(params)}`, () => getReq(params))

  useEffect(() => {
    setState((pri) => {
      return {
        ...pri,
        [id]: data?.data
      }
    })
    if (!isLoading) {
      setLoaded((pre) => { return { ...pre, [id]: true } });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data && data])

  return (
    <AdminAcordinTable Heading={Heading} data={data?.data} SendReq={SendReq}>
      <div className='table-responsive' style={{ height: "100%" }}>
        <table className="table">
          <thead className="sticky-top" style={{ background: "#ae7e28", color: '#FFF' }}>
            <tr>
              <th>Sr. No.</th>
              <th>profile Pic</th>
              <th>Name</th>
              <th>School</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Programmes Graduated</th>
              <th>Last progamme Graduated at</th>

            </tr>
          </thead>
          <tbody>
            {
              data?.data.map((item, index) => <tr>
                <td>{index + 1}</td>
                <td><Avatar src={`${api}/showFile/${item.photoURL}/faculty`} /></td>
                <td>{`${item.salutation} ${item.name}`}</td>
                <td>{item.schoolName}</td>
                <td>{item.gender}</td>
                <td>{item.email}</td>
                <td>{item.programGraduated}</td>
                <td>{item.doCompletion}</td>
              </tr>
              )
            }
          </tbody>
        </table>
        {isLoading ? <Loader /> : ""}
        {!isLoading && data?.length === 0 ? <EmptyBox /> : ""}
      </div>
    </AdminAcordinTable>
  )
}

export default Alumnies