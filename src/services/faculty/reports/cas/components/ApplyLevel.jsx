import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Axios from 'axios'
import { FileViewWithDelete } from '../content/AddPaper'
import { saveEligibilityData } from '../CASServices'
import { useSelector } from 'react-redux'
import { api } from '../../../../../js/api'
import MinimumPublicationCheck from './MinimumPublicationCheck'

const stageObj = {

    'stage1': {
        id: 1, title: 'Stage 1 to 2 (AL 10 to AL 11)', stage: 'stage1', inputData: [
            { title: 'Attended one Orientation course of 21 days duration on teaching methodology', name: 'stage1FDP', type: "file" },
            { title: "Completed Refresher/ Research Methodology Course/ Workshop/ Syllabus Up-gradation Workshop/ Training Teaching-Learning-Evaluation, Technology Programmes/ Faculty Development Programmes of at least one week (5 days) duration, or taken one MOOCs course (with ecertification) or development of e-contents in four-quadrants / MOOC's course during the assessment period", name: 'stage1MultiProof', type: "file" }, { title: "Published one research publication in the peer-reviewed journals or UGC-listed journals during assessment period.", type: "check", name: 'publicationNumber' }]
    },

    'stage2': {
        id: 2, title: 'Stage 2 to 3 (Assistant Professor)', stage: 'stage2', inputData: [
            { title: 'Ph.D. Degree in the subject relevant/allied/relevant discipline.', name: 'phdDegree', type: "file" },
            { title: 'Has done any two of the following in the last five years of Academic Level 11/Senior Scale: Completed a course / programme from amongst the categories of Refresher Courses/Research Methodology/Workshops/ Syllabus Up-gradation Workshop/ Teaching-Learning-Evaluation/ Technology Programmes / Faculty Development Programme of at least two weeks (tedays) duration (or completed two courses of at least one week (five days) duration in lieu of every single course/programme of at least two weeks (ten days) duration) completed one MOOCs course in the relevant subject (with e-certification); or contribution towards the development of e-content in 4-quadrant (at least one quadrant) minimum of 10 modules of a course/contribution towards the development of at least 10 modules of MOOCs course/contribution towards conduct of a MOOCs course during the period of assessment. Proof 1 of the above mentioned activities:', name: 'stage2File1', type: "file" },

            { title: 'Proof 2 of the above mentioned activities:', name: 'stage2File2', type: "file" },

            { title: "Published three research papers in the peer-reviewed journals or UGC-listed journals during assessment period", type: "check", name: 'publicationNumber' }
        ]
    },

    'stage3': {
        id: 3, title: 'Stage 3 to 4 (Associate Professor)', stage: 'stage3', inputData: [{ title: 'Ph.D. Degree in the subject relevant/allied/relevant discipline.', name: "phdDegree", type: "file" },
        { title: 'Evidence of having successfully guided doctoral candidate.', name: "guideProof", type: "file" },
        { title: 'Any one of the following during last three years: completed one course / programme from amongst the categories of Refresher Courses/ Research Methodology Workshops/Syllabus Up-gradation Workshop/Teaching-Learning-Evaluation Technology Programme/ Faculty Development Programme of at least two weeks (ten days) duration (or completed two courses of at least one week (five days) duration in lieu of every single course/programme of at least two weeks (ten days) duration); or completed one MOOCs course (with ecertification); or contribution towards the development of e-content in 4-quadrant (at least one quadrant) minimum of 10 modules of a course/contribution towards development of at least 10 modules of MOOCs course/ contribution towards conduct of a MOOCs course during the period of assessment.', name: "guideProof2", type: "file" },
        { title: 'A minimum of seven publications in the peer-reviewed or UGC-listed journals out of which three research papers should have been published during the assessment period.', name: "isResearchPaper", type: "table", }
        ]
    },
    'stage4': {
        id: 4, title: 'Stage 4 to 5 (Professor)', stage: 'stage4', inputData: [
            { title: 'Ph.D. Degree in the subject relevant/allied/relevant discipline.', name: "phdDegree", type: "file" },
            { title: 'Degree 1: Ph.D. degree has been successfully awarded to a candidates under his/her supervision.', name: "guideProof1", type: "file" },
            { title: 'Degree 2: Ph.D. degree has been successfully awarded to a candidates under his/her supervision.', name: "guideProof2", type: "file" },
            { title: 'Proof of Three years experience as a Associate Professor', type: "file", name: 'experience' },
            { title: 'A minimum of ten publications in the peer-reviewed or UGC-listed journals out of which three Research Papers should have been published during the assessment period.', type: "table", }
        ]
    },

    'stage5': {
        id: 5, title: 'Stage 5 to 6 (Senior Professor)', stage: 'stage5', inputData: [
            { title: 'Proof of Ten years experience as a Professor', type: "file", name: 'experience' },
            { title: 'Ten publications in the peer-reviewed or UGC-listed journals', type: "check", name: 'publicationNumber' },
            { title: 'Ph.D. Degree of Candidate 1', name: "phdProof1", type: "file" },
            { title: 'Ph.D. Degree of Candidate 2', name: "phdProof2", type: "file" },
        ]
    },

}


const ApplyLevel = ({ setLevel, level, setEligData, eligData, fullCASData, setSupervisor, supervisor, setPublicationCriteriaItems, publicationCriteriaItems }) => {

    const [stageData, setStageData] = useState({})
    const user = useSelector((state) => state.user.user)
    const fieldName = level === 'stage3' ? 'isResearchPaper' : 'isPublication'


    const handleRadioChange = (e) => {
        setSupervisor(e.target.value)
        setEligData({ ...eligData, supervisor: e.target.value })
    }

    useEffect(() => {
        if (level && fullCASData) {
            setEligData(() => {
                setSupervisor(() => {
                    return fullCASData[level] ?
                        JSON.parse(fullCASData[level]) && JSON.parse(fullCASData[level]).supervisor ? JSON.parse(fullCASData[level]).supervisor : 'Main Supervisor' :
                        'Main Supervisor'

                })
                return fullCASData?.[level] ?
                    { ...JSON.parse(fullCASData[level]), [fieldName]: (fullCASData[level] && (JSON.parse(fullCASData[level]) ? JSON.parse(fullCASData[level])?.[fieldName] : true)) }
                    :
                    { [fieldName]: true, supervisor: 'Main Supervisor' }
            })
        }
    }, [fullCASData, level])




    const stages = [
        { id: 1, title: 'Stage 1 to 2 (AL 10 to AL 11)', stage: 'stage1', inputData: [] },
        { id: 2, title: 'Stage 2 to 3 (Assistant Professor)', stage: 'stage2', inputData: [] },
        { id: 3, title: 'Stage 3 to 4 (Associate Professor)', stage: 'stage3', inputData: [] },
        { id: 4, title: 'Stage 4 to 5 (Professor)', stage: 'stage4', inputData: [] },
        { id: 5, title: 'Stage 5 to 6 (Senior Professor)', stage: 'stage5', inputData: [] },
    ]


    const submitAttendance = (name) => {

        if (stageData[name]) {
            const formData = new FormData();
            formData.append(name, stageData[name]);

            const url = `${api}/api/faculty/CAS-Report/saveTeachingActivityDocs`

            Axios.post(url, formData)
                .then((res) => {
                    if (res.data.status === 'success') {
                        setEligData({ ...eligData, [name]: res.data.data[name] })
                        toast.success('Proof Uploaded Successfully')
                    }
                    else {
                        console.log('Failed...')
                        toast.error('Could not upload proof please try again...')
                    }
                }).catch(function (err) {
                    console.log(err)
                    toast.error('Failed due to Internal Server error')
                })
        } else {
            toast.error('Please select an attachment to upload')
            return
        }
    }

    const deleteFile = (fileName, otherParams) => {

        if (user) {
            if (window.confirm(`Are you sure you want to delete this proof?`)) {
                const url = `${api}/api/deleteFile`
                Axios.post(url, { fileName, path: 'CAS' })
                    .then((res) => {
                        if (res.data.status === 'deleted') {
                            saveEligibilityData(level, user?._id, { ...eligData, [otherParams.name]: null })
                            setEligData({ ...eligData, [otherParams.name]: null })
                            toast.success('File deleted successfully')
                        } else {
                            toast.error('Error deleting File')
                        }
                    })
            } else {
                return
            }
        }
    }

    return (
        <div className='w-full my-5'>
            <div className='flex items-center justify-center flex-col gap-2 col-sm-3 mx-auto'>
                <label htmlFor="levelSelect">Level applying for</label>
                <select className="form-select" aria-label="Default select example" id="levelSelect" required onChange={(e) => { setLevel(e.target.value); setEligData({}); setStageData({}) }}>
                    <option selected disabled>Choose</option>
                    {
                        stages.map((item) => {
                            return <option value={item.stage} key={item.id}>{item.title}</option>
                        })
                    }
                </select>
            </div>

            <div className="my-5 flex items-center justify-center w-full">
                <div className="w-full mx-auto">
                    {
                        level &&
                        <div className="rounded-sm col-md-5 mx-auto">
                            <p className='font-bold text-blue-900 text-center my-3'>{stageObj?.[level].title}</p>

                            {/* Normal stage implementation for 1 2 3 and 5 */}
                            <div>
                                {
                                    level !== 'stage4' && stageObj?.[level]?.inputData?.map((inputData, index) => {
                                        return inputData.type === "file" ? <ApplyFileInput title={inputData.title} name={inputData.name} submitAttendance={submitAttendance} setStageData={setStageData} stageData={stageData} key={index} deleteFile={deleteFile} setEligData={setEligData} eligData={eligData} /> : inputData.type === "check" ? <ApplyCheckBoxInput title={inputData.title} key={index} setEligData={setEligData} eligData={eligData} name={inputData.name} />
                                            : inputData.type === "text" ? <ApplyTextInput title={inputData.title} key={index} setEligData={setEligData} eligData={eligData} name={inputData.name} /> : null
                                    })
                                }
                            </div>

                            {/* Extra checks for stage 4 */}
                            <div>

                                {
                                    level === 'stage4' && <div className="bg-blue-100 p-3 border rounded-md my-3">
                                        <p className='my-2'>Are you a :</p>
                                        <div className="flex items-center justify-start gap-3">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="superVisor" id="flexRadioDefault1" onChange={handleRadioChange} value="Main Supervisor" checked={supervisor === 'Main Supervisor'} />
                                                <label className="form-check-label" for="flexRadioDefault1">
                                                    Main Supervisor
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="superVisor" id="flexRadioDefault2" onChange={handleRadioChange} value="Co-supervisor" checked={supervisor === 'Co-supervisor'} />
                                                <label className="form-check-label" for="flexRadioDefault2">
                                                    Co-supervisor
                                                </label>
                                            </div>
                                        </div>

                                        <ApplyFileInput title={stageObj?.[level]?.inputData[1].title} name={stageObj?.[level]?.inputData[1].name} submitAttendance={submitAttendance} setStageData={setStageData} stageData={stageData} deleteFile={deleteFile} setEligData={setEligData} eligData={eligData} />
                                        {
                                            supervisor === 'Co-supervisor' && <ApplyFileInput title={stageObj?.[level]?.inputData[2].title} name={stageObj?.[level]?.inputData[2].name} submitAttendance={submitAttendance} setStageData={setStageData} stageData={stageData} deleteFile={deleteFile} setEligData={setEligData} eligData={eligData} />
                                        }
                                    </div>
                                }

                                {
                                    level === 'stage4' && stageObj?.[level]?.inputData?.map((inputData, index) => {
                                        return inputData.type === "file" && (inputData.name === 'phdDegree' || inputData.name === 'experience') ? <ApplyFileInput title={inputData.title} name={inputData.name} submitAttendance={submitAttendance} setStageData={setStageData} stageData={stageData} key={index} deleteFile={deleteFile} setEligData={setEligData} eligData={eligData} /> : inputData.type === "check" ? <ApplyCheckBoxInput title={inputData.title} key={index} setEligData={setEligData} eligData={eligData} name={inputData.name} /> : inputData.type === "text" ? <ApplyTextInput title={inputData.title} key={index} setEligData={setEligData} eligData={eligData} name={inputData.name} /> : null
                                    })
                                }


                            </div>


                        </div>
                    }

                    {
                        level &&
                        <div>
                            {/* Extra checks for minimum publications for stage 3 and stage 4 */}
                            {
                                (level && (level === 'stage3' || level === 'stage4')) && <div>
                                    <MinimumPublicationCheck level={level} eligData={eligData} setEligData={setEligData} fullCASData={fullCASData} setPublicationCriteriaItems={setPublicationCriteriaItems} publicationCriteriaItems={publicationCriteriaItems} />
                                </div>
                            }

                        </div>
                    }
                </div>
            </div>


        </div>
    )
}

export default ApplyLevel

const ApplyFileInput = ({ title, name, submitAttendance, setStageData, stageData, deleteFile, eligData, setEligData }) => {
    return <div className="bg-blue-100 p-3 border rounded-md my-3">
        {
            eligData?.[name] ? <div className="border-2 rounded-md border-blue-500">
                <FileViewWithDelete fileName={eligData[name]?.[0]?.filename} onDeleteClick={deleteFile} otherParams={{ name }} />
            </div> : null
        }
        <p>{title}</p>

        <div className="input-group mt-2">
            <input type="file" className="form-control" name={name} aria-describedby="inputGroupFileAddon04" aria-label="Upload" onChange={(e) => { setStageData({ ...stageData, [name]: e.target.files[0] }) }} />
            <button className="btn btn-outline-primary" type="button" id="inputGroupFileAddon04" onClick={() => { submitAttendance(name) }}>Upload Proof</button>
        </div>

    </div>
}


const ApplyTextInput = ({ title, setEligData, eligData, name }) => {
    return <div className='my-3 bg-blue-100 p-3 border rounded-md'>

        <div className='flex items-start justify-between'>{title}
            <div className='mt-2'>
                <input type="text" className="form-control" onChange={(e) => { setEligData({ ...eligData, [name]: e.target.value }) }} />
            </div></div>
    </div>
}

const ApplyCheckBoxInput = ({ title, setEligData, eligData, name }) => {
    return <div className='my-3 bg-blue-100 p-3 border rounded-md'>
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id={title} onChange={
                (e) => { e.target.checked ? setEligData({ ...eligData, [name]: true }) : setEligData({ ...eligData, [name]: false }) }} checked={eligData[name]} />
            <label className="form-check-label" htmlFor={title} >
                {title}
            </label>
        </div>
    </div>
}




export { stageObj }