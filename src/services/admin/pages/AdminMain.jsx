import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";

import AdminHeader from "./AdminHeader";
import UserLoading from "../../../pages/UserLoading";
import AdminDrower from "./AdminDrower";
const AdminDashboard = lazy(() => import("./AdminDashboard"));
const AdminFaculty = lazy(() => import("./AdminFaculty"));
const AdminDirector = lazy(() => import("./AdminDirector"));
const AdminAlumni = lazy(() => import("./AdminAlumni"));
const AdminStudent = lazy(() => import("./AdminStudent"));
const AdminMore = lazy(() => import("./AdminMore"));
const AdminReportStatus = lazy(() => import("./AdminReportStatus"));
const AdminFeedbackStatus = lazy(() => import("./AdminFeedbackStatus"));
const AdminNumaricalData = lazy(() => import("./AdminNumaricalData"));
const AdminResearchCenter = lazy(() => import("./AdminResearchCenter"));
const AdminCombine = lazy(() => import("./AdminCombine"));
const AdminSSS = lazy(() => import("./AdminSSS"));
const AdminOthers = lazy(() => import("./AdminOthers"));
const AdminNIRF = lazy(() => import("./AdminNIRF"));
const AdminAQAR = lazy(() => import("./AdminAQAR"));
const AdminACF = lazy(() => import("./AdminACF"));

//1. adminresearchcenter hideheader
// <AdminDrower hideHeader={School ? true : false}>

//   2. faculty
// <AdminDrower hideHeader={directorLocation}>

// 3. numerical data
// <AdminDrower hideHeader={School ? true : false} >

const ComponentSetter = {
  "Dashboard": <AdminDashboard />,
  "Numerical Dashboard": <AdminNumaricalData />,
  "Faculties": <AdminFaculty />,
  "Directors": <AdminDirector />,
  "AQAR": <AdminAQAR />,
  "SSS": <AdminSSS />,
  "Research Center": <AdminResearchCenter />,
  "NIRF": <AdminNIRF />,
  "Report Status": <AdminReportStatus />,
  "Feedback Status": <AdminFeedbackStatus />,
  "Alumni": <AdminAlumni />,
  "Students": <AdminStudent />,
  "Other Section": <AdminOthers />,
  "Combine Section": <AdminCombine />,
  "Affiliated Colleges": <AdminACF />,
  "More": <AdminMore />,
};

const AdminMain = () => {
  // title('SDM | School Data Management')
  const AdminActive = useSelector((state) => state.adminActive.adminActive);
  return (
    <>
      <div className="mb-3">
        <AdminHeader />
      </div>

      <AdminDrower>
        {Object.keys(ComponentSetter)?.map((item) => {
          return (
            item === AdminActive && (
              <div key={item}>
                <Suspense fallback={<UserLoading title="Loading" />}>
                  {ComponentSetter[item]}
                </Suspense>
              </div>
            )
          );
        })}
      </AdminDrower>
    </>
  );
};

export default AdminMain;
export { ComponentSetter };
