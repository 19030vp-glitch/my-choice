import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Axios from 'axios'
import { api } from '../../../../../js/api';

export default function EditModal({ openModal, setAutoSaveLoader, setOpenModal, editTitle, inputName, item, itemIndex, state, setState, type, id, isForm = true, options, }) {

    const [formState, setFormState] = useState(null)
    const [proof, setProof] = useState(null)

    const handleClose = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        if (openModal) {
            if (!isForm) {
                setFormState(state[id][`${id}-data`][itemIndex])
            }
            else if (isForm) {
                setFormState(state['data'][itemIndex])
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openModal])

    const handleSave = (e) => {
        e.preventDefault();
        if (!isForm) {
            let arrayOfElements = state[id][`${id}-data`]
            arrayOfElements.splice(itemIndex, 1)
            arrayOfElements.splice(itemIndex, 0, formState)
            setState({ ...state, [id]: { ...state[id], [`${id}-data`]: arrayOfElements } })
            toast.success('Item edited successfully.')
            setAutoSaveLoader(true)
        }
        else if (isForm) {
            console.log('Formstate', formState)
            if (formState.proof) {
                if (proof) {


                    const formData = new FormData()
                    formData.append('AAAFile', proof)

                    const url = `${api}/api/director/academic-audit/saveFeedbackReports`

                    Axios.post(url, formData)
                        .then((res) => {
                            if (res.data.status === 'success') {

                                toast.success('File Uploaded successfully')
                                setFormState((current) => {
                                    console.log({ ...current, proof: res.data.data['AAAFile'][0].filename })
                                    let arrayOfElements = state['data']
                                    arrayOfElements.splice(itemIndex, 1)
                                    arrayOfElements.splice(itemIndex, 0, { ...current, proof: res.data.data['AAAFile'][0].filename })
                                    setState({ ...state, data: arrayOfElements })
                                    toast.success('Item edited successfully.')
                                    setAutoSaveLoader(true)


                                    return { ...current, proof: res.data.data['AAAFile'][0].filename }
                                })




                            }
                            else {
                                toast.error('Could not upload file, please try again...')
                            }
                        }).catch(function (err) {
                            toast.error('Failed due to Internal Server error')
                        })











                } else {
                    let arrayOfElements = state['data']
                    arrayOfElements.splice(itemIndex, 1)
                    arrayOfElements.splice(itemIndex, 0, formState)
                    setState({ ...state, data: arrayOfElements })
                    toast.success('Item edited successfully.')
                    setAutoSaveLoader(true)

                }
            } else {
                let arrayOfElements = state['data']
                arrayOfElements.splice(itemIndex, 1)
                arrayOfElements.splice(itemIndex, 0, formState)
                setState({ ...state, data: arrayOfElements })
                toast.success('Item edited successfully.')
                setAutoSaveLoader(true)

            }
        }
        setProof(null)
        handleClose()
    }



    return (
        <div className='w-full'>
            <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth='md'>
                <DialogTitle>Edit - {editTitle && editTitle}</DialogTitle>
                <DialogContent>

                    {
                        !isForm ?
                            <div className="flex items-center justify-start gap-3 bg-blue-100 my-4 p-3 rounded-md">
                                <div className='w-full md:w-[80%] my-3'>
                                    <TextField id={`${id}-${itemIndex}`} fullWidth label={inputName} variant="standard" size="small"
                                        value={formState && formState[id]}
                                        onChange={(e) => {
                                            setFormState({ [id]: e.target.value })
                                        }}
                                    />
                                </div>
                            </div>
                            :
                            <div className='w-full flex justify-between gap-2 items-center flex-wrap '>
                                {
                                    options && options.map((element, index) => {
                                        return <div key={index} className='w-full md:w-[45%] my-3'>
                                            {element.field === 'Text' || element.field === 'Number' ?
                                                <TextField
                                                    fullWidth
                                                    label={element.label} variant="standard"
                                                    value={formState && formState[element.keyName]}
                                                    onChange={(e) => { setFormState({ ...formState, [element.keyName]: e.target.value }) }}
                                                    focused
                                                    type="text"
                                                    required
                                                /> : null}

                                            {element.field === 'Date' ?
                                                <div className="mb-3">
                                                    <label htmlFor={element.label} className="form-label">{element.label}</label>
                                                    <input type="date" className="form-control" value={formState && formState[element.keyName]}
                                                        onChange={(e) => { setFormState({ ...formState, [element.keyName]: e.target.value }) }}
                                                        focused />
                                                </div> : null}

                                            {element.field === 'Select' ?
                                                <div className={`w-full`}>
                                                    <select className="form-select"
                                                        value={formState && formState[element.keyName]}
                                                        required
                                                        onChange={(e) => { setFormState({ ...formState, [element.keyName]: e.target.value }) }}
                                                    >
                                                        <option disabled selected >{element.label}</option>
                                                        {element.options.map((item, index) => {
                                                            return <option value={item} key={index}>{item}</option>
                                                        })}

                                                    </select>

                                                </div> : null}

                                            {element.field === 'File' ?
                                                <div className="mb-3">
                                                    <label htmlFor="formFile" className="form-label">{element.label}</label>
                                                    <input className="form-control" type="file" id="formFile" name="AAAFile" onChange={(e) => { setProof(e.target.files[0]) }} />
                                                    <p className='text-xs text-muted'>Choose file only if you want to replace it with the previous one.</p>
                                                </div> : null}

                                        </div>
                                    })
                                }
                            </div>

                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ textTransform: "none" }}>Cancel</Button>
                    <Button onClick={handleSave} sx={{ textTransform: "none" }}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}