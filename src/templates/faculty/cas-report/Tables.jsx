import React from 'react'
import serverLinks from '../../../js/serverLinks'
import CASDataTable from '../../../services/faculty/reports/cas/components/CASDataTable'
import './CAS.css'

const CASActivities = [
    {
        activityName: 'Activity 1 : Research Papers in Peer-reviewed or UGC listed Journals',
        activityTables: CASDataTable.ResearchPaper,
        model: 'ResearchPaper',
        desc: 'Research Papers',
        colName: 'Research Papers',
        casName: 'researchPaper'
    },
    {
        activityName: 'Activity 2 : Publications (Other than Research Papers)',
        activityTables: CASDataTable.MainBookAndChapter,
        model: 'BookAndChapter',
        desc: 'Books, Chapters & Translation Works',
        colName: 'Publications',
        casName: 'publicationData'
    },
    {
        activityName: 'Activity 3: ICT (Information & Communication Technology)',
        activityTables: CASDataTable.EContentDeveloped,
        model: 'EContentDeveloped',
        desc: 'Development of Innovative Pedagogy, Design of new curriculla & courses, MOOCs & E-Content',
        colName: 'E-Content Developed',
        casName: 'ictData'
    },
    {
        activityName: 'Activity 4.1: Research Guidance',
        activityTables: CASDataTable.TrimmedPhdAwarded,
        model: 'PhdAwarded',
        desc: 'Research Guidance : Ph.D, M.Phil / PG Dissertation Awarded or Submitted',
        colName: 'Research Guidance',
        casName: 'researchGuide',
        hasSubActivity: true,
        mainActivityName: 'Activity 4: Research Guidance, Research Projects & Consultancy',
        mainActivityDesc: 'Research Guidance, Research Projects & Consultancy',
        subCasNames: ['researchGuide', 'researchProjects', 'consultancy']

    },
    {
        activityName: 'Activity 4.2: Research Projects',
        activityTables: CASDataTable.ResearchProject,
        model: 'ResearchProject',
        desc: 'Research Projects : Completed or Ongoing / Major or Minor Projects',
        colName: 'Research Projects',
        casName: 'researchProjects',
        hasSubActivity: true,
        mainActivityName: 'Activity 4: Research Guidance, Research Projects & Consultancy',
        mainActivityDesc: 'Research Guidance, Research Projects & Consultancy',
        subCasNames: ['researchGuide', 'researchProjects', 'consultancy']

    },
    {
        activityName: 'Activity 4.3: Consultancy',
        activityTables: CASDataTable.ConsultancyServices,
        model: 'ConsultancyServices',
        desc: 'Provided Consultancy Services',
        colName: 'Consultancy Services',
        casName: 'consultancy',
        hasSubActivity: true,
        mainActivityName: 'Activity 4: Research Guidance, Research Projects & Consultancy',
        mainActivityDesc: 'Research Guidance, Research Projects & Consultancy',
        subCasNames: ['researchGuide', 'researchProjects', 'consultancy']

    },
    {
        activityName: 'Activity 5.1: Patents Published',
        activityTables: CASDataTable.Patent,
        model: 'Patent',
        desc: 'Patents Published',
        colName: 'Patents',
        casName: 'patents',
        hasSubActivity: true,
        mainActivityName: 'Activity 5: Patents, Policy Documents & Awards / Fellowship',
        mainActivityDesc: 'Patents, Policy Documents, Awards & Recognitions and Fellowships',
        subCasNames: ['patents', 'policyDocuments', 'awards', 'fellow']



    },
    {
        activityName: 'Activity 5.2: Policy Documents',
        activityTables: CASDataTable.PolicyDocuments,
        model: 'PolicyDocuments',
        desc: 'Policy Documents (submitted to an International body or organization like UNO / UNESCO / World Bank /MNF etc. or Central / State Government)',
        colName: 'PolicyDocuments',
        casName: 'policyDocuments',
        hasSubActivity: true,
        mainActivityName: 'Activity 5: Patents, Policy Documents & Awards / Fellowship',
        mainActivityDesc: 'Patents, Policy Documents, Awards & Recognitions and Fellowships',
        subCasNames: ['patents', 'policyDocuments', 'awards', 'fellow']



    },
    {
        activityName: 'Activity 5.3 [A]: Awards & Recognitions',
        activityTables: CASDataTable.AwardRecognition,
        model: 'AwardRecognition',
        desc: 'Awards & Recognitions received',
        colName: 'Awards & Recognitions',
        casName: 'awards',
        hasSubActivity: true,
        mainActivityName: 'Activity 5: Patents, Policy Documents & Awards / Fellowship',
        mainActivityDesc: 'Patents, Policy Documents, Awards & Recognitions and Fellowships',
        subCasNames: ['patents', 'policyDocuments', 'awards', 'fellow']


    },
    {
        activityName: 'Activity 5.3 [B]: Fellowships',
        activityTables: CASDataTable.Fellowship,
        model: 'Fellowship',
        desc: 'Fellowship',
        colName: 'Fellowships',
        casName: 'fellow',
        hasSubActivity: true,
        mainActivityName: 'Activity 5: Patents, Policy Documents & Awards / Fellowship',
        mainActivityDesc: 'Patents, Policy Documents, Awards & Recognitions and Fellowships',
        subCasNames: ['patents', 'policyDocuments', 'awards', 'fellow']


    },
    {
        activityName: 'Activity 6 [A]: Invited Talks / Lectures / Resource Person / Presentation',
        activityTables: CASDataTable.InvitedTalk,
        model: 'InvitedTalk',
        desc: 'Invited Talks / Lectures / Resource Person / Paper Presentation in Seminars',
        colName: 'Invited Talks',
        casName: 'invitedTalks',
        hasSubActivity: true,
        mainActivityName: 'Activity 6: Invited Talks / Lectures / Resource Person / Paper Presentation in Seminars / Conferences / Full paper in Conference Proceedings',
        mainActivityDesc: 'Invited Talks / Lectures / Resource Person / Paper Presentation in Seminars / Conferences / Full paper in Conference Proceedings (Paper presented in seminars / conferences and also published as full paper in Conference Proceedings will be counted only once)',
        subCasNames: ['invitedTalks', 'conference',]


    },
    {
        activityName: 'Activity 6 [B]: Conferences / Full Paper in Conference Proceedings',
        activityTables: CASDataTable.ConferenceBookAndChapter,
        model: 'BookAndChapter',
        desc: 'Conferences / Full Paper in Conference Proceedings',
        colName: 'Conferences',
        casName: 'conference',
        hasSubActivity: true,
        mainActivityName: 'Activity 6: Invited Talks / Lectures / Resource Person / Paper Presentation in Seminars / Conferences / Full paper in Conference Proceedings',
        mainActivityDesc: 'Invited Talks / Lectures / Resource Person / Paper Presentation in Seminars / Conferences / Full paper in Conference Proceedings (Paper presented in seminars / conferences and also published as full paper in Conference Proceedings will be counted only once)',
        subCasNames: ['invitedTalks', 'conference',]


    },
]


const Table = ({ academicData, casArray, forPrintOut }) => {
    return <div style={{ pageBreakInside: 'avoid' }}>
        {/* // HEADING */}
        {/* <p className="academic-start"></p> */}
        <p className={`text-center ${forPrintOut === 'false' && "bg-[#00987936] text-[#009879]"} p-2`}>
            <span className="font-bold">Academic & Research Score</span></p>

        {/* // form activity 1-3 */}
        <div className="mx-auto">
            {CASActivities.map((activity, index) => {
                return <div className={`bg-white overflow-hidden sm:rounded-lg mt-5 border page ${index > 1 && "break-inside-avoid"} `}>

                    {
                        activity?.hasSubActivity &&
                        <div className={`p-2 ${forPrintOut === 'false' && "bg-[#009879] text-white"} flex items-center justify-between`}>
                            <div className={`p-2 ${forPrintOut === 'false' && "bg-[#009879] text-white"}`}>
                                <h3 className="sm:text-lg text-base leading-6 font-medium">
                                    {activity.mainActivityName}</h3>
                                <p className="max-w-2xl text-sm pb-3">{activity.mainActivityDesc}</p>
                            </div>
                            <div className="bg-[#ffffff41] rounded-lg w-[30%] text-center">
                                <p className='p-2'>
                                    Total Activity Score : <span className="font-bold">
                                        {(casArray.reduce((sum, element) => sum + activity.subCasNames.reduce((newSum, subCasName) => newSum + (element.academicData[subCasName]?.totalScore || 0), 0), 0)).toFixed(2)}</span>
                                </p>
                            </div>
                        </div>
                    }
                    <hr />
                    <div className={`p-2 ${forPrintOut === 'false' && "bg-[#009879] text-white"} flex items-center justify-between`}>
                        <div><h3 className="sm:text-lg text-base leading-6 font-medium">
                            {activity.activityName}</h3>
                            <p className="text-sm pb-3">{activity.desc}</p>
                        </div>
                        <div className="bg-[#ffffff41] rounded-lg w-[30%] text-center">
                            <p className='p-2'>
                                Total {activity?.hasSubActivity ? 'Sub-Activity' : 'Activity'} Score : <span className="font-bold">{(casArray.reduce((sum, element) => sum + (element.academicData[activity.casName]?.totalScore || 0), 0)).toFixed(2)}</span>
                            </p>
                        </div>
                    </div>

                    <div className={`${forPrintOut === 'true' && "px-1"}`}>
                        <table className={`table table-bordered text-sm`}>
                            <thead className={`${forPrintOut === 'false' && "bg-[#009879] text-white"}`}>
                                <tr>
                                    <th scope="col">Year</th>
                                    <th scope="col">{activity.colName}</th>
                                </tr>
                            </thead>
                            <tbody>

                                {casArray.map((casItem) => {
                                    return (
                                        <tr className={`${forPrintOut === 'true' ? "text-black" : "table-light"} `}>
                                            <th scope="row" className='w-20 text-sm text-[#009879]'>{casItem.casYear}</th>
                                            <td>

                                                <table className={`table table-bordered ${forPrintOut === 'true' && "border-dark"} ${activity.model === 'ResearchPaper' ? "table-sm" : ""}`}>
                                                    <thead className={`${forPrintOut === 'false' && "bg-[#009879] text-white"}`}>
                                                        <tr>
                                                            <th scope="col">Sr.</th>
                                                            {activity.activityTables.tableHeads.map((item) => { return (<th>{item}</th>); })}
                                                            {activity.model === 'ResearchPaper' && <th scope="col">Refreed Journal / Impact Factor Proof</th>}
                                                            <th scope="col">Score</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className={`${activity.model === 'ResearchPaper' ? "text-xs" : "text-sm"}`}>

                                                        {
                                                            academicData[activity.model]?.filter((a) => { return casItem.academicData?.[activity.casName]?.dataMap?.includes(a._id) }).map((modelItem, index) => {
                                                                return <tr>
                                                                    <th scope="row">{index + 1}</th>


                                                                    {activity.activityTables.tableCells.map((item) => {
                                                                        return (<td>{item === 'proof' ?
                                                                            <ViewFile fileName={modelItem['proof']} /> : item === 'link' ?
                                                                                modelItem?.['link'] ? <ViewFile fileName={modelItem['link']}
                                                                                    type="linkURL" /> : '-' : modelItem[item]}</td>);
                                                                    })}

                                                                    {activity.model === 'ResearchPaper' && <td>{casItem.academicData?.[activity.casName].scoreMap?.[modelItem._id]?.refreedIFProof ? <ViewFile fileName={casItem.academicData?.[activity.casName].scoreMap?.[modelItem._id]?.refreedIFProof?.file?.[0].filename} type="casDirURL" /> : '-'}</td>}

                                                                    <td className='text-sm font-semibold'>{casItem.academicData?.[activity.casName].scoreMap?.[modelItem._id]?.score ? casItem.academicData?.[activity.casName].scoreMap?.[modelItem._id]?.score : 0}</td>
                                                                </tr>
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                                <div className={`${forPrintOut === 'false' && "bg-[#00987936] text-[#009879]"} w-full rounded-lg flex items-center justify-end`}>
                                                    <p className='p-2 text-center'>
                                                        Total Score : <span className="font-bold">
                                                            {casItem.academicData[activity.casName]?.totalScore.toFixed(2) || 0}</span>
                                                    </p>
                                                </div>

                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            })}

        </div>
    </div>


}

const ViewFile = ({ fileName, type = "proofURL", attendance = false, small = false, customTitle = "View" }) => {

    let link = {
        proofURL: serverLinks.showFile(fileName, 'faculty'),
        linkURL: fileName,
        casDirURL: serverLinks.showFile(fileName, 'CAS'),
        pbasDirURL: serverLinks.showFile(fileName, 'PBAS'),
        aaaDirURL: serverLinks.showFile(fileName, 'AAA'),
    }


    return <div className={`my-2`}>
        <a href={link[type]}
            className={`bg-blue-100 text-sm whitespace-nowrap rounded-lg text-blue-900 ${small ? 'text-sm p-1' : 'p-2'}`} target="_blank" rel="noreferrer">
            {type === "linkURL" ? `${fileName.slice(0, 30)}${fileName.length > 30 && '...'}` : (type === "casDirURL" && attendance === true) ? 'View Director Certificate' : type === "casDirURL" ? 'View Proof' : customTitle}</a>
    </div>
}

export default Table

export { ViewFile }

export { CASActivities }

