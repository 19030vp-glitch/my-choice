/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import DialogBox from '../../../components/formComponents/DialogBox'
import Select from '../../../components/formComponents/Select'
import Text from '../../../components/formComponents/Text'
import SchoolsProgram from '../../../components/SchoolsProgram'
import YearSelect from '../../../components/formComponents/YearSelect'
import { useSelector } from 'react-redux'
import editReq from '../../../components/requestComponents/editReq'
import getReq from '../../../components/requestComponents/getReq'
import handleAvatarChange from '../../../js/handleAvatar'
import { useQuery } from 'react-query'
import AddButton from '../../student/components/AddButton'
import Table from '../../../components/tableComponents/TableComponent'
import serverLinks from '../../../js/serverLinks'
import Axios from 'axios'
import { toast } from 'react-hot-toast'
import ProfileCroper from '../../../components/ProfileCroper'
import Lists from '../../../components/tableComponents/Lists'
import { api } from '../../../js/api'

const tableHead = { index: "Sr. no.", propic: "Profile Pic", name: "Name Of Student", email: "Email Id", mobile: "Mobile No.", programGraduated: "Enrolled Program", programEnroledOn: "Program Enroled On", Action: "Action" }

const NewStudent = () => {

  const module = "director";
  const model = "StudentUser"

  const user = useSelector(state => state.user.directorUser)
  const Salutations = ["Mr.", "Mrs.", "Miss.", "Shri", "Shrimati"]
  const genders = ["Male", "Female", "Other"]
  const Casts = ["Genral", "OBC", "SC", "SBC", "SEBC", "ST", "VJ", "NT-B", "NT-C", "NT-D"]
  const religions = ["Hindu", "muslim", "Christian", "Sikh", "Buddh", "Jain",]
  const initialState = { salutation: "", name: "", programGraduated: "", gender: "", email: "", mobile: "", abcNo: "", currentIn: '', country: "India", cast: "", religion: "", programEnroledOn: "", isCreatedByDirector: true }
  const [values, setValues] = useState(initialState)
  const { salutation, name, programGraduated, gender, mobile, email, abcNo, currentIn, country, cast, religion, programEnroledOn, } = values

  const [avatar, setAvatar] = useState(null)
  const [uploadProof, setUploadProof] = useState(null)
  const [openCroper, setOpenCroper] = useState(false)
  const [loading, setLoading] = useState(false)
  const [programDuration, setProgramDuration] = useState(null)
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [itemToEdit, setItemToEdit] = useState(null)
  const [photoURL, setPhotoURL] = useState(null)
  const schoolName = user ? user.department : null
  const filter = { schoolName, isCreatedByDirector: true, isAlumni: false }
  const params = { model: model, id: "", module, filter: filter, }
  const { data, isLoading, refetch } = useQuery([model, "5[?AjJ{6:v;Fnx~PI`l,"], () => getReq(params))


  const onSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    formData.append('file', uploadProof)
    formData.append('schoolName', user?.department)

    Axios.post(`${api}/api/auth/student-register`, formData).then(function (response) {
      if (response.data.status === 'success') {
        toast.success(response.data.message)
        setValues(initialState)
        setAvatar(null)
        setUploadProof(null)
        refetch()
        setOpen(false)
        setLoading(false)
      }
      else {
        toast.error(response.data.message)
        setValues(initialState)
        setAvatar(null)
        setUploadProof(null)
        setOpen(false)
        setLoading(false)
      }
    }).catch(function (err) {
      toast.error('Internal Server Error')
      setValues(initialState)
      setAvatar(null)
      setUploadProof(null)
      setOpen(false)
      setLoading(false)

    })
  }

  function handleEmailTaken(e) {
    console.log("funccall");
    e.preventDefault();
    // check if file is selected
    if (uploadProof) {
      setLoading(true)
      // check if username already exists
      Axios.post(`${api}/service/student-checkAndEmail`, { email }).then(function (res) {
        if (res.data.status === 'taken') {
          toast.error(res.data.message)
          setLoading(false)
          return
        }
        else {
          onSubmit(e)
        }
      })
    } else {
      setLoading(false)
      toast.error('Please select a photo')
      return
    }
  }

  const onEdit = (e) => {
    e.preventDefault();
    editReq({ id: itemToEdit, uploadProof }, "", initialState, values, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, 'student')
  }
  const onCancel = (event) => {
    setValues(initialState)
    setAvatar(null)
    setUploadProof(null)

  }

  useEffect(() => {
    if (programGraduated) {
      SchoolsProgram[schoolName].forEach((programs) => {
        if (programs[0] === programGraduated) {
          setProgramDuration(Array.from({ length: programs[1] }, (v, i) => `${i + 1}${getOrdinalSuffix(i + 1)}`))
        }
      })
    }
  }, [programGraduated])

  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          setEdit(true); setOpen(true);
          setPhotoURL(item.photoURL)
          const { salutation, name, programGraduated, gender, mobile, email, abcNo, currentIn, country, cast, religion, programEnroledOn, } = item
          setValues({
            salutation, name, programGraduated, gender, mobile, email, abcNo, currentIn, country, cast, religion, programEnroledOn,
          })
        }
      })
    }
  }, [itemToEdit])
  return (
    <>
      <div className='py-2'>
        <AddButton onclick={setOpen} title="Add New Studnet" dataCount={data ? data?.data.length : 0} />
      </div>
      {/* <div><button className='btn btn-success' onClick={()=>{setOpen(true)}}>add</button></div> */}
      <DialogBox title="Add new Student" buttonName="submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={!edit ? handleEmailTaken : onEdit} onCancel={onCancel} maxWidth="lg" loading={loading}>

        <div className='flex flex-wrap'>

          <div className='flex-items-center justify-center flex-col w-full mb-4'>
            {
              uploadProof == null && edit ?
                <img alt='photo1' src={serverLinks.showFile(photoURL, 'student')} className='h-[80px] w-[80px] sm:h-[120px] sm:w-[120px] rounded-full object-cover border-4 border-[#344e87] mx-auto' /> :
                <img alt='photo2' src={avatar} className='h-[80px] w-[80px] sm:h-[120px] sm:w-[120px] rounded-full object-cover border-4 border-[#344e87] mx-auto' />
            }
            <div className='flex items-center justify-center gap-3'>
              <label className=' bg-blue-100 mt-3 p-1 rounded-xl text-blue-700 text-sm text-center cursor-pointer w-full duration-200 ease-in-out hover:bg-blue-200 hover:text-blue-800' htmlFor='file'>Choose Profile Photo</label>
              <input type="file" name="file" id="file" accept="image/png, image/jpeg, image/jpg" className='hidden mx-auto' onChange={(e) => {
                handleAvatarChange(e, setAvatar, setUploadProof, setOpenCroper)
              }} />
              {
                uploadProof && <button className='w-[20%] bg-blue-100 mt-3 p-1 rounded-xl text-blue-700 text-sm  duration-200 ease-in-out hover:bg-blue-200 hover:text-blue-800' onClick={(e) => { setUploadProof(null); }}>Reset Picture</button>
              }
            </div>
          </div>

          <Select className="col-md-2" id="salutation" value={salutation} label="Salutation" setState={setValues} options={Salutations} />

          <Text className="col-md-10" id="name" value={name} setState={setValues} label="Full Name" />

          <Select className='col-md-5' id="programGraduated" value={programGraduated} label="Enrolled Program" setState={setValues} options={schoolName ? SchoolsProgram[schoolName].map(item => { return item[0] }) : []} />

          <Select className="col-md-3" id="currentIn" value={currentIn} label="Admitted In" setState={setValues} options={programDuration ? programDuration : []} />

          <YearSelect className="col-md-4" id="programEnroledOn" value={programEnroledOn} label="Program Enroled On" setState={setValues} />

          <Select className="col-md-3" id="gender" value={gender} label="Gender" setState={setValues} options={genders} />

          <Select className='col-md-3' id='country' value={country} label="Nationality" setState={setValues} options={Lists.countrys} />

          <Select className='col-md-3' id='religion' value={religion} label="Religion" setState={setValues} options={religions} />

          <Select className='col-md-3' id='cast' value={cast} label="Cast" setState={setValues} options={Casts} />

          <Text className="col-md-4" id="mobile" value={mobile} setState={setValues} label="Mobile Number" type='number' />

          <Text className="col-md-4" id="abcNo" value={abcNo} setState={setValues} label="ABC No." type='number' />

          <Text className="col-md-4" id="email" value={email} setState={setValues} label="Email" type='email' />

        </div>
      </DialogBox>
      <ProfileCroper open={openCroper} setOpen={setOpenCroper} file={uploadProof} setFile={setUploadProof} setAvatar={setAvatar} />
      <Table TB={data?.data} module="student" proof="student" year="programEnroledOn" propic="photoURL" fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
    </>
  )
}

function getOrdinalSuffix(number) {
  const j = number % 10,
    k = number % 100;
  if (j === 1 && k !== 11) {
    return 'st Year';
  }
  if (j === 2 && k !== 12) {
    return 'nd Year';
  }
  if (j === 3 && k !== 13) {
    return 'rd Year';
  }
  return 'th Year';
}

export default NewStudent
export { getOrdinalSuffix }