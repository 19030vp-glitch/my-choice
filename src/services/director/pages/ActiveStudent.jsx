import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SchoolsProgram from '../../../components/SchoolsProgram'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import Table from '../../../components/tableComponents/TableComponent'
import axios from 'axios';
import { toast } from 'react-hot-toast'
import { api } from '../../../js/api';

const tableHead = { index: "Sr. no.", propic: "Profile Pic", name: "Name Of Student", email: "Email Id", mobile: "Mobile No.", programEnroledOn: "Program Enroled On", Action: "Action" }

const ActiveStudent = () => {
  const module = "director";
  const model = "StudentUser"

  const user = useSelector(state => state.user.directorUser)
  const schoolName = user ? user.department : null

  const filter = { schoolName, isAlumni: false, isActiveStudent: true }
  const params = { model: model, id: "", module, filter: filter, }
  const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))

  const [activeProgram, setActiveProgram] = useState(SchoolsProgram && SchoolsProgram[schoolName][0][0])
  const [itemToEdit, setItemToEdit] = useState(null)

  const filteredData = data?.data.filter((students) => students.programGraduated === activeProgram)

  useEffect(() => {
    if (itemToEdit && data.data) {
      axios.post(`${api}/inactive-active/student`, { isActiveStudent: false, itemToEdit })
        .then(res => {
          if (res.data.status === "success") {
            toast.success("Student Deactivated Successfully")
            refetch()
            setItemToEdit(null)
          }
          else if (res.data.status === "error") {
            toast.error("Try again")
            refetch()
            setItemToEdit(null)
          }
          else {
            toast.error("Somthing went wrong try again")
            refetch()
            setItemToEdit(null)
          }
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemToEdit])

  return (
    <>
      <div style={{ width: "100%", overflow: "hidden", background: "#FFF" }}>
        <div className='table-responsive my-2' style={{ display: "flex", gap: "10px", borderRadius: "5px" }}>
          {
            SchoolsProgram[schoolName].map((item) => {
              return <div className={`rounded-md border p-2 cursor-pointer ${activeProgram === item[0] ? 'bg-[#bfdbfe] text-[#1e3a8a]' : 'bg-blue-100 text-[#626469]'} w-[100px] md:w-[250px] hover:shadow-md duration-200 ease-in-out md:text-base text-sm`}
                onClick={() => { setActiveProgram(item[0]) }}> <p>{item[0].length > 28
                  ? item[0].slice(0, 35) + "..."
                  : item[0]}</p>

                <div className='text-xs'>

                  <p>Total: <span className='font-semibold'>{data?.data.filter((students) => students.programGraduated === item[0])?.length}</span></p>
                </div>
              </div>
            })
          }
        </div>
      </div>
      <Table TB={filteredData} module="student" proof="student" year="programEnroledOn" propic="photoURL" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} editIcon="InActive" deleteDisabled={true} />
    </>
  )
}

export default ActiveStudent