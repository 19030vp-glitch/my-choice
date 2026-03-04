import React from 'react'
import serverLinks from '../../js/serverLinks'
import { ContactTile } from '../../services/student/pages/StudentHome'
import Footer from '../../components/Footer'

const user = {
    "_id": {
        "$oid": "64cb4a25ddfdf662788db545"
    },
    "isAlumni": false,
    "isActiveStudent": true,
    "salutation": "Mr.",
    "photoURL": "1691044389216-CropedImage.jpg",
    "name": "Shaikh Sajed Ahmed Shaikh Moiz",
    "email": "shaikhsajed98220@gmail.com",
    "mobile": "7773936878",
    "programGraduated": "Ph.D. (Computer Science)",
    "programEnroledOn": "2020-21",
    "programCompletedOn": "",
    "cast": "OBC",
    "religion": "Hindu",
    "country": "India",
    "schoolName": "School of Computational Sciences",
    "currentIn": "1st Year",
    "gender": "Male",
    "password": "Sajed@123",
    "abcNo": "809238439924",
    "isCreatedByDirector": false,
    "__v": 0,
    "ReceivesFelloship": "Yes",
    "ResearchGuide": "Mohnish Ramesh Mahamune",
    "ResearchGuideId": "63d8bb437f7d0fc23d8add49",
    "Title": "Theory of Computation",
    "address": "Sakhla Plot, Dnyaneshwar Nagar, Parbhani",
    "dateOfRac": "2022-10-10",
    "dob": "2000-06-12"
}

const qualification = [
    {
        "_id": {
            "$oid": "64cb591523d28c9b09df8ac0"
        },
        "Program": "",
        "InstitutionBoard": "AUB",
        "Persentage": 81,
        "StartYear": "2015-16",
        "Year": "2017-18",
        "ProgramType": "SSC",
        "school": "",
        "isStudied": false,
        "Upload_Proof": "1691048213341-sajed.jpg",
        "userId": {
            "$oid": "64cb4a25ddfdf662788db545"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "64cb593423d28c9b09df8ac4"
        },
        "Program": "",
        "InstitutionBoard": "SRTMUN",
        "Persentage": 90,
        "StartYear": "2019-20",
        "Year": "2020-21",
        "ProgramType": "UG",
        "school": "",
        "isStudied": false,
        "Upload_Proof": "1691048244093-sajed.jpg",
        "userId": {
            "$oid": "64cb4a25ddfdf662788db545"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "64cb595823d28c9b09df8ac8"
        },
        "Program": "M.Sc.(Computer Science)",
        "InstitutionBoard": "Swami Ramanand Teerth Marathwada University, Nanded",
        "Persentage": 83,
        "StartYear": "2021-22",
        "Year": "2022-23",
        "ProgramType": "PG",
        "school": "School of Computational Sciences",
        "isStudied": true,
        "Upload_Proof": "1691048280331-sajed.jpg",
        "userId": {
            "$oid": "64cb4a25ddfdf662788db545"
        },
        "__v": 0
    }
]

const StudentResume = () => {

    return (
        <div>
            {/* // PROFILE */}
            <div className="mt-3 flex items-start justify-start gap-4">
                <img src={serverLinks.showFile(user?.photoURL, 'student')} className='h-[100px] w-[100px] sm:h-[130px] sm:w-[130px] rounded-xl border object-cover border- border-[#4566ac]' />

                <div>
                    <p className='font-bold text-2xl'> {user?.salutation} {user?.name.toUpperCase()} </p>
                    <div className='mt-3 text-gray-600'>
                        <p className='text-md'>Verified Student,</p>
                        <p className='text-md'>{user?.schoolName},</p>
                        <p className='text-md'>{user.schoolName.includes("Latur") ? "Sub-Campus, Latur - 413531." : "Swami Ramanand Teerth Marathwada University, Vishnupuri, Nanded - 431 606."}</p>
                    </div>
                </div>
            </div>

            {/* HORIZONTAL INFO BAR */}
            <div>
                <div className='flex items-center justify-center gap-5 bg-blue-50 p-2 my-3'>
                    <ContactTile keyName="User" value={`${(user && user?.isAlumni) ? 'Verified Alumni' : 'Verified Student'}`} />
                    <ContactTile keyName="School" value={`${(user && user.schoolName) || 'Not Added'}`} />
                    <ContactTile keyName="Email" value={`${(user && user.email) || 'Not Added'}`} />
                    <ContactTile keyName="Phone" value={`${(user && user.mobile) || 'Not Added'}`} />
                </div>
            </div>

            {/* ACADEMIC QUALIFICATION */}
            <div className="my-3 bg-blue-50 p-3 rounded-md">
                <p className="mb-4 font-semibold text-blue-600">1. Academic Qualifications</p>
                <ol className="items-start sm:flex w-full">
                    {qualification.map((item, index) => {
                        return (
                            <li className="relative mb-6 sm:mb-0 w-full" key={index}>
                                <div className="flex items-center">
                                    <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                        <svg
                                            className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                        </svg>
                                    </div>
                                    <div className="hidden sm:flex w-full bg-blue-200 h-0.5 dark:bg-gray-700"></div>
                                </div>
                                <div className="mt-3 sm:pr-8 w-full">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.ProgramType}</h3>
                                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Completed in {item.Year}</time>
                                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">From {item.InstitutionBoard}.</p>
                                </div>
                            </li>
                        );
                    })}
                </ol>

            </div>

            <div className="my-3 bg-blue-50 p-3 rounded-md">
                <p className="mb-4 font-semibold text-blue-600">2. Skills</p>
                <div className="flex items-start justify-start gap-4">
                    {["UI Interface Design", "UX Design", "IoT", "System Design", "Backend Handeling"].map((item) => {
                        return <p className="text-blue-800 bg-white p-2 rounded-lg">{item}</p>
                    })}

                </div>
            </div>

            <div className="pt-10">
                <Footer />
            </div>
        </div>
    )
}

export default StudentResume


