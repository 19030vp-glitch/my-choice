import React, { useEffect, useState } from 'react'
import ScienceIcon from '@mui/icons-material/Science';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AdminSchoolSelect from '../components/AdminSchoolSelect';
import GoBack from '../../../components/GoBack';
import axios from 'axios';
import { useQuery } from 'react-query';
import AcadmicYearSelect from '../components/AcadmicYearSelect';
import { CircularProgress } from '@mui/material';
import FileViewer from '../../../components/FileViewer';
import sortByAcademicYear from '../../../js/sortByAcademicYear';
import { api } from '../../../js/api';

const AdminResearchCenter = ({ School = false }) => {

  const [values, setValues] = useState({ schoolName: School ? School : "All Schools", yearFilter: [] })
  const { schoolName, yearFilter } = values
  const [active, setActive] = useState("JrfSrf")
  const [tableCells, setTableCells] = useState([])


  const Btns = {
    "JrfSrf": { name: "JRF, SRF, PDF, RA", icon: <PersonSearchIcon sx={{ fontSize: "30px !important" }} />, tableHead: { index: 'Sr.No.', facultyName: 'Faculty Name', School: "School", researchName: "Reserchar Name", enrolmentYear: "Enrollment Date", fellowshipDuration: "Fellowship Duration", fellowshipType: "Fellowship Type", grantingAgency: "Granting Agency", qualifyingExam: "Qualifying Exam", year: "Academic Year", proof: "Uploaded Proof", }, },
    "BooksAndChapters": { name: "Books And Chapters", icon: <MenuBookIcon sx={{ fontSize: "30px !important" }} />, tableHead: { index: 'Sr.No.', facultyName: 'Faculty Name', School: "School", type: 'Type', titleOfBook: 'Title of Book / Chapter / Edited Book / Translation', chapterTitle: "Title of Chapter / Translation", paperTitle: 'Paper Title', transType: "Translation work", titleOfProceeding: 'Title of proceedings of the conference', conName: 'Conference Name', isNat: 'Wheather National / International', publicationYear: 'Year of Publication', issnNumber: 'ISBN/ISSN number of proceeding', aff: 'Affiliation Institute at the time of publication', publisherName: 'Publisher Name', year: 'Academic Year', proof: "Uploaded Proof" }, },
    "ResearchProjects": { name: "Research Projects", icon: <ScienceIcon sx={{ fontSize: "30px !important" }} />, tableHead: { index: 'Sr.No.', facultyName: 'Faculty Name', School: "School", schemeName: 'Scheme / Project Title', principalName: 'Principal Invigilator', coInvestigator: 'Co-Invigilator', fundingName: 'Funding Agency', isGov: 'Govt. / Non-Govt.', awardYear: 'Award Year', providedFunds: 'Funds (INR)', fundType: 'Major / Minor', status: 'Project Status', duration: 'Project Duration', year: 'Academic Year', proof: 'Upload Proof', }, },
    "ResearchPapers": { name: "Research Papers", icon: <PlagiarismIcon sx={{ fontSize: "30px !important" }} />, tableHead: { index: "Sr.No.", facultyName: 'Faculty Name', School: "School", paperTitle: 'Paper Title', journalName: 'Journal Name', authors: 'Author(s)', publicationYear: 'Publication Year', issnNumber: 'ISSN Number', indexedIn: 'Indexed in', indexLink: 'Links', year: 'Academic Year', proof: 'Upload Proof' }, },
    "Patent": { name: "Patents", icon: <DocumentScannerIcon sx={{ fontSize: "30px !important" }} />, tableHead: { index: 'Sr.No.', facultyName: 'Faculty Name', School: "School", patentNumber: 'Patent Number', patentTitle: 'Patent Title', isNat: 'Wheather National / International', awardYear: 'Award Year of Patent', year: 'Academic Year', proof: 'Upload Proof' } }
  }

  const getReserchData = async (filter) => {
    return await axios.post(`${api}/Admin/reserchCenterData`, filter)
  }

  let schoolFilter = schoolName === 'All Schools' ? {} : { department: schoolName }
  let academicYearFilter = yearFilter.length === 0 ? {} : { year: { $in: yearFilter } }

  const { data, isLoading } = useQuery(['getReserchData', schoolName, yearFilter], () => getReserchData({ schoolFilter, academicYearFilter }))

  // useEffect(()=>{
  //   refetch()
  // },[schoolName, yearFilter])

  useEffect(() => {
    let Cells = Object.keys(Btns[active].tableHead)
    const itemsToRemove = ["index", "facultyName", "School", "proof"]
    setTableCells(Cells.filter(item => !itemsToRemove.includes(item)))
  }, [active])

  return (
    <div>
      {School && <div className='mb-4'><GoBack pageTitle={`${School} Research Center`} /></div>}
      <div className='sub-main'>
        <div className='flex px-3 flex-wrap gap-2'>
          <AcadmicYearSelect className="col-md-4 col-lg-4 col-12" value={yearFilter} setState={setValues} id="yearFilter" label="Filter By Academic Year" />
          {!School && <>
            <AdminSchoolSelect className="col-md-4 col-lg-4 col-12" value={schoolName} setState={setValues} id="schoolName" label="Filter By School" />
          </>}
        </div>
        <div className='flex flex-wrap w-full'>
          {Object.keys(Btns).map((e, i) => {
            return (
              <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-1 pb-1 h-[90px]' onClick={() => { setActive(e) }} key={i}>
                <div className={`w-full h-full flex flex-row ${active === e ? 'bg-[#c19038]' : 'bg-[#f1f3f4]'} rounded-md border-t-4 border-[#deb66f] ${active === e ? 'text-[#f1f3f4]' : 'text-[#ae7e28]'} cursor-pointer`}>
                  <div className='bg-red h-full w-1/4 flex justify-end items-center p-3'>{Btns[e].icon}</div>
                  <div className='bg-red h-full w-3/4 flex flex-col'>
                    <div className='h-1/2 w-full flex items-end text-[15px] font-semibold'>{Btns[e].name}</div>
                    <div className='h-1/2 w-full flex items-start font-semibold text-[14px]'>{isLoading ? <CircularProgress color="inherit" size={18} /> : data.data[e].length}</div>
                  </div>
                </div>
              </div>
            )
          })

          }
        </div>
        <div className='table-responsive mt-4' style={{ height: "90vh" }}>
          <table className="table">
            <thead className="sticky-top" style={{ background: "#ae7e28", color: '#FFF' }}>
              <tr>
                {
                  Object.keys(Btns[active].tableHead).map((e, i) => <th key={i}>{Btns[active].tableHead[e]}</th>)
                }
              </tr>
            </thead>
            <tbody>
              {data?.data && sortByAcademicYear(data?.data?.[active], 'year')?.map((item, index) => {
                let facultyName
                let school
                if (item.userId !== undefined && item.userId !== null) {
                  facultyName = `${item.userId.salutation} ${item.userId.name}`;
                  school = item.userId.department;
                }
                else if (item.userId === undefined) {
                  facultyName = item.guideName
                  school = item.schoolName;
                }
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{facultyName}</td>
                    <td>{school}</td>
                    {tableCells?.map((e, i) => <td key={i}>{item[e]}</td>)}
                    <td><FileViewer fileName={item.proof} serviceName="faculty" /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminResearchCenter
