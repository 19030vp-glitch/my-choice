import PatentNirf from "../components/PatentNirf"
import ConsultancyNirf from "../components/ConsultancyNirf"
import DevelopmentProgramNirf from "../components/DevelopmentProgramNirf"
import PlacementHENIRF from "../components/PlacementHENIRF"
import SelectPrograms from "../components/SelectPrograms"
import StudentIntake from "../components/StudentIntake"
import TotalAnnualStudentStrength from "../components/TotalAnnualStudentStrength"
import AdminMasterTable from "../../../../admin/components/AdminMasterTable"

const nirfTablesObject = (schoolName, academicYear) => {
    return {
        'programs': {
            id: 'programs',
            title: `Programs offered by ${schoolName}`,
            component: <SelectPrograms />
        },
        'sanctioned-intake': {
            id: 'sanctioned-intake',
            title: 'Sanctioned (Approved) Intake',
            component: <StudentIntake />
        },
        'student-strength': {
            id: 'student-strength',
            title: 'Total Actual Student Strength',
            component: <TotalAnnualStudentStrength />
        },
        'placement-and-higher-education': {
            id: 'placement-and-higher-education',
            title: 'Placement & Higher Education',
            component: <PlacementHENIRF />
        },
        'patents': {
            id: 'patents',
            title: 'Patents',
            component:<>
                <PatentNirf school={schoolName} program="Patents Published" />
                <AdminMasterTable model="Patent" academicYear={academicYear} school={schoolName} heading='Patents' serviceName="faculty" proof="proof"  />
            </>
        },
        'consultancy': {
            id: 'consultancy',
            title: 'Consultancy Projects',
            component:<ConsultancyNirf school={schoolName} program="Consultancy Projects" />
        },
        'programs-organized': {
            id: 'programs-organized',
            title: 'Programs Organized',
            component: <DevelopmentProgramNirf school={schoolName} program="Executive development programs / Management programs / Workshop / Training programs" />
        },
    }
}

export default nirfTablesObject