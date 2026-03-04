import { IconButton, TextField, Tooltip } from '@mui/material'
import React, { useEffect } from 'react'
import HttpsRoundedIcon from '@mui/icons-material/HttpsRounded';
import { SaveButton } from '../CasReportHome';
import toast from 'react-hot-toast';
import FileViewer from '../../../../../components/FileViewer';
import Axios from 'axios'
import Note from '../../../../director/reports/academic-audit/components/Note';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Popconfirm } from 'antd';
import { api } from '../../../../../js/api';


const Teaching = ({ casYearState, setTabName, tabName, handleNext, serverCasData, setChangeTeaching, changeTeaching, teachingData, setTeachingData, saveLoader, setSaveLoader }) => {


    const activitiesInvolved = [
        { id: 'A', activity: 'Administrative responsibilities such as Head / Chairperson / Dean / Director / Coordinator / Warden etc.' },
        { id: 'B', activity: 'Examination and evaluation duties assigned by the college / university or attending the examination paper evaluation.' },
        { id: 'C', activity: 'Student related co-curricular, extension and field based activities such as student clubs, career counselling, study visits, student seminars and other events, cultural, sports, NCC, NSS and community services.' },
        { id: 'D', activity: "Organising seminars / conferences / workshops and other college or university activities." }, { id: 'E', activity: "Evidence of actively involved in guiding Ph.D. students." },
        { id: 'F', activity: "At least one single or joint publication in peer-reviewed or UGC list of journals." },
        { id: 'G', activity: "Conducting minor or major research project sponsored by National or International agencies." }]



    function calculateTeachingPercentage() {

        // validation
        if (parseInt(teachingData.classesTaught) > parseInt(teachingData.totalClasses)) {
            toast.error('Total Classes cannot be greater than Classes Taught.')
            setTeachingData({ ...teachingData, teachingGrade: null })
            return false
        }
        else if (parseInt(teachingData.totalClasses) <= 0) {
            toast.error('Total Classes cannot be 0.')
            setTeachingData({ ...teachingData, teachingGrade: null })
            return false
        }

        // Computation of teaching percentage
        const teachingGrade = Math.ceil((teachingData.classesTaught / teachingData.totalClasses) * 100);

        teachingGrade >= 80 ?
            setTeachingData({ ...teachingData, teachingGrade, teachingRemark: 'Good', teachingRemarkColor: 'green' }) :
            teachingGrade >= 70 ?
                setTeachingData({ ...teachingData, teachingGrade, teachingRemark: 'Satisfactory', teachingRemarkColor: 'yellow' }) :
                setTeachingData({ ...teachingData, teachingGrade, teachingRemark: 'Not-Satisfactory', teachingRemarkColor: 'red' })
    }


    useEffect(() => {
        setTeachingData({ checkBoxCount: 0, checkBoxSelected: [], teachingGrade: null, totalClasses: null, classesTaught: null, teachingRemark: null, teachingRemarkColor: null })
    }, [casYearState])

    useEffect(() => {


        setTeachingData(serverCasData?.teachingData === undefined ? { checkBoxCount: 0, checkBoxSelected: [], teachingGrade: null, totalClasses: null, classesTaught: null, teachingRemark: null, teachingRemarkColor: null } : { ...teachingData, checkBoxSelected: serverCasData?.teachingData.checkBoxSelected, checkBoxCount: serverCasData?.teachingData.checkBoxCount, teachingGrade: serverCasData?.teachingData.teachingGrade, totalClasses: serverCasData?.teachingData.totalClasses, classesTaught: serverCasData?.teachingData.classesTaught, teachingRemark: serverCasData?.teachingData.teachingRemark, teachingRemarkColor: serverCasData?.teachingData.teachingRemarkColor, uploadedFiles: serverCasData?.teachingData.uploadedFiles, uploadedAttendance: serverCasData?.teachingData.uploadedAttendance, })

    }, [serverCasData, casYearState])





    const submitAttendance = (e) => {
        if (!teachingData.selectedAttendance) {
            toast.error('Please select an attachment to upload')
            return
        }
        else {
            const formData = new FormData();
            formData.append('attendance', teachingData.selectedAttendance);

            const url = `${api}/api/faculty/CAS-Report/saveTeachingActivityDocs`

            Axios.post(url, formData)
                .then((res) => {
                    if (res.data.status === 'success') {
                        setTeachingData({
                            ...teachingData, uploadedAttendance: {
                                file: res.data?.data?.attendance ? res.data?.data?.attendance : teachingData?.uploadedAttendance?.file,
                            }, selectedAttendance: null

                        })
                        savingFunction()
                        toast.success('Director Certificate Uploaded Successfully')
                    }
                    else {
                        console.log('Failed...')
                        toast.error('Could not upload Director Certificate, please try again...')
                    }
                }).catch(function (err) {
                    console.log(err)
                    toast.error('Failed due to Internal Server error')
                })
        }
    }

    // const deleteFile = (fileName) => {
    //     const url = `${api}/api/deleteFile`
    //     Axios.post(url, { fileName, path: 'CAS' })
    //         .then((res) => {
    //             if (res.data.status === 'deleted') {
    //                 setTeachingData({
    //                     ...teachingData, uploadedAttendance: null
    //                 })
    //                 savingFunction()
    //                 toast.success('File deleted successfully')
    //             } else {
    //                 toast.error('Error deleting File')
    //             }
    //         })
    // }

    const savingFunction = () => {
        setSaveLoader(true)
    }




    return (
        <div className="w-full">

            {/* <p className="p-2 border-l-green-600 border-l-4 mt-3 text-lg">Teaching and Teaching related activities</p> */}

            <div className='my-3 text-lg'>
                <p className='font-bold text-xl'>Teaching Activities</p>

                {/* TEACHING */}
                <BGPad classes='mt-2 w-full'>
                    <div>

                        1. Teaching

                        <p className='text-gray-500 md:text-sm text-xs'>Note : Classes taught includes sessions on tutorials, lab and other teaching related activities.</p>

                        <div className='flex-col items-start md:flex-row flex md:items-center justify-between mt-4 w-full'>
                            <form className=' flex flex-col md:flex-row md:items-center justify-start gap-3' onSubmit={(e) => { e.preventDefault(); }}>
                                <div className='flex items-center justify-between gap-3'>
                                    <TextField focused id="standard-basic" type="number" label="Total Classes Taught" variant="standard" value={teachingData.classesTaught === null ? '' : teachingData.classesTaught} onChange={(e) => { setTeachingData({ ...teachingData, classesTaught: e.target.value }) }} />
                                    <div className='font-bold my-3 block md:hidden'>divided by</div>
                                </div>
                                <div className='font-bold hidden md:block'>/</div>
                                <div className='flex items-center justify-between gap-3'>
                                    <TextField focused id="standard-basic" type="number" label="Total Classes Assigned" variant="standard" value={teachingData.totalClasses === null ? '' : teachingData.totalClasses} onChange={(e) => { setTeachingData({ ...teachingData, totalClasses: e.target.value }) }} />
                                    <div className='font-bold mt-3 block md:hidden '>X 100%</div>
                                </div>
                                <div className='font-bold hidden md:block'>X 100%</div>

                                <Button type="submit" title='=' classes='md:ml-5 mt-3 text-2xl mr-4 font-bold px-4 py-1' onClickFunction={
                                    () => { calculateTeachingPercentage() }} />
                            </form>

                            <div>
                                <hr className='block md:hidden mt-3' />
                                {
                                    teachingData?.teachingGrade && teachingData.teachingGrade ?
                                        <div className='flex items-center justify-start gap-2 mt-3 md:mt-0'>
                                            <p className='text-base border-r-2 pr-2'>Teaching : <span className='font-bold text-lg'>{teachingData.teachingGrade}%</span></p>
                                            <Remark title={teachingData.teachingRemark} color={teachingData.teachingRemarkColor} />

                                        </div> :
                                        null
                                }
                            </div>
                        </div>


                        <div className='flex items-center justify-between flex-wrap'>
                            {
                                teachingData?.teachingGrade && teachingData.teachingGrade ? <div className="input-group mt-3 lg:w-[50%] flex items-center justify-end sm:w-[100%]">
                                    <input type="file" className="form-control" id="uploadAttendance" aria-describedby="uploadAttendance" aria-label="Upload" name="Attendance"
                                        onChange={(e) => { setTeachingData({ ...teachingData, selectedAttendance: e.target.files[0] }) }} accept="application/pdf" />
                                    <button onClick={submitAttendance} className="btn btn-primary bg-blue-700 hover:bg-blue-600" type="button" id="uploadAttendance">Upload Director Certificate</button>
                                </div> : null}

                            {/* {
                                teachingData.uploadedAttendance?.file &&
                                <div className='flex items-center justify-start gap-2 mt-3 bg-blue-100 rounded-md px-2'>
                                    <FileViewer serviceName="CAS"
                                        fileName={teachingData.uploadedAttendance?.file?.[0]?.filename} />


                                    <Popconfirm
                                        title="Do you want to delete this item?"
                                        onConfirm={() => {
                                            deleteFile(teachingData.uploadedAttendance?.file?.[0]?.filename)
                                        }}
                                        onCancel={() => { }}
                                        okText="Yes, Delete"
                                        cancelText="Cancel"
                                        okButtonProps={{ "type": "default" }}>
                                        <Tooltip title="Delete File">
                                            <IconButton>
                                                <DeleteRoundedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Popconfirm>

                                </div>
                            } */}
                        </div>


                    </div>
                </BGPad>


                {/* Involvement in activities */}
                <BGPad classes='mt-4'>
                    <div>

                        2. Involvement in University / College students related activities / Research activities

                        <Note title="Please tick the following checks as per your involvement. You may check your already existing files by clicking on View File button. In case you want to replace them with new one, please choose a new file from the input." />


                        <div className='text-base mt-5'>
                            <div className='flex items-center justify-start md:justify-between gap-3 text-sm md:text-base'>

                                <p className='md:pr-4'>Select the following </p>
                                <div className='flex items-center justify-start gap-2'>
                                    <p className=''>Selected : <span className='font-bold'>{teachingData.checkBoxCount}</span> </p>
                                    <p className='border-l-2 pl-2'>
                                        {
                                            teachingData.checkBoxCount > 2 ?
                                                <Remark title='Good' color='green' /> :
                                                teachingData.checkBoxCount >= 1 ?
                                                    <Remark title='Satisfactory' color='yellow' /> :
                                                    <Remark title='Not-Satisfactory' color='red' />
                                        }
                                    </p>
                                </div>

                            </div>




                            <div>

                                {
                                    activitiesInvolved.map((activity, index) => {
                                        return (
                                            <CheckBox setChangeTeaching={setChangeTeaching} changeTeaching={changeTeaching} activity={activity} key={index} title={activity.activity} id={activity.id} setTeachingData={setTeachingData} teachingData={teachingData} serverCasData={serverCasData} tabName={tabName} savingFunction={savingFunction} />
                                        )
                                    })
                                }


                            </div>
                        </div>

                    </div>
                </BGPad>

            </div>


            <div className='my-3 text-lg'>
                <p className='font-bold text-xl'>Overall Grading</p>

                {/* Summary of all computation in a table */}
                <BGPad classes='mt-3 text-base'>
                    {
                        teachingData.teachingGrade && teachingData.teachingGrade ?
                            <div className='text-sm md:text-base'>

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Teaching</th>
                                            <th scope="col">Involvement in activities</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Grade Obtained or Activities selected</th>
                                            <td>{teachingData.teachingGrade}%</td>
                                            <td>{teachingData.checkBoxCount} Activities selected</td>

                                        </tr>
                                        <tr>
                                            <th scope="row">Remark</th>
                                            <td>{
                                                teachingData.teachingGrade >= 80 ?
                                                    <Remark title='Good' color={'green'} /> :
                                                    teachingData.teachingGrade >= 70 ?
                                                        <Remark title='Satisfactory' color='yellow' /> :
                                                        <Remark title='Not-Satisfactory' color='red' />
                                            }</td>
                                            <td>{
                                                teachingData.checkBoxCount > 2 ?
                                                    <Remark title='Good' color='green' /> :
                                                    teachingData.checkBoxCount >= 1 ?
                                                        <Remark title='Satisfactory' color='yellow' /> :
                                                        <Remark title='Not-Satisfactory' color='red' />
                                            }</td>

                                        </tr>

                                    </tbody>
                                </table>

                                <p className='p-3 border rounded-lg'>Grand Total / Remark :
                                    <span className='ml-4'>{
                                        teachingData.teachingGrade >= 80 && teachingData.checkBoxCount > 0 ?
                                            <Remark title='Good' color={'green'} /> :
                                            (teachingData.teachingGrade >= 70 && teachingData.teachingGrade < 80) && (teachingData.checkBoxCount > 0) ?
                                                <Remark title='Satisfactory' color='yellow' /> :
                                                <Remark title='Not-Satisfactory' color='red' />

                                    }</span>
                                </p>


                                <p className='text-xs md:text-sm text-gray-500 mt-5'>Note : For periods of duration which have been spent by the teacher on different kinds of paid leaves such as maternity leave childcare leave student leave medical leave extraordinary leave and depositional shall be excluded from the grading assessment the teacher shall be assessed for the remaining period of duration and the same shall be extrapolated for the entire period of assessment to arrive at the grading of the teacher. The teacher on such leaves or deputation as mentioned above shall not be put to any disadvantage for promotion under CAS due to his or her absence from his or her teaching responsibilities subject to the condition that such leave deputation was undertaken with the prior approval of the competent authority following all procedures laid down in these regulations and as per the act, statues and ordinance of the parent institution.</p>



                            </div>

                            :

                            <div>
                                <p className="text-center my-2"><HttpsRoundedIcon color="action" /></p>
                                <p className='text-gray-500 text-sm text-center'>Note : Please fill the form above to get the summary.</p>
                            </div>
                    }
                </BGPad>
            </div>

            <div className='mt-4'>
                <SaveButton title="Save and Proceed" onClickFunction={() => { handleNext(); setTabName('second'); }} />
            </div>

        </div>
    )
}

export default Teaching


// Other small components

const Button = ({ title, classes, onClickFunction, type = 'button' }) => {
    return (
        <button type={type} className={` duration-200 border-2 border-blue-900 text-blue-900 bg-blue-100 hover:bg-blue-200 p-2 rounded-lg ease-in-out ${classes}`} onClick={onClickFunction}>{title}</button>
    )
}


const CheckBox = ({ title, id, setTeachingData, teachingData, savingFunction }) => {

    const submitActivityFiles = (file, fileTagName) => {
        // e.preventDefault();
        if (file) {

            const formData = new FormData();

            formData.append('activity-file', file);
            formData.append('fileTagName', fileTagName)

            const url = `${api}/api/faculty/CAS-Report/saveTeachingActivityDocsSingle`
            Axios.post(url, formData)
                .then((res) => {
                    if (res.data.status === 'success') {
                        setTeachingData({
                            ...teachingData, uploadedFiles: {
                                ...teachingData.uploadedFiles,
                                [`file-${fileTagName}`]: res.data?.data ? res.data?.data : teachingData?.uploadedFiles?.[fileTagName],
                            }
                        })
                        savingFunction()
                        toast.success('Files uploaded successfully')
                    }
                    else {
                        console.log('Failed...')
                        toast.error('Could not upload files, please try again...')
                    }
                }).catch(function (err) {
                    console.log(err)
                    toast.error('Failed due to Internal Server error')
                })
        } else {
            toast.error('Choose a file to upload')
        }

    }

    const selectCheckBox = (checkBoxId) => {

        // Check if the checkbox is checked 
        if (document.getElementById(checkBoxId).checked) {
            setTeachingData({ ...teachingData, checkBoxCount: teachingData.checkBoxCount + 1, checkBoxSelected: [...teachingData.checkBoxSelected, checkBoxId] })

        }
        else {
            setTeachingData({ ...teachingData, checkBoxCount: teachingData.checkBoxCount - 1 })
            let oldArray = teachingData.checkBoxSelected;
            setTeachingData({ ...teachingData, checkBoxCount: teachingData.checkBoxCount - 1, checkBoxSelected: oldArray.filter((elem) => elem !== checkBoxId) })

        }


    }

    const deleteFile = (fileName, fileId) => {

        const url = `${api}/api/deleteFile`
        Axios.post(url, { fileName, path: 'CAS' })
            .then((res) => {
                if (res.data.status === 'deleted') {
                    setTeachingData({
                        ...teachingData, uploadedFiles:
                            { ...teachingData.uploadedFiles, [fileId]: null }
                    })
                    savingFunction()

                    toast.success('File deleted successfully')
                } else {
                    console.log('Could delete the item, because file not found')
                    setTeachingData({
                        ...teachingData, uploadedFiles:
                            { ...teachingData.uploadedFiles, [fileId]: null }
                    })
                    savingFunction()

                }
            })

    }


    return (
        <form className="my-4 w-[100%] md:w-[75%] text-sm md:text-base p-2" onSubmit={(e) => { submitActivityFiles(e, id) }} encType="multipart/form">
            <div className='form-check'>
                <input className="form-check-input" type="checkbox" id={id} onChange={() => { selectCheckBox(id) }} checked={teachingData && teachingData.checkBoxSelected?.includes(id)} />
                <label className="form-check-label mx-2" htmlFor={id}>
                    {title}
                </label>
            </div>
            <div className="flex items-start justify-start gap-3 mt-2 ml-6">

                {teachingData && teachingData.checkBoxSelected?.includes(id) && <div className="mx-2 md:text-base text-sm w-[50%]">

                    <div className="input-group">
                        <input className="form-control" type="file" id={`formFile${id}`} placeholder="Choose proof" name="activity-file" onChange={
                            (e) => { submitActivityFiles(e.target.files[0], id) }} accept="application/pdf" />
                        <Note title="In case you're involved in more than one activity, please upload it in a single PDF file." />

                    </div>
                </div>
                }





                {
                    (teachingData.uploadedFiles?.[`file-${id}`] && teachingData.checkBoxSelected?.includes(id)) &&
                    <div className='flex items-center justify-start gap-2 bg-blue-100 rounded-md px-2'>
                        <FileViewer serviceName="CAS"
                            fileName={teachingData.uploadedFiles?.[`file-${id}`]?.filename} />

                        <Popconfirm
                            title="Do you want to delete this item?"
                            onConfirm={() => {
                                deleteFile(teachingData.uploadedFiles?.[`file-${id}`]?.filename, `file-${id}`)
                            }}
                            onCancel={() => { }}
                            okText="Yes, Delete"
                            cancelText="Cancel"
                            okButtonProps={{ "type": "default" }}>
                            <Tooltip title="Delete File">
                                <IconButton>
                                    <DeleteRoundedIcon />
                                </IconButton>
                            </Tooltip>
                        </Popconfirm>


                    </div>
                }


            </div>
        </form>
    )
}


const Remark = ({ title, color }) => {
    return (
        <span className={`px-2 md:text-sm py-1 ${color === 'red' ? 'text-red-900 bg-red-200 border-red-300 border-2 text-[9px]' : color === 'green' ? 'text-green-900 bg-green-200 border-green-300 border-2' : color === 'yellow' ? 'text-yellow-900 bg-yellow-200 border-yellow-300 border-2' : color === 'blue' ? 'text-blue-900 bg-blue-200 border-blue-300 border-2' : null} rounded-full text-xs`}>{title}</span>
    )
}

export { Remark }



const BGPad = ({ children, classes }) => {
    return (
        <div className={`border-[#8c8cd9] rounded-lg p-3 border-2 text-sm lg:text-base ${classes}`} style={{ backgroundColor: '#8c8cd924' }}>
            {children}
        </div>
    )
}

export { BGPad }

