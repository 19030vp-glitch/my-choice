import React, { useEffect, useState } from 'react'
// import MultiSelectWithLimit from '../../../components/formComponents/MultiSelectWithLimit'
import DialogBox from '../../../components/formComponents/DialogBox'
import Text from '../../../components/formComponents/Text'
import AddButton from '../../director/components/UtilityComponents/AddButton'
import Table from '../../../components/tableComponents/TableComponent'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import editReq from '../../../components/requestComponents/editReq'
import addReq from '../../../components/requestComponents/addReq'
import BulkExcel from '../../../components/BulkExcel'
import YearSelect from '../../../components/formComponents/YearSelect'
import ProfileCroper from '../../../components/ProfileCroper'
import serverLinks from '../../../js/serverLinks'
import handleAvatarChange from '../../../js/handleAvatar'
import Select from '../../../components/formComponents/Select'
import Lists from '../../../components/tableComponents/Lists'
import { deleteStudent } from '../js/competitionHandler'


const tableHead = { index: "क्रमांक", propic: "परिचय चित्र", ParticpantName: "स्पर्धकाचे नाव ", permentAddress: "कायमचा पत्ता", mobileNo: "भ्रमणध्वनी क्रमांक", gender: "लिंग", dob: "जन्म दिनांक", age: "१ जुलै २०२३ रोजी स्पर्धकांचे वय", bloodGroup: "रक्त गट", academicYear: "शैक्षणिक वर्ष", Action: "क्रिया" }

const YfStudents = ({ user, filterByAcademicYear }) => {
  const model = 'YfStudents'
  const module = 'youth';
  const title = "युवक महोत्सवात सहभाग - स्पर्धक योग्यता"

  let filter = { college: user?._id }
  if (filterByAcademicYear) {
    filter.academicYear = filterByAcademicYear
  }
  const params = { model, id: '', module, filter }
  const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))

  const initialstate = {
    nameOfCollege: "", ParticpantName: "", permentAddress: "", mobileNo: "", gender: "", dob: "", age: "", bloodGroup: "", namesOfCompetition: [], academicYear: filterByAcademicYear ? filterByAcademicYear : "",
  }
  const [values, setValues] = useState(initialstate)
  const { nameOfCollege, ParticpantName, permentAddress, mobileNo, gender, dob, age, bloodGroup, academicYear, } = values
  const [open, setOpen] = useState(false)
  const [excelOpen, setExcelOpen] = useState(false)

  //---------------edit state-------------------
  const [avatar, setAvatar] = useState(null)
  const [PhotoURL, setPhotoURL] = useState(null)
  const [PhotoURL2, setPhotoURL2] = useState(null)
  const [itemToEdit, setItemToEdit] = useState(null)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [openCroper, setOpenCroper] = useState(false)


  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          const { nameOfCollege, ParticpantName, permentAddress, mobileNo, gender, dob, age, bloodGroup, academicYear, } = item
          setEdit(true); setOpen(true);
          setValues({ nameOfCollege, ParticpantName, permentAddress, mobileNo, gender, dob, age, bloodGroup, academicYear, })
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
      addReq({ PhotoURL, college: user._id }, model, initialstate, values, setValues, refetch, setOpen, setLoading, module,)
    setPhotoURL(null)
    setPhotoURL2(null)
  }

  useEffect(() => {
    let age = calculateAge(dob, "2023-07-01")
    setValues((pri) => {
      return {
        ...pri, age
      }
    })
  }, [dob])


  return (
    <>
      <AddButton title={title} dataCount={data ? data?.data.length : 0} onclick={setOpen} exceldialog={setExcelOpen} customName={title} filterByAcademicYear={true} />
      <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
        <div className='flex flex-wrap'>
          <div className='flex-items-center justify-center flex-col w-full mb-4'>
            {
              PhotoURL ?
                <img alt='' src={avatar} className='h-[80px] w-[80px] sm:h-[120px] sm:w-[120px] rounded-full object-cover border-4 border-[#344e87] mx-auto' /> :
                <img alt='' src={serverLinks.showFile(PhotoURL2, 'youth')} className='h-[80px] w-[80px] sm:h-[120px] sm:w-[120px] rounded-full object-cover border-4 border-[#344e87] mx-auto' />
            }
            <div className='flex items-center justify-center gap-3'>
              <label className=' bg-blue-100 md:mt-3 mt-1 p-1 rounded-xl text-blue-700 md:text-sm text-xs text-center cursor-pointer w-full duration-200 ease-in-out hover:bg-blue-200 hover:text-blue-800' htmlFor='file'>Choose Profile Photo</label>
              <input type="file" name="file" id="file" accept="image/png, image/jpeg, image/jpg" className='hidden mx-auto' onChange={(e) => {
                handleAvatarChange(e, setAvatar, setPhotoURL, setOpenCroper)
              }} required={!edit} />
              {
                PhotoURL && <button className='w-[20%] bg-blue-100 md:mt-3 mt-1 p-1 rounded-xl text-blue-700 md:text-sm text-xs  duration-200 ease-in-out hover:bg-blue-200 hover:text-blue-800' onClick={(e) => { setPhotoURL(null); }}>Reset Picture</button>
              }
            </div>
          </div>

          <Text className='col-md-6 col-lg-4' id="ParticpantName" value={ParticpantName} label={tableHead.ParticpantName} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="permentAddress" value={permentAddress} label={tableHead.permentAddress} setState={setValues} />
          <Text className='col-md-6 col-lg-4' type="number" id="mobileNo" value={mobileNo} label={tableHead.mobileNo} setState={setValues} />
          <Select className="col-md-3" id="gender" value={gender} label={tableHead.gender} setState={setValues} options={Lists.gender} />
          <Text className='col-md-6 col-lg-4' type='date' id="dob" value={dob} label={tableHead.dob} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="age" value={age} label={tableHead.age} setState={setValues} desable={true} />
          <Select className='col-md-6 col-lg-4' id="bloodGroup" value={bloodGroup} label={tableHead.bloodGroup} setState={setValues} options={Lists.bloodGr} />
          {!filterByAcademicYear && <YearSelect className='col-md-6 col-lg-4' id="academicYear" value={academicYear} label={tableHead.academicYear} setState={setValues} />}
        </div>
      </DialogBox>

      <ProfileCroper open={openCroper} setOpen={setOpenCroper} file={PhotoURL} setFile={setPhotoURL} setAvatar={setAvatar} />

      <BulkExcel data={data?.data} sampleFile="युवक महोत्सवात सहभाग - स्पर्धक योग्यता" title={title} SendReq={model} refetch={refetch} module={module} department={title} open={excelOpen} setOpen={setExcelOpen} />

      <Table TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} propic="photoURL" customDelete={deleteStudent} />
    </>
  )

}

// note:-  input date and end date must be yyyy-mm-dd format
function calculateAge(inputDate, endDate = new Date()) {
  const parts = inputDate.split('-');
  const inputYear = parseInt(parts[0], 10);
  const inputMonth = parseInt(parts[1], 10) - 1;
  const inputDay = parseInt(parts[2], 10);

  const currentDate = new Date(endDate);
  const birthDate = new Date(inputYear, inputMonth, inputDay);

  let ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
  let ageInMonths = currentDate.getMonth() - birthDate.getMonth();
  let ageInDays = currentDate.getDate() - birthDate.getDate();

  if (ageInDays < 0) {
    ageInMonths--;
    ageInDays += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  }
  if (ageInMonths < 0) {
    ageInYears--;
    ageInMonths += 12;
  }

  return `${ageInYears} Years ${ageInMonths} Months ${ageInDays} Days`;
}

export default YfStudents
export { calculateAge }
