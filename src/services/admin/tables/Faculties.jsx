import React, { useEffect } from 'react'
import { Avatar } from '@mui/material';
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';
import Loader from '../../../components/Loader';
import EmptyBox from '../../../components/EmptyBox';
import designationWiseSorting from '../../../js/designationWiseSorting';
import siteLinks from '../../../components/siteLinks';
import { api } from '../../../js/api';


const Faculties = ({ id, setState, yearFilter, schoolName, heading, setLoaded }) => {
  const SendReq = "User"
  const module = "Admin"

  let filter = schoolName === 'All Schools' ? null : { department: schoolName }

  const params = { model: SendReq, id: "", module, filter: filter }

  const { data, isLoading } = useQuery([SendReq, params], () => getReq(params))

  useEffect(() => {
    setState((pri) => {
      return {
        ...pri,
        [id]: designationWiseSorting(data?.data)
      }
    })
    if (!isLoading) {
      setLoaded((pre) => { return { ...pre, [id]: true } });
    }
  }, [data && data])



  return (
    <AdminAcordinTable Heading={heading} data={data?.data} SendReq={SendReq} >
      <div className='table-responsive' style={{ height: "100%" }}>
        <table className="table">
          <thead className="sticky-top" style={{ background: `${window.location.pathname === siteLinks.fdc.link ? '#28359b' : '#ae7e28'}`, color: '#FFF' }}>
            <tr>
              <th>Sr. No.</th>
              <th>profile Pic</th>
              <th>Name</th>
              <th>School</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Designation</th>

            </tr>
          </thead>
          <tbody>
            {
              data?.data.map((item, index) => <tr>
                <td>{index + 1}</td>
                <td><Avatar src={`${api}/showFile/${item.photoURL}/faculty`} /></td>
                <td>{`${item.salutation} ${item.name}`}</td>
                <td>{item.department}</td>
                <td>{item.gender}</td>
                <td>{item.email}</td>
                <td>{item.designation}</td>
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

export default Faculties