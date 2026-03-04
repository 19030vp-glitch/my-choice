import React from 'react'
import { Remark } from './Teaching'
import LabelImportantRoundedIcon from '@mui/icons-material/LabelImportantRounded';


const SummarySheet = ({ casData, casYearState }) => {
    return (
        <div className='mb-5'>
            <p className="text-center font-bold text-lg md:text-xl mb-5 mt-3 underline underline-offset-8">CAS Summary Sheet of Year {casYearState}</p>

            <div>
                {/* Table 1 */}
                <Teaching data={casData.teachingData && casData.teachingData} />

                {/* Table 2 */}
                <ResearchScore data={casData.academicData} />
            </div>



        </div>
    )
}

export default SummarySheet


const Teaching = ({ data }) => {

    return (
        <div>

            {/* // HEADING */}
            <p className='text-center bg-blue-50 my-2 p-2'>Table 1 : <span className="font-bold">Teaching and Teaching Related Activities</span></p>

            {/* // TABLE */}
            <div>
                <table className="table mx-auto mt-3 table-bordered text-sm md:text-base">
                    <thead className='bg-primary text-white'>
                        <tr>
                            <th scope="col" className='w-16'>Sr No.</th>
                            <th scope="col" className='w-[70%]'>Activity</th>
                            <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-blue-700'>
                            <th scope="row">1</th>
                            <td><b>Teaching</b></td>
                            <td><b className='mr-3'>{data?.teachingGrade}%</b> <Remark title={data?.teachingRemark} color={data?.teachingRemarkColor} /></td>
                        </tr>
                        <tr >
                            <th scope="row" className='text-blue-700'>2</th>
                            <td>
                                <div className='w-[80%]'>
                                    <b className='text-blue-700'>Involvement in University / College students related activities / Research activities</b> <br /><br />

                                </div>

                            </td>
                            {
                                data &&
                                <td className='text-blue-700'>Involved in <span className='font-bold'>{data?.checkBoxCount}</span> Activities <br />
                                    [{data?.checkBoxSelected?.length < 1 ?
                                        <b>0</b> : data?.checkBoxSelected?.map((item) => {
                                            return <b> {item} </b>;
                                        })}]
                                    <br /> <br />
                                    {
                                        data?.checkBoxCount > 2 ?
                                            <Remark title='Good' color='green' /> :
                                            data?.checkBoxCount >= 1 ?
                                                <Remark title='Satisfactory' color='yellow' /> :
                                                <Remark title='Not-Satisfactory' color='red' />
                                    }
                                </td>
                            }
                        </tr>

                    </tbody>
                </table>
            </div>

            {/* // GRAND TOTAL */}
            <div>
                <p className='p-3 border-2 border-blue-700 rounded-lg'>Grand Total / Remark :
                    <span className='ml-4'>{
                        data?.teachingGrade >= 80 && data?.checkBoxCount > 0 ?
                            <Remark title='Good' color={'green'} /> :
                            (data?.teachingGrade >= 70 && data?.teachingGrade < 80) && (data?.checkBoxCount > 0) ?
                                <Remark title='Satisfactory' color='yellow' /> :
                                <Remark title='Not-Satisfactory' color='red' />

                    }</span>
                </p>
            </div>
        </div>
    )
}


const ResearchScore = ({ data }) => {

    let totalGuidanceProjectScore = data?.researchGuide.totalScore + data?.researchProjects.totalScore + data?.consultancy.totalScore

    let totalPatentPolicyScore = data?.patents.totalScore + data?.policyDocuments.totalScore + data?.awards.totalScore + data?.fellow.totalScore

    let totalInvitedConferenceScore = data?.invitedTalks.totalScore + (data?.conference?.totalScore || 0)

    let totalScore = data?.researchPaper.totalScore + data?.publicationData.totalScore + data?.ictData.totalScore + totalGuidanceProjectScore + totalPatentPolicyScore + totalInvitedConferenceScore


    // capping
    // for 5(b)
    let cappedScore = (totalScore * 30) / 100
    let policyCapScore = 0
    let talkCapScore = 0



    if (data?.policyDocuments.totalScore > cappedScore) {
        policyCapScore = cappedScore
    }
    else {
        policyCapScore = data?.policyDocuments.totalScore
    }

    if (data?.invitedTalks.totalScore > cappedScore) {
        talkCapScore = cappedScore
    }
    else {
        talkCapScore = data?.invitedTalks.totalScore
    }


    let cappedPatentScore = data?.patents.totalScore +
        policyCapScore +
        data?.awards.totalScore + data?.fellow.totalScore

    // total capped score and grand total score also
    let totalCappedScore = data?.researchPaper.totalScore + data?.publicationData.totalScore + data?.ictData.totalScore + totalGuidanceProjectScore + cappedPatentScore + talkCapScore + (data?.conference?.totalScore || 0)


    // checking for zero activities
    let arrayOfActivities = [data?.researchPaper.totalScore, data?.publicationData.totalScore, data?.ictData.totalScore, totalGuidanceProjectScore, totalPatentPolicyScore,
    data?.invitedTalks.totalScore]

    let count = 0
    arrayOfActivities.forEach((activity) => {
        if (activity !== 0) {
            count++
        }
    })


    return (
        <div>

            {/* // Heading */}
            <p className='text-center bg-blue-50 mt-5 mb-2 p-2'>Table 2 : <span className="font-bold">Academic / Research Score</span></p>

            {/* Table */}
            <div>
                <table className="table mx-auto mt-3 table-bordered text-sm md:text-base">
                    <thead className='bg-primary text-white'>
                        <tr>
                            <th scope="col" className='w-16'>Sr No.</th>
                            <th scope="col" className='w-[70%]'>Activity</th>
                            <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* // 1 Papers */}
                        <ResearchTableRow color={true} bold={true} td1={1} td2={'Research Papers in Peer-Reviewed or UGC listed Journals'} td3={data?.researchPaper.totalScore.toFixed(2)} />


                        {/* // 2 Publication */}
                        <ResearchTableRow color={true} bold={true} td1={2} td2='Publication (Other than Research Papers)' td3={data?.publicationData.totalScore.toFixed(2)} />

                        <ResearchTableRow bold={true} td1={null} td2='[A] Authored Books' td3={data?.publicationData?.Book === undefined ? 0 : data?.publicationData?.Book} />
                        <ResearchTableRow bold={true} td1={null} td2='[B] Chapters' td3={data?.publicationData?.Chapter === undefined ? 0 : data?.publicationData?.Chapter} />
                        <ResearchTableRow bold={true} td1={null} td2='[B] Editor' td3={data?.publicationData?.Editor === undefined ? 0 : data?.publicationData?.Editor} />
                        <ResearchTableRow bold={true} td1={null} td2='[C] Translation Work' td3={data?.publicationData?.Translator === undefined ? 0 : data?.publicationData?.Translator} />



                        {/* // 3. ICT */}
                        <ResearchTableRow color={true} bold={true} td1={3} td2='Creation of ICT (Information and Communication Technology)' td3={data?.ictData.totalScore.toFixed(2)} />

                        <ResearchTableRow bold={true} td1={null} td2='[A] Developed Innovative Pedagogy' td3={data?.ictData?.pedScore === undefined ? 0 : data?.ictData?.pedScore} />

                        <ResearchTableRow bold={true} td1={null} td2='[B] Designed new Curricula or Course' td3={data?.ictData?.courseScore === undefined ? 0 : data?.ictData?.courseScore} />


                        {/* MOOCS */}
                        <ResearchTableRow bold={true} td1={null} td2='[C] Massive Open Online Course (MOOC)' td3={data?.ictData?.moocScore === undefined ? 0 : data?.ictData?.moocScore} />

                        {/* MOOCS Options */}
                        <ResearchTableRow td1={null} td2='Developed Complete MOOCs in 4 Quadrants' td3={data?.ictData?.moocComplete === undefined ? 0 : data?.ictData?.moocComplete} />
                        <ResearchTableRow td1={null} td2='MOOCs (Developed in 4 Quadrants) per Module / Lecture' td3={data?.ictData?.moocModule === undefined ? 0 : data?.ictData?.moocModule} />
                        <ResearchTableRow td1={null} td2='Content Writer / Subject matter exper for each module of MOOCs' td3={data?.ictData?.moocContent === undefined ? 0 : data?.ictData?.moocContent} />
                        <ResearchTableRow td1={null} td2='Course Coordinator fo MOOCs' td3={data?.ictData?.moocCourse === undefined ? 0 : data?.ictData?.moocCourse} />

                        {/* 3.4 E-content */}

                        <ResearchTableRow bold={true} td1={null} td2='[D] E-Content Development' td3={data?.ictData?.econScore === undefined ? 0 : data?.ictData?.econScore} />

                        {/* OPTIONS */}
                        <ResearchTableRow td1={null} td2=' Developed Complete e-Content in 4 Quadrants' td3={data?.ictData?.econComplete === undefined ? 0 : data?.ictData?.econComplete} />
                        <ResearchTableRow td1={null} td2='E-Content (Developed in 4 Quadrants) per Module / Lecture' td3={data?.ictData?.econModule === undefined ? 0 : data?.ictData?.econModule} />
                        <ResearchTableRow td1={null} td2='Contribution to development of e-Content module in complete course / Paper / e-Book' td3={data?.ictData?.econPaper === undefined ? 0 : data?.ictData?.econPaper} />
                        <ResearchTableRow td1={null} td2='Editor of e-Content for Complete Course / Paper / e-Book' td3={data?.ictData?.econCourse === undefined ? 0 : data?.ictData?.econCourse} />



                        {/* // 4. Research Guidance */}
                        <ResearchTableRow color={true} bold={true} td1={4} td2='Research Guidance and Projects' td3={totalGuidanceProjectScore.toFixed(2)} />

                        {/* OPTIONS */}
                        <ResearchTableRow bold={true} td1={null} td2='[A] Research Guidance' td3={data?.researchGuide.totalScore === undefined ? 0 : data?.researchGuide.totalScore} />

                        {/* 4.1 guide */}
                        <ResearchTableRow td1={null} td2='Ph.D.' td3={data?.researchGuide.phdScore === undefined ? 0 : data?.researchGuide.phdScore} />
                        <ResearchTableRow td1={null} td2='M.Phil / P.G. Dissertation' td3={data?.researchGuide.mphilScore === undefined ? 0 : data?.researchGuide.mphilScore} />


                        <ResearchTableRow bold={true} td1={null} td2='[B] Completed Research Projects'
                            td3={data?.researchProjects.completePoints === undefined ? 0 : data?.researchProjects.completePoints} />
                        <ResearchTableRow td1={null} td2='More than 10 Lacks' td3={data?.researchProjects.completeMorePoints === undefined ? 0 : data?.researchProjects.completeMorePoints} />
                        <ResearchTableRow td1={null} td2='Less than 10 Lacks' td3={data?.researchProjects.completeLessPoints === undefined ? 0 : data?.researchProjects.completeLessPoints} />



                        <ResearchTableRow bold={true} td1={null} td2='[C] Ongoing Research Projects'
                            td3={data?.researchProjects.ongoingPoints === undefined ? 0 : data?.researchProjects.ongoingPoints} />
                        <ResearchTableRow td1={null} td2='More than 10 Lacks' td3={data?.researchProjects.ongoingMorePoints === undefined ? 0 : data?.researchProjects.ongoingMorePoints} />
                        <ResearchTableRow td1={null} td2='Less than 10 Lacks' td3={data?.researchProjects.ongoingLessPoints === undefined ? 0 : data?.researchProjects.ongoingLessPoints} />


                        <ResearchTableRow bold={true} td1={null} td2='[D] Consultancy' td3={data?.consultancy.totalScore} />


                        {/* // 5. Patents */}
                        <ResearchTableRow color={true} bold={true} td1={5}
                            td2='Patents, Policy Documents & Awards / Fellowship'
                            td3={totalPatentPolicyScore.toFixed(2)} />

                        {/* OPTIONS */}
                        <ResearchTableRow bold={true} td1={null} td2='[A] Patents Published'
                            td3={data?.patents.totalScore} />
                        <ResearchTableRow bold={true} td1={null} td2='[B] Policy Documents' td3={`${data?.policyDocuments.totalScore}`} />
                        <ResearchTableRow bold={true} td1={null} td2='[C] Awards / Fellowships'
                            td3={data?.awards.totalScore + data?.fellow.totalScore} />



                        {/* // 6. Invited talks */}
                        < ResearchTableRow color={true} bold={true} td1={6} td2='Invited Lectures / Resource Person / Paper Presentation in Seminars / Conferences / Full Paper in Conference Proceedings'
                            td3={`${totalInvitedConferenceScore.toFixed(2)}`} />

                        <ResearchTableRow bold={true} td1={null} td2='[A] Invited Lectures / Resource Person / Paper Presentation in Seminars'
                            td3={data?.invitedTalks.totalScore} />

                        <ResearchTableRow bold={true} td1={null} td2='[B] Conference Proceedings'
                            td3={data?.conference?.totalScore || 0} />

                    </tbody>
                </table>
            </div>

            {/* // Grand total */}
            {/* // GRAND TOTAL */}
            <div className='border-2 border-blue-700 rounded-lg p-3 text-center'>
                <p className='text-lg'>Grand Total Score  :
                    <span className='ml-4 text-2xl font-bold text-blue-700'>{
                        totalScore.toFixed(2)
                    }</span>
                </p>
            </div>

            <div className='border-2 text-lg border-blue-700 rounded-lg p-3 text-center mt-3'>
                <p>The above Grand Total Score is from <span className='font-bold'>{count}</span> out of <span className='font-bold'>6</span> Categories.</p>


                {count < 3 &&
                    <p className='mt-2 bg-red-50 font-bold rounded-xl p-2 text-red-900 text-lg'>{
                        "Therefore you are not eligible for CAS Promotion."}</p>
                }
            </div>

        </div>
    )
}

const ResearchTableRow = ({ color = false, bold = false, td1, td2, td3 }) => {
    return (
        <tr className={`${color && 'text-blue-700'} ${bold && 'font-bold'}`}>
            <td>{td1}</td>
            <td>
                <div className='w-[80%]'>
                    {td2}
                </div>

            </td>
            <td> <div className={color && 'bg-blue-100 p-1 rounded-xl flex items-center justify-start gap-2'}>{color && <LabelImportantRoundedIcon />}{td3}</div> </td>
        </tr>
    )
}



