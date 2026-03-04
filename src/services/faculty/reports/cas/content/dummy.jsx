import React from 'react'

const dummy = () => {
    let actionInfo = {
        ResearchPapersUGC: "ResearchPaper",
        MainBooksAndChapters: "BookAndChapter",
        EContentDeveloped: "EContentDeveloped",
        PHDAwarded: "PhdAwarded",
        ResearchProjects: "ResearchProject",
        ConsultancyServices: "ConsultancyServices",
        PatentPublished: "Patent",
        PolicyDocuments: "PolicyDocuments",
        AwardRecognition: "AwardRecognition",
        Fellowship: "Fellowship",
        InvitedTalk: "InvitedTalk",
        ConferenceBooksAndChapters: "BookAndChapter",
    }
    return (
        <div>
            {
                <Actions item={item} model={actionInfo[facultyTableAvailable]} refreshFunction={refetch} />
            }
        </div>
    )
}

export default dummy
