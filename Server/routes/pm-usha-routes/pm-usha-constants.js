
// in case you change these constants make sure you change /routes/pm-usha-routes/dashboard-routes.js

const constructionAndRenovationDetails = {
    A: [
        {
            id: 'A-1',
            workType: "Construction",
            name: "Girl's Hostel",
            description: "Campus accommodates girl students; located 10km from Nanded city."
        },
        {
            id: 'A-2',
            workType: "Construction",
            name: "Solar Plant",
            description: 'University utilizes renewable energy for electricity requirements.'
        },
        {
            id: 'A-3',
            workType: "Construction",
            name: 'Skill Development Center',
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


module.exports = { constructionAndRenovationDetails }