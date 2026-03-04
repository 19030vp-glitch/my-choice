import React, { useRef } from 'react'
import { BGPad } from './Teaching'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useState } from 'react';
import { useEffect } from 'react';
import Actions from '../../../../director/reports/academic-audit/components/Actions';
import { IconButton, Tooltip } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { toast } from 'react-hot-toast';


const OtherInfo = ({ otherInfo, setOtherInfo, setSaveLoader }) => {
    const [showInputs, setShowInputs] = useState(false)
    const [showEditInputs, setShowEditInputs] = useState(false)
    const [entry, setEntry] = useState('')
    const [deleteIndex, setDeleteIndex] = useState(null)

    const saveData = (e) => {
        e.preventDefault()
        if (entry) {

            let newArray = [...otherInfo || []]

            newArray.unshift(entry)
            setOtherInfo([...newArray])
            setSaveLoader(true)
            setShowInputs(false)
        } else {
            toast.error('Please fill the field before adding...')
        }
    }


    const handleEdit = (index) => {
        setShowInputs(false)
        setShowEditInputs(true)
        setEntry(otherInfo[index])
        setDeleteIndex(index)
    }

    const handleChange = (e) => {
        e.preventDefault()
        let newArray = [...otherInfo || []]
        newArray[deleteIndex] = entry
        setOtherInfo([...newArray])
        setEntry(null)
        setShowEditInputs(false)
        setSaveLoader(true)
    }

    const handleDelete = (itemIndex) => {
        let newArray = otherInfo.filter((arrItem, index) => itemIndex !== index)
        setOtherInfo(newArray)
    }

    return (
        <div>

            <div className='mt-3'>
                <BGPad>
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-2'>
                        <div className="bg-blue-300 p-3 text-blue-900 rounded-full w-full flex items-center justify-between">
                            <div className='flex items-center justify-start gap-2'>
                                <p>Activity 7: <span className='font-bold ml-3'> Details of any other credential, significant contribution, award received etc. not mentioned earlier</span></p>
                            </div>
                        </div>

                        <button onClick={() => { setShowInputs(true); setShowEditInputs(false); setEntry('') }} className='bg-green-100 px-5 text-green-800 mt-2 hover:bg-green-200 border-2 border-green-200 ease-in-out duration-200 p-1 rounded-full'>

                            <AddRoundedIcon className='text-green-800' />
                            Add </button>
                    </div>


                    <div>
                        {/* // Add Item */}
                        {showInputs === true && <form onSubmit={saveData} encType="multipart/form-data" className='mb-4 needs-validation'>
                            <div className="w-full mt-10 my-3 bg-blue-100 border-blue-400 border-2 rounded-xl p-3">


                                <div className=''>
                                    <p className='text-xl font-bold my-3'>Add details </p>

                                    <div className="mb-3">
                                        <label for="exampleFormControlTextarea1" className="form-label">Add details</label>
                                        <textarea placeholder="Your details goes here..." className="form-control" value={entry} onChange={(e) => setEntry(e.target.value)} id="exampleFormControlTextarea1" rows="3"></textarea>
                                    </div>

                                </div>


                                <div className='flex items-center justify-start gap-2'>
                                    <button type="submit" className='bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-full p-2' >
                                        Save Details
                                    </button>

                                    <button className='bg-red-600 hover:bg-red-700 mx-2 text-white px-4 rounded-full p-2' onClick={() => { setShowInputs(false); setEntry('') }}>
                                        Cancel & Clear
                                    </button>


                                </div>

                            </div>
                        </form>
                        }


                        {/* Edit Item */}
                        {showEditInputs === true && <form encType="multipart/form-data" onSubmit={handleChange} className='mb-4 needs-validation'>
                            <div className="w-full mt-10 my-3 bg-blue-100 border-blue-400 border-2 rounded-xl p-3">



                                <div className=''>
                                    <p className='text-xl font-bold my-3'>Edit details </p>

                                    <div className="mb-3">
                                        <label for="exampleFormControlTextarea1" className="form-label">Edit details</label>
                                        <textarea placeholder="Your details goes here..." className="form-control" value={entry} onChange={(e) => setEntry(e.target.value)} id="exampleFormControlTextarea1" rows="3"></textarea>
                                    </div>

                                </div>


                                <div className='flex items-center justify-start gap-2'>
                                    <button type="submit" className='bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-full p-2' >
                                        Save Details
                                    </button>

                                    <button className='bg-red-600 hover:bg-red-700 mx-2 text-white px-4 rounded-full p-2' onClick={() => { setShowEditInputs(false); setEntry('') }}>
                                        Cancel & Clear
                                    </button>


                                </div>

                            </div>
                        </form>
                        }
                    </div>

                    <div>
                        <table className="table table-bordered mt-3">
                            <thead className='table-dark'>
                                <tr>
                                    <th>Sr No</th>
                                    <th>Details</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    otherInfo && otherInfo.length > 0 &&
                                    otherInfo.map((item, index) => {
                                        return <tr>
                                            <th>{index + 1}</th>
                                            <td>{item}</td>
                                            <td>
                                                {/* // EDIT */}
                                                <button >
                                                    <Tooltip title="Edit" placement="right">
                                                        <IconButton onClick={() => { handleEdit(index) }}>
                                                            <EditRoundedIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </button>


                                                {/* // DELETE */}
                                                <button >
                                                    <Tooltip title="Delete" placement="right">
                                                        <IconButton onClick={() => { handleDelete(index) }}>
                                                            <DeleteRoundedIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                </BGPad>
            </div >










        </div >
    )
}

export default OtherInfo