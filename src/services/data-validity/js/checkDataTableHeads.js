import allTableHeads from "../../admin/js/allTableHeads";

const { impactFactor, ifProof, Proof2, ...researchPaperTableHeadsForCheck } = allTableHeads.ResearchPaper

export const checkDataTableHead = {
    PostHeld: allTableHeads.PostHeld,
    Lectures: allTableHeads.Lectures,
    ConferencesSemiWorkshopOrganized: allTableHeads.ConferencesSemiWorkshopOrganized,
    Responsibilities: allTableHeads.Responsibilities,
    ResearchProject: allTableHeads.ResearchProject,
    BookAndChapter: allTableHeads.BookAndChapter,
    PGDessertation: allTableHeads.PGDessertation,
    ResearchGuidance: allTableHeads.ResearchGuidance,
    EContentDeveloped: allTableHeads.EContentDeveloped,
    InvitedTalk: allTableHeads.InvitedTalk,
    ResearchPaper: researchPaperTableHeadsForCheck,
    ...allTableHeads
}