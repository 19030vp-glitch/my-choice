import { TextField } from '@mui/material'
import React, { useState } from 'react'
import Select from '../inputs/Select'
import Text from '../inputs/Text'
import DialogBox from '../../../../../components/DialogBox'
import Axios from 'axios'
import { toast } from 'react-hot-toast'
import ShowAAAFetchButton from './ShowAAAFetchButton'
import { api } from '../../../../../js/api'

const NumberToTextField = ({ label, state, setState, id, inputName = "Title", classes = "", isForm = false, options, children, tableWithProof = false, fileKeyName, allYearAAAData, fetchPreviousYears = false, tableToFetch = null, setAutoSaveLoader, }) => {

    const [input, setInput] = useState(0)
    const [showInputs, setShowInputs] = useState(false)


    const uploadSave = (e) => {
        e.preventDefault()
        const formData = new FormData()
        if (state?.[fileKeyName]?.[`${fileKeyName}-0`]) {
            formData.append('AAAFile', state?.[fileKeyName]?.[`${fileKeyName}-0`])


            const url = `${api}/api/director/academic-audit/saveFeedbackReports`
            Axios.post(url, formData)
                .then((res) => {
                    if (res.data.status === 'success') {

                        toast.success('File Uploaded successfully')
                        setState((current) => {
                            document.location.href = `#${label}`
                            let newArray = []
                            for (let i = 0; i < 1; i++) {

                                let newObj = {}
                                for (let key in current) {
                                    if (key === 'input') continue;
                                    if (key === 'proof') {
                                        newObj = { ...newObj, [key]: res.data.data['AAAFile'][0].filename }
                                        continue
                                    }
                                    newObj = { ...newObj, [key]: current?.[key]?.[`${key}-${i}`] }


                                }

                                newArray.push(newObj)
                            }

                            if (current.data) {
                                setShowInputs(false)
                                return { input: 0, data: [...newArray, ...current.data], dataMap: current?.dataMap }
                            }
                            else {
                                setShowInputs(false)
                                return { input: 0, data: newArray, dataMap: current?.dataMap }
                            }
                        })
                        setAutoSaveLoader(true)

                    }
                    else {
                        toast.error('Could not upload file, please try again...')
                    }
                }).catch(function (err) {
                    toast.error('Failed due to Internal Server error')
                })
        } else {
            toast.error('Please provide an attachment to upload.')
        }
    }

    return (
        <div id={label}>
            {
                !isForm ?
                    <div className={`${classes} pb-4 pt-2 border-b-4 border-gray-300`}>
                        <label className="form-label text-sm">{label}</label>
                        {
                            showInputs ?
                                <div>
                                    <input type="number" min={0} className="form-control w-full md:w-[25%]"
                                        value={state[id][`${id}-input`] === 0 ? null : state[id][`${id}-input`]}
                                        onChange={(e) => { setInput(e.target.value); setState({ ...state, [id]: { ...state[id], [`${id}-input`]: e.target.value } }) }} />
                                </div>
                                :
                                <div>
                                    <ShowButton setState={setShowInputs} />
                                </div>
                        }
                        <div className="mt-3 w-full border-l-4 border-blue-300 pl-3">
                            {
                                [...Array(input === '' ? 0 : parseInt(input))].map((e, i) =>
                                    <div key={i} className="flex items-center justify-start gap-3 bg-blue-100 my-4 p-3 rounded-md">

                                        <div className='w-full md:w-[80%] my-3'>
                                            <TextField key={i} id={`${id}-${i}`} fullWidth label={inputName} variant="standard" size="small"
                                                value={state[id][`${id}-${i}`] ?
                                                    state[id][`${id}-${i}`] : null}
                                                onChange={(e) => {
                                                    setState({ ...state, [id]: { ...state[id], [e.target.id]: e.target.value } })
                                                }}
                                            />
                                        </div>
                                    </div>
                                )
                            }

                            {
                                input > 0 &&
                                <div>
                                    <SaveCancelButtons
                                        setInputState={setShowInputs}
                                        isForm={isForm}
                                        setLocalInputToZero={() => { setInput(0) }}
                                        setInputToZero={() => {
                                            setState({ ...state, [id]: { ...state[id], [`${id}-input`]: 0 } })
                                        }}
                                        id={id}
                                        label={label}
                                        setState={setState}
                                        state={state}
                                        setAutoSaveLoader={setAutoSaveLoader}
                                    />
                                </div>
                            }

                            <div className='mt-3'>
                                {children}
                            </div>
                        </div>

                    </div>
                    :
                    <div className={`${classes} p-3 border-b-4 border-gray-300`}>

                        {
                            tableWithProof && <DialogBox title={label} buttonName="Save" onClickFunction={uploadSave} setIsModalOpen={setShowInputs} isModalOpen={showInputs}>
                                {[...Array(1)].map((e, i) =>
                                    <div className="flex items-center justify-start gap-3 bg-blue-100 my-4 p-3 rounded-md " key={i}>

                                        <div className='w-full flex justify-between gap-2 items-center flex-wrap '>
                                            {
                                                options?.map((element, index) => {
                                                    return <div key={index} className='w-full md:w-[45%] my-3'>
                                                        {element.field === 'Text' || element.field === 'Number' ?
                                                            <Text
                                                                label={element.label}
                                                                keyName={element.keyName}
                                                                isForm={true}
                                                                setState={setState}
                                                                state={state}
                                                                id={i}
                                                                type={element.field === 'Text' ? "text" : "number"}

                                                            /> : null}

                                                        {element.field === 'Select' ?
                                                            <Select
                                                                label={element.label}
                                                                keyName={element.keyName}
                                                                isForm={true}
                                                                setState={setState}
                                                                state={state}
                                                                id={i}
                                                                options={element.options}
                                                            /> : null}

                                                        {element.field === 'File' ?
                                                            <div className="mb-3">
                                                                <label htmlFor="formFile" className="form-label">{element.label}</label>
                                                                <input className="form-control" type="file" id="formFile" name="AAAFile" onChange={(e) => { setState({ ...state, [element.keyName]: { ...state[element.keyName], [`${element.keyName}-0`]: e.target.files[0] } }) }} />
                                                            </div> : null}


                                                    </div>
                                                })
                                            }
                                        </div>

                                    </div>
                                )}
                            </DialogBox>
                        }

                        <div className='flex items-start justify-between gap-4 bg-blue-100 p-2 border rounded-md'>
                            <div>
                                <label className="form-label text-sm">{label}</label>
                                {
                                    showInputs && !tableWithProof ?
                                        <div>
                                            <input type="number" min={0} className="form-control w-full md:w-[25%]"
                                                value={state.input === 0 ? null : state.input}
                                                onChange={(e) => { setState({ ...state, input: e.target.value }) }} />
                                        </div> :

                                        <div>
                                            <ShowButton setState={setShowInputs} />
                                        </div>

                                }
                            </div>
                            <div className='w-[30%]'>
                                {
                                    (fetchPreviousYears && allYearAAAData) && <ShowAAAFetchButton allYearAAAData={allYearAAAData} setState={setState} state={state} tableToFetch={tableToFetch} />
                                }
                            </div>
                        </div>

                        {
                            <div className="mt-3 w-full border-l-4 border-blue-700 pl-3">
                                {!tableWithProof && <div>

                                    {
                                        [...Array(state?.input === '' ? 0 : parseInt(state?.input))].map((e, i) =>
                                            <div className="flex items-center justify-start gap-3 bg-blue-100 my-4 p-3 rounded-md ">

                                                <div className='w-full flex justify-between gap-2 items-center flex-wrap '>
                                                    {
                                                        options?.map((element, index) => {
                                                            return <div key={index} className='w-full md:w-[45%] my-3'>
                                                                {element.field === 'Text' || element.field === 'Number' || element.field === 'Date' ?
                                                                    <Text
                                                                        label={element.label}
                                                                        keyName={element.keyName}
                                                                        isForm={true}
                                                                        setState={setState}
                                                                        state={state}
                                                                        id={i}
                                                                        type={element.field === 'Text' ? "text" ? element.field === "Number" : "number" : 'Date'}

                                                                    /> : null}

                                                                {element.field === 'Select' ?
                                                                    <Select
                                                                        label={element.label}
                                                                        keyName={element.keyName}
                                                                        isForm={true}
                                                                        setState={setState}
                                                                        state={state}
                                                                        id={i}
                                                                        options={element.options}
                                                                    /> : null}


                                                            </div>
                                                        })
                                                    }
                                                </div>

                                            </div>
                                        )
                                    }

                                    {
                                        state?.input > 0 &&
                                        <div>
                                            <SaveCancelButtons
                                                setInputState={setShowInputs}
                                                isForm={isForm}
                                                setInputToZero={() => {
                                                    setState({ ...state, input: 0 })
                                                }}
                                                label={label}
                                                setState={setState}
                                                state={state}
                                                setAutoSaveLoader={setAutoSaveLoader}
                                            />
                                        </div>
                                    }
                                </div>}

                                <div className='mt-3'>
                                    {children}
                                </div>
                            </div>
                        }
                    </div>

            }

        </div>
    )
}

export default NumberToTextField




const ShowButton = ({ setState }) => {
    return (
        <button className='bg-blue-700 text-white hover:bg-blue-600 p-2 rounded-full duration-200 ease-in-out' onClick={(e) => { setState(true); e.preventDefault() }}>
            Add Data
        </button>
    )
}


const SaveCancelButtons = ({ state, setState, isForm, setLocalInputToZero, setInputToZero, label, setInputState, id, setAutoSaveLoader, }) => {

    const saveData = (e) => {
        e.preventDefault();
        setInputState(false);

        if (!isForm) {
            setLocalInputToZero();
            setInputToZero();
            document.location.href = `#${label}`

            // obj to array conversion
            let newArray = []
            for (let i = 0; i < state[id][`${id}-input`]; i++) {

                let newObj = {}
                for (let key in state[id]) {
                    if (key === `${id}-input`) continue;
                    newObj = { ...newObj, [id]: state[id][`${id}-${i}`] }
                }
                newArray.push(newObj)
            }

            if (state[id][`${id}-data`]) {
                setState({ ...state, [id]: { [`${id}-data`]: [...newArray, ...state[id][`${id}-data`]] } })
            }
            else {
                setState({ ...state, [id]: { [`${id}-data`]: newArray } })
            }

            setAutoSaveLoader(true)
        }
        else if (isForm) {
            // setInputToZero()
            document.location.href = `#${label}`
            let newArray = []
            for (let i = 0; i < state.input; i++) {

                let newObj = {}
                for (let key in state) {
                    if (key === 'input') continue;
                    newObj = { ...newObj, [key]: state?.[key]?.[`${key}-${i}`] }
                }
                newArray.push(newObj)
            }

            if (state.data) {
                setState({ input: 0, data: [...newArray, ...state.data], dataMap: state?.dataMap })
            }
            else {
                setState({ input: 0, data: newArray, dataMap: state?.dataMap })
            }

            console.log('running autosaveloader')
            setAutoSaveLoader(true)


        }

    }



    const cancelData = (e) => {
        e.preventDefault();
        setInputState(false);

        if (!isForm) {
            setLocalInputToZero();
            setInputToZero();
            document.location.href = `#${label}`
        }
        else if (isForm) {
            setInputToZero()
            document.location.href = `#${label}`
            setState({ input: 0, data: state?.data, dataMap: state?.dataMap })
        }
    }




    return (
        <div className='flex items-center justify-start gap-2'>
            <button className='bg-red-700 text-white hover:bg-red-600 p-2 rounded-full duration-200 ease-in-out' onClick={cancelData}>
                Cancel & Clear
            </button>

            <button className='bg-green-700 text-white hover:bg-green-600 p-2 rounded-full duration-200 ease-in-out' onClick={saveData}>
                Save Data
            </button>


        </div>
    )
}

