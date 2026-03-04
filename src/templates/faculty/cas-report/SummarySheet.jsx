import React from 'react'
import LabelImportantRoundedIcon from '@mui/icons-material/LabelImportantRounded';
import { Remark } from '../../../services/faculty/reports/cas/content/Teaching';
import { ViewFile } from './Tables';
import { useEffect } from 'react';


const SummarySheet = ({ casArray, title = "CAS", showFileURL = "casDirURL", forPrintOut }) => {
    return (
        <div className='academic-start'>
            {title === 'CAS' && <p className="academic-start"></p>}
            <p className="text-center font-bold text-lg md:text-xl mb-5 mt-3 underline underline-offset-8">{title} Summary Sheet of Year {casArray.map((cas) => cas.casYear).join(', ')}</p>

            <div>
                {/* Table 1 */}
                <Teaching casArray={casArray} showFileURL={showFileURL} forPrintOut={forPrintOut} />

                {/* Table 2 */}
                <ResearchScore casArray={casArray} title={title} forPrintOut={forPrintOut} />


            </div>



        </div>
    )
}

export default SummarySheet


const Teaching = ({ casArray, showFileURL, forPrintOut }) => {

    return (
        <div>

            {/* // HEADING */}
            <p className={`text-center ${forPrintOut === 'false' && "bg-[#00987936] text-[#009879]"} my-2 p-2`}>Table 1 : <span className="font-bold">Teaching and Teaching Related Activities</span></p>

            {/* // Activity Reference Sheet */}
            <div className="p-2 border-2 rounded-md my-3">
                <h5 className={`card-title ${forPrintOut === 'false' && "bg-[#009879] text-white"} font-bold p-2 rounded-md`} >Student / Research related activities : </h5>
                <hr />
                <p className="card-text w-[70%] mt-3">
                    <strong>[A]</strong> Administrative responsibilities such as Head / Chairperson / Dean / Director /
                    Coordinator / Warden etc. <br /><br />

                    <strong>[B]</strong> Examination and evaluation duties assigned by the college / university or attending the
                    examination paper evaluation. <br /><br />

                    <strong>[C]</strong> Student related co-curricular, extension and field based activities such as student
                    clubs, career counselling, study visits, student seminars and other events, cultural,
                    sports, NCC, NSS and community services. <br /><br />

                    <strong>[D]</strong> Organising seminars / conferences / workshops and other college or university
                    activities. <br /><br />

                    <strong>[E]</strong> Evidence of actively involved in guiding Ph.D. students. <br /><br />

                    <strong>[F]</strong> At least one single or joint publication in peer-reviewed or UGC list of journals.
                    <br /><br />

                    <strong>[G]</strong> Conducting minor or major research project sponsored by National or International agencies.</p>
            </div>


            {/* // TABLE */}
            <div>
                <table className={`table mx-auto mt-3 table-bordered text-sm md:text-base ${forPrintOut === 'true' && "border-dark"}`}>
                    <thead className={`${forPrintOut === 'false' && "bg-[#009879] text-white"}`}>
                        <tr>
                            <th scope="col" className='w-16'>Sr No.</th>
                            <th scope="col">Activity</th>

                            {/* mapping of years */}
                            {casArray.map((item) => { return (<th className="w-[20%]">{item.casYear}</th>); })}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-[#009879]'>
                            <th scope="row">1</th>
                            <td><b>Teaching</b></td>
                            {
                                casArray.map((item) => {
                                    return <td><b className='mr-3'>{item?.teachingData?.teachingGrade}%</b>
                                        <Remark title={item?.teachingData?.teachingRemark} color={item?.teachingData?.teachingRemarkColor} />
                                        {/* <div className='my-4'>
                                            {
                                                item?.teachingData?.uploadedAttendance ? <ViewFile fileName={item?.teachingData?.uploadedAttendance?.file[0]?.filename} attendance={true} type={showFileURL} /> : <p className='text-red-600'>Director Certificate N/A</p>
                                            }
                                        </div> */}

                                    </td>
                                })
                            }
                        </tr>
                        <tr >
                            <th scope="row" className='text-[#009879]'>2</th>
                            <td>
                                <div>
                                    <b className='text-[#009879]'>Involvement in University / College students related activities / Research activities</b> <br />
                                    <p className='text-muted text-sm'> Note : Please take reference to Activities A, B, C, D, E, F & G from above table.</p>

                                </div>

                            </td>
                            {
                                casArray.map((item) => {
                                    return <td className='text-[#009879]'>Involved in <span className='font-bold'>{item?.teachingData?.checkBoxCount}</span> {item?.teachingData?.checkBoxCount > 1 ? 'Activities' : 'Activity'}  <br />
                                        {item?.teachingData?.checkBoxSelected?.length < 1 ?
                                            <b>0</b> : item?.teachingData?.checkBoxSelected?.map((checkBoxId) => {
                                                return <div className="flex items-center mt-3 mb-2 justify-start gap-2 px-3 border rounded-md">
                                                    <b> {checkBoxId} </b>
                                                    <div>
                                                        {
                                                            item?.teachingData?.uploadedFiles?.[`file-${checkBoxId}`]?.filename ? <ViewFile fileName={item?.teachingData?.uploadedFiles?.[`file-${checkBoxId}`]?.filename} type={showFileURL} small={true} /> : <p className='text-red-600'>Proof N/A</p>
                                                        }

                                                    </div>
                                                </div>;
                                            })}

                                        <div className="mt-2">
                                            {
                                                item?.teachingData?.checkBoxCount > 2 ?
                                                    <Remark title='Good' color='green' /> :
                                                    item?.teachingData?.checkBoxCount >= 1 ?
                                                        <Remark title='Satisfactory' color='yellow' /> :
                                                        <Remark title='Not-Satisfactory' color='red' />
                                            }
                                        </div>
                                    </td >
                                })}

                        </tr >

                    </tbody >
                </table >
            </div >

        </div >
    )
}


const ResearchScore = ({ casArray, title, forPrintOut }) => {

    useEffect(() => {
        console.log("casArray :", casArray)
    }, [casArray])

    let allYearTotalSum = 0;
    let allYearTotalCappedSum = 0;

    let policyAndTalkTotalScore = 0;


    casArray.forEach((item) => {
        let totalGuidanceProjectScore = item?.academicData.researchGuide.totalScore + item?.academicData.researchProjects.totalScore + item?.academicData.consultancy.totalScore

        item.totalGuidanceProjectScore = totalGuidanceProjectScore

        let totalPatentPolicyScore = item?.academicData.patents.totalScore + item?.academicData.policyDocuments.totalScore + item?.academicData.awards.totalScore + item?.academicData.fellow.totalScore

        item.totalPatentPolicyScore = totalPatentPolicyScore

        let totalInvitedConferenceScore = item?.academicData.invitedTalks.totalScore + (item?.academicData?.conference?.totalScore || 0)

        item.totalInvitedConferenceScore = totalInvitedConferenceScore

        let totalScore = item?.academicData.researchPaper.totalScore + item?.academicData.publicationData.totalScore + item?.academicData.ictData.totalScore + totalGuidanceProjectScore + totalPatentPolicyScore + totalInvitedConferenceScore




        // this is main total score 
        item.totalScore = totalScore

        // capping
        let cappedScore = (totalScore * 30) / 100

        // for 5(b)
        let policyCapScore = 0

        // for 6
        let talkCapScore = 0

        item.academicData?.policyDocuments.totalScore > cappedScore ? policyCapScore = cappedScore : policyCapScore = item.academicData?.policyDocuments.totalScore

        item.academicData?.invitedTalks.totalScore > cappedScore ? talkCapScore = cappedScore : talkCapScore = item.academicData?.invitedTalks.totalScore

        item.policyCapScore = policyCapScore
        item.talkCapScore = talkCapScore


        let cappedPatentScore = item.academicData?.patents.totalScore +
            policyCapScore +
            item.academicData?.awards.totalScore + item.academicData?.fellow.totalScore

        // total capped score and grand total score also
        let totalCappedScore = item.academicData?.researchPaper.totalScore + item.academicData?.publicationData.totalScore + item.academicData?.ictData.totalScore + totalGuidanceProjectScore + cappedPatentScore + talkCapScore + (item.academicData?.conference?.totalScore || 0)

        item.totalCappedScore = totalCappedScore

        allYearTotalSum += totalScore
        allYearTotalCappedSum += totalCappedScore

        // 5b + 6 for all years

        policyAndTalkTotalScore += item?.academicData?.policyDocuments.totalScore + item?.academicData?.invitedTalks.totalScore

    })

    let cappedScore = (allYearTotalSum * 30) / 100

    let allYearTotalCappedScore = 0
    if (policyAndTalkTotalScore > cappedScore) {
        allYearTotalCappedScore = cappedScore
    } else {
        allYearTotalCappedScore = policyAndTalkTotalScore
    }

    let mainCappedScoreResult = allYearTotalSum - policyAndTalkTotalScore + allYearTotalCappedScore






    return (
        <div>

            {/* // Heading */}
            <p className={`text-center ${forPrintOut === 'false' && "bg-[#00987936] text-[#009879]"} mt-28 mb-2 p-2`}>Table 2 : <span className="font-bold">Academic / Research Score</span></p>

            {/* Table */}
            <div>
                <table className={`table mx-auto mt-3 table-bordered text-sm md:text-base  ${forPrintOut === 'true' && "border-dark"} `}>
                    <thead className={`${forPrintOut === 'false' && "bg-[#009879] text-white"}`}>
                        <tr>
                            <th scope="col" className='w-16'>Sr No.</th>
                            <th scope="col">Activity</th>
                            {/* mapping of years */}

                            {casArray.map((item) => { return (<th className="w-[20%]">{item.casYear}</th>); })}
                        </tr>
                    </thead>
                    <tbody>

                        {/* // 1 Papers */}
                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} color={true} bold={true} td1={1} td2={'Research Papers in Peer-Reviewed or UGC listed Journals'}
                            td3={<>
                                {casArray.map((item) => {

                                    return (
                                        <td> <div className={`${forPrintOut === 'false' && "bg-[#00987936]"} p-1 rounded-xl flex items-center justify-start gap-2`}>{true && <LabelImportantRoundedIcon />}{item.academicData.researchPaper.totalScore.toFixed(2)}</div> </td>);
                                })}
                            </>} />




                        {/* // 2 Publication */}
                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} color={true} bold={true} td1={2} td2='Publication (Other than Research Papers)'
                            td3={<>
                                {casArray.map((item) => {

                                    return (
                                        <td> <div className={true && `${forPrintOut === 'false' && "bg-[#00987936]"}  p-1 rounded-xl flex items-center justify-start gap-2`}>{true && <LabelImportantRoundedIcon />}{item.academicData.publicationData.totalScore.toFixed(2)}</div> </td>);
                                })}
                            </>} />


                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} bold={true} td1={null} td2='[A] Authored Books'
                            td3={<>
                                {casArray.map((item) => {
                                    return (
                                        <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item.academicData.publicationData.Book === undefined ? 0 : item.academicData.publicationData.Book}</div> </td>);
                                })}</>}
                        />


                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} bold={true} td1={null} td2='[B] Chapters'
                            td3={<>
                                {casArray.map((item) => {
                                    return (
                                        <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item.academicData.publicationData.Chapter === undefined ? 0 : item.academicData.publicationData.Chapter}</div> </td>);
                                })}</>} />
                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} bold={true} td1={null} td2='[C] Editor'
                            td3={<>
                                {casArray.map((item) => {
                                    return (
                                        <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item.academicData.publicationData.Editor === undefined ? 0 : item.academicData.publicationData.Editor}</div> </td>);
                                })}</>} />

                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} bold={true} td1={null} td2='[C] Translation Work'
                            td3={<>
                                {casArray.map((item) => {
                                    return (
                                        <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item.academicData.publicationData.Translator === undefined ? 0 : item.academicData.publicationData.Translator}</div> </td>);
                                })}</>} />




                        {/* // 3. ICT */}
                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} color={true} bold={true} td1={3} td2='Creation of ICT (Information and Communication Technology)' td3={<>
                            {casArray.map((item) => {
                                return (
                                    <td> <div className={true && `${forPrintOut === 'false' && "bg-[#00987936]"}  p-1 rounded-xl flex items-center justify-start gap-2`}>{true && <LabelImportantRoundedIcon />}{item?.academicData.ictData.totalScore.toFixed(2)}</div> </td>);
                            })}</>} />

                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} bold={true} td1={null} td2='[A] Developed Innovative Pedagogy'
                            td3={<>
                                {casArray.map((item) => {
                                    return (
                                        <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData.ictData?.pedScore === undefined ? 0 : item?.academicData.ictData?.pedScore}</div> </td>);
                                })}</>} />

                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} bold={true} td1={null} td2='[B] Designed new Curricula or Course'
                            td3={<>
                                {casArray.map((item) => {
                                    return (
                                        <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData.ictData?.courseScore === undefined ? 0 : item?.academicData.ictData?.courseScore}</div> </td>);
                                })}</>} />



                        {/* MOOCS */}
                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} bold={true} td1={null} td2='[C] Massive Open Online Course (MOOC)'
                            td3={<>
                                {casArray.map((item) => {
                                    return (
                                        <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData.ictData?.moocScore === undefined ? 0 : item?.academicData.ictData?.moocScore}</div> </td>);
                                })}</>} />

                        {/* MOOCS Options */}
                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} td1={null} td2='Developed Complete MOOCs in 4 Quadrants'
                            td3={<>
                                {casArray.map((item) => {
                                    return (
                                        <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData?.ictData?.moocComplete === undefined ? 0 : item?.academicData?.ictData?.moocComplete}</div> </td>);
                                })}</>} />
                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} td1={null} td2='MOOCs (Developed in 4 Quadrants) per Module / Lecture'
                            td3={<>
                                {casArray.map((item) => {
                                    return (
                                        <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData?.ictData?.moocModule === undefined ? 0 : item?.academicData?.ictData?.moocModule}</div> </td>);
                                })}</>} />
                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} td1={null} td2='Content Writer / Subject matter exper for each module of MOOCs'
                            td3={<>
                                {casArray.map((item) => {
                                    return (
                                        <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData?.ictData?.moocContent === undefined ? 0 : item?.academicData?.ictData?.moocContent}</div> </td>);
                                })}</>} />
                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} td1={null} td2='Course Coordinator fo MOOCs'
                            td3={<>
                                {casArray.map((item) => {
                                    return (
                                        <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData?.ictData?.moocCourse === undefined ? 0 : item?.academicData?.ictData?.moocCourse}</div> </td>);
                                })}</>} />

                        {/* 3.4 E-content */}

                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} bold={true} td1={null} td2='[D] E-Content Development' td3={<>
                            {casArray.map((item) => {
                                return (
                                    <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData?.ictData?.econScore === undefined ? 0 : item?.academicData?.ictData?.econScore}</div> </td>);
                            })}</>} />

                        {/* OPTIONS */}
                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} td1={null} td2=' Developed Complete e-Content in 4 Quadrants'
                            td3={<>
                                {casArray.map((item) => {
                                    return (
                                        <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData?.ictData?.econComplete === undefined ? 0 : item?.academicData?.ictData?.econComplete}</div> </td>);
                                })}</>} />

                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} td1={null} td2='E-Content (Developed in 4 Quadrants) per Module / Lecture' td3={<>
                            {casArray.map((item) => {
                                return (
                                    <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData?.ictData?.econModule === undefined ? 0 : item?.academicData?.ictData?.econModule}</div> </td>);
                            })}</>} />
                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} td1={null} td2='Contribution to development of e-Content module in complete course / Paper / e-Book' td3={<>
                            {casArray.map((item) => {
                                return (
                                    <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData?.ictData?.econPaper === undefined ? 0 : item?.academicData?.ictData?.econPaper}</div> </td>);
                            })}</>} />
                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} td1={null} td2='Editor of e-Content for Complete Course / Paper / e-Book' td3={<>
                            {casArray.map((item) => {
                                return (
                                    <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData?.ictData?.econCourse === undefined ? 0 : item?.academicData?.ictData?.econCourse}</div> </td>);
                            })}</>} />



                        {/* // 4. Research Guidance */}
                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} color={true} bold={true} td1={4} td2='Research Guidance and Projects' td3={<>
                            {casArray.map((item) => {
                                return (
                                    <td> <div className={true && `${forPrintOut === 'false' && "bg-[#00987936]"}  p-1 rounded-xl flex items-center justify-start gap-2`}>{true && <LabelImportantRoundedIcon />}{item.totalGuidanceProjectScore.toFixed(2)}</div> </td>);
                            })}</>} />

                        {/* OPTIONS */}
                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} bold={true} td1={null} td2='[A] Research Guidance' td3={<>
                            {casArray.map((item) => {
                                return (
                                    <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData?.researchGuide.totalScore === undefined ? 0 : item?.academicData?.researchGuide.totalScore}</div> </td>);
                            })}</>} />

                        {/* 4.1 guide */}
                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} td1={null} td2='Ph.D.' td3={<>
                            {casArray.map((item) => {
                                return (
                                    <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData.researchGuide.phdScore === undefined ? 0 : item?.academicData.researchGuide.phdScore}</div> </td>);
                            })}</>} />

                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} td1={null} td2='M.Phil / P.G. Dissertation' td3={<>
                            {casArray.map((item) => {
                                return (
                                    <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData.researchGuide.mphilScore === undefined ? 0 : item?.academicData.researchGuide.mphilScore}</div> </td>);
                            })}</>} />


                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} bold={true} td1={null} td2='[B] Completed Research Projects'
                            td3={<>{casArray.map((item) => {
                                return (
                                    <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData.researchProjects.completePoints === undefined ? 0 : item?.academicData.researchProjects.completePoints}</div> </td>);
                            })}</>} />

                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} td1={null} td2='More than 10 Lacks' td3={<>{casArray.map((item) => {
                            return (
                                <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData.researchProjects.completeMorePoints === undefined ? 0 : item?.academicData.researchProjects.completeMorePoints}</div> </td>);
                        })}</>} />

                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} td1={null} td2='Less than 10 Lacks' td3={<>{casArray.map((item) => {
                            return (
                                <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData.researchProjects.completeLessPoints === undefined ? 0 : item?.academicData.researchProjects.completeLessPoints}</div> </td>);
                        })}</>} />





                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} bold={true} td1={null} td2='[C] Ongoing Research Projects'
                            td3={<>{casArray.map((item) => {
                                return (
                                    <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData.researchProjects.ongoingPoints === undefined ? 0 : item?.academicData.researchProjects.ongoingPoints}</div> </td>);
                            })}</>} />

                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} td1={null} td2='More than 10 Lacks' td3={<>{casArray.map((item) => {
                            return (
                                <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData.researchProjects.ongoingMorePoints === undefined ? 0 : item?.academicData.researchProjects.ongoingMorePoints}</div> </td>);
                        })}</>} />

                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} td1={null} td2='Less than 10 Lacks' td3={<>{casArray.map((item) => {
                            return (
                                <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData.researchProjects.ongoingLessPoints === undefined ? 0 : item?.academicData.researchProjects.ongoingLessPoints}</div> </td>);
                        })}</>} />


                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} bold={true} td1={null} td2='[D] Consultancy' td3={<>{casArray.map((item) => {
                            return (
                                <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData.consultancy.totalScore === undefined ? 0 : item?.academicData.consultancy.totalScore}</div> </td>);
                        })}</>} />


                        {/* // 5. Patents */}
                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} color={true} bold={true} td1={5}
                            td2='Patents, Policy Documents & Awards / Fellowship'
                            td3={<>{casArray.map((item) => {
                                return (
                                    <td> <div className={true && `${forPrintOut === 'false' && "bg-[#00987936]"}  p-1 rounded-xl flex items-center justify-start gap-2`}>{true && <LabelImportantRoundedIcon />}{item?.totalPatentPolicyScore.toFixed(2)}</div> </td>);
                            })}</>} />

                        {/* OPTIONS */}
                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} bold={true} td1={null} td2='[A] Patents Published'
                            td3={<>{casArray.map((item) => {
                                return (
                                    <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData.patents.totalScore}</div> </td>);
                            })}</>} />

                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} bold={true} td1={null} td2='[B] Policy Documents'
                            td3={<>{casArray.map((item) => {
                                return (
                                    <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>
                                        {false && <LabelImportantRoundedIcon />}
                                        {item?.academicData?.policyDocuments.totalScore}
                                    </div> </td>);
                            })}</>} />


                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} bold={true} td1={null} td2='[C] Awards / Fellowships'
                            td3={<>{casArray.map((item) => {
                                return (
                                    <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData.awards.totalScore + item?.academicData.fellow.totalScore}</div> </td>);
                            })}</>} />


                        {/* // 6. Invited talks */}
                        < ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} color={true} bold={true} td1={6} td2='Invited Lectures / Resource Person / Paper Presentation in Seminars / Conferences / Full Paper in Conference Proceedings'
                            td3={<>{casArray.map((item) => {
                                return (
                                    <td> <div className={true && `${forPrintOut === 'false' && "bg-[#00987936]"}  p-1 rounded-xl flex items-center justify-start gap-2`}>{true && <LabelImportantRoundedIcon />}{item?.totalInvitedConferenceScore.toFixed(2)}</div> </td>);
                            })}</>} />

                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} bold={true} td1={null} td2='[A] Invited Lectures / Resource Person / Paper Presentation in Seminars'
                            td3={<>{casArray.map((item) => {
                                return (
                                    <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData.invitedTalks.totalScore}</div> </td>);
                            })}</>} />
                        <ResearchTableRow forPrintOut={forPrintOut} casArray={casArray} bold={true} td1={null} td2='[B] Conferences / Full Paper in Conference Proceedings'
                            td3={<>{casArray.map((item) => {
                                return (
                                    <td> <div className={false && 'bg-[#00987936] p-1 rounded-xl flex items-center justify-start gap-2'}>{false && <LabelImportantRoundedIcon />}{item?.academicData?.conference?.totalScore || 0}</div> </td>);
                            })}</>} />

                        {/* // grand total */}
                        < ResearchTableRow forPrintOut={forPrintOut} diff={true} casArray={casArray} color={true} bold={true} td1={7} td2='Year-wise Total Score'
                            td3={<>{casArray.map((item) => {
                                return (
                                    <td> <div className={true && `${forPrintOut === 'false' && "bg-[#00987936]"} p-1 rounded-xl flex items-center justify-start gap-2`}>{true && <LabelImportantRoundedIcon />}{item.totalScore.toFixed(2)}</div> </td>);
                            })}</>} />

                    </tbody>
                </table >
            </div >

            {/* TOTAL SCORE FOR CAS & PBAS*/}
            {
                title === "CAS" ?
                    <div>
                        <p className="academic-start"></p>
                        {/* // Heading */}
                        <p className={`text-center ${forPrintOut === 'false' && "bg-[#00987936] text-[#009879]"} mt-28 mb-2 p-2 `}>Table 3 : <span className="font-bold">Total & Capped Score</span></p>


                        <table className={`table table-bordered ${forPrintOut === 'true' && "border-dark"}`}>
                            <thead className={`${forPrintOut === 'false' && "text-white bg-[#009879]"}`}>
                                <tr>
                                    <th>Year(s)</th>
                                    {casArray.map((item) => {
                                        return (
                                            <th scope="row">{item.casYear}</th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>


                                <tr>
                                    <td>Yearly Total</td>

                                    {casArray.map((item) => {
                                        return (
                                            <>

                                                <td className='font-semibold'>{item.totalScore.toFixed(2)}</td>

                                            </>

                                        )
                                    })}
                                </tr>


                            </tbody>
                        </table>

                        <div className="my-2 flex items-center justify-center gap-4">
                            <div className='font-bold'>Total Score for Assessment Period : <span className='text-xl text-blue-700'>{allYearTotalSum.toFixed(2)}</span></div>


                            <span className='text-3xl text-muted'>|</span>
                            <div className='font-bold'>Total Score after Capping : <span className='text-xl text-blue-700'>{mainCappedScoreResult.toFixed(2)}</span></div>
                        </div>


                        <div>
                            <br /><br /><br />
                            <div>
                                <div className='flex items-center justify-between'>
                                    <p>Signature of Principal / Director</p>
                                    <p>Signature of Applicant</p>
                                </div>

                                <div>
                                    <p className="font-semibold mt-6 mb-2"> I. Verified and recommended / not recommended by Screening Committee Members with Signature w.e.f. _____________: <br /><br /> <span className='ml-10 pt-3'>From Stage _______________ to _______________ AGP: _______________ </span></p>

                                    <p className="my-2 mx-10">(or)</p>

                                    <p className="font-semibold ml-10">From Academic Level _______________ to _______________</p>

                                    <br /><br /><br />
                                    <p className='flex items-center justify-between'>
                                        <span> 1. The Principal / Director</span>
                                        <span>2. Govt. Nominee</span>
                                        <span>3. Head of the concerned department</span>
                                        <span>4.Subject expert I</span>
                                        <span>5. Subject expert II</span>
                                    </p>
                                </div>


                                <div>
                                    <p className="font-semibold mt-6 mb-2"> II. Verified and recommended / not recommended by Screening Committee Members with Signature w.e.f. _______________: <br /><br /> <span className='ml-10 pt-3'>From Stage _______________ to _______________ AGP: _______________ </span></p>

                                    <p className="my-2 mx-10">(or)</p>

                                    <p className="font-semibold ml-10">From Academic Level _______________ to _______________</p>

                                    <p></p>

                                    <br /><br /><br />
                                    <p className='flex items-center justify-between flex-wrap'>
                                        <span> 1. The Chairperson of the Governing Body or his or her nominee</span>
                                        <span> 2. The Principal / Director</span>
                                        <span>3. Govt. Nominee</span>
                                        <span>4. Head of the concerned department</span>

                                    </p>
                                    <br /><br /><br />
                                    <p className="w-1/3">5. Two University representatives nominated by the Vice Chancellor, one of whom will be the Dean of College
                                        Development Council or equivalent position in the University, and the other must be expert in the concerned subject
                                    </p>
                                    <br />
                                    <br /><br />
                                    <div className='flex items-center justify-between w-1/2'>
                                        <p>6.Subject expert I</p>
                                        <p>Subject expert II</p>
                                    </div>
                                </div>

                                <br /><br /><br />

                                <p className="mb-5">7. An academician representing SC/ST/OBC/ Minority/Women/Differently-abled categories, if any of candidates representing these categories is the applicant, to be nominated by the Vice Chancellor, if any of the above members of the selection committee do not belong to that category.</p>
                            </div>
                        </div>



                    </div>
                    :
                    <div>
                        <p className="academic-start"></p>
                        <p className={`text-center ${forPrintOut === 'false' && "bg-[#00987936] text-[#009879]"} mt-28 mb-2 p-2 `}>Table 3 : <span className="font-bold">Summary of API Scores</span></p>

                        <table className={`table table-bordered ${forPrintOut === 'true' && "border-dark"}`}>
                            <thead className={`${forPrintOut === 'false' && "text-white bg-[#009879]"}`}>
                                <tr>
                                    <th scope="col">Sr.</th>
                                    <th scope="col">Criteria</th>
                                    <th scope="col">Last Academic Year</th>
                                    <th scope="col">Total API Score for Assessment Period</th>
                                    <th scope="col">Annual Avg. API Score for Assessment Period</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <th>1.</th>
                                    <td>Teaching, Learning and Evaluation related activities</td>
                                    <td></td>

                                    {
                                        casArray.map((item) => {
                                            return <td>
                                                <Remark title={item?.teachingData?.teachingRemark} color={item?.teachingData?.teachingRemarkColor} />
                                                <p className='text-muted text-sm mt-2'>(Among Good, Satisfactory, Not-Satisfactory)</p>
                                            </td>
                                        })
                                    }

                                    <td></td>

                                </tr>
                                <tr>
                                    <th>2.</th>
                                    <td>Co-curricular, Extension, Profession developement, etc.</td>
                                    <td></td>
                                    {
                                        casArray.map((item) => {
                                            return <td className='text-[#009879]'>Involved in <span className='font-bold'>{item?.teachingData?.checkBoxCount}</span> {item?.teachingData?.checkBoxCount > 1 ? 'Activities' : 'Activity'}  <br />
                                                <div className="mt-2">
                                                    {
                                                        item?.teachingData?.checkBoxCount > 2 ?
                                                            <Remark title='Good' color='green' /> :
                                                            item?.teachingData?.checkBoxCount >= 1 ?
                                                                <Remark title='Satisfactory' color='yellow' /> :
                                                                <Remark title='Not-Satisfactory' color='red' />
                                                    }
                                                </div>
                                                <p className='text-muted text-sm mt-2'>(Among Good, Satisfactory, Not-Satisfactory)</p>
                                            </td >
                                        })}
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>3.</th>

                                    <td>Research and Academic Contribution</td>
                                    <td></td>
                                    <td><div>
                                        <p>Total Score: <b> {allYearTotalSum?.toFixed(2) || 0}</b></p>
                                        <p>Total Score after capping: <b> {mainCappedScoreResult?.toFixed(2) || 0}</b></p>
                                    </div>
                                    </td>
                                    <td></td>
                                </tr>




                            </tbody>
                        </table>

                    </div>
            }


        </div >
    )
}

const ResearchTableRow = ({ color = false, bold = false, td1, td2, td3, diff = false, forPrintOut }) => {
    return (
        <tr className={`${(color && diff === false) && 'text-[#009879]'} ${bold && 'font-bold'} 
        ${diff && `${forPrintOut === 'false' && "bg-[#009879] text-white"}`}`}>
            <td>{td1}</td>
            <td>
                <div>
                    {td2}
                </div>
            </td>

            {td3}



        </tr>
    )
}





