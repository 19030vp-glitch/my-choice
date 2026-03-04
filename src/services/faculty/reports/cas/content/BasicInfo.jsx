import { SignalCellularNullRounded } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import NumberToTextField from '../components/NumberToTextField'
import { BGPad } from './Teaching'

const BasicInfo = () => {

    const [qualifications, setQualifications] = useState(null)
    const [degree, setDegree] = useState(null)
    const [appointments, setAppointments] = useState(null)
    const [postHeld, setPostHeld] = useState(null)
    const [online, setOnline] = useState(null)
    const [experience, setExperience] = useState(null)

    useEffect(() => {
        console.log('Degree :', degree)
    }, [degree])

    let introTables = [
        {
            state: qualifications,
            setState: setQualifications,
            model: "Qualification",
            addName: "Qualification",
            activityName: "Qualifications",
            isFile: false,
            addOnce: false,
            options: [
                { field: 'Text', keyName: "exam", label: "Exams" },
                { field: 'Text', keyName: "institute", label: "Institute/Boards" },
                { field: 'Text', keyName: "year", label: "Year" },
                { field: 'Text', keyName: "percentage", label: "Percentage" },
                { field: 'Text', keyName: "subjects", label: "Subjects" },
            ]
        },
        {
            state: degree,
            setState: setDegree,
            model: "Degree",
            addName: "Degree",
            activityName: "Research Degrees",
            isFile: true,
            addOnce: false,
            options: [
                { field: 'Text', keyName: "degreeName", label: "Degree" },
                { field: 'Text', keyName: "title", label: "Title" },
                { field: 'Text', keyName: "subject", label: "Subject" },
                { field: 'Text', keyName: "university", label: "University" },
                { field: 'Text', keyName: "awardDate", label: "Award Year" },
                { field: 'File', keyName: "proof", label: "Proof" },
            ]
        },
        {
            state: appointments,
            setState: setAppointments,
            model: "AppointmentsHeldPrior",
            addName: "Appointments held prior",
            activityName: "Appointments held prior to joining this institute",
            isFile: false,
            addOnce: false,
            options: [
                { field: 'Text', keyName: "designation", label: "Designation" },
                { field: 'Text', keyName: "employerName", label: "Employer Name" },
                { field: 'Text', keyName: "joiningDate", label: "Joining Date" },
                { field: 'Text', keyName: "leavingDate", label: "Leaving Date" },
                { field: 'Text', keyName: "salaryWithGrade", label: "Salary with Grade" },
                { field: 'Text', keyName: "leavingReason", label: "Leaving Reason" },
            ]
        },
        {
            state: postHeld,
            setState: setPostHeld,
            model: "PostHeld",
            addName: "Post held after joining",
            activityName: "Posts held after joining this institute",
            isFile: true,
            addOnce: false,
            options: [
                { field: 'Text', keyName: "designation", label: "Designation" },
                { field: 'Text', keyName: "department", label: "Department" },
                { field: 'Text', keyName: "joiningDate", label: "Joining Date" },
                { field: 'Text', keyName: "leavingDate", label: "Leaving Date" },
                { field: 'File', keyName: "proof", label: "Appointment Order / CAS Promotion" },
            ]
        },
        {
            state: online,
            setState: setOnline,
            model: "Online",
            addName: "Orientation/Refresher Course/FDP",
            activityName: "Orientation/Refresher Course/FDP",
            isFile: true,
            addOnce: false,
            options: [
                { field: 'Text', keyName: "programTitle", label: "Program Title" },
                { field: 'Text', keyName: "nameOfAttendedTeacher", label: "Organized by" },
                { field: 'Text', keyName: "durationFrom", label: "Duration From" },
                { field: 'Text', keyName: "durationTo", label: "Duration To" },
                { field: 'Year', keyName: "year", label: "Year" },
                { field: 'File', keyName: "proof", label: "Proof" },
            ]
        },
        {
            state: experience,
            setState: setExperience,
            model: "Experience",
            addName: "Experience",
            activityName: "Teaching / Research Experience & Specialization",
            isFile: false,
            addOnce: true,
            options: [
                { field: 'Text', keyName: "ug", label: "UG Teaching Experience (in years)" },
                { field: 'Text', keyName: "pg", label: "PG Teaching Experience (in years)" },
                { field: 'Text', keyName: "researchExperience", label: "Research Experience excluding years spent in M. Phil. / Ph. D. (in years)" },
                { field: 'Text', keyName: "specialization", label: "Fields of Specialization under the Subject / Discipline " },
            ]
        }


    ]



    return (
        <div className="w-full">
            <div className='my-3 text-lg'>
                <p className='font-bold text-xl'>Basic Information</p>
            </div>


            {/* // INTRO Tables */}
            {

                introTables.map((item, index) => {
                    return <BGPad classes='mt-3' key={index}>
                        <div>
                            <div className='mt-2 text-sm md:text-base'>


                                <NumberToTextField
                                    state={item.state} setState={item.setState} casYearState={null}
                                    isForm={true} activity={null} classes='my-3' model={item.model} addName={item.addName} activityName={`${index + 1}. ${item.activityName}`} calculateScore={false}
                                    options={item.options} isFile={item.isFile} addOnce={item.addOnce}
                                >
                                </NumberToTextField>

                            </div>
                        </div>
                    </BGPad>
                })

            }


        </div>
    )
}

export default BasicInfo