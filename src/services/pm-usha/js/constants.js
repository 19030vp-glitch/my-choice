// construction
export const constructionAndRenovationDetails = {
    A: [
        {
            id: 'A-1',
            workType: "Construction",
            name: "Girl's Hostel (Nanded Campus)",
            description: "Campus accommodates girl students; located 10km from Nanded city."
        },
        {
            id: 'A-2',
            workType: "Construction",
            name: "Providing Rooftop Solar Power plant 300 KWP",
            description: 'University utilizes renewable energy for electricity requirements.'
        },
        {
            id: 'A-3',
            workType: "Construction",
            name: 'Center for skill Development, entrepreneurship and vocational training',
            description: "Additional facility built for skill development, entrepreneurship, vocational training."
        }
    ],

    // renovation
    B: [
        {
            id: 'B-1',
            workType: "Renovation",
            name: "Modernization of existing Laboratories",
            description: "Modernize furniture, fixtures, gas pipelines, sync, prep rooms, waste management."
        },
        {
            id: 'B-2',
            workType: "Renovation",
            name: "Modernization of Classrooms",
            description: 'Modernize furniture, fixtures, and ICT-enable classrooms.'
        },
        {
            id: 'B-3',
            workType: "Renovation",
            name: 'Modernization of Administrative Sections',
            description: "Add furniture, fixtures, AC, storage, digitization, documentation, ICT."
        }
    ]

}



export const crRadiosStatus = ["Not yet started", "Ongoing", "Completed"]

export const landDetailsList = (tabId) => {
    const defaultDetails = [
        {
            id: "Land-Details-Map",
            title: "Land Map",
        },
        {
            id: "Land-Details-ExecutingAgencyPermission",
            title: "Executing Agency Permission",
        },
        {
            id: "Land-Detais-CostEstimate",
            title: "Cost estimate as per SSR/ DSR",
        },
        {
            id: "Land-Details-ArchitecturalBlueprint",
            title: "Architectural Blueprint",
        },
        {
            id: "Land-Details-TechnicalSanction",
            title: "Technical Sanction",
        },
    ];

    // Additional items to be added if tabId is 'B'
    const additionalItems = tabId === "B" ? [
        {
            id: "Land-Details-StructuralAudit",
            title: "Stability of existing structure (Structural Audit)",
        },
        {
            id: "Land-Details-LocalAuthorityPermission",
            title: "Local authority permission/sanction letter",
        }
    ] : [];

    // Concatenate the defaultDetails array with additionalItems array conditionally
    return [...defaultDetails, ...additionalItems];
};

