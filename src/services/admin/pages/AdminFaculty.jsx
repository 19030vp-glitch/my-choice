import React, { useState, useEffect } from 'react'
import JSZip from "jszip";
import ExcelJS from 'exceljs';

import Faculties from '../tables/Faculties';
import AcadmicYearSelect from '../components/AcadmicYearSelect';
import adminExcelObject from '../components/adminExcelObject';
import AdminSchoolSelect from '../components/AdminSchoolSelect';
import { toast } from 'react-hot-toast';
import siteLinks from '../../../components/siteLinks';
import CircularProgress from '@mui/material/CircularProgress';
import { updatedTableHead } from '../components/AdminMasterTable';
import BtnAdminTable from '../components/BtnAdminTable';
import allTableHeads from '../js/allTableHeads';
import { api } from '../../../js/api';


const AdminFaculty = ({ school }) => {

  let directorLocation = window.location.pathname === siteLinks.fdc.link ? true : false;

  const [childData, setChildData] = useState({ faculty: null, Qualification: null, Degree: null, EContentDeveloped: null, AppointmentsHeldPrior: null, AwardRecognition: null, BookAndChapter: null, Collaboration: null, ConferencesSemiWorkshopOrganized: null, ConferenceParticipated: null, ConsultancyServices: null, Fellowship: null, ResearchProject: null, PostHeld: null, Lectures: null, ResearchPaper: null, PhdAwarded: null, JrfSrf: null, Patent: null, InvitedTalk: null, Online: null, FinancialSupport: null, Responsibilities: null, PublicationCitation: null, ForeignVisit: null, ExtensionActivities: null, MoUs: null })

  const [values, setValues] = useState({ yearFilter: [], schoolName: school ? school : "All Schools" })

  const { yearFilter, schoolName } = values

  const loadedInitial = { faculty: false, Qualification: false, Degree: false, EContentDeveloped: false, AppointmentsHeldPrior: false, AwardRecognition: false, BookAndChapter: false, Collaboration: false, ConferencesSemiWorkshopOrganized: false, ConferenceParticipated: false, ConsultancyServices: false, Fellowship: false, ResearchProject: false, PostHeld: false, Lectures: false, ResearchPaper: false, PhdAwarded: false, JrfSrf: false, Patent: false, InvitedTalk: false, Online: false, FinancialSupport: false, Responsibilities: false, PublicationCitation: false, ForeignVisit: false, ExtensionActivities: false, MoUs: false }
  const [loaded, setLoaded] = useState(loadedInitial)

  const loading = !(Object.values(loaded).every((value) => value === true));

  const facltyName =  {'userId.name': 'Faculty Name'}
   
  const modifyObjectAsFaclty =  (obj, elementsToAdd) =>{
    const {index, ...rest} = obj
    return {index, ...elementsToAdd, ...rest}
  }

  const allFacultyComponents = [
    {
      element: <Faculties id="faculty" setState={setChildData} yearFilter={yearFilter} schoolName={schoolName} heading='Faculties' setLoaded={setLoaded} />,
      childData: childData?.faculty, filename: 'Faculties.xlsx', SendReq: "User", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="Qualification" setState={setChildData} schoolName={schoolName} heading='Qualification' setLoaded={setLoaded} heads={allTableHeads.Qualification} />,
      childData: childData?.Qualification, filename: 'Qualification.xlsx', SendReq: "Qualification", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="Degree" setState={setChildData} schoolName={schoolName} heading='Research Degrees' setLoaded={setLoaded} heads={allTableHeads.Degree} proof="proof" serviceName="faculty" />,
      childData: childData?.Degree, filename: 'ResearchDegrees.xlsx', SendReq: "Degree", proof: "proof", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="EContentDeveloped" setState={setChildData} customParams={{
        model: "EContentDeveloped", module: "Admin", filter: yearFilter?.length !== 0 ? { year: { $in: yearFilter }, otherUser: { $ne: 'Swayam' } } : { otherUser: { $ne: 'Swayam' } },
        filterConditios: school && { department: school }
      }} heading='E-Content Developed' setLoaded={setLoaded} heads={allTableHeads.EContentDeveloped} proof="proof" serviceName="faculty" />,
      childData: childData?.EContentDeveloped, filename: 'E-Content Developed.xlsx', SendReq: "EContentDeveloped", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="AppointmentsHeldPrior" setState={setChildData} schoolName={schoolName} academicYear={yearFilter?.length !== 0 ? yearFilter : null} heading='Appointments Prior Joining' setLoaded={setLoaded} heads={allTableHeads.AppointmentsHeldPrior} serviceName="faculty" />,
      childData: childData?.AppointmentsHeldPrior, filename: 'AppointmentsPriorJoining.xlsx', SendReq: "AppointmentsHeldPrior", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="AwardRecognition" setState={setChildData} schoolName={schoolName} academicYear={yearFilter?.length !== 0 ? yearFilter : null} heading='Award Recognition' setLoaded={setLoaded} heads={allTableHeads.AwardRecognition} proof="proof" serviceName="faculty" />,
      childData: childData?.AwardRecognition, filename: 'Award Recognition.xlsx', SendReq: "AwardRecognition", proof: "proof", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="BookAndChapter" setState={setChildData} schoolName={schoolName} academicYear={yearFilter?.length !== 0 ? yearFilter : null} heading='Books And Chapter' setLoaded={setLoaded} heads={allTableHeads.BookAndChapter} proof="proof" serviceName="faculty" />,
      childData: childData?.BookAndChapter, filename: 'BooksAndChapters.xlsx', SendReq: "BookAndChapter", proof: "proof", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="Collaboration" setState={setChildData} schoolName={schoolName} academicYear={yearFilter?.length !== 0 ? yearFilter : null} heading='Collaborations' setLoaded={setLoaded} heads={allTableHeads.Collaboration} proof="proof" serviceName="faculty" />,
      childData: childData?.Collaboration, filename: 'Collaborations.xlsx', SendReq: "Collaboration", proof: "proof", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="ConferencesSemiWorkshopOrganized" setState={setChildData} heading='Conference Organised' setLoaded={setLoaded} heads={modifyObjectAsFaclty(allTableHeads.ConferencesSemiWorkshopOrganized, facltyName)} proof="Upload_Proof" serviceName="director" customParams={{ model: "ConferencesSemiWorkshopOrganized", module: "Admin", filter: yearFilter?.length === 0 && schoolName === "All Schools" ? { userId: { $exists: true, $ne: null } } : yearFilter?.length !== 0 && schoolName === "All Schools" ? { Year: { $in: yearFilter }, userId: { $exists: true, $ne: null } } : yearFilter?.length === 0 && schoolName !== "All Schools" ? { SchoolName: schoolName, userId: { $exists: true, $ne: null } } : { SchoolName: schoolName, userId: { $exists: true, $ne: null }, Year: { $in: yearFilter } } }} />,
      childData: childData?.ConferencesSemiWorkshopOrganized, filename: 'ConferenceOrganised.xlsx', SendReq: "ConferencesSemiWorkshopOrganized", proof: "Upload_Proof", module: "director"
    },
    {
      element: <BtnAdminTable values={values} model="ConferenceParticipated" setState={setChildData} schoolName={schoolName} academicYear={yearFilter?.length !== 0 ? yearFilter : null} heading='Conference Participated' setLoaded={setLoaded} heads={allTableHeads.ConferenceParticipated} proof="proof" serviceName="faculty" />,
      childData: childData?.ConferenceParticipated, filename: 'Conference Participated.xlsx', SendReq: "ConferenceParticipated", proof: "proof", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="ConsultancyServices" setState={setChildData} schoolName={schoolName} academicYear={yearFilter?.length !== 0 ? yearFilter : null} heading='Consultancy Services' setLoaded={setLoaded} heads={allTableHeads.ConsultancyServices} proof="proof" serviceName="faculty" />,
      childData: childData?.ConsultancyServices, filename: 'Consultancy.xlsx', SendReq: "ConsultancyServices", proof: "proof", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="Fellowship" setState={setChildData} schoolName={schoolName} academicYear={yearFilter?.length !== 0 ? yearFilter : null} heading='Fellowships' setLoaded={setLoaded} heads={allTableHeads.Fellowship} proof="proof" serviceName="faculty" />,
      childData: childData?.Fellowship, filename: 'Fellowship.xlsx', SendReq: "Fellowship", proof: "proof", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="ResearchProject" setState={setChildData} customParams={{
        model: "ResearchProject", module: "Admin", filter: yearFilter?.length !== 0 ? { year: { $in: yearFilter }, otherUser: { $ne: 'Admin' }, userId: { $exists: true, $ne: null }} : { otherUser: { $ne: 'Admin' }, userId: { $exists: true, $ne: null } }, filterConditios: (values.schoolName !== "All Schools" ? { department: values.schoolName } : {}) }} heading='Research Projects' setLoaded={setLoaded} heads={allTableHeads.ResearchProject} proof="proof" serviceName="faculty" />,
      childData: childData?.ResearchProject, filename: 'ResearchProjects.xlsx', SendReq: "ResearchProject", proof: "proof", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="PostHeld" setState={setChildData} schoolName={schoolName} academicYear={yearFilter?.length !== 0 ? yearFilter : null} heading='Post Held After Joining' setLoaded={setLoaded} heads={allTableHeads.PostHeld} proof="proof" serviceName="faculty" />,
      childData: childData?.PostHeld, filename: 'PostHeldAfterJoining.xlsx', SendReq: "PostHeld", proof: "proof", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="Lectures" setState={setChildData} schoolName={schoolName} academicYear={yearFilter?.length !== 0 ? yearFilter : null} heading='Lectures' setLoaded={setLoaded} heads={allTableHeads.Lectures} />,
      childData: childData?.Lectures, filename: 'Lectures.xlsx', SendReq: "Lectures", module: "faculty"
    },
    {
      element: <BtnAdminTable link="indexLink" values={values} model="ResearchPaper" setState={setChildData} schoolName={schoolName} academicYear={yearFilter?.length !== 0 ? yearFilter : null} heading='Research Papers' setLoaded={setLoaded} heads={allTableHeads.ResearchPaper} proof="proof" proof2="ifProof" serviceName="faculty" />,
      childData: childData?.ResearchPaper, filename: 'ResearchPapers.xlsx', SendReq: "ResearchPaper", proof: "proof", proof2: "ifProof", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="PhdAwarded" setState={setChildData} customParams={{
        model: "PhdAwarded", module: "Admin", filter: yearFilter?.length !== 0 ? { year: { $in: yearFilter }, otherUser: { $ne: 'Admin' }, userId: { $exists: true, $ne: null }} : { otherUser: { $ne: 'Admin' }, userId: { $exists: true, $ne: null } }, filterConditios: (values.schoolName !== "All Schools" ? { department: values.schoolName } : {}) }} heading='Ph.D. Awarded' setLoaded={setLoaded} heads={allTableHeads.PhdAwarded} proof="proof" serviceName="faculty" />,
      childData: childData?.PhdAwarded, filename: 'PhdAwarded.xlsx', SendReq: "PhdAwarded", proof: "proof", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="PublicationCitation" setState={setChildData} schoolName={schoolName} heading='Publication Citation' setLoaded={setLoaded} heads={allTableHeads.PublicationCitation} />,
      childData: childData?.PublicationCitation, filename: 'Publication Citation.xlsx', SendReq: "PublicationCitation", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="JrfSrf" setState={setChildData} customParams={{
        model: "JrfSrf", module: "Admin", filter: yearFilter?.length !== 0 ? { year: { $in: yearFilter }, otherUser: { $ne: 'Admin' }, userId: { $exists: true, $ne: null }} : { otherUser: { $ne: 'Admin' }, userId: { $exists: true, $ne: null } }, filterConditios: (values.schoolName !== "All Schools" ? { department: values.schoolName } : {}) }} heading='JRF, SRF, PDF, Research Associate' setLoaded={setLoaded} heads={allTableHeads.JrfSrf} proof="proof" serviceName="faculty" />,
      childData: childData?.JrfSrf, filename: 'JrfSrfPdf.xlsx', SendReq: "JrfSrf", proof: "proof", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="Patent" setState={setChildData} schoolName={schoolName} academicYear={yearFilter?.length !== 0 ? yearFilter : null} heading='Patents' setLoaded={setLoaded} heads={allTableHeads.Patent} proof="proof" serviceName="faculty" />,
      childData: childData?.Patent, filename: 'Patents.xlsx', SendReq: "Patent", proof: "proof", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="InvitedTalk" setState={setChildData} schoolName={schoolName} academicYear={yearFilter?.length !== 0 ? yearFilter : null} heading='Invited Talks' setLoaded={setLoaded} heads={allTableHeads.InvitedTalk} proof="proof" serviceName="faculty" />,
      childData: childData?.InvitedTalk, filename: 'InvitedTalks.xlsx', SendReq: "InvitedTalk", proof: "proof", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="Online" setState={setChildData} schoolName={schoolName} academicYear={yearFilter?.length !== 0 ? yearFilter : null} heading='Orientation Refresher Course' setLoaded={setLoaded} heads={allTableHeads.Online} proof="proof" serviceName="faculty" />,
      childData: childData?.Online, filename: 'OrientationRefresherCourse.xlsx', SendReq: "Online", proof: "proof", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="FinancialSupport" setState={setChildData} schoolName={schoolName} academicYear={yearFilter?.length !== 0 ? yearFilter : null} heading='Financial Support' setLoaded={setLoaded} heads={allTableHeads.FinancialSupport} proof="proof" serviceName="faculty" />,
      childData: childData?.FinancialSupport, filename: 'FinancialSupport.xlsx', SendReq: "FinancialSupport", proof: "proof", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="Responsibilities" setState={setChildData} schoolName={schoolName} academicYear={yearFilter?.length !== 0 ? yearFilter : null} heading='Responsibilities' setLoaded={setLoaded} heads={allTableHeads.Responsibilities} proof="proof" serviceName="faculty" />,
      childData: childData?.Responsibilities, filename: 'Responsibilities.xlsx', SendReq: "Responsibilities", proof: "proof", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="ForeignVisit" setState={setChildData} schoolName={schoolName} academicYear={yearFilter?.length !== 0 ? yearFilter : null} heading='Foreign Visits' setLoaded={setLoaded} heads={allTableHeads.ForeignVisit} />,
      childData: childData?.ForeignVisit, filename: 'Foreign Visits.xlsx', SendReq: "ForeignVisit", module: "faculty"
    },
    {
      element: <BtnAdminTable values={values} model="ExtensionActivities" setState={setChildData} heading='Extension Activities' setLoaded={setLoaded} heads={modifyObjectAsFaclty(allTableHeads.ExtensionActivities, facltyName)} proof="Upload_Proof" serviceName="director" customParams={{ model: "ExtensionActivities", module: "Admin", filter: yearFilter?.length === 0 && schoolName === "All Schools" ? { userId: { $exists: true, $ne: null } } : yearFilter?.length !== 0 && schoolName === "All Schools" ? { Year_of_activity: { $in: yearFilter }, userId: { $exists: true, $ne: null } } : yearFilter?.length === 0 && schoolName !== "All Schools" ? { SchoolName: schoolName, userId: { $exists: true, $ne: null } } : { SchoolName: schoolName, userId: { $exists: true, $ne: null }, Year_of_activity: { $in: yearFilter } } }} />,
      childData: childData?.ExtensionActivities, filename: 'Extension Activities.xlsx', SendReq: "ExtensionActivities", proof: "Upload_Proof", module: "director"
    },
    {
      element: <BtnAdminTable values={values} model="MoUs" setState={setChildData} heading='MOUS' setLoaded={setLoaded} heads={modifyObjectAsFaclty(allTableHeads.MoUs, facltyName)} proof="Upload_Proof" serviceName="director" customParams={{ model: "MoUs", module: "Admin", filter: yearFilter?.length === 0 && schoolName === "All Schools" ? { userId: { $exists: true, $ne: null } } : yearFilter?.length !== 0 && schoolName === "All Schools" ? { Year_of_signing_MoU: { $in: yearFilter }, userId: { $exists: true, $ne: null } } : yearFilter?.length === 0 && schoolName !== "All Schools" ? { SchoolName: schoolName, userId: { $exists: true, $ne: null } } : { SchoolName: schoolName, userId: { $exists: true, $ne: null }, Year_of_signing_MoU: { $in: yearFilter } } }} />,
      childData: childData?.MoUs, filename: 'MOUS.xlsx', SendReq: "MoUs", proof: "Upload_Proof", module: "director"
    },
  ]

  useEffect(() => {
    if (values.yearFilter) {
      setLoaded({
        ...loadedInitial, faculty: true, qualification: true, researchdegrees: true, appointmentspriorjoining: true,
      });
    } else if (values.schoolName) {
      setLoaded(loadedInitial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.yearFilter, values.schoolName]);

  return (

    <div className='sub-main' >
      <div className='flex px-3 flex-wrap gap-2'>
        <AcadmicYearSelect className="col-md-4 col-lg-4 col-12" value={yearFilter} setState={setValues} id="yearFilter" label="Filter By Academic Year" />
        {!directorLocation && <AdminSchoolSelect className="col-md-4 col-lg-4 col-12" value={schoolName} setState={setValues} id="schoolName" label="Filter By School" />}

        <button className='col-md-3 col-lg-3 col-12 btn btn-sm btn-success align-middle' style={{ margin: "37px 0px auto 0px" }} onClick={() => { downloadExcelZip(allFacultyComponents, 'All Faculty Section Excels') }} disabled={loading} >{loading ? <CircularProgress color="inherit" size={18} /> : "Export All Excels"}</button>
      </div>
      <div style={{ padding: "10px" }}>

        <div className='button-wraper'>

          <div className='grid grid-cols-4 gap-3 p-2'>
            {
              allFacultyComponents?.map(((item, i) => <div key={`${item}${i}`}>{item?.element}</div>))
            }
          </div>
        </div>
      </div>
    </div>

  )
}

const downloadExcelZip = async (allComponentData, zipName) => {
  try {
    const zip = new JSZip();

    // Generate Excel worksheets and add them to the zip file
    allComponentData.forEach(({ childData, filename, SendReq, proof, proof2, module }) => {
      let tableHeads = updatedTableHead
      let commonObject = { ...adminExcelObject, ...tableHeads }
      const columnMapping = {...commonObject[SendReq]};
      if (columnMapping.hasOwnProperty("Action")) {
        delete columnMapping.Action
      }
      if (proof) { delete columnMapping.Proof }
      if (proof2) { delete columnMapping.Proof2 }
      if (columnMapping.hasOwnProperty("index")) {
        delete columnMapping.index
      }
      if (!columnMapping) {
        throw new Error(`Column mapping '${SendReq}' not found.`);
      }

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Sheet 1');

      const columnNames = Object.values(columnMapping);
      columnNames.unshift('Sr.No.');

      // Set column headers and formatting
      const headerRow = worksheet.addRow(columnNames);
      headerRow.font = { bold: true, size: 12 };

      // Apply formatting to all cells
      worksheet.columns.forEach((column) => {
        column.width = 20;
        column.alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
      });

      // Add data rows with auto-incrementing numbers
      childData.forEach((rowData, index) => {
        const values = Object.keys(columnMapping).map((columnName) => columnName === 'userId.name' ? rowData?.userId?.name : columnName === 'userId.username' ? rowData?.userId?.username : columnName === 'userId.department' ? rowData?.userId?.department : rowData[columnName] || 'N.A.');
        values.unshift(index + 1);
        worksheet.addRow(values);
      });

      if (proof) {
        const lastColumnIndex = Object.keys(columnMapping).length + 2;
        const proofColumnName = "Link Of Proof";

        worksheet.getColumn(lastColumnIndex).header = proofColumnName;

        for (let i = 2; i <= childData.length + 1; i++) {
          const proofValue = childData[i - 2][proof] === undefined || childData[i - 2][proof] === "undefined" ? 'Not Uploaded' : 'View Proof';
          const cell = worksheet.getCell(`${String.fromCharCode(65 + lastColumnIndex - 1)}${i}`);
          if (proofValue === 'View Proof') {
            const proofURL = `${api}/showFile/${childData[i - 2][proof]}/${module}`;
            cell.value = { text: proofValue, hyperlink: proofURL };
            cell.font = { color: { argb: 'FF0000FF' }, underline: true };
          } else {
            cell.value = proofValue;
          }
        }

        // Set width and alignment for the last column
        worksheet.getColumn(lastColumnIndex).width = 20;
        worksheet.getColumn(lastColumnIndex).alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
      }
      if (proof2) {
        const lastColumnIndex = Object.keys(columnMapping).length + 3;
        worksheet.getColumn(lastColumnIndex).header = "Link Of Proof2";

        for (let i = 2; i <= childData.length + 1; i++) {
          const proofValue = childData[i - 2][proof2] === undefined || childData[i - 2][proof2] === "undefined" ? 'Not Uploaded' : 'View Proof';
          const cell = worksheet.getCell(`${String.fromCharCode(65 + lastColumnIndex - 1)}${i}`);
          if (proofValue === 'View Proof') {
            const proofURL = `${api}/showFile/${childData[i - 2][proof2]}/${module}`;
            cell.value = { text: proofValue, hyperlink: proofURL };
            cell.font = { color: { argb: 'FF0000FF' }, underline: true };
          } else {
            cell.value = proofValue;
          }
        }

        // Set width and alignment for the last column
        worksheet.getColumn(lastColumnIndex).width = 20;
        worksheet.getColumn(lastColumnIndex).alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
      }
      worksheet.getRow(1).font = { bold: true, size: 12 };
      worksheet.getRow(1).height = 30;

      for (let i = 2; i <= childData.length; i++) {
        worksheet.getRow(i).commit();
      }

      // Save the workbook as a file
      const buffer = workbook.xlsx.writeBuffer();
      zip.file(filename, buffer);
    });

    // Generate the zip file and download it
    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(content);
    link.setAttribute('download', `${zipName}.zip`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log('Excel zip generated and downloaded successfully.');
    toast.success("Excel zip generated successfully")
  }
  catch (err) {
    console.error('Error while generating Excel zip:', err);
    toast.error("Error while generating try again")
  }
};

export default AdminFaculty
export { downloadExcelZip }