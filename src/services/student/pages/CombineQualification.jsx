import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DialogBox from '../../../components/formComponents/DialogBox'
import Text from '../../../components/formComponents/Text'
import YearSelect from '../../../components/formComponents/YearSelect'
import UploadFile from '../../../components/formComponents/UploadFile'
import AddButton from '../components/AddButton'
import Table from '../../../components/tableComponents/TableComponent'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import editReq from '../../../components/requestComponents/editReq'
import addReq from '../../../components/requestComponents/addReq'
import Select from '../../../components/formComponents/Select'
// import { Switch } from 'antd'
import SchoolsProgram from '../../../components/SchoolsProgram'


const tableHead = { index: "Sr. no.", ProgramType: "Program Type", InstitutionBoard: "Institute / Board", Persentage: "Percentage", StartYear: "Started On", Year: "Completed on", Upload_Proof: "Uploaded Proof", Action: "Action" }

const CombineQualification = () => {
  const model = 'StudentQualification'
  const module = 'student'
  const ProgramTypes = ["SSC", "HSC", "UG", "PG", "M.Phil.", "Ph.D."]

  const isAlumniLink = window.location.pathname.includes('alumni')

  const user = useSelector(state => isAlumniLink ? state.user.alumniUser : state.user.studentUser)
  const filter = { userId: user?._id }
  const params = { model, id: "", module, filter }
  const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params))

  const initialstate = { Program: '', InstitutionBoard: '', Persentage: '', StartYear: '', Year: '', ProgramType: '', Upload_Proof: '', isStudied: false, school: '' }
  const [values, setValues] = useState(initialstate)
  const { Program, InstitutionBoard, Persentage, StartYear, Year, ProgramType, isStudied, school } = values
  const [open, setOpen] = useState(false)

  //---------------edit state-------------------
  const [itemToEdit, setItemToEdit] = useState(null)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          const { Program, InstitutionBoard, Persentage, StartYear, Year, ProgramType, isStudied, school } = item
          setEdit(true); setOpen(true);
          setValues({ Program, InstitutionBoard, Persentage, StartYear, Year, ProgramType, isStudied, school })
        }
      })
    }
  }, [itemToEdit])

  const onCancel = () => {
    setValues(initialstate); setItemToEdit(null); setEdit(false); setOpen(false)
  }
  const onSubmit = (e) => {
    e.preventDefault();
    edit ? editReq({ id: itemToEdit }, model, initialstate, values, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module) :
      addReq({ userId: user?._id, }, model, initialstate, values, setValues, refetch, setOpen, setLoading, module)
  }

  return (
    <>
      <AddButton onclick={setOpen} title="Your Qualifications" dataCount={data ? data?.data.length : 0} />
      <DialogBox title={`${edit ? "Edit" : "Add"} Qualification`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading} >
        <div className='flex flex-wrap'>
          <div className={`col-12 p-1 col-md-6 col-lg-4 text-sm md:text-base`}>
            <label htmlFor="choose" className="form-label" >Exam / Program Type</label>
            <select className="form-select" id="choose" required
              onChange={(e) => {
                setValues((pri) => {
                  return {
                    ...pri,
                    ProgramType: e.target.value, isStudied: false, school: "", Program: "", InstitutionBoard: ["UG", "PG", "M.Phil.", "Ph.D."].includes(e.target.value) ? "Swami Ramanand Teerth Marathwada University, Nanded" : ""
                  }
                })
              }
              } value={ProgramType}>
              <option selected disabled value="">Choose</option>
              {
                ProgramTypes?.map((e) => {
                  return <option value={e} >{e}</option>
                })
              }
            </select>
          </div>
          {
            <div className='col-12 col-md-6 col-lg-4 border rounded-md mt-[35px] mb-[10px]'>
              <div className="form-check form-switch py-[0.20rem] mt-[0.28rem] ml-2">
                <input className="form-check-input" checked={isStudied} onChange={() => { setValues((pri) => { return { ...pri, 'isStudied': !pri.isStudied, school: "", Program: "", InstitutionBoard: "Swami Ramanand Teerth Marathwada University, Nanded" } }) }} type="checkbox" role="switch" id="checkbox" disabled={!["UG", "PG", "M.Phil.", "Ph.D."].includes(ProgramType)} />
                <label className="form-check-label" htmlFor="checkbox">Completed from University Campus?</label>
              </div>
            </div>
          }
          {
            isStudied?<Select className='col-md-6 col-lg-4' id="school" value={school} label="School Name" setState={setValues} options={ProgramType === "UG" ? ["School of Fine and Performing Arts", "School of Pharmacy", "School of Technology, Sub-Campus, Latur"] : Object.keys(SchoolsProgram)} />:<Text className='col-md-6 col-lg-4' id="school" value={school} label="School Name" setState={setValues} /> 
          }
          {
            isStudied?<Select className='col-md-6 col-lg-4' id="Program" value={Program} label="Program Name" setState={setValues} options={ProgramType === "UG" && school === "School of Fine and Performing Arts" ? ["Bachalor in Performing Arts"] : ProgramType === "UG" && school === "School of Pharmacy" ? ["B.Pharm"] : ProgramType === "UG" && school === "School of Technology, Sub-Campus, Latur" ? ["B.Voc.(Software Development)"] : SchoolsProgram[school] ? SchoolsProgram[school].map(item => { return item[0] }) : []} desable={!isStudied} />: <Text className='col-md-6 col-lg-4' id="Program" value={Program} label="Program Name" setState={setValues} />
          }

          <Text className='col-md-6 col-lg-4' id="InstitutionBoard" value={InstitutionBoard} label="Institute / Board" setState={setValues} desable={isStudied} />
          <Text className='col-md-6 col-lg-4' id="Persentage" value={Persentage} type='number' label="Percentage" setState={setValues} />
          <YearSelect className='col-md-6 col-lg-4' id="StartYear" value={StartYear} label="Started On" setState={setValues} />
          <YearSelect className='col-md-6 col-lg-4' id="Year" value={Year} label="Completed On" setState={setValues} />
          <UploadFile className='col-md-6 col-lg-4' id="Upload_Proof" label="Upload Proof" setState={setValues} required={!edit} />
        </div>
      </DialogBox>
      <Table TB={data?.data} module={module} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} year={'Year'} />
    </>
  )
}

export default CombineQualification
