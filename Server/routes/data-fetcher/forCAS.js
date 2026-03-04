const { models, nonAcademicYearModels } = require("../faculty-routes/routes");

const stageObj = {
  stage1: {
    id: 1,
    title: "Stage 1 to 2 (AL 10 to AL 11)",
    stage: "stage1",
    inputData: [
      {
        title:
          "Attended one Orientation course of 21 days duration on teaching methodology",
        name: "stage1FDP",
        type: "file",
      },
      {
        title:
          "Completed Refresher/ Research Methodology Course/ Workshop/ Syllabus Up-gradation Workshop/ Training Teaching-Learning-Evaluation, Technology Programmes/ Faculty Development Programmes of at least one week (5 days) duration, or taken one MOOCs course (with ecertification) or development of e-contents in four-quadrants / MOOC's course during the assessment period",
        name: "stage1MultiProof",
        type: "file",
      },
      {
        title:
          "Published one research publication in the peer-reviewed journals or UGC-listed journals during assessment period.",
        type: "check",
        name: "publicationNumber",
      },
    ],
  },

  stage2: {
    id: 2,
    title: "Stage 2 to 3 (Assistant Professor)",
    stage: "stage2",
    inputData: [
      {
        title:
          "Ph.D. Degree in the subject relevant/allied/relevant discipline.",
        name: "phdDegree",
        type: "file",
      },
      {
        title:
          "Has done any one of the following in the last five years of Academic Level 11/Senior Scale: Completed a course / programme from amongst the categories of Refresher Courses/Research Methodology/Workshops/ Syllabus Up-gradation Workshop/ Teaching-Learning-Evaluation/ Technology Programmes / Faculty Development Programme of at least two weeks (tedays) duration (or completed two courses of at least one week (five days) duration in lieu of every single course/programme of at least two weeks (ten days) duration)",
        name: "stage2File1",
        type: "file",
      },
      {
        title:
          "Has done any one of the following in the last five years of Academic Level 11/Senior Scale: completed one MOOCs course in the relevant subject (with e-certification); or contribution towards the development of e-content in 4-quadrant (at least one quadrant) minimum of 10 modules of a course/contribution towards the development of at least 10 modules of MOOCs course/contribution towards conduct of a MOOCs course during the period of assessment.",
        name: "stage2File2",
        type: "file",
      },
      {
        title:
          "Published three research papers in the peer-reviewed journals or UGC-listed journals during assessment period",
        type: "check",
        name: "publicationNumber",
      },
    ],
  },

  stage3: {
    id: 3,
    title: "Stage 3 to 4 (Associate Professor)",
    stage: "stage3",
    inputData: [
      {
        title:
          "Ph.D. Degree in the subject relevant/allied/relevant discipline.",
        name: "phdDegree",
        type: "file",
      },
      {
        title: "Evidence of having successfully guided doctoral candidate.",
        name: "guideProof",
        type: "file",
      },
      {
        title:
          "Any one of the following during last three years: completed one course / programme from amongst the categories of Refresher Courses/ Research Methodology Workshops/Syllabus Up-gradation Workshop/Teaching-Learning-Evaluation Technology Programme/ Faculty Development Programme of at least two weeks (ten days) duration (or completed two courses of at least one week (five days) duration in lieu of every single course/programme of at least two weeks (ten days) duration); or completed one MOOCs course (with ecertification); or contribution towards the development of e-content in 4-quadrant (at least one quadrant) minimum of 10 modules of a course/contribution towards development of at least 10 modules of MOOCs course/ contribution towards conduct of a MOOCs course during the period of assessment.",
        name: "guideProof2",
        type: "file",
      },
      {
        title:
          "A minimum of seven publications in the peer-reviewed or UGC-listed journals out of which three research papers should have been published during the assessment period.",
        type: "check",
        name: "isResearchPaper",
      },
    ],
  },
  stage4: {
    id: 4,
    title: "Stage 4 to 5 (Professor)",
    stage: "stage4",
    inputData: [
      {
        title:
          "Ph.D. Degree in the subject relevant/allied/relevant discipline.",
        name: "phdDegree",
        type: "file",
      },
      {
        title:
          "Degree 1: Ph.D. degree has been successfully awarded to a candidates under his/her supervision.",
        name: "guideProof1",
        type: "file",
      },
      {
        title:
          "Degree 2: Ph.D. degree has been successfully awarded to a candidates under his/her supervision.",
        name: "guideProof2",
        type: "file",
      },
      {
        title: "Proof of Three years experience as a Associate Professor",
        type: "file",
        name: "experience",
      },
      {
        title:
          "A minimum of ten publications in the peer-reviewed or UGC-listed journals out of which three Research Papers should have been published during the assessment period.",
        type: "check",
        name: "isPublication",
      },
    ],
  },

  stage5: {
    id: 5,
    title: "Stage 5 to 6 (Senior Professor)",
    stage: "stage5",
    inputData: [
      {
        title: "Proof of Ten years experience as a Professor",
        type: "file",
        name: "experience",
      },
      {
        title: "Ten publications in the peer-reviewed or UGC-listed journals",
        type: "check",
        name: "publicationNumber",
      },
      { title: "Ph.D. Degree of Canditate 1", name: "phdProof1", type: "file" },
      { title: "Ph.D. Degree of Canditate 2", name: "phdProof2", type: "file" },
    ],
  },
};

async function fetchDataForCAS(fetchYears, userId) {
  const ResearchPaper = await models.ResearchPaper.find({
    year: { $in: fetchYears },
    userId: userId,
  })
    .sort({ _id: -1 })
    .lean();
  const BookAndChapter = await models.BookAndChapter.find({
    year: { $in: fetchYears },
    userId: userId,
  })
    .sort({ _id: -1 })
    .lean();
  const PhdAwarded = await models.PhdAwarded.find({
    year: { $in: fetchYears },
    userId: userId,
  })
    .sort({ _id: -1 })
    .lean();
  const ResearchProject = await models.ResearchProject.find({
    year: { $in: fetchYears },
    userId: userId,
  })
    .sort({ _id: -1 })
    .lean();
  const ConsultancyServices = await models.ConsultancyServices.find({
    year: { $in: fetchYears },
    userId: userId,
  })
    .sort({ _id: -1 })
    .lean();
  const Patent = await models.Patent.find({
    year: { $in: fetchYears },
    userId: userId,
  })
    .sort({ _id: -1 })
    .lean();
  const PolicyDocuments = await models.PolicyDocuments.find({
    year: { $in: fetchYears },
    userId: userId,
  })
    .sort({ _id: -1 })
    .lean();
  const AwardRecognition = await models.AwardRecognition.find({
    year: { $in: fetchYears },
    userId: userId,
  })
    .sort({ _id: -1 })
    .lean();
  const Fellowship = await models.Fellowship.find({
    year: { $in: fetchYears },
    userId: userId,
  })
    .sort({ _id: -1 })
    .lean();
  const InvitedTalk = await models.InvitedTalk.find({
    year: { $in: fetchYears },
    userId: userId,
  })
    .sort({ _id: -1 })
    .lean();

  const scoreRelatedData = {
    ResearchPaper,
    BookAndChapter,
    PhdAwarded,
    ResearchProject,
    ConsultancyServices,
    Patent,
    PolicyDocuments,
    AwardRecognition,
    Fellowship,
    InvitedTalk,
  };

  return scoreRelatedData;
}

async function fetchBasicDataForCAS(fetchYears, userId) {
  // general info data
  const Degree = await models.Degree.find({ userId: userId }).lean();
  const PostHeld = await models.PostHeld.find({ userId: userId }).lean();
  const Online = await models.Online.find({
    year: { $in: fetchYears },
    userId: userId,
  }).lean();

  return [...(Degree || []), ...(PostHeld || []), ...(Online || [])];
}

function fetchEligibilityProofs(
  reportType,
  level,
  eligData,
  casArray,
  academicData
) {
  let eligProofs;

  if (reportType === "CAS") {
    if (level !== "stage4") {
      eligProofs = stageObj?.[level]?.inputData
        ?.map((inputData) => {
          return (
            eligData?.[inputData.name]?.[0]?.filename &&
            `${process.env.REACT_APP_MAIN_URL}/showFile/${
              eligData?.[inputData.name]?.[0]?.filename
            }/CAS`
          );
        })
        .filter((item) => item !== undefined);
    }

    if (level === "stage4") {
      eligProofs = stageObj?.[level]?.inputData
        ?.map((inputData, index) => {
          return index === 2 && eligData["supervisor"] === "Main Supervisor"
            ? null
            : eligData?.[inputData.name]?.[0]?.filename &&
                `${process.env.REACT_APP_MAIN_URL}/showFile/${
                  eligData?.[inputData.name]?.[0]?.filename
                }/CAS`;
        })
        .filter((item) => item !== undefined);
    }
  }

  let impactProof = [];
  let directorProof = [];
  let activityProof = [];

  casArray.forEach((casItem) => {
    let proofs, dirProof, actProof;

    // impact factor proofs
    let filteredAcademicData = academicData?.filter((a) => {
      return casItem.academicData?.["researchPaper"]?.dataMap?.includes(
        a._id.toHexString()
      );
    });

    proofs = filteredAcademicData
      .map((modelItem) => {
        return (
          casItem.academicData?.["researchPaper"].scoreMap?.[modelItem._id]
            ?.refreedIFProof &&
          `${process.env.REACT_APP_MAIN_URL}/showFile/${
            casItem.academicData?.["researchPaper"].scoreMap?.[modelItem._id]
              ?.refreedIFProof?.file?.[0].filename
          }/CAS`
        );
      })
      .filter((item) => item !== undefined);

    // director proof
    if (casItem?.teachingData?.uploadedAttendance) {
      dirProof = `${process.env.REACT_APP_MAIN_URL}/showFile/${casItem?.teachingData?.uploadedAttendance?.file[0]?.filename}/CAS`;
    }

    // activity proofs
    if (casItem?.teachingData?.checkBoxSelected?.length > 1) {
      actProof = casItem?.teachingData?.checkBoxSelected?.map((checkBoxId) => {
        return (
          casItem?.teachingData?.uploadedFiles?.[`file-${checkBoxId}`]
            ?.filename &&
          `${process.env.REACT_APP_MAIN_URL}/showFile/${
            casItem?.teachingData?.uploadedFiles?.[`file-${checkBoxId}`]
              ?.filename
          }/CAS`
        );
      });
    }

    impactProof = [...impactProof, ...(proofs || [])];
    directorProof = [...directorProof, dirProof];
    activityProof = [...activityProof, ...(actProof || [])];
  });

  return { eligProofs, impactProof, directorProof, activityProof };
}

module.exports = {
  fetchDataForCAS,
  fetchBasicDataForCAS,
  fetchEligibilityProofs,
};
