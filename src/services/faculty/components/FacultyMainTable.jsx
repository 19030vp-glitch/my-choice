import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MainTable from '../../../components/MainTable';
import allTableHeads from '../../admin/js/allTableHeads';
import { academicYearGenerator } from '../../../inputs/Year';
import Lists from '../../../components/tableComponents/Lists';
//icon
import TvRoundedIcon from '@mui/icons-material/TvRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import SentimentVerySatisfiedRoundedIcon from '@mui/icons-material/SentimentVerySatisfiedRounded';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import DocumentScannerRoundedIcon from '@mui/icons-material/DocumentScannerRounded';
import ConnectWithoutContactRoundedIcon from '@mui/icons-material/ConnectWithoutContactRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import HeadsetMicRoundedIcon from '@mui/icons-material/HeadsetMicRounded';
import CoPresentRoundedIcon from '@mui/icons-material/CoPresentRounded';
import CloudIcon from '@mui/icons-material/Cloud';
import SchoolIcon from '@mui/icons-material/School';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import TourRoundedIcon from '@mui/icons-material/TourRounded';

const modifyObject = (Obj) => {
    const result = { ...Obj };
    delete result["userId.name"];
    delete result["userId.department"];
    result.Action = "Action";
    return result
}

export { modifyObject }

const FacultyTables = {

    Qualification: {
        title: "Qualifications",
        typeObject: { exam: 'text', institute: 'text', year: 'number', percentage: 'text', subjects: 'text' },
        tableHead: modifyObject(allTableHeads.Qualification),
        icon: <SchoolIcon className='text-lg' />
    },

    Degree: {
        title: "Research Degree(s)",
        typeObject: { degreeName: 'text', title: 'text', subject: 'text', university: 'text', awardDate: 'text', Proof: 'proof' },
        tableHead: modifyObject(allTableHeads.Degree),
        icon: <WorkspacePremiumIcon className='text-lg' />
    },

    AppointmentsHeldPrior: {
        title: "Appointments held prior to joining this institute",
        typeObject: { designation: 'text', employerName: 'text', joiningDate: 'date', leavingDate: 'date', salaryWithGrade: 'text', leavingReason: 'text' },
        tableHead: modifyObject(allTableHeads.AppointmentsHeldPrior),
        icon: <CoPresentRoundedIcon className='text-lg' />
    },

    Lectures: {
        title: "Lectures, Seminars, Tutorials, Practicals, Contact Hours",
        typeObject: { course: 'text', level: 'text', teachingMode: 'text', noOfClasses: 'number', classesTaken: "number", year: 'academicYears' },
        tableHead: modifyObject(allTableHeads.Lectures),
        icon: <TvRoundedIcon className='text-lg' />
    },

    Online: {
        title: "Online/Face-to-face Faculty Development Programmes(FDP)",
        typeObject: { programTitle: 'text', nameOfAttendedTeacher: 'text', durationFrom: 'date', durationTo: 'date', year: 'academicYears', Proof: 'proof' },
        tableHead: modifyObject(allTableHeads.Online),
        icon: <SentimentVerySatisfiedRoundedIcon className='text-lg' />
    },

    ConferenceParticipated: {
        title: "Conference Participated",
        typeObject: { programTitle: 'text', organizingInstitute: 'text', fundedBy: 'text', isNational: Lists.bookChapConfIsNat, year: 'academicYears', Proof: 'proof' },
        tableHead: modifyObject(allTableHeads.ConferenceParticipated),
        icon: <ConnectWithoutContactIcon className='text-lg' />
    },

    FinancialSupport: {
        title: "Financial Support To Attend Conferences",
        typeObject: { nameOfConference: 'text', feeprovider: 'text', amountOfSupport: 'number', pan: 'text', year: 'academicYears', Proof: 'proof' },
        tableHead: modifyObject(allTableHeads.FinancialSupport),
        icon: <CurrencyRupeeIcon className='text-lg' />
    },

    EContentDeveloped: {
        title: "E-Content Developed",
        typeObject: { moduleName: 'text', creationType: Lists.eContentCreation, platform: Lists.eContentPlatform, year: 'academicYears', link: 'text', Proof: 'proof' },
        tableHead: modifyObject(allTableHeads.EContentDeveloped),
        icon: <CloudIcon className='text-lg' />,
        link: "link",
    },

    Patent: {
        title: "Patents published / awarded",
        typeObject: { type: Lists.patentType, patentNumber: 'text', patenterName: 'text', patentTitle: 'text', status: Lists.patentStatus, isNat: Lists.bookChapConfIsNat, awardYear: 'number', fieldDate: 'date', publishedDate: 'date', year: 'academicYears', Proof: 'proof' },
        tableHead: modifyObject(allTableHeads.Patent),
        icon: <DocumentScannerRoundedIcon className='text-lg' />,
        stateSetter: { patenterName: 'name' }
    },

    ConsultancyServices: {
        title: "Consultancy Services",
        typeObject: { cName: 'text', cProjectName: 'text', cAgency: 'text', cYear: 'number', revenue: 'number', year: 'academicYears', Proof: 'proof' },
        tableHead: modifyObject(allTableHeads.ConsultancyServices),
        icon: <ConnectWithoutContactRoundedIcon className='text-lg' />,
        stateSetter: { cName: 'name' }
    },

    Collaboration: {
        title: "Collaborations",
        typeObject: { collabTitle: 'text', agencyName: 'text', participantName: 'text', collabYear: 'number', duration: 'text', activityNature: 'text', year: 'academicYears', Proof: 'proof' },
        tableHead: modifyObject(allTableHeads.Collaboration),
        icon: <GroupRoundedIcon className='text-lg' />,
    },

    AwardRecognition: {
        title: "Award Recognition",
        typeObject: { teacherName: 'text', awardYear: 'date', pan: 'text', designation: 'text', awardName: 'text', isNat: Lists.bookChapConfIsNat, agencyName: "text", incentive: "text", year: 'academicYears', Proof: 'proof' },
        tableHead: modifyObject(allTableHeads.AwardRecognition),
        icon: <EmojiEventsRoundedIcon className='text-lg' />,
        stateSetter: { teacherName: 'name' }
    },

    Fellowship: {
        title: "Fellowship/Financial assistance for advanced studies/research",
        typeObject: { awardName: 'text', awardingAgency: 'text', awardYear: 'number', isNat: Lists.bookChapConfIsNat, year: 'academicYears', Proof: 'proof' },
        tableHead: modifyObject(allTableHeads.Fellowship),
        icon: <AttachMoneyRoundedIcon className='text-lg' />,
        stateSetter: { awardName: 'name' }
    },

    InvitedTalk: {
        title: "Invited Talks / Resource Person / Paper presentation",
        typeObject: { lectureTitle: 'text', seminarTitle: 'text', organizedBy: 'text', talkDate: 'date', isNat: Lists.patentIsNat, nature: Lists.invitedtalkNature, year: 'academicYears', Proof: 'proof' },
        tableHead: modifyObject(allTableHeads.InvitedTalk),
        icon: <HeadsetMicRoundedIcon className='text-lg' />,
    },

    PolicyDocuments: {
        title: "Policy Documents",
        typeObject: { policyName: 'text', organizationName: Lists.policyDocOrgType, isNat: Lists.policyDocIsNat, year: 'academicYears', Proof: 'proof' },
        tableHead: modifyObject(allTableHeads.PolicyDocuments),
        icon: <ArticleRoundedIcon className='text-lg' />,
    },

    ForeignVisit: {
        title: "Foreign Visits",
        typeObject: { purposeOfVisit: 'text', nameOfTheInstitutionVisited: 'text', fromDate: 'date', toDate: 'date', year: 'academicYears' },
        tableHead: modifyObject(allTableHeads.ForeignVisit),
        icon: <TourRoundedIcon className='text-lg' />
    },

};

const FacultyMainTable = ({ model, academicYear, extraFilter, year = "year", getproof = "proof", showTable = true, title = null }) => {


    const facultyUser = useSelector((state) => state.user?.user);
    const link = FacultyTables?.[model]?.link ? FacultyTables?.[model]?.link : null
    const _id = facultyUser?._id;
    const school = facultyUser?.department;
    const [typeObject, setTypeObject] = useState(null)
    const [icon, setIcon] = useState(null);
    const tableHead = FacultyTables?.[model]?.tableHead
    const [initialState, setInitialState] = useState({});
    const [excelTypeObject, setExcelTypeObject] = useState(null);
    let stateSetter = FacultyTables?.[model]?.stateSetter
    const academicYears = academicYear || academicYearGenerator(29, true, true);
    const module = "faculty"
    const filter = { userId: _id }
    if (academicYear) {
        filter.year = { $in: academicYear }
    }
    if (extraFilter) {
        Object.assign(filter, extraFilter)
    }
    useEffect(() => {
        if (facultyUser) {
            let newTypeObject = FacultyTables?.[model]?.typeObject
            let excelTypeObject = { ...newTypeObject }
            if (excelTypeObject.hasOwnProperty("Proof")) {
                delete excelTypeObject.Proof
            }
            setExcelTypeObject(excelTypeObject);
            setIcon(FacultyTables?.[model]?.icon)
            for (const key in newTypeObject) {
                if (newTypeObject[key] === 'academicYears') {
                    newTypeObject[key] = academicYears;
                }
                if (typeof stateSetter === 'object' && stateSetter !== null && stateSetter.hasOwnProperty([key])) {
                    let value = null
                    if (stateSetter[key] === "school") {
                        value = school
                    }
                    else if (stateSetter[key] === "name") {
                        value = `${facultyUser.salutation} ${facultyUser.name}`
                    }
                    setInitialState(prev => ({ ...prev, [key]: value }));
                }
                else {
                    setInitialState(prev => ({ ...prev, [key]: '' }));
                }
            }
            setInitialState(prev => ({ ...prev, userId: _id }));
            setTypeObject(() => newTypeObject)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [model, facultyUser])

    return (
        <div>
            {(_id && typeObject) && <MainTable tableHead={tableHead} typeObject={typeObject} model={model} module={module} title={title || FacultyTables?.[model]?.title} getproof={getproof} initialstate={initialState} filter={filter} excelTypeObject={excelTypeObject} year={year} showTable={showTable} link={link} icon={icon} />}
        </div>
    )
}

export default FacultyMainTable
export { FacultyTables }