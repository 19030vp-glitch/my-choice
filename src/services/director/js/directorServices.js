import siteLinks from "../../../components/siteLinks";

const directorServices = [
    {
        title: "School Student Management",
        abbv: "SSM",
        link1: {
            title: "Go to SSM",
            link: siteLinks.ssm.link
        }
    },
    {
        title: "National Institutional Ranking Framework",
        abbv: "NIRF",
        isNew: true,
        link1: {
            title: "Fill Data",
            link: siteLinks.nirfSelectYear.link
        }
    },
    {
        title: "Annual Quality Assurance Report",
        abbv: "AQAR",
        isNew: true,
        link1: {
            title: "Fill Data",
            link: siteLinks.directorAqar.link
        },
    },
    {
        title: "Faculty Data Center",
        abbv: "FDC",
        link1: {
            title: "Get Faculty Data",
            link: siteLinks.fdc.link
        },
    },
    {
        title: "Research Center",
        abbv: "RC",
        link1: {
            title: "View Data",
            link: siteLinks.rc.link
        },
    },
    {
        title: "Student, Parent, Employee Feedback",
        abbv: "FEEDBACK",
        link1: {
            title: "Feedback Response",
            link: siteLinks.feedbackDashboard.link
        },
        link2: {
            title: "Action Taken Report",
            link: siteLinks.feedbackAction.link
        },
    },
    {
        title: "Academic & Administrative Audit",
        abbv: "AAA",
        link1: {
            title: "Fill Data",
            link: siteLinks.aaa.link
        },
        link2: {
            title: "Download AAA Report",
            link: siteLinks.aaaReport.link
        },
    },
];


export default directorServices