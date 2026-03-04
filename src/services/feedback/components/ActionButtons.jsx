import React from 'react'
import { handleReset } from '../js/validateAndSubmit'
import { Popconfirm } from 'antd'
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

const ActionButtons = ({ loading, setFormData, academicYear, schoolName, responseType }) => {
    return (
        <div className='fixed bottom-0 bg-[#ffffff9c] py-2 w-full'>
            <div className='flex item-center justify-start gap-2'>

                {
                    !loading ? <button type="submit" className="bg-primary btn btn-primary flex items-center justify-center gap-2"><SaveRoundedIcon />Submit Form</button>
                        :

                        <button className="btn btn-primary bg-primary" type="button">
                            <span className="mr-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Submitting...
                        </button>

                }


                <Popconfirm
                    title="Are you sure you want to Reset the form?"
                    onConfirm={() => { handleReset(true, setFormData, { academicYear, schoolName }, responseType) }}
                    onCancel={() => { }}
                    okText="Yes, Reset"
                    cancelText="Cancel"
                    okButtonProps={{ "type": "default" }}>

                    <button type="button" className="bg-danger btn btn-danger flex items-center justify-center gap-2"><RestartAltRoundedIcon />Reset Form</button>
                </Popconfirm>
            </div>
        </div>
    )
}

export default ActionButtons
