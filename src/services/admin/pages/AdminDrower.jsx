import React from "react";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LocalLibraryRoundedIcon from "@mui/icons-material/LocalLibraryRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import BoyRoundedIcon from "@mui/icons-material/BoyRounded";
import MoreIcon from "@mui/icons-material/More";
import { ComponentSetter } from "./AdminMain";
import { useDispatch, useSelector } from "react-redux";
import { setAdminActive } from "../../../redux/slices/AdminActiveSlice";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import BiotechRoundedIcon from "@mui/icons-material/BiotechRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import MergeTypeRoundedIcon from "@mui/icons-material/MergeTypeRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import CorporateFareRoundedIcon from '@mui/icons-material/CorporateFareRounded';

import title from "../../../js/title";
import Footer from "../../../components/Footer";

const AdminDrower = ({ children, hideHeader = false }) => {
  //ADD icon here
  const iconsSetter = {
    "Dashboard": <CollectionsBookmarkIcon />,
    "Numerical Dashboard": <DashboardRoundedIcon />,
    "Faculties": <PersonRoundedIcon />,
    "Directors": <LocalLibraryRoundedIcon />,
    "AQAR": <SummarizeRoundedIcon />,
    "Report Status": <BarChartRoundedIcon />,
    "Feedback Status": <ForumRoundedIcon />,
    "SSS": <GroupsRoundedIcon />,
    "NIRF": <SummarizeRoundedIcon />,
    "Research Center": <BiotechRoundedIcon />,
    "Alumni": <BoyRoundedIcon />,
    "Students": <SchoolRoundedIcon />,
    "Other Section": <OtherHousesIcon />,
    "Combine Section": <MergeTypeRoundedIcon />,
    "Affiliated Colleges": <CorporateFareRoundedIcon />,
    "More": <MoreIcon />,
  };

  // "University Programs": <FestivalRoundedIcon />,
  title("Admin Panel");
  const dispatch = useDispatch();
  const AdminActive = useSelector((state) => state.adminActive.adminActive);

  return (
    <>
      <div
        className="col-12"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {!hideHeader && (
          <div className="sidebar-admin-drower">
            {Object.keys(ComponentSetter)?.map((e) => (
              <div key={e} className="col-12 col-sm-6 col-md-3 col-lg-2 px-1">
                <button
                  onClick={() => {
                    dispatch(setAdminActive(e));
                  }}
                  className={`DashbordButtons ${AdminActive === e ? "active" : null
                    } text-left`}
                >
                  <span style={{ paddingRight: "10px" }}>{iconsSetter[e]}</span>
                  {e}
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="min-h-screen">{children}</div>

        <Footer />
      </div>
    </>
  );
};

export default AdminDrower;
