import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Grid, Paper, Table, TableBody, TableContainer, TableRow, TableHead, TableCell, TableFooter } from '@mui/material';
import getReq from '../../../components/requestComponents/getReq';
import EmptyBox from '../../../components/EmptyBox';
import TblView from '../../../components/tableComponents/TblView';
import TblEditDelete from '../../../components/tableComponents/TblEditDelete';
import DialogBox from '../../../components/formComponents/DialogBox';
import editReq from '../../../components/requestComponents/editReq';
import addReq from '../../../components/requestComponents/addReq';
import AddButton from '../../director/components/UtilityComponents/AddButton';
import Text from '../../../components/formComponents/Text';
import UploadFile from '../../../components/formComponents/UploadFile';
import { Select } from 'antd';
import { programObject } from '../../../components/tableComponents/Lists';

const tableHead = { index: "Sr.No.", courseName: "Course Name", subjectFees: "Subject Fees", annualConsultingFees: "Annual Consulting Fees", proposalFees: "Proposal Fees", totalFees: "Total Fees", Proof: "Proof", Action: "Action" }


const ACFTable = ({ programName, academicYear, collegeCode, userId, showAddButton = true }) => {
  const { index, totalFees, Action, Proof, courseName, ...filteredTableHead } = tableHead
  const model = "ACFDitails"
  const title = `${programName} Program Fee Details`
  const module = "main"
  const serviceName = "acf"
  const getproof = "proof"
  const proofFolder = { getproof, folder: serviceName }
  const filter = { academicYear, collegeCode, userId, programName }

  const params = { model, module, filter, id: "" };


  const [data, setData] = useState([])
  const { data: serverData, isLoading, refetch } = useQuery(`${academicYear}${collegeCode}${userId}${programName}`, () => getReq(params), { refetchOnWindowFocus: false })

  const initialstate = { courseName: null, subjectFees: null, annualConsultingFees: null, proposalFees: null, Proof: null }

  const [values, setValues] = useState(initialstate)
  const totalValues = { subjectFees: 0, annualConsultingFees: 0, proposalFees: 0, totalOfTotalFees: 0 }
  const [itemToEdit, setItemToEdit] = useState(null)
  const [open, setOpen] = useState(false)
  // const [excelOpen, setExcelOpen] = useState(false)
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [CourseList, setCourseList] = useState([]);
  const [showPage, setShowPage] = useState(false);

  const setCources = () => {
    if (programObject?.[programName]) {
      setCourseList(Object.keys(programObject[programName]).map(e => ({ value: e, label: programObject[programName][e] })));
    }
  }

  useEffect(() => {
    setCources()
    setShowPage(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (itemToEdit && data?.data) {
      data?.data.forEach((item) => {
        if (item?._id === itemToEdit) {
          setEdit(true); setOpen(true);
          setValues({ ...item, Proof: undefined })
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemToEdit])

  useEffect(() => {
    refetch();
  }, [programName, academicYear])

  useEffect(() => {
    setCourseList(() => programObject?.[programName])
    if (programName) {
      refetch();
    }
    setCources()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programName, serverData])




  const onCancel = () => {
    setValues(initialstate); setItemToEdit(null); setEdit(false); setOpen(false)
  }
  const onSubmit = (e) => {
    e.preventDefault();
    edit ? editReq({ id: itemToEdit, ...proofFolder }, model, initialstate, values, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module) :
      addReq({ ...proofFolder, academicYear, collegeCode, userId, programName }, model, initialstate, values, setValues, refetch, setOpen, setLoading, module)
  }


  return (
    showPage && <>

      <AddButton showAddButton={showAddButton} setData={setData} serverData={serverData} getproof={getproof} model={model} module={module} title={title} filter={filter} year={academicYear} serviceName={serviceName} onclick={setOpen} customName={title} dataCount={data ? data?.data?.length : 0} data={data?.data} tableHead={tableHead} showActionButton={false} />


      <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
        <div className='flex flex-wrap'>

          <div className={`col-12 col-md-6 col-lg-4 p-1 text-sm md:text-base`}>
            <label className="form-label flex justify-between">
              <div>{tableHead.courseName}</div>
            </label>

            <Select showSearch placeholder="Select Cource" className='w-full' dropdownStyle={{ zIndex: 9999 }} filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                } 
                options={CourseList} 
                onChange={(value) => {
                  setValues((prev) => ({
                    ...prev,
                    courseName: value,
                  }));
                }} />
          </div>
          <Text className='col-md-6 col-lg-4' type='number' id="subjectFees" value={values.subjectFees} label={tableHead.subjectFees} setState={setValues} />
          <Text className='col-md-6 col-lg-4' type='number' id="annualConsultingFees" value={values.annualConsultingFees} label={tableHead.annualConsultingFees} setState={setValues} />
          <Text className='col-md-6 col-lg-4' type='number' id="proposalFees" value={values.proposalFees} label={tableHead.proposalFees} setState={setValues} />
          <UploadFile className='col-md-6 col-lg-4' id="Proof" label={tableHead.Proof} setState={setValues} required={!edit} />
        </div>
      </DialogBox>

      {isLoading ? <div>Loading...</div> : <>
        <Grid container my={2}>
          <TableContainer component={Paper} sx={{ maxHeight: '80vh' }}>
            <Table area-label='simple tabel' stickyHeader>
              <TableHead>
                <TableRow sx={{ "& th": { color: "#1a2421", backgroundColor: "#e7f1ff" } }}>
                  {Object.keys(tableHead)?.map((e, i) => {
                    return <TableCell key={`${e}${i}`} sx={{ fontSize: "12px", fontWeight: "bold" }}>{tableHead?.[e]}</TableCell>
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  data?.data?.map((element, i) => {
                    totalValues.annualConsultingFees += (isNaN(parseInt(element.annualConsultingFees)) ? 0 : parseInt(element.annualConsultingFees))
                    totalValues.subjectFees += (isNaN(parseInt(element.subjectFees)) ? 0 : parseInt(element.subjectFees))
                    totalValues.proposalFees += (isNaN(parseInt(element.proposalFees)) ? 0 : parseInt(element.proposalFees))
                    let total = 0
                    return <TableRow key={`${element}${i}`}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{programObject?.[programName]?.[element?.courseName]}</TableCell>
                      {
                        Object.keys(filteredTableHead).map((key, index) => {
                          total += (isNaN(parseInt(element[key])) ? 0 : parseInt(element[key]));
                          totalValues.totalOfTotalFees += (isNaN(parseInt(element[key])) ? 0 : parseInt(element[key]));
                          return <TableCell key={`${key}${index}`}>{element[key]}</TableCell>
                        })
                      }
                      <TableCell sx={{ fontSize: "12px", fontWeight: "bold" }}>{total}</TableCell>
                      <TblView val={element.proof} module={serviceName} />
                      <TblEditDelete val={element._id} loc={model} fatchdata={refetch} setItemToEdit={setItemToEdit} module={module} proofFolder={proofFolder} />
                    </TableRow>
                  })
                }

              </TableBody>
              <TableFooter style={{ position: "sticky", bottom: 0, background: "#e7f1ff" }}>
                <TableRow >
                  <TableCell sx={{ fontSize: "12px", fontWeight: "bold" }}></TableCell>
                  <TableCell sx={{ fontSize: "12px", fontWeight: "bold" }}>Total Fees</TableCell>
                  <TableCell sx={{ fontSize: "12px", fontWeight: "bold" }}>{totalValues.subjectFees}</TableCell>
                  <TableCell sx={{ fontSize: "12px", fontWeight: "bold" }}>{totalValues.annualConsultingFees}</TableCell>
                  <TableCell sx={{ fontSize: "12px", fontWeight: "bold" }}>{totalValues.proposalFees}</TableCell>
                  <TableCell sx={{ fontSize: "12px", fontWeight: "bold" }}>{totalValues.totalOfTotalFees}</TableCell>
                  <TableCell sx={{ fontSize: "12px", fontWeight: "bold" }}></TableCell>
                  <TableCell sx={{ fontSize: "12px", fontWeight: "bold" }}></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
        {
          data?.data?.length === 0 && <EmptyBox />
        }
      </>}
    </>
  )
}
export default ACFTable