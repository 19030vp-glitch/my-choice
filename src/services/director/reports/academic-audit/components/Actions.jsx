import React from 'react'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Axios from 'axios'
import toast from 'react-hot-toast';
import { IconButton, Tooltip } from '@mui/material';
import EditModal from './EditModal';
import { useState } from 'react';


const Actions = ({ size = "normal", setAutoSaveLoader, item, itemIndex, state, setState, type, id, inputName, editTitle, isForm, options }) => {

    const [openModal, setOpenModal] = useState(false)

    function handleDelete(e) {
        e.preventDefault()

        // if type is simple
        if (type === 'simple') {
            let newArray = state[id][`${id}-data`].filter((arrItem, index) => itemIndex !== index)
            setState({ ...state, [id]: { [`${id}-data`]: newArray } })
            toast.success('Item deleted successfully.')
            setAutoSaveLoader(true)

        } else if (type === 'complex') {
            let newArray = state.data.filter((arrItem, index) => itemIndex !== index)
            setState({ ...state, data: newArray })
            toast.success('Item deleted successfully.')
            setAutoSaveLoader(true)

        }


    }

    function handleEdit(e) {
        e.preventDefault()
        setOpenModal(true)
    }





    return (
        <div className>
            <EditModal setAutoSaveLoader={setAutoSaveLoader} openModal={openModal} setOpenModal={setOpenModal} inputName={inputName} editTitle={editTitle} item={item} itemIndex={itemIndex} state={state} setState={setState} type={type} id={id} isForm={isForm} options={options} />


            <div className='flex flex-col items-center justify-start'>
                {/* // EDIT */}
                <button >
                    <Tooltip title="Edit" placement="right">
                        <IconButton onClick={handleEdit}>
                            {
                                size === 'normal' ?
                                    <EditRoundedIcon />
                                    :
                                    <EditRoundedIcon fontSize="small" />
                            }
                        </IconButton>
                    </Tooltip>
                </button>


                {/* // DELETE */}
                <button >
                    <Tooltip title="Delete" placement="right">
                        <IconButton onClick={handleDelete}>
                            {
                                size === 'normal' ?
                                    <DeleteRoundedIcon />
                                    :
                                    <DeleteRoundedIcon fontSize="small" />
                            }
                        </IconButton>
                    </Tooltip>
                </button>
            </div>
        </div>
    )
}

export default Actions