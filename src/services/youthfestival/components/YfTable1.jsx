import React, { useEffect, useState } from 'react'
import MultiSelectWithLimit from '../../../components/formComponents/MultiSelectWithLimit'
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


const tableHead = { index: "क्रमांक", propic: "परिचय चित्र", partnerType: "निवडा प्रशिक्षक / वादक / साथीदार", partnerName: "प्रशिक्षक / वादक / साथीदार पूर्ण नाव", permentAddress: "कायमचा पत्ता", mobileNo: "भ्रमणध्वनी क्रमांक", gender: "लिंग", dob: "जन्म दिनांक", bloodGroup: "रक्त गट", namesOfCompetition: "मार्गदर्शन करत असलेल्या किंवा साथीदार / वादक  म्हणून भाग घेत असलेल्या स्पर्धेचे नाव", academicYear: "शैक्षणिक वर्ष", Action: "क्रिया" }

const YfTable1 = ({ user, filterByAcademicYear }) => {
  const model = 'YfTable1'
  const module = 'youth';
  const title = "युवक महोत्सवात सहभागी प्रशिक्षक / वादक / साथीदार"

  let filter = { academicYear: filterByAcademicYear, college: user?._id }

  const params = { model, id: '', module, filter }
  const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))

  const initialstate = {
    nameOfCollege: "", partnerType: "", partnerName: "", permentAddress: "", gender: "", mobileNo: "", dob: "", bloodGroup: "", namesOfCompetition: [], academicYear: filterByAcademicYear ? filterByAcademicYear : "",
  }
  const [values, setValues] = useState(initialstate)
  const { partnerType, partnerName, permentAddress, mobileNo, gender, dob, bloodGroup, academicYear, } = values
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
  const [values2, setValues2] = useState([])

  const { namesOfCompetition } = values2

  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          const { nameOfCollege, partnerName, partnerType, permentAddress, mobileNo, gender, dob, bloodGroup, academicYear, namesOfCompetition, } = item
          setEdit(true); setOpen(true);
          setValues({ nameOfCollege, partnerName, partnerType, permentAddress, mobileNo, dob, gender, bloodGroup, academicYear, })
          setValues2({ namesOfCompetition: namesOfCompetition.filter((item) => item !== "") })
          setPhotoURL2(item?.photoURL)

        }
      })
    }
  }, [itemToEdit])

  const onCancel = () => {
    setValues(initialstate); setItemToEdit(null); setValues2([]); setPhotoURL(null); setEdit(false); setOpen(false)
  }
  const onSubmit = (e) => {
    e.preventDefault();
    edit ? editReq({ PhotoURL, id: itemToEdit }, model, initialstate, values, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module, { namesOfCompetition }) :
      addReq({ PhotoURL, college: user._id }, model, initialstate, values, setValues, refetch, setOpen, setLoading, module, { namesOfCompetition })
    setPhotoURL2(null);
    setValues2([]); setPhotoURL(null);
  }

  return (
    <>
      {/* nameOfCollege, partnerName, permentAddress, mobileNo, dob, bloodGroup, academicYear, */}
      <AddButton title={title} dataCount={data ? data?.data.length : 0} onclick={setOpen} exceldialog={setExcelOpen} customName={title} filterByAcademicYear={true}  />
      <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg">
        <div className='flex flex-wrap' loading={Loading} >


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
              }} />
              {
                PhotoURL && <button className='w-[20%] bg-blue-100 md:mt-3 mt-1 p-1 rounded-xl text-blue-700 md:text-sm text-xs  duration-200 ease-in-out hover:bg-blue-200 hover:text-blue-800' onClick={(e) => { setPhotoURL(null); }}>Reset Picture</button>
              }
            </div>
          </div>


          <Select className="col-md-3" id="partnerType" value={partnerType} label={tableHead.partnerType} setState={setValues} options={["प्रशिक्षक", "वादक", "साथीदार"]} />
          <Text className='col-md-6 col-lg-4' id="partnerName" value={partnerName} label={tableHead.partnerName} setState={setValues} />
          <MultiSelectWithLimit className='col-md-6 col-lg-4' id="namesOfCompetition" label={tableHead.namesOfCompetition} setState={setValues2} value={namesOfCompetition} options={[{ value: "शास्त्रीय गायन" }, { value: "शास्त्रीय तालवाद्य" }, { value: "शास्त्रीय सुरवाद्य" }, { value: "सुगम गायन - भारतीय" }, { value: "सुगम गायन - पाश्चात्य" }, { value: "समुह गायन - भारतीय" }, { value: "समुह गायन - पाश्चात्य" }, { value: "कव्वाली" }, { value: "फोक  ऑर्केस्ट्रा  (लोक संगीत)" }, { value: "लोकनृत्य / आदिवासी नृत्य" }, { value: "शास्त्रीय नृत्य" }, { value: "एकांकिका" }, { value: "विडंबन अभिनय" }, { value: "मूक अभिनय" }, { value: "नक्कल" }, { value: "वादविवाद" }, { value: "वक्तृत्व" }, { value: "चित्रकला" }, { value: "कोलाज" }, { value: "पोस्टर पेंटिंग" }, { value: "मृदमूर्तिकला" }, { value: "व्यंग्यचित्रकाला" }, { value: "रांगोळी" }, { value: "स्थळ छायाचित्रण" }, { value: "कलात्मक जुळवणी (इंस्टॉलेशन)" }, { value: "पोवाडा" }, { value: "लावणी" }, { value: "जलसा" },]} limit={4} />
          <Text className='col-md-6 col-lg-4' id="permentAddress" value={permentAddress} label={tableHead.permentAddress} setState={setValues} />
          <Text className='col-md-6 col-lg-4' type="number" id="mobileNo" value={mobileNo} label={tableHead.mobileNo} setState={setValues} />
          <Select className="col-md-3" id="gender" value={gender} label={tableHead.gender} setState={setValues} options={["Male", "Female", "Other"]} />
          <Text className='col-md-6 col-lg-4' type='date' id="dob" value={dob} label={tableHead.dob} setState={setValues} />
          <Select className='col-md-6 col-lg-4' id="bloodGroup" value={bloodGroup} label={tableHead.bloodGroup} setState={setValues} options={Lists.bloodGr} />
          {!filterByAcademicYear && <YearSelect className='col-md-6 col-lg-4' id="academicYear" value={academicYear} label={tableHead.academicYear} setState={setValues} />}
        </div>
      </DialogBox>

      <ProfileCroper open={openCroper} setOpen={setOpenCroper} file={PhotoURL} setFile={setPhotoURL} setAvatar={setAvatar} />

      <BulkExcel data={data?.data} sampleFile="युवक महोत्सवात सहभागी प्रशिक्षक / वादक / साथीदार" title={title} SendReq={model} refetch={refetch} module={module} department={title} open={excelOpen} setOpen={setExcelOpen} />

      <Table TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} propic="photoURL" />
    </>
  )

}

export default YfTable1