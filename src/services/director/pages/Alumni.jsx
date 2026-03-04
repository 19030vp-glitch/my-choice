import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import SchoolsProgram from '../../../components/SchoolsProgram'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import Table from '../../../components/tableComponents/TableComponent'
import DialogBox from '../../../components/formComponents/DialogBox';
import serverLinks from '../../../js/serverLinks';
import handleAvatarChange from '../../../js/handleAvatar';
import ProfileCroper from '../../../components/ProfileCroper';
import Select from '../../../components/formComponents/Select';
import Text from '../../../components/formComponents/Text';
import Lists from '../../../components/tableComponents/Lists';
import YearSelect from '../../../components/formComponents/YearSelect';
import { useEffect } from 'react';
import editReq from '../../../components/requestComponents/editReq';
import addReq from '../../../components/requestComponents/addReq';
import AddButton from '../../student/components/AddButton';

const tableHead = { index: "Sr. no.",propic: "Profile Pic", name : "Name Of Student" ,  email: "Email Id" ,  mobile: "Mobile No.",  programCompletedOn: "completed on", Action: "Action" }
const Alumni = () => {
  const module = "ssm";
  const model = "StudentUser"

  const user = useSelector(state => state.user.directorUser)
  const schoolName = user? user.department : null

  const initialstate = { salutation: "", name: "",password: "", email: "", address: "", mobile: "", programGraduated: "", gender: "", dob: "", cast: "", country: "", religion: "", programEnroledOn: "", programCompletedOn: "", isGideListed: true,
  };

  const [avatar, setAvatar] = useState(null);
  const [PhotoURL, setPhotoURL] = useState(null);
  const [PhotoURL2, setPhotoURL2] = useState(null)
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [openCroper, setOpenCroper] = useState(false);
  const [values, setValues] = useState(initialstate);
  const { salutation, name, password, email, programGraduated, address, mobile, gender, dob, cast, country, religion, programEnroledOn, programCompletedOn, } = values;
   
  const filter =  {schoolName, isAlumni:true}
  const params = { model: model, id: "", module, filter }
  const { data, isLoading, refetch } = useQuery(`${model}i.}|"Osnlfa6EE:Z%U-x`, () => getReq(params))

  const [activeProgram, setActiveProgram] = useState(SchoolsProgram[schoolName][0][0])

  const filteredData = data?.data.filter((students) => students.programGraduated === activeProgram)

  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          const { salutation, name, programGraduated, address, mobile, gender, dob, cast, country, religion, programEnroledOn, programCompletedOn, } = item
          setEdit(true); setOpen(true);
          setValues({ salutation, name, programGraduated, address, mobile, gender, dob, cast, country, religion, programEnroledOn, programCompletedOn, })
          setPhotoURL2(item?.photoURL)
        }
      })
    }
  }, [itemToEdit])

  const onCancel = () => {
    setValues(initialstate); setPhotoURL(null); setItemToEdit(null); setEdit(false); setOpen(false)
  }
  const onSubmit = (e) => {
    e.preventDefault();
    edit ? editReq({ PhotoURL, id: itemToEdit }, model, initialstate, values, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module,) :
      addReq({ PhotoURL, schoolName }, model, initialstate, values, setValues, refetch, setOpen, setLoading, module,)
    setPhotoURL(null)
    setPhotoURL2(null)
  }
  
  return (
    <>
    <div className='my-2'>
      <AddButton onclick={setOpen} title="Manage Alumni" dataCount={data ? data?.data.length : 0} />
    </div>
    <div style={{ width: "100%", overflow: "hidden", background: "#FFF" }}>
      <div className='table-responsive my-2' style={{ display: "flex", gap: "10px", borderRadius: "5px"}}>
        {
          SchoolsProgram[schoolName].map((item) =>{
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
    
    <DialogBox title={edit?'Edit Profile':'Add Alumni'} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading} >
        {
          <div className="flex flex-wrap bg-gray-50 rounded-xl border p-2 ">
            <div className="flex-items-center justify-center flex-col w-full mb-4">
              {PhotoURL ? (
                <img alt="" src={avatar} className="h-[80px] w-[80px] sm:h-[120px] sm:w-[120px] rounded-full object-cover border-4 border-[#344e87] mx-auto" />
              ) : (
                <img alt="" src={serverLinks.showFile(PhotoURL2, "student")} className="h-[80px] w-[80px] sm:h-[120px] sm:w-[120px] rounded-full object-cover border-4 border-[#344e87] mx-auto" />
              )}
              <div className="flex items-center justify-center gap-3">
                <label
                  className=" bg-blue-100 md:mt-3 mt-1 p-1 rounded-xl text-blue-700 md:text-sm text-xs text-center cursor-pointer w-full duration-200 ease-in-out hover:bg-blue-200 hover:text-blue-800"
                  htmlFor="file"
                >
                  Choose Profile Photo
                </label>
                <input
                  type="file" name="file" id="file" accept="image/png, image/jpeg, image/jpg" className="hidden mx-auto"
                  onChange={(e) => {
                    handleAvatarChange( e, setAvatar, setPhotoURL, setOpenCroper );
                  }}
                />
                {PhotoURL && (
                  <button className="w-[20%] bg-blue-100 md:mt-3 mt-1 p-1 rounded-xl text-blue-700 md:text-sm text-xs  duration-200 ease-in-out hover:bg-blue-200 hover:text-blue-800"
                    onClick={(e) => { setPhotoURL(null); }} > Reset Picture </button>
                )}
              </div>
            </div>

            <Select className="col-md-2" id="salutation" value={salutation} label="Salutation" setState={setValues} options={Lists.studentAlumniSalutation} />
            <Text className="col-md-5" id="name" value={name} label="Full Name" setState={setValues} />
            <Text className="col-md-2" type="number" id="mobile" value={mobile} label="Mobile" setState={setValues} />
            <Select className="col-md-3" id="gender" value={gender} label="Gender" setState={setValues} options={Lists.gender} />
            <Text className="col-md-8 col-lg-8" id="address" value={address} label="Permanent Address" setState={setValues} />
            <Select className="col-md-4" id="programGraduated" value={programGraduated} label="Program Graduated" setState={setValues} options={
                schoolName ? SchoolsProgram?.[schoolName].map((item) => { return item[0]; }) : [] }
            />
            <YearSelect className="col-md-2" id="programEnroledOn" value={programEnroledOn} label="Program Enrolled in" setState={setValues} />
            <YearSelect className="col-md-2" id="programCompletedOn" value={programCompletedOn} label="Program Completed in" setState={setValues} />
            <Text className="col-md-2" type="date" id="dob" value={dob} label="Date of birth" setState={setValues} />
            <Text className="col-md-2" type="email" id="email" value={email} label="Email" setState={setValues} />
            <Text className="col-md-2" id="password" value={password} label="Password" setState={setValues} />

            <Select className="col-md-2" id="country" value={country} label="Nationality" setState={setValues} options={Lists.countrys} />
            <Select className="col-md-2" id="cast" value={cast} label="Category" setState={setValues} options={Lists.casts} />

            <Select className="col-md-2" id="religion" value={religion} label="Religion" setState={setValues} options={Lists.religions} />
          </div>
        }
      </DialogBox>
      <ProfileCroper open={openCroper} setOpen={setOpenCroper} file={PhotoURL} setFile={setPhotoURL} setAvatar={setAvatar} />
    <Table TB={filteredData} module="Alumni" proof="student" year="programCompletedOn" setItemToEdit={setItemToEdit} propic="photoURL" fatchdata={refetch} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
    </>
  )
}

export default Alumni