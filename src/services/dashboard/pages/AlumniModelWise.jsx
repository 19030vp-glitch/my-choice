import React from 'react'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import EmptyBox from '../../../components/EmptyBox'
import GoBack from '../../../components/GoBack'
import TableComponent from '../../../components/TableComponent'
import title from '../../../js/title'
import fetchData from '../js/fetchData'

const AlumniModelWise = () => {
    const { title: pageTitle, model, school } = useParams()
    const param = { model, filter: { SchoolName: school } }
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => fetchData(param))

    useEffect(() => {
        console.log('Data for ', model, 'is :', data)
    }, [data])

    title(pageTitle)


    const tableInfo = {
        AlumniContribution: {
            tableHeads: ["Name of the alumni contributed", "School Name", "Program Graduated from", "Amount of Contribution (₹)", "Academic Year"],
            tableCells: ["Name_of_The_Alumni_Contributed", "SchoolName", "Program_graduated_from", "Amount_of_contribution", "Academic_Year"]
        },
        ProgressionToHE: {
            tableHeads: ["Name of the alumni", "School Name", "Program Graduated from", "Academic Year"],
            tableCells: ["Name_of_student_enrolling", "SchoolName", "Program_graduated_from", "Academic_Year"]
        },
        QualifiedExams: {
            tableHeads: ["Name of the alumni", "School Name", "Name of the Exam", "Registration / Roll No.", "Academic Year"],
            tableCells: ["Names_of_students_selected_qualified", "SchoolName", "Name_of_the_Exam", "Registration_number_roll_number", "Acadmic_year"]
        },
        Placement: {
            tableHeads: ["Name of the alumni", "School Name", "Name of the employer",
                "Pay Package per annum (₹)", "Employer contact details", "Academic Year"],
            tableCells: ["Name_of_student_placed", "SchoolName", "Name_of_the_employer", "Pay_package_annum", "Employer_contact_details", "Academic_Year"]
        },
    }

    return (
        <div>
            <div>
                <GoBack pageTitle={pageTitle} backUrl={-1} />
            </div>
            <div>
                {
                    tableInfo[model] ? <TableComponent tableHeads={tableInfo[model].tableHeads} tableCells={tableInfo[model].tableCells} data={data?.data?.data} /> : <EmptyBox />
                }
            </div>
        </div>

    )
}

export default AlumniModelWise