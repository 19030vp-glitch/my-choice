import React, { useEffect } from 'react'
import { Switch } from 'antd'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Skeleton from '@mui/material/Skeleton';
import { api } from '../../../js/api'

const AdminMore = () => {
  const [regToggle, setRegToggle] = useState(null)
  const [switchLoading, setSwitchLoading] = useState(false)

  const regToggleItems = [
    { Title: 'Student Registration', name: 'isStudentRegistration' },
    { Title: 'Faculty Registration', name: 'isFacultyRegistration' },
    { Title: 'Alumni Registration', name: 'isAlumniRegistration' },
  ]

  useEffect(() => {
    async function fetchData() {
      const response = await axios.post(`${api}/Registration/pageStatus`)
      setRegToggle(response.data);
    }
    fetchData();
  }, [])

  const handleToggle = async (name) => {
    const newState = {
      name,
      state: !regToggle[name],
    };
    axios.post(`${api}/Registration/pageToggler`, newState)
      .then((res) => {
        setRegToggle(res.data)
        setSwitchLoading(false);
        toast.success("Registration page updated successfully");
      })
  }

  return (
    <div className='sub-main'>
      <div className='text-lg font-semibold p-2'>Registration Page Enable / Disable</div>
      <div className='flex flex-col gap-2 w-full bg-[#f1f3f4] rounded-md p-3'>
        {
          regToggleItems.map((item) => {
            const { name, Title } = item
            return regToggle != null ? <div className='flex justify-between py-2 border-b'><p className='text-base'>{Title}</p>
              <Switch style={{ background: "#ae7e28" }} checkedChildren="on" unCheckedChildren="off" onChange={() => { handleToggle(name); setSwitchLoading(true) }} checked={regToggle[name]} loading={switchLoading} />
            </div> : <Skeleton height={50} />
          })
        }
      </div>

      <div className='text-lg font-semibold p-2 mt-3'>Developers Options</div>
      <div className='flex-col gap-2 w-full bg-[#f1f3f4] rounded-md p-3'>
        <div className='w-full text-sm pl-1 pb-3 text-[#b51a1a]'>Note:- It is not recommended to use the following options manually.</div>

        <MoreButtons title="Clear all temparary Pdfs in software" btnlabel="Clear Pdfs" path="developer/pdfsclear" extraClass="btn-outline-danger" />
        <MoreButtons title="Clear all temparary Excels in software" btnlabel="Clear Excels" path="developer/excelsclear" extraClass="btn-outline-danger" />
        <MoreButtons title="Take database backup on server" btnlabel="Take Backup" path="developer/mongodump" extraClass="btn-success" />
        <MoreButtons title="Function Testing Button for Developer only*" btnlabel="Test Function" path="developer/backendTestFun" extraClass="btn-outline-warning" />
        
      </div>
    </div>
  )
}

export default AdminMore

const MoreButtons = ({path, title, btnlabel, extraClass}) => {
  return <div className='flex justify-between py-2 border-b'>
  <p className='text-base'>{title}</p><button className={`btn ${extraClass}`} style={{ width: "130px" }} onClick={() => { axios.post(`${api}/${path}`) }}>{btnlabel}</button>
</div>
}