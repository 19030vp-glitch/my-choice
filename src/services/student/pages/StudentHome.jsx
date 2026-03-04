import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAlumniUser, setStudentUser } from "../../../redux/slices/UserSlice";
import Footer from "../../../components/Footer";
import Bred from "../../../components/Bred";
import useStudentAuth from "../../../hooks/useStudentAuth";
import title from "../../../js/title";
import OnlyNav from "../../../components/OnlyNav";
import siteLinks from "../../../components/siteLinks";
import DialogBox from "../../../components/formComponents/DialogBox";
import Select from "../../../components/formComponents/Select";
import Text from "../../../components/formComponents/Text";
import UploadFile from "../../../components/formComponents/UploadFile";
import editReq from "../../../components/requestComponents/editReq";
import getReq from "../../../components/requestComponents/getReq";
import navcom from "../components/navcom";
import { ResearchCenter } from "../components/navcom";
import serverLinks from "../../../js/serverLinks";
import SchoolsProgram from "../../../components/SchoolsProgram";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import handleAvatarChange from "../../../js/handleAvatar";
import YearSelect from "../../../components/formComponents/YearSelect";
import ProfileCroper from "../../../components/ProfileCroper";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import MapsHomeWorkRoundedIcon from "@mui/icons-material/MapsHomeWorkRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import FileViewer from "../../../components/FileViewer";
import { Skeleton } from "@mui/material";
import { getOrdinalSuffix } from "../../director/pages/NewStudent";
import capitalizeText from "../../../js/capitalizeText";
import Lists from "../../../components/tableComponents/Lists";

const fetchFacutys = async (params, setGuidesData, setGuides) => {
  let arr = [];
  const userrefetch = await getReq(params);
  if (setGuidesData) {
    setGuidesData(userrefetch?.data);
  }
  userrefetch?.data.map((item) => {
    arr.push(item.name);
  });
  setGuides(arr);
};

const StudentHome = () => {
  const Salutations = ["Mr.", "Miss.", "Mrs.", "Shri", "Shrimati"];
  const genders = ["Male", "Female", "Other"];
  const Casts = [ "General", "OBC", "SC", "SBC", "SEBC", "ST", "VJ", "NT-B", "NT-C", "NT-D", ];
  const religions = ["Hindu", "Muslim", "Christian", "Sikh", "Buddh", "Jain"];
  const model = "StudentUser";
  const module = "student";

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAlumniLink = window.location.pathname.includes("alumni");
  useStudentAuth(true, isAlumniLink ? "alumni" : "student");
  const user = useSelector((state) =>
    isAlumniLink ? state.user.alumniUser : state.user.studentUser
  );
  title(user?.isAlumni ? "Alumni Home" : "Student Home");

  const initialstate = {
    salutation: "",
    name: "",
    address: "",
    mobile: "",
    programGraduated: "",
    schoolName: "",
    gender: "",
    dob: "",
    abcNo: "",
    ResearchGuide: "",
    Title: "",
    dateOfRac: "",
    ReceivesFelloship: "",
    ResearchGuideId: "",
    currentIn: "",
    cast: "",
    country: "",
    religion: "",
    programEnroledOn: "",
    programCompletedOn: "",
    isGideListed: true,
  };

  const [avatar, setAvatar] = useState(null);
  const [uploadProof, setUploadProof] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [guides, setGuides] = useState([]);
  const [guidesData, setGuidesData] = useState([]);
  const [programDuration, setProgramDuration] = useState(null);
  const [openCroper, setOpenCroper] = useState(false);
  const [values, setValues] = useState(initialstate);
  const {
    salutation, name, programGraduated, address, mobile, schoolName, gender, dob, abcNo, ResearchGuide, Title, dateOfRac, ReceivesFelloship, currentIn, cast, country, religion, programEnroledOn, programCompletedOn, isGideListed, otherGuide,
  } = values;

  const refetch = async () => {
    const userrefetch = await getReq({
      model,
      id: user?._id,
      module,
      filter: "studentEdit",
    });
    dispatch(
      isAlumniLink
        ? setAlumniUser(userrefetch?.data[0])
        : setStudentUser(userrefetch?.data[0])
    );
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setEdit(true);
    editReq({ id: itemToEdit, uploadProof, photoURL }, "", initialstate, { ...values, ResearchGuide: ResearchGuide === "Other" ? otherGuide : ResearchGuide, }, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module);
    setUploadProof(null);
    setAvatar(null);
    setPhotoURL(null);
  };

  const onCancel = () => {
    setValues(initialstate);
    setItemToEdit(null);
    setUploadProof(null);
    setAvatar(null);
    setPhotoURL(null);
  };

  useEffect(() => {
    fetchFacutys({ model: "User", id: "", module, filter: { department: user?.schoolName, salutation: "Dr." }, }, setGuidesData, setGuides);
  }, [open]);

  // console.log(values.ResearchGuideId);

  const setResearchGuideId = () => {
    if (isGideListed) {
      setValues((pri) => {
        return {
          ...pri,
          ResearchGuideId: "",
        };
      });
    } else {
      guidesData.forEach((item) => {
        if (item.name == ResearchGuide) {
          setValues((pri) => {
            return {
              ...pri,
              ResearchGuideId: item._id,
            };
          });
        }
      });
    }
  };
  useEffect(() => {
    setResearchGuideId();
  }, [ResearchGuide]);

  useEffect(() => {
    if (itemToEdit && user) {
      const {
        salutation, name, programGraduated, address, mobile, schoolName, gender, dob, abcNo, ResearchGuide, Title, dateOfRac, ReceivesFelloship, ResearchGuideId, currentIn, cast, country, religion, programEnroledOn, programCompletedOn,
      } = user;
      if (user._id === itemToEdit) {
        setEdit(true);
        setOpen(true);
        setValues({
          salutation, name, programGraduated, address, mobile, schoolName, gender, dob, abcNo, ResearchGuide, Title, dateOfRac, ReceivesFelloship, ResearchGuideId, currentIn, cast, country, religion, programEnroledOn, programCompletedOn,
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemToEdit]);

  useEffect(() => {
    if (programGraduated) {
      SchoolsProgram?.[schoolName].forEach((programs) => {
        if (programs[0] === programGraduated) {
          setProgramDuration(
            Array.from(
              { length: programs[1] },
              (v, i) => `${i + 1}${getOrdinalSuffix(i + 1)}`
            )
          );
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programGraduated]);

  return (
    <div>
      <div className="bg-white sticky-top">
        <OnlyNav
          user={user}
          logout={{
            token: user?.isAlumni ? "alumni-token" : "student-token",
            link: siteLinks.welcome.link,
          }}
          heading={{
            title: isAlumniLink ? "Alumni" : "Student",
            link: siteLinks.welcome.link,
          }}
          li={[siteLinks.welcome, isAlumniLink? siteLinks.alumniChangePass: siteLinks.studentChangePass ]}
          userType="student"
        />
      </div>

      <div className="mt-2">
        <Bred links={[siteLinks.welcome, isAlumniLink ? siteLinks.alumniHome : siteLinks.studentHome,]} />
      </div>

      {user ? (
        <div>
          <div className="main-div xl:flex flex-row items-start my-3 gap-3 animate-fade-up animate-once">
            <div className="mb-3 md:mb-0 xl:h-screen">
              <div className="p-3 sm:flex flex-row xl:block items-start justify-start gap-4 bg-gray-50 rounded-lg border xl:h-full">
                <img alt="" src={serverLinks.showFile(user?.photoURL, "student")} className="h-[100px] w-[100px] sm:h-[150px] sm:w-[150px] xl:mx-auto rounded-full object-cover sm:mt-4 border- border-[#4566ac] sm:mx-10" />

                <div className="xl:mt-4">
                  <p className="text-lg sm:text-2xl font-bold">
                    {user && user.salutation} {capitalizeText(user?.name)}
                  </p>

                  <div className="text-left gap-2 mt-2">
                    <ContactTile
                      keyName="User"
                      value={`${user && user?.isAlumni
                          ? "Verified Alumni"
                          : "Verified Student"
                        }`}
                    />
                    <ContactTile
                      keyName="School"
                      value={`${(user && user?.schoolName) || "Not Added"}`}
                    />
                    <ContactTile
                      keyName="Email"
                      value={`${(user && user.email) || "Not Added"}`}
                    />
                    <ContactTile
                      keyName="Phone"
                      value={`${(user && user.mobile) || "Not Added"}`}
                    />
                  </div>

                  <div className="mt-3">
                    {/* <button type="button" className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 font-medium rounded-lg text-sm p-2 text-center inline-flex gap-2 items-center mr-2 mb-2">
                                        <ContactPageRoundedIcon />
                                        Download Resume
                                    </button> */}

                    <button type="button" className="text-black bg-yellow-300 hover:bg-yellow-400 font-medium rounded-lg text-sm p-2 text-center inline-flex gap-2 items-center mr-2 mb-2" onClick={() => { setOpen(true); setEdit(true); setItemToEdit(user?._id); }}>
                      <EditRoundedIcon />Edit Profile
                    </button>

                    <button
                      onClick={() => {
                        dispatch(
                          user?.isAlumni
                            ? setAlumniUser(null)
                            : setStudentUser(null)
                        );
                        navigate(siteLinks.welcome.link);
                        localStorage.removeItem(
                          user?.isAlumni ? "alumni-token" : "student-token"
                        );
                      }}
                      type="button"
                      className="text-gray-900 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm p-2 text-center inline-flex gap-2 items-center mr-2 mb-2"
                    >
                      <LogoutRoundedIcon />
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className=" font-medium text-gray-900 border border-gray-200 rounded-lg bg-gray-50">
                <p
                  aria-current="true"
                  className="w-full p-2 font-medium text-left text-black  border-b border-gray-200 rounded-t-lg "
                >
                  Other Relevant Information
                </p>
                <div className="w-full">
                  <OtherDetails
                    user={user}
                    editFunction={() => {
                      setOpen(true);
                      setEdit(true);
                      setItemToEdit(user?._id);
                    }}
                  />
                </div>
              </div>

              <div className="mt-3">
                <div className="accordion" id="accordionExample">
                  {navcom.map((item, index) => {
                    return ["studentJRFSRF"].includes(item.name) ? (
                      user?.programGraduated.includes("Ph.D") &&
                        user?.ReceivesFelloship == "Yes" &&
                        !user?.isAlumni ? (
                        <div className="accordion-item bg-gray-50 ">
                          <h2
                            className="accordion-header accordionHeader"
                            id={`heading-${index}`}
                          >
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse-${index}`}
                              aria-expanded="false"
                              aria-controls={`collapse-${index}`}
                            >
                              {item.value}
                            </button>
                          </h2>
                          <div
                            id={`collapse-${index}`}
                            className="accordion-collapse collapse"
                            aria-labelledby={`heading-${index}`}
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              <div key={item}>{item.element}</div>
                            </div>
                          </div>
                        </div>
                      ) : null
                    ) : [
                      "higherEducation",
                      "examQualified",
                      "jobs",
                      "business",
                      "alumniContribution",
                    ].includes(item.name) && !isAlumniLink ? null : (
                      <div className="accordion-item bg-gray-50 ">
                        <h2
                          className="accordion-header accordionHeader"
                          id={`heading-${index}`}
                        >
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse-${index}`}
                            aria-expanded="false"
                            aria-controls={`collapse-${index}`}
                          >
                            {item.value}
                          </button>
                        </h2>
                        <div
                          id={`collapse-${index}`}
                          className="accordion-collapse collapse"
                          aria-labelledby={`heading-${index}`}
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <div key={item}>{item.element}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {user?.programGraduated.includes("Ph.D") &&
                  user?.ReceivesFelloship == "Yes" &&
                  !user?.isAlumni && !guides.includes(user?.ResearchGuide) ? (
                  <div className="Stupb-2 pl-2 font-semibold text-lg">
                    Research Center
                  </div>
                ) : (
                  ""
                )}

                <div className="accordion" id="accordionExample1">
                  {ResearchCenter.map((item, index) => {
                    return user?.programGraduated.includes("Ph.D") &&
                      user?.ReceivesFelloship == "Yes" &&
                      !user?.isAlumni && !guides.includes(user?.ResearchGuide) ? (
                      <div className="accordion-item bg-gray-50 ">
                        <h2
                          className="accordion-header accordionHeader"
                          id={`heading1-${index}`}
                        >
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse1-${index}`}
                            aria-expanded="false"
                            aria-controls={`collapse1-${index}`}
                          >
                            {item.value}
                          </button>
                        </h2>
                        <div
                          id={`collapse1-${index}`}
                          className="accordion-collapse collapse"
                          aria-labelledby={`heading1-${index}`}
                          data-bs-parent="#accordionExample1"
                        >
                          <div className="accordion-body">
                            <div key={item}>{item.element}</div>
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-3 flex flex-col md:flex-row items-start gap-5">
          <div className="h-screen w-full bg-gray-50 border rounded-xl p-2">
            <div className="mx-auto w-[50%] mt-2">
              <Skeleton
                animation="wave"
                variant="circular"
                width={90}
                height={90}
              />
            </div>

            <div className="mt-3">
              <Skeleton
                animation="wave"
                height={60}
                width="80%"
                style={{ marginBottom: 6 }}
              />
              <Skeleton
                animation="wave"
                height={40}
                width="80%"
                style={{ marginBottom: 6 }}
              />
              <Skeleton
                animation="wave"
                height={40}
                width="80%"
                style={{ marginBottom: 6 }}
              />
              <Skeleton
                animation="wave"
                height={40}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            </div>
          </div>
          <div className="h-screen w-full">
            <div className="h-1/2 bg-gray-50 rounded-xl border p-2">
              <Skeleton
                variant="rectangular"
                sx={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="h-1/2 mt-3 bg-gray-50 rounded-xl border p-2">
              <Skeleton
                variant="rectangular"
                sx={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      )}

      <DialogBox
        title="Edit Profile"
        buttonName="Submit"
        isModalOpen={open}
        setIsModalOpen={setOpen}
        onClickFunction={onSubmit}
        onCancel={onCancel}
        maxWidth="lg" 
        loading={Loading}
      >
        {
          <div className="flex flex-wrap bg-gray-50 rounded-xl border p-2 ">
            <div className="flex-items-center justify-center flex-col w-full mb-4">
              {photoURL ? (
                <img alt=""
                  src={avatar}
                  className="h-[80px] w-[80px] sm:h-[120px] sm:w-[120px] rounded-full object-cover border-4 border-[#344e87] mx-auto"
                />
              ) : (
                <img alt=""
                  src={serverLinks.showFile(user?.photoURL, "student")}
                  className="h-[80px] w-[80px] sm:h-[120px] sm:w-[120px] rounded-full object-cover border-4 border-[#344e87] mx-auto"
                />
              )}
              <div className="flex items-center justify-center gap-3">
                <label
                  className=" bg-blue-100 md:mt-3 mt-1 p-1 rounded-xl text-blue-700 md:text-sm text-xs text-center cursor-pointer w-full duration-200 ease-in-out hover:bg-blue-200 hover:text-blue-800"
                  htmlFor="file"
                >
                  Choose Profile Photo
                </label>
                <input
                  type="file" name="file" id="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden mx-auto"
                  onChange={(e) => {
                    handleAvatarChange(
                      e,
                      setAvatar,
                      setPhotoURL,
                      setOpenCroper
                    );
                  }}
                />
                {photoURL && (
                  <button
                    className="w-[20%] bg-blue-100 md:mt-3 mt-1 p-1 rounded-xl text-blue-700 md:text-sm text-xs  duration-200 ease-in-out hover:bg-blue-200 hover:text-blue-800"
                    onClick={(e) => {
                      setPhotoURL(null);
                    }}
                  >
                    Reset Picture
                  </button>
                )}
              </div>
            </div>

            <Select
              className="col-md-2"
              id="salutation"
              value={salutation}
              label="Salutation"
              setState={setValues}
              options={Salutations}
            />
            <Text
              className="col-md-5"
              id="name"
              value={name}
              label="Full Name"
              setState={setValues}
            />
            <Text
              className="col-md-2"
              type="number"
              id="mobile"
              value={mobile}
              label="Mobile"
              setState={setValues}
            />
            <Select
              className="col-md-3"
              id="gender"
              value={gender}
              label="Gender"
              setState={setValues}
              options={genders}
            />
            <Text
              className="col-md-8 col-lg-8"
              id="address"
              value={address}
              label="Permanent Address"
              setState={setValues}
            />

            <Select
              className="col-md-4"
              id="programGraduated"
              value={programGraduated}
              label={isAlumniLink ? "Program Graduated" : "Enrolled Program"}
              setState={setValues}
              options={
                schoolName
                  ? SchoolsProgram?.[schoolName].map((item) => {
                    return item[0];
                  })
                  : []
              }
            />

            {!isAlumniLink && (
              <Select
                className="col-md-2"
                id="currentIn"
                value={currentIn}
                label="Admitted In"
                setState={setValues}
                options={programDuration ? programDuration : []}
              />
            )}

            <YearSelect
              className="col-md-2"
              id="programEnroledOn"
              value={programEnroledOn}
              label="Program Enrolled in"
              setState={setValues}
            />

            {isAlumniLink && (
              <YearSelect
                className="col-md-2"
                id="programCompletedOn"
                value={programCompletedOn}
                label="Program Completed in"
                setState={setValues}
              />
            )}

            <Text
              className="col-md-2"
              type="date"
              id="dob"
              value={dob}
              label="Date of birth"
              setState={setValues}
            />

            {/* {!isAlumniLink && <Text className='col-md-2' type="number" id="abcNo" value={abcNo} label="ABC ID" setState={setValues} />} */}

            <Select
              className="col-md-2"
              id="country"
              value={country}
              label="Nationality"
              setState={setValues}
              options={Lists.countrys}
            />

            <Select
              className="col-md-2"
              id="cast"
              value={cast}
              label="Category"
              setState={setValues}
              options={Casts}
            />

            <Select
              className="col-md-2"
              id="religion"
              value={religion}
              label="Religion"
              setState={setValues}
              options={religions}
            />

            {user?.isAlumni === true && (
              <UploadFile
                className="col-md-6 col-lg-4"
                id="uploadProof"
                label="Upload Alumni Proof"
                setState={setValues}
                required={user?.uploadProof == undefined ? true : false}
              />
            )}
            {programGraduated.includes("Ph.D") && user.isAlumni === false && (
              <>
                <Select
                  className="col-md-6 col-lg-3"
                  options={
                    guides
                      ? [
                        ...new Set([...guides, ResearchGuide || "", "Other"]),
                      ].filter((item) => item !== "")
                      : []
                  }
                  id="ResearchGuide"
                  value={ResearchGuide}
                  label="Research Guide"
                  setState={setValues}
                />

                {ResearchGuide === "Other" && (
                  <Text
                    className="col-md-6 col-lg-3"
                    id="otherGuide"
                    value={otherGuide}
                    label="Name of the Research Guide"
                    setState={setValues}
                  />
                )}
                <Text
                  className="col-md-2"
                  type="date"
                  id="dateOfRac"
                  value={dateOfRac}
                  label="Date of RAC"
                  setState={setValues}
                />
                <Text
                  className="col-md-7"
                  type="text"
                  id="Title"
                  value={Title}
                  label="Title"
                  setState={setValues}
                />
                <Select
                  className="col-md-6 col-lg-4"
                  options={["Yes", "No"]}
                  id="ReceivesFelloship"
                  value={ReceivesFelloship}
                  label="Receives any Fellowship?"
                  setState={setValues}
                />
              </>
            )}
          </div>
        }
      </DialogBox>
      <ProfileCroper
        open={openCroper}
        setOpen={setOpenCroper}
        file={photoURL}
        setFile={setPhotoURL}
        setAvatar={setAvatar}
      />
      <Footer />
    </div>
  );
};

export default StudentHome;

const OtherDetails = ({ user, editFunction }) => {
  return (
    <div className="p-2 lg:flex items-start justify-start gap-5 w-full">
      <div className="w-full md:w-full lg:w-[60%] xl:w-[40%]">
        <DetailTile
          editFunction={editFunction}
          keyName="Program Enrolled"
          value={`${user && user.programGraduated}`}
        />

        {!user?.isAlumni && (
          <DetailTile
            editFunction={editFunction}
            keyName="ABC ID"
            value={`${user && user.abcNo}`}
          />
        )}

        <DetailTile
          editFunction={editFunction}
          keyName="Category"
          value={`${user && user.cast}`}
        />
        <DetailTile
          editFunction={editFunction}
          keyName="Religion"
          value={`${user && user.religion}`}
        />
        <DetailTile
          editFunction={editFunction}
          keyName="Date Of Birth"
          value={`${user && user.dob}`}
        />
        <DetailTile
          editFunction={editFunction}
          keyName="Gender"
          value={`${user && user.gender}`}
        />
      </div>
      <div className="w-full md:w-full lg:w-[60%] xl:w-[60%]">
        <DetailTile
          editFunction={editFunction}
          keyName="Program Enrolled in"
          value={`${user && user.programEnroledOn}`}
        />
        {!user?.isAlumni && (
          <DetailTile
            editFunction={editFunction}
            keyName="Admitted In"
            value={`${user && user.currentIn}`}
          />
        )}
        {user?.isAlumni && (
          <DetailTile
            editFunction={editFunction}
            keyName="Program Completed in"
            value={`${user && user.programCompletedOn}`}
          />
        )}
        <DetailTile
          editFunction={editFunction}
          keyName="Nationality"
          value={`${user && user.country}`}
        />
        {user?.programGraduated.includes("Ph.D") && user.isAlumni === false && (
          <>
            <DetailTile
              editFunction={editFunction}
              keyName="Research Guide"
              value={`${user && user.ResearchGuide}`}
            />
            <DetailTile
              editFunction={editFunction}
              keyName="Date of RAC"
              value={`${user && user.dateOfRac}`}
            />
            <DetailTile
              editFunction={editFunction}
              keyName="Title"
              value={`${user && user.Title}`}
            />
            <DetailTile
              editFunction={editFunction}
              keyName="Receives any Fellowship"
              value={`${user && user.ReceivesFelloship}`}
            />
          </>
        )}
        <DetailTile
          editFunction={editFunction}
          keyName="Address"
          value={`${user && user?.address?.toUpperCase()}`}
        />
        {user?.isAlumni === true && (
          <DetailTile
            editFunction={editFunction}
            keyName="Alumni Proof"
            value={user && user.uploadProof}
            user={user}
          />
        )}
      </div>
    </div>
  );
};

const DetailTile = ({ keyName, value, editFunction, user }) => {
  return (
    <div className="grid grid-cols-2 py-2 text-black text-sm md:gap-1 gap-3">
      <p className="text-muted">{keyName}</p>
      <p className="">
        {value === undefined ||
          value === "undefined" ||
          value === "null" ||
          value === null ||
          value === "" ? (
          <span
            onClick={editFunction}
            className="bg-yellow-300 cursor-pointer hover:bg-yellow-200 px-2 py-1 rounded-full text-black text-xs"
          >
            Add Now
          </span>
        ) : keyName != "Alumni Proof" ? (
          value
        ) : (
          <FileViewer fileName={user.uploadProof} serviceName="student" />
        )}
      </p>
    </div>
  );
};

const ContactTile = ({ keyName, value }) => {
  let icons = {
    User: <CheckCircleRoundedIcon sx={{ width: "16px", color: "green" }} />,
    School: <MapsHomeWorkRoundedIcon sx={{ width: "15px" }} />,
    Phone: <LocalPhoneRoundedIcon sx={{ width: "15px" }} />,
    Email: <MailRoundedIcon sx={{ width: "15px" }} />,
  };

  return (
    <div className="flex items-center text-sm justify-start gap-2">
      {icons[keyName]} <span>{value}</span>
    </div>
  );
};

export { ContactTile, fetchFacutys };
