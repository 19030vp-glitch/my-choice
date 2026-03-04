import React, { useEffect, useState } from 'react'
import GoBack from '../../../components/GoBack'
import title from '../../../js/title'
import siteLinks from '../../../components/siteLinks'
import { DatePicker, Space } from 'antd';
import { addProgram } from '../js/addProgram';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../../hooks/useLocalStorage';



const AddProgram = () => {

    const navigate = useNavigate()
    const initialState = { prefix: null, title: null, programDate: null, arrangedBy: null, finalRegistrationDate: null, venue: null, summary: null, pPhotoURL: null, pName: null, pDesignation: null, pAddress: null, pSummary: null, cName0: null, cName1: null, cPosition0: null, cPosition1: null, cEmail0: null, cEmail1: null, cPhone0: null, cPhone1: null, registrationDetails: "1. There is no registration fee to attend this workshop 2. No TA/DA will be provided 3. Lunch and refreshments will be provided 4.  It is mandatory to attending all the sessions to get participation certificate", whoCanParticipate: "Teacher from any college or University can participate, but preference will be given to teachers of SRTM University and its affiliated colleges as there are limited seats." }
    const [programInfo, setProgramInfo] = useState(initialState)
    const [picker, setPicker] = useState(null)
    const [shouldNavigate, setShouldNavigate] = useState(true)
    const bredLinks = [siteLinks.welcome, siteLinks.directorHome, siteLinks.programs, siteLinks.addProgram]
    const [shouldUpdate, setShouldUpdate] = useState(false)
    title("Add University Program")


    useLocalStorage({ titleOfStorage: "AddProgramData", formData: programInfo, setFormData: setProgramInfo, initialState, shouldUpdate, setShouldUpdate, dependancies: [] })

    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData()

        Object.keys(programInfo).forEach((key) => {
            formData.append(key, programInfo[key])
        })

        addProgram(formData, () => { setProgramInfo(initialState); shouldNavigate && navigate(siteLinks.programs.link) })

    }



    return (
        <div>
            <GoBack pageTitle="Add a Program" bredLinks={bredLinks} />

            <form onSubmit={handleSubmit} className="mt-4 animate-fade-up animate-once">
                <div>


                    <div className="bg-gray-50 rounded-md border p-3 ">
                        <p className="font-semibold">1. About the Program</p>

                        <div className='row g-3 mt-2'>
                            <div className="col-md-6">
                                <label htmlFor="prefix" className="form-label">Program Prefix</label>
                                <input type="text" required placeholder='Ex: One Day Workshop or 2 Days Seminar' maxLength={200}
                                    value={programInfo?.prefix || ''}
                                    onChange={(e) => setProgramInfo((prev) => {
                                        return { ...prev, prefix: e.target.value }
                                    })}
                                    className="form-control" id="prefix" aria-describedby="emailHelp" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="title" className="form-label">Title of the Program</label>
                                <input type="text" required placeholder='Title goes here...' maxLength={200}
                                    value={programInfo?.title || ''}
                                    onChange={(e) => setProgramInfo((prev) => {
                                        return { ...prev, title: e.target.value }
                                    })}
                                    className="form-control" id="title" aria-describedby="emailHelp" />
                                <div id="titleHelp" className="form-text">The program title should not exceed 200 characters.</div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="title" className="form-label">Organized by</label>
                                <input type="text" required placeholder='Program is arranged by...'
                                    value={programInfo?.arrangedBy || ''}
                                    onChange={(e) => setProgramInfo((prev) => {
                                        return { ...prev, arrangedBy: e.target.value }
                                    })}
                                    className="form-control" />

                            </div>
                            <div className="col-md-6">
                                <label htmlFor="title" className="form-label">Program Venue</label>
                                <input type="text" required placeholder='Program Venue'
                                    value={programInfo?.venue || ''}
                                    onChange={(e) => setProgramInfo((prev) => {
                                        return { ...prev, venue: e.target.value }
                                    })}
                                    className="form-control" />

                            </div>

                            <div className="col-md-3">
                                <label htmlFor="programDate" className="form-label">Program Date</label>
                                <input type="date" required
                                    value={programInfo?.programDate || ''}
                                    onChange={(e) => setProgramInfo((prev) => {
                                        return { ...prev, programDate: e.target.value }
                                    })}
                                    className="form-control" />

                            </div>
                            <div className="col-md-3">
                                <label htmlFor="title" className="form-label">Final Date for Registration</label>
                                <input type="date" required
                                    value={programInfo?.finalRegistrationDate || ''}
                                    onChange={(e) => setProgramInfo((prev) => {
                                        return { ...prev, finalRegistrationDate: e.target.value }
                                    })}
                                    className="form-control" />

                            </div>

                            <div className="col-md-6">
                                <label htmlFor="summary" className="form-label">Program Theme </label>
                                <textarea rows={10} required placeholder='Write in brief about the program...' maxLength={2000} value={programInfo?.summary || ''}
                                    onChange={(e) => setProgramInfo((prev) => {
                                        return { ...prev, summary: e.target.value }
                                    })} className="form-control" id="summary" aria-describedby="emailHelp" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="whoCanParticipate" className="form-label">Who can Participate? </label>
                                <textarea rows={10} required placeholder='Write in brief about who can participate...' maxLength={2000} value={programInfo?.whoCanParticipate || ''}
                                    onChange={(e) => setProgramInfo((prev) => {
                                        return { ...prev, whoCanParticipate: e.target.value }
                                    })} className="form-control" id="whoCanParticipate" aria-describedby="emailHelp" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="registrationDetails" className="form-label"> Registration Details  </label>
                                <textarea rows={10} required placeholder='Write in brief about Registration Details ...' maxLength={2000} value={programInfo?.registrationDetails || ''}
                                    onChange={(e) => setProgramInfo((prev) => {
                                        return { ...prev, registrationDetails: e.target.value }
                                    })} className="form-control" id="registrationDetails" aria-describedby="emailHelp" />
                            </div>


                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-md border p-3 mt-2">
                        <div>
                            <p className="font-semibold">2. About Resource Person</p>
                            <div className="row g-3 mt-1">
                                <div className='col-md-4'>
                                    <label htmlFor="title" className="form-label">Choose Photo of Resource Person</label>
                                    <input type="file" onChange={(e) => {
                                        setProgramInfo((prev) => {
                                            return { ...prev, pPhotoURL: e.target.files[0] }
                                        })
                                    }} required className="form-control" name="file" id="person" />
                                </div>
                                <div className='col-md-4'>
                                    <label htmlFor="pName" className="form-label">Name of the Resource Person</label>
                                    <input type="input" onChange={(e) => {
                                        setProgramInfo((prev) => {
                                            return { ...prev, pName: e.target.value }
                                        })
                                    }}
                                        value={programInfo?.pName || ''}
                                        required className="form-control" placeholder='Name' id="pName" />
                                </div>
                                <div className='col-md-4'>
                                    <label htmlFor="pDesignation" className="form-label">Designation of the Resource Person</label>
                                    <input type="input" onChange={(e) => {
                                        setProgramInfo((prev) => {
                                            return { ...prev, pDesignation: e.target.value }
                                        })
                                    }}
                                        value={programInfo?.pDesignation || ''}
                                        required className="form-control" placeholder='Designation' id="pDesignation" />
                                </div>
                                <div className='col-md-4'>
                                    <label htmlFor="pAddress" className="form-label">Institute / Place / College Address</label>
                                    <input type="input" onChange={(e) => {
                                        setProgramInfo((prev) => {
                                            return { ...prev, pAddress: e.target.value }
                                        })
                                    }}
                                        value={programInfo?.pAddress || ''}
                                        required className="form-control" placeholder='Address' id="pAddress" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="pSummary" className="form-label">Career Summary </label>
                                    <textarea rows={10} required placeholder='Write in brief about the career or qualifications and achievements of Resource Person...' maxLength={2000} value={programInfo?.pSummary || ''}
                                        onChange={(e) => setProgramInfo((prev) => {
                                            return { ...prev, pSummary: e.target.value }
                                        })} className="form-control" id="pSummary" aria-describedby="emailHelp" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-md border p-3 mt-2">
                        <div>
                            <p className="font-semibold">3. Contact Details</p>

                            {
                                ["Contact Person 1", "Contact Person 2"].map((main, index) => {
                                    return <div className="row g-3 mt-1 mb-4">
                                        <p className='text-semibold'> 3.{index + 1}: {main}</p>
                                        {
                                            [{ title: "Name", id: "cName" },
                                            { title: "Position", id: "cPosition" },
                                            { title: "Email", id: "cEmail" },
                                            { title: "Phone", id: "cPhone" }].map((item) => {
                                                return <div className='col-md-4'>
                                                    <label htmlFor={`${item.title}-${index + 1}`} className="form-label">{`${item.title}`}</label>
                                                    <input required type="input"
                                                        value={programInfo?.[`${item.id}${index}`] || ''} onChange={(e) => {
                                                            setProgramInfo((prev) => {
                                                                return { ...prev, [`${item.id}${index}`]: e.target.value }
                                                            })
                                                        }} className="form-control" placeholder={`${item.title}`} id={`${item.title}-${index + 1}`} />
                                                </div>
                                            })}

                                    </div>
                                })
                            }

                        </div>
                    </div>


                    <div className='my-5'>
                        <div class="flex items-center">
                            <input id="checked-checkbox" checked={shouldNavigate} onChange={(e) => setShouldNavigate((prev) => !prev)} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                            <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">Go to All Programs Page after saving.</label>
                        </div>

                        <button type="submit" className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ">
                            Save Program
                            <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddProgram
