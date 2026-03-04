import React from 'react'
import { Popconfirm, Tooltip } from 'antd'
import { CircularProgress, IconButton } from '@mui/material'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import FileViewer from '../../../components/FileViewer';
import { deleteItem } from '../../../js/deleteItem';
import { useState, useEffect } from 'react';
import { submitATR, uploadATR } from '../js/uploadATR';
import { useQuery } from 'react-query';
import { getModelData } from '../../faculty/js/refresh';
import UserLoading from '../../../pages/UserLoading';
import { SaveButton } from '../../faculty/reports/cas/CasReportHome';
import { toast } from 'react-hot-toast';

const UploadActionReport = ({ schoolName, academicYear, setTabName, handleNext }) => {


    // main fetcher
    let param = { model: 'ActionTakenReport', filter: { schoolName, academicYear } }
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => getModelData(param))

    function submitReport() {
        let reportData = data?.data?.data?.[0]
        if ((reportData?.Student && reportData?.Teacher && reportData?.Alumni && reportData?.Parent && reportData?.Employer && reportData?.Expert)) {

            if (reportData?.submitted) {
                setTabName('ack'); handleNext();
                console.log('Action Taken Report submitted successfully.')
            } else {
                submitATR(true, schoolName, academicYear, refetch, () => { setTabName('ack'); handleNext(); }, () => { })
            }

        } else {
            toast.error('Uploading all the Action Taken reports are mandatory before submitting...')
        }
    }

    useEffect(() => {
        console.log("isLoading : main", isLoading)
    }, [isLoading])


    return (
        <div>

            <div className="flex p-3 mt-4 text-blue-800 rounded-lg bg-blue-50 " role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 mr-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">Ensure that these requirements are met:</span>
                    <ul className="mt-1.5 ml-4 list-disc list-inside text-sm">
                        <li>Please upload Action Taken Report with Director signature and stamp.</li>
                        <li>Make sure that the file (Action Taken Report) you're uploading is less than 1MB in size.</li>
                        <li>Kindly ensure that all the reports are uploaded prior to submission. Your School Action Taken Reports will only be deemed as submitted if all the individual reports (which are Student, Teacher, Alumni, Employer, Parent & Expert) are successfully uploaded. However, if you choose to delete a previously uploaded report and leave it blank, it will be regarded as not submitted. Your adherence to these guidelines is greatly appreciated.</li>
                    </ul>
                </div>
            </div>

            {
                isLoading ? <UserLoading title="Checking for Reports" /> : <div className="my-4 grid grid-cols-2 gap-3">
                    {['Student', 'Teacher', 'Alumni', 'Parent', 'Employer', 'Expert'].map((title) => (
                        <UploadReport
                            key={title}
                            data={data?.data?.data?.[0]}
                            refetch={refetch}
                            academicYear={academicYear}
                            schoolName={schoolName}
                            title={title}
                        />
                    ))}
                </div>
            }



            <div className="mb-20">
                <SaveButton title={`Submit Action Taken Report (${academicYear})`} onClickFunction={() => { submitReport() }} />
            </div>



        </div>
    )
}

export default UploadActionReport


const UploadReport = ({ title, schoolName, academicYear, data, refetch, }) => {

    const [loading, setLoading] = useState(false)


    const uploadFile = (file, title, add, setLoading) => {

        const formData = new FormData();
        formData.append("ATRFile", file)
        formData.append('title', title)
        formData.append('schoolName', schoolName)
        formData.append('academicYear', academicYear)

        uploadATR(formData, refetch, add, setLoading)
        document.getElementById(title).value = ''
    }


    const afterDelete = () => {
        uploadFile(null, title, false, setLoading)
        submitATR(false, schoolName, academicYear, refetch, () => { }, setLoading)
    }







    return <div className=" text-gray-800 rounded-lg bg-gray-100 p-3" role="alert">
        <div>
            <label for="formFile" className="form-label">Upload Action Taken Report for {title} Feedback</label>
            <input className="form-control" name="ATRFile" type="file" id={title}
                onChange={(e) => {
                    uploadFile(e.target.files[0], title, true, setLoading)
                }} />

            <div>

                {
                    loading ? <div className="mt-2 mx-auto w-[0%]"><CircularProgress size="20px" /></div> : <div>

                        {
                            data?.[title] ? <div className='flex items-center justify-start gap-2 rounded-md mt-2'>
                                <Popconfirm
                                    title="Do you want to delete this item?"
                                    onConfirm={() => {
                                        deleteItem({ fileName: data?.[title], path: 'FeedbackATR' }, afterDelete, setLoading)
                                    }}
                                    onCancel={() => { }}
                                    okText="Yes, Delete"
                                    cancelText="Cancel"
                                    okButtonProps={{ "type": "default" }}>
                                    <Tooltip title="Delete File" placement='bottom' >
                                        <IconButton>
                                            <DeleteRoundedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Popconfirm>
                                <FileViewer serviceName="FeedbackATR" showFullFileName={true} fileName={data?.[title]} />




                            </div> : <div className=" text-yellow-700 mt-2">
                                Report not yet uploaded
                            </div>
                        }

                    </div>
                }




            </div>
        </div>
    </div>
}
