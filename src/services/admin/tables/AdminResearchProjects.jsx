import React, { useEffect, useState } from 'react'
import DialogBox from '../../../components/formComponents/DialogBox'
import Text from '../../../components/formComponents/Text'
import Select from '../../../components/formComponents/Select'
import YearSelect from '../../../components/formComponents/YearSelect'
import UploadFile from '../../../components/formComponents/UploadFile'
import AddButton from '../../director/components/UtilityComponents/AddButton'
import Table from '../../../components/tableComponents/TableComponent'
import editReq from '../../../components/requestComponents/editReq'
import addReq from '../../../components/requestComponents/addReq'
import Lists from '../../../components/tableComponents/Lists'
import FromToDate from '../../../inputs/FromToDate'
import SchoolsProgram from '../../../components/SchoolsProgram'
import { fetchFacutys } from '../../student/pages/StudentHome'
import BulkExcel from '../../../components/BulkExcel'
import useFetchData from '../../../hooks/useFetchData'

const tableHead = { index: 'Sr.No.', schoolName: 'School', schemeName: 'Scheme / Project Title', principalName: 'Principal Invigilator', coInvestigator: 'Co-Invigilator', fundingName: 'Funding Agency', isGov: 'Govt. / Non-Govt.', awardYear: 'Award Year', providedFunds: 'Funds (INR)', fundType: 'Major / Minor', status: 'Project Status', duration: 'Project Duration', year: 'Academic Year', Proof: 'Upload Proof', Action: "Action" }

const AdminResearchProjects = () => {
  const model = 'ResearchProject'
  const module = 'main'
  const title = 'Research Projects'
  const getproof = "proof"
  const serviceName = "faculty"

  const filter = { otherUser: "Admin" }

  const [data, setData] = useState([])
  const { data: serverData, isLoading, refetch } = useFetchData(model, module, filter, true, setData)

  const initialstate = { principalName: '', schoolName: '', otherSchool: '', guideName: '', otherGuide: '', schemeName: '', isCo: false, coInvestigator: '-', fundingName: '', isGov: '', awardYear: '', providedFunds: '', fundType: '', status: '', duration: '', durationYears: '', year: '', Proof: '' }
  const [values, setValues] = useState(initialstate)
  const { principalName, schoolName, otherSchool, guideName, otherGuide, schemeName, isCo, coInvestigator, fundingName, isGov, awardYear, providedFunds, fundType, status, year } = values
  const [open, setOpen] = useState(false)
  const [excelOpen, setExcelOpen] = useState(false)
  const [fromDate, setFromDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [active, setActive] = useState(false)
  const [editItem, setEditItem] = useState(null)

  //---------------edit state-------------------
  const [itemToEdit, setItemToEdit] = useState(null)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [guides, setGuides] = useState([]);
  const schools = Object.keys(SchoolsProgram)

  const typeObject = {

  }

  useEffect(() => {
    if (schoolName !== "Other") {
      fetchFacutys({ model: "User", id: "", module, filter: { department: schoolName, salutation: "Dr." }, }, null, setGuides);
    }
  }, [schoolName]);

  useEffect(() => {
    if (itemToEdit && data.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          setEditItem(item)
          const { schoolName, guideName, principalName, schemeName, isCo, coInvestigator, fundingName, isGov, awardYear, providedFunds, fundType, status, duration, year } = item
          setEdit(true); setOpen(true);
          setValues({ schoolName, guideName, principalName, schemeName, isCo, coInvestigator, fundingName, isGov, awardYear, providedFunds, fundType, status, duration, year })
          let fromto = item.durationYears?.[0].split(',')
          console.log(fromto);
          setFromDate(fromto[0])
          setEndDate(fromto[1])
          // if (item.durationYears?.[0]?.includes(',') || item.durationYears?.[0]?.length > 7) {
          //   setValues((pri) => {
          //     return { ...pri, durationYears: [] }
          //   })
          //   setFromDate(() => null)

          // } else {
          //   setValues((pri) => {
          //     return { ...pri, durationYears: item.durationYears }
          //   })
          //   setFromDate(() => item.durationYears[0] || null)
          // }
          setActive(item.active === undefined ? false : item.active)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemToEdit])

  useEffect(() => {
    if (edit === true) {
      data?.data?.forEach(function (item) {
        if (item._id === itemToEdit) {
          setValues((pri) => {
            return {
              ...pri, coInvestigator: isCo ? item.coInvestigator : "-"
            }
          })
        }
      })
    } else {
      setValues((pri) => {
        return {
          ...pri, coInvestigator: isCo ? "" : "-"
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCo, edit])

  useEffect(() => {
    setValues((pri) => {
      return {
        ...pri, duration: active ? `${fromDate} to Till Date` : `${fromDate} to ${endDate}`, durationYears: [fromDate, endDate]
      }
    })
  }, [fromDate, endDate, active])


  const onCancel = () => {
    setValues(initialstate); setItemToEdit(null); setFromDate(null); setEndDate(null); setActive(false); setEditItem(null); setEdit(false); setOpen(false)
  }
  const onSubmit = (e) => {
    e.preventDefault();
    edit ? editReq({ getproof, folder: serviceName, id: itemToEdit, otherUser: "Admin" }, model, initialstate, { ...values, guideName: guideName === "Other" ? otherGuide : guideName, schoolName: schoolName === "Other" ? otherSchool : schoolName }, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module) :
      addReq({ getproof, folder: serviceName, active, otherUser: "Admin" }, model, initialstate, { ...values, guideName: guideName === "Other" ? otherGuide : guideName, schoolName: schoolName === "Other" ? otherSchool : schoolName }, setValues, refetch, setOpen, setLoading, module)
    setFromDate(null); setEndDate(null); setActive(false); setEditItem(null);
  }

  return (
    <>
      <AddButton serverData={serverData} setData={setData} getproof={getproof} model={model} module={module} title={title} filter={filter} year={year} serviceName={serviceName} customName={title} onclick={setOpen} exceldialog={setExcelOpen} customTitle={title} dataCount={data ? data?.data?.length : 0} tableHead={tableHead} />

      <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading} >
        <div className='flex flex-wrap'>
          <Select options={schools
            ? [
              ...new Set([...schools, schoolName || '', "Other"]),
            ].filter((item) => item !== "")
            : []
          } className='col-md-6 col-lg-4' id="schoolName" value={schoolName} label="School / Research Center Name" setState={setValues} />
          {
            schoolName === "Other" && <><Text className='col-md-6 col-lg-4' id="otherSchool" value={otherSchool} label="Name of School / Research Center" setState={setValues} /> <Text className='col-md-6 col-lg-4' id="guideName" value={guideName} label="Guide Name" setState={setValues} /></>
          }
          {
            schoolName !== "Other" && <Select options={guides
              ? [
                ...new Set([...guides, guideName || '', "Other"]),
              ].filter((item) => item !== "")
              : []
            } className='col-md-6 col-lg-4' id="guideName" value={guideName} label="Guide Name" setState={setValues} />
          }
          {
            guideName === "Other" && <Text className='col-md-6 col-lg-4' id="otherGuide" value={otherGuide} label="Name of Guide" setState={setValues} />
          }
          <Text className='col-md-6 col-lg-4' id="schemeName" value={schemeName} label={tableHead.schemeName} setState={setValues} />
          <Text className='col-md-6 col-lg-4' id="principalName" value={principalName} label={tableHead.principalName} setState={setValues} />
          <div className='col-md-4 border rounded-md mt-5'>
            <div className="form-check form-switch py-[0.20rem] mt-[0.28rem]">
              <input className="form-check-input" checked={isCo} onChange={(e) => {
                setValues((pri) => {
                  return {
                    ...pri, isCo: e.target.checked
                  }
                })
              }} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
              <label className="form-check-label" for="flexSwitchCheckDefault">Is this Project have a Co-Invigilator?</label>
            </div>
          </div>
          <Text className='col-md-6 col-lg-4' id="coInvestigator" value={coInvestigator} label={tableHead.coInvestigator} setState={setValues} desable={!isCo} />
          <Text className='col-md-6 col-lg-4' id="fundingName" value={fundingName} label={tableHead.fundingName} setState={setValues} />

          <Select className='col-md-6 col-lg-4' id="isGov" value={isGov} label={tableHead.isGov} setState={setValues} options={Lists.reserchProjectIsGov} />
          <Text className='col-md-6 col-lg-4' type='number' id="awardYear" value={awardYear} label={tableHead.awardYear} setState={setValues} />
          <Text className='col-md-6 col-lg-4' type='number' id="providedFunds" value={providedFunds} label={tableHead.providedFunds} setState={setValues} />
          <div className="col-md-4">
            <label htmlFor="fundType" className="form-label">Wheather Major / Minor</label>
            <select className="form-select" id="fundType" required value={fundType} onChange={(e) => {
              setValues((pri) => {
                return {
                  ...pri, fundType: e.target.value
                }
              })
            }}>
              <option selected disabled value="">Choose</option>
              <option value="Major">Major (More than 10 Lacks)</option>
              <option value="Minor">Minor (Less than 10 Lacks)</option>
            </select>
          </div>

          <YearSelect className='col-md-6 col-lg-4' id="year" value={year} label={tableHead.year} setState={setValues} />
          <Select className='col-md-6 col-lg-4' id="status" value={status} label={tableHead.status} setState={setValues} options={Lists.reserchProjectStatus} />
          <FromToDate activeTitle="Is the project still in progress?" fromDate={fromDate} setFromDate={setFromDate} endDate={endDate} setEndDate={setEndDate} setActive={setActive} active={active} isYear={true} editModal={edit} editItem={editItem} dateTitles={{ startTitle: "Project Start Year", endTitle: "Project End Year" }} />
          <UploadFile className='col-md-6 col-lg-4' id="Proof" label={tableHead.Proof} setState={setValues} required={!edit} />
        </div>
      </DialogBox>

      <BulkExcel data={data?.data} proof={getproof} title={title} SendReq={model} refetch={refetch} module={module} commonFilds={{}} open={excelOpen} setOpen={setExcelOpen} tableHead={tableHead} typeObject={typeObject} serviceName={serviceName} />

      <Table TB={data?.data} module={module} getproof={getproof} proof={serviceName} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} />
    </>
  )
}

export default AdminResearchProjects
export { tableHead }
