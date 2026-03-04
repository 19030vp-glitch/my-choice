import React, { useEffect, useState } from 'react'
import AddPaper from './AddPaper';
import { BGPad, Remark } from './Teaching';
import Publications from './Publications';
import { useDispatch, useSelector, } from 'react-redux';
import { setAcademicTable, setCasYear, setTeachingTable } from '../../../../../redux/slices/CASSlice';
import { SaveButton } from '../CasReportHome';
import ContentCreated from './ContentCreated';
import ResearchGuide from './ResearchGuide';
import PolicyDocuments from './PolicyDocuments';
import InvitedLectures from './InvitedLectures';
import { saveCASDetails } from '../CASServices';
import Conference from './Conference';


const AcademicScore = ({ casDate, setTabName, handleNext, serverCasData, casYearState, teachingData, saveLoader, setSaveLoader }) => {

    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const fetchYears = useSelector(state => state.cas.fetchYears)

    // states
    const [researchPaper, setResearchPaper] = useState({ input: 0, faculty: {}, authorType: {}, paperType: {}, multipleAuthorType: {}, points: {}, totalScore: 0, paperTitle: null, journalName: null, publicationYear: null, issnNumber: null, year: null, proof: null, scoreMap: {}, dataMap: [], })

    const [publicationData, setPublicationData] = useState({
        teacherName: null, titleOfBook: null, paperTitle: null, authorEditor: null, titleOfProceeding: null, conName: null, isNat: null, publicationYear: null, issnNumber: null, aff: null, publisherName: null, schoolName: null, year: null, proof: null, scoreMap: {}, dataMap: [], totalScore: 0
    });

    const [ictData, setIctData] = useState({
        moduleName: null, creationType: null, platform: null, year: null, link: null,
        scoreMap: {}, dataMap: [], totalScore: 0
    })
    const [researchGuide, setResearchGuide] = useState({
        schoolName: null, departmentName: null, guideName: null, thesisTitle: null, degreeName: null, awardSubmit: null, yearOfScholar: null, phdAwardYear: null, year: null, proof: null, scoreMap: {}, dataMap: [], totalScore: 0
    })

    const [researchProjects, setResearchProjects] = useState({ scoreMap: {}, dataMap: [], totalScore: 0 })
    const [consultancy, setConsultancy] = useState({ scoreMap: {}, dataMap: [], totalScore: 0 })

    const [patents, setPatents] = useState({ scoreMap: {}, dataMap: [], totalScore: 0, patenterName: null, patentTitle: null, patentNumber: null, isNat: null, awardYear: null, year: null, proof: null })

    const [policyDocuments, setPolicyDocuments] = useState({ scoreMap: {}, dataMap: [], totalScore: 0 })
    const [awards, setAwards] = useState({ scoreMap: {}, dataMap: [], totalScore: 0 })
    const [fellow, setFellow] = useState({ scoreMap: {}, dataMap: [], totalScore: 0 })


    const [invitedTalks, setInvitedTalks] = useState({ scoreMap: {}, dataMap: [], totalScore: 0 })
    const [conference, setConference] = useState({ scoreMap: {}, dataMap: [], totalScore: 0 })


    // setting researchPaper with serverCasData
    useEffect(() => {
        setResearchPaper(serverCasData ? serverCasData?.academicData?.researchPaper : { input: 0, faculty: {}, authorType: {}, paperType: {}, multipleAuthorType: {}, points: {}, totalScore: 0, paperTitle: null, journalName: null, publicationYear: null, issnNumber: null, year: null, proof: null, scoreMap: {}, dataMap: [] })

        setPublicationData(serverCasData ? serverCasData?.academicData?.publicationData : { teacherName: null, titleOfBook: null, paperTitle: null, authorEditor: null, titleOfProceeding: null, conName: null, isNat: null, publicationYear: null, issnNumber: null, aff: null, publisherName: null, schoolName: null, year: null, proof: null, scoreMap: {}, dataMap: [], totalScore: 0, })


        setIctData(serverCasData ? serverCasData?.academicData?.ictData : {
            moduleName: null, creationType: null, platform: null, year: null, link: null,
            scoreMap: {}, dataMap: [], totalScore: 0
        })


        setResearchGuide(serverCasData ? serverCasData?.academicData?.researchGuide : {
            schoolName: null, departmentName: null, guideName: null, thesisTitle: null, degreeName: null, awardSubmit: null, yearOfScholar: null, phdAwardYear: null, year: null, proof: null, scoreMap: {}, dataMap: [], totalScore: 0
        })

        setResearchProjects(serverCasData ? serverCasData?.academicData?.researchProjects : { scoreMap: {}, dataMap: [], totalScore: 0 })

        setConsultancy(serverCasData ? serverCasData?.academicData?.consultancy : { scoreMap: {}, dataMap: [], totalScore: 0, })

        setPatents(serverCasData ? serverCasData?.academicData?.patents : { scoreMap: {}, dataMap: [], totalScore: 0, })

        setPolicyDocuments(serverCasData ? serverCasData?.academicData?.policyDocuments : { scoreMap: {}, dataMap: [], totalScore: 0, })

        setAwards(serverCasData ? serverCasData?.academicData?.awards : { scoreMap: {}, dataMap: [], totalScore: 0, })
        setFellow(serverCasData ? serverCasData?.academicData?.fellow : { scoreMap: {}, dataMap: [], totalScore: 0, })
        setInvitedTalks(serverCasData ? serverCasData?.academicData?.invitedTalks : { scoreMap: {}, dataMap: [], totalScore: 0, })
        setConference(serverCasData ? serverCasData?.academicData?.conference : { scoreMap: {}, dataMap: [], totalScore: 0, })



    }, [serverCasData && serverCasData, casYearState])



    // function for saving data
    const saveCASInformation = () => {
        let casSchema = {
            casYear: casYearState,
            fetchYears: fetchYears && fetchYears,
            teachingData,
            casDuration: casDate,
            academicData: {
                researchPaper, publicationData, ictData, researchGuide, policyDocuments, researchProjects, consultancy, awards, patents, policyDocuments, fellow, invitedTalks, conference
            }
        }




        let academicData = {
            researchPaper, publicationData, ictData, researchGuide, policyDocuments, researchProjects, consultancy, awards, patents, policyDocuments, fellow, invitedTalks, conference
        }


        dispatch(setCasYear(casYearState))
        dispatch(setTeachingTable(teachingData))
        dispatch(setAcademicTable(academicData))

        user && saveCASDetails(casSchema, user?._id, setSaveLoader)
    }

    // saving data on saveLoader becomes true
    useEffect(() => {
        saveLoader && saveCASInformation()
    }, [saveLoader])

    return (
        <div className="w-full">


            <div className='my-3 text-lg'>
                <p className='font-bold text-xl'>Academic / Research Activities</p>

                {/* 1.Research papers */}
                <div>

                    <AddPaper setResearchPaper={setResearchPaper} researchPaper={researchPaper}
                        casYearState={casYearState} saveLoader={saveLoader} setSaveLoader={setSaveLoader} />
                </div>


                {/* 2.Publications */}

                <div classes='mt-4'>
                    <Publications setPublicationData={setPublicationData} publicationData={publicationData} casYearState={casYearState} saveLoader={saveLoader} setSaveLoader={setSaveLoader} />
                </div>


                {/* 3. Creation of ICT */}
                <div classes='mt-4'>
                    <ContentCreated setIctData={setIctData} ictData={ictData} serverCasData={serverCasData} casYearState={casYearState} saveLoader={saveLoader} setSaveLoader={setSaveLoader} />
                </div>

                {/* 4. Research Guidance & Projects */}
                <div classes='mt-4'>
                    <ResearchGuide setResearchGuide={setResearchGuide} researchGuide={researchGuide} serverCasData={serverCasData} setResearchProjects={setResearchProjects} researchProjects={researchProjects} setConsultancy={setConsultancy} consultancy={consultancy} casYearState={casYearState} saveLoader={saveLoader} setSaveLoader={setSaveLoader} />
                </div>


                {/* 5. Patents/Policy Documents */}
                <div>
                    <PolicyDocuments setPolicyDocuments={setPolicyDocuments} policyDocuments={policyDocuments} patents={patents}
                        setPatents={setPatents} setAwards={setAwards}
                        awards={awards} fellow={fellow} setFellow={setFellow}
                        serverCasData={serverCasData} casYearState={casYearState} saveLoader={saveLoader} setSaveLoader={setSaveLoader} />
                </div>


                {/* 6. Invited Talks */}
                <div>
                    <InvitedLectures setInvitedTalks={setInvitedTalks} invitedTalks={invitedTalks} casYearState={casYearState} saveLoader={saveLoader} setSaveLoader={setSaveLoader} />
                </div>

                <div>
                    <Conference setConference={setConference} conference={conference} casYearState={casYearState} saveLoader={saveLoader} setSaveLoader={setSaveLoader} />
                </div>



                {/* 7.save  */}

                <BGPad classes='mt-4 text-base'>
                    <div>

                        Save Academic Information
                        <p className='text-gray-500 text-sm'>Note : Save Academic Information by clicking on Save Academic Information Button below</p>

                        <div className='mt-4'>
                            <SaveButton title="Save and Proceed"
                                onClickFunction={() => { setTabName('final'); handleNext(); }} />
                        </div>
                    </div>
                </BGPad>



            </div>
        </div>
    )
}

export default AcademicScore


