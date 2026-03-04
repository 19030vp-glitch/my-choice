import React, { useState } from 'react'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Axios from 'axios'
import toast from 'react-hot-toast';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import { Popconfirm } from 'antd';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import cloneItem from '../../../js/cloneItem';
import { api } from '../../../js/api';

const Actions = ({ item, model, refreshFunction, addState, editState, pencilClick }) => {

    const [isLoading, setIsLoading] = useState(false)

    async function handelDelete() {
        setIsLoading(true)
        try {
            Axios.post(`${api}/service/deleteItem`, { itemToDelete: item, model })
                .then((res) => {
                    !res && toast.error('Something went wrong')

                    if (res.data.status === 'deleted') {
                        toast.success('Item deleted successfully')
                        if (refreshFunction) {
                            refreshFunction()
                        }
                        setIsLoading(false)
                    }
                    else if (res.data.status === 'error') {
                        if (refreshFunction) {
                            refreshFunction()
                        }
                        setIsLoading(false)
                    }
                }).catch(() => {
                    if (refreshFunction) {
                        refreshFunction()
                    }
                    setIsLoading(false)
                })
        } catch (error) {
            setIsLoading(false)
        }
    }




    return (
        <div className>
            {/* // EDIT */}
            <button >
                <Tooltip title="Edit" placement="top" disableInteractive>
                    <IconButton onClick={() => { editState(true); addState(false); pencilClick() }}>
                        <EditRoundedIcon />
                    </IconButton>
                </Tooltip>
            </button>

            <button >
                <Tooltip title="Clone / Duplicate" placement="top" disableInteractive>
                    <IconButton onClick={() => { cloneItem(item._id, model, refreshFunction) }}>
                        <ContentCopyRoundedIcon />
                    </IconButton>
                </Tooltip>
            </button>


            {/* // DELETE */}
            <button >


                {
                    !isLoading ?

                        <Popconfirm
                            title="Do you want to delete this item?"
                            onConfirm={handelDelete}
                            onCancel={() => { }}
                            okText="Yes, Delete"
                            cancelText="Cancel"
                            okButtonProps={{ "type": "default" }}>
                            <Tooltip title="Delete" placement="top" disableInteractive>
                                <IconButton>
                                    <DeleteRoundedIcon />
                                </IconButton>
                            </Tooltip>
                        </Popconfirm>
                        :
                        <IconButton>
                            <CircularProgress color="inherit" size={25} />
                        </IconButton>

                }
            </button>
        </div>
    )
}

export default Actions