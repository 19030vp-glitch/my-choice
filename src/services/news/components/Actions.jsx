import { IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Popconfirm } from 'antd';
import { toast } from 'react-hot-toast';
import Axios from 'axios'
import DialogBox from '../../../components/DialogBox'
import { EditorForm } from '../pages/PROEditor';
import { api } from '../../../js/api';

const Actions = ({ news, refetch }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    // delete the news
    const handelDelete = () => {
        const url = `${api}/api/news/delete`
        Axios.post(url, { id: news._id })
            .then((res) => {
                if (res.data.status === 'deleted') {
                    toast.success('News deleted successfully')
                    refetch()
                } else {
                    toast.error(res.data.message)
                }
            }).catch((err) => {
                toast.error('Something went wrong')
            })
    }


    return (
        <div className='flex items-center justify-start gap-2'>

            <DialogBox title="Edit News" isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} buttonName="Save Changes" showActions={false} >
                <EditorForm actionToPerform="Edit" news={news} setIsModalOpen={setIsModalOpen} refetch={refetch} />
            </DialogBox>


            <Tooltip title="Edit News" placement="top">
                <IconButton onClick={() => setIsModalOpen(true)}>
                    <EditRoundedIcon sx={{ fontSize: '20px' }} />
                </IconButton>
            </Tooltip>

            <Popconfirm
                title="Do you want to delete this News?"
                onConfirm={handelDelete}
                onCancel={() => { }}
                okText="Yes, Delete"
                cancelText="Cancel"
                okButtonProps={{ "type": "default" }}>
                <Tooltip title="Delete News" placement="top">
                    <IconButton>
                        <DeleteRoundedIcon sx={{ fontSize: '20px' }} />
                    </IconButton>
                </Tooltip>
            </Popconfirm>

        </div>
    )
}

export default Actions