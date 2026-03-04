import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import refresh from '../../../js/refresh'
import CASDataTable from './CASDataTable'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import { IconButton, Tooltip } from '@mui/material'
import FileViewer from '../../../../../components/FileViewer'
import submit, { submitWithFile } from '../../../js/submit'
import { useQuery } from 'react-query'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Years } from '../../../js/TableInfo'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import toast from 'react-hot-toast'
import Axios from 'axios'
import { Popconfirm } from 'antd'
import handleEditWithFile from '../../../js/handleEditWithFile'
import handleEdit from '../../../js/handleEdit'
import FilterModal from './FilterModal'

// models
import ResearchPapersUGC from '../../../tables/ResearchPapersUGC'
import BooksAndChapters from '../../../tables/BooksAndChapters'
import PHDAwarded from '../../../tables/PHDAwarded'
import ResearchProjects from '../../../tables/ResearchProjects'
import CalculateModal from './CalculateModal';
import FacultyMainTable from '../../../components/FacultyMainTable';
import { api } from '../../../../../js/api';



let FacultyTables = {
    ResearchPapersUGC: <ResearchPapersUGC title="Activity 1: Research Paper" showTable={false} />,
    MainBooksAndChapters: <BooksAndChapters title="Activity 2: Books, Chapters & Translation Work" showTable={false} />,
    EContentDeveloped: <FacultyMainTable model="EContentDeveloped" title="Activity 3: ICT (Information & Communication Technology)" showTable={false} />,
    PHDAwarded: <PHDAwarded title="Sub-Activity 1: Research Guidance" showTable={false} />,
    ResearchProjects: <ResearchProjects title="Sub-Activity 2: Research Projects" showTable={false} />,
    ConsultancyServices: <FacultyMainTable model="ConsultancyServices" title="Sub-Activity 3: Consultancy Services" showTable={false} />,
    PatentPublished: <FacultyMainTable model="Patent" title="Sub-Activity 1: Patents Published" showTable={false} />,
    PolicyDocuments: <FacultyMainTable model="PolicyDocument" title="Sub-Activity 2: Policy Documents" showTable={false} />,
    AwardRecognition: <FacultyMainTable model="AwardRecognition" title="Sub-Activity 3 [A]: Awards & Recognitions" showTable={false} />,
    Fellowship: <FacultyMainTable model="Fellowship" title="Sub-Activity 3 [B]: Fellowship" showTable={false} />,
    InvitedTalk: <FacultyMainTable model="InvitedTalk" title="Activity 6: Invited Lectures / Resource Person / Paper Presentation in Seminars / Conferences / Full Paper in Conference Proceedings" showTable={false} />,
    ConferenceBooksAndChapters: <BooksAndChapters title="Activity 6 (B): Conferences / Full Paper in Conference Proceedings" showTable={false} propType='Conference' showConferenceOnly={true} />,


}

const NumberToTextField = ({ facultyTableAvailable, label, activity, state, setState, classes = "", isForm = false, options, model, casYearState, activityName, addName, isFile = true, calculateScore = true, addOnce = false, saveLoader, setSaveLoader, scoreCalculator = false }) => {

    const [showInputs, setShowInputs] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(null)
    const [showEditInputs, setShowEditInputs] = useState(null)
    const user = useSelector((state) => state.user.user)
    const [calculateModal, setCalculateModal] = useState(false)
    const [calculateItem, setCalculateItem] = useState(null)
    const [loading, setLoading] = useState(false)
    const [itemToEdit, setItemToEdit] = useState(null)
    const [proof, setProof] = useState(null)
    const fetchYears = useSelector((state) => state.cas.fetchYears)
    const [dataFilterModal, setDataFilterModal] = useState({ isOpen: false, year: null })

    let serviceName = window.location.pathname.includes('pbas') ? 'PBAS' : 'CAS'

    let fetchingYears = serviceName === 'CAS' ? fetchYears && fetchYears : casYearState


    let param = {
        model: model.includes("Book") ? 'BookAndChapter' : model,
        userId: user?._id,
        year: fetchingYears,
        dataFilter: model.includes("Book") ? model === 'MainBookAndChapter' ?
            { userId: user?._id, year: fetchingYears, type: { $in: ['Book', 'Chapter', 'Editor', 'Translator'] } } : { userId: user?._id, year: fetchingYears, type: 'Conference' } : null
    }

    const { data, refetch, isFetching, } = useQuery([param.model, param], () => refresh(param))



    // handle add new item
    const saveData = (e) => {
        e.preventDefault();

        if (isFile) {
            let formData = new FormData()

            CASDataTable[model].tableCells.forEach((key, index) => {
                if (key === 'proof') {
                    formData.append('file', state[key])
                }
                else {
                    formData.append(key, state[key])
                }
            })
            formData.append('userId', user._id)

            submitWithFile(formData, model, refetch, setLoading, setShowInputs)
        } else {
            const data = { userId: user._id }
            CASDataTable[model].tableCells.forEach((key) => {
                data[key] = state[key]
            })

            submit(data, model, refetch, setLoading, setShowInputs, setIsFormOpen)
        }

        // clear inputs
        setState((prev) => {
            CASDataTable[model].tableCells.forEach((key, index) => {
                prev[key] = null
            })
            return { ...prev }
        })

    }

    async function handleDelete(item) {
        setLoading(true)
        Axios.post(`${api}/service/deleteItem`, { itemToDelete: item, model })
            .then((res) => {
                !res && toast.error('Something went wrong')

                if (res.data.status === 'deleted') {
                    toast.success('Item deleted successfully')
                    refetch()
                    setLoading(false)

                }
                else if (res.data.status === 'error') {
                    toast.error('Could not delete item. Try again later')
                    setLoading(false)
                }
            }).catch(() => {
                toast.error('Internal Server Error')
                setLoading(false)
            })
    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        if (isFile) {
            let formData = new FormData()

            CASDataTable[model].tableCells.forEach((key, index) => {
                if (key === 'proof') {
                    formData.append('file', itemToEdit[key])
                }
                else {
                    formData.append(key, itemToEdit[key])
                }
            })
            formData.append('proof', proof)
            formData.append('userId', user?._id)
            formData.append('itemId', itemToEdit?._id)

            handleEditWithFile(formData, model, setShowEditInputs, refetch, setLoading)
        } else {
            const data = { itemId: itemToEdit._id }
            CASDataTable[model].tableCells.forEach((key) => {
                data[key] = itemToEdit[key]
            })

            handleEdit(data, model, setShowEditInputs, refetch, setLoading, setIsFormOpen)
            setShowEditInputs(false)
        }


    }


    return (
        <div >



            {/* <p className='bg-blue-300 text-blue-800 p-3 rounded-full text-md'></p> */}

            <div>

                {/* // Heading and form */}

                {
                    facultyTableAvailable ?
                        <div className='my-3'>
                            {FacultyTables?.[facultyTableAvailable]}
                        </div>
                        :
                        <div>
                            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between sm:gap-2'>
                                <div className="bg-blue-300 p-3 text-blue-900 rounded-full w-full flex items-center justify-between">
                                    <div className='flex items-center justify-start gap-2'>
                                        <p>{activity && `${activity}:`} <span className='font-bold ml-3'> {activityName}</span></p>
                                    </div>
                                </div>

                                {
                                    addOnce === false && <button onClick={() => { setShowInputs(true); setShowEditInputs(false) }} className='bg-green-100 px-5 text-green-800 mt-2 hover:bg-green-200 border-2 border-green-200 ease-in-out duration-200 p-1 rounded-full'>

                                        <AddRoundedIcon className='text-green-800' />
                                        Add {addName}</button>
                                }

                                {
                                    addOnce === true ? data?.data?.data?.length === 0 || data?.data?.data === undefined ? <button onClick={() => { setShowInputs(true); setShowEditInputs(false) }} className='bg-green-100 px-5 text-green-800 mt-2 hover:bg-green-200 border-2 border-green-200 ease-in-out duration-200 p-1 rounded-full'>

                                        <AddRoundedIcon className='text-green-800' />
                                        Add {addName}</button> : null : null
                                }

                            </div>

                            {/* For Form */}
                            <div className={`${classes}`}>



                                {/* // Add Item */}
                                {showInputs === true && <form onSubmit={saveData} encType="multipart/form-data" className='mb-4 needs-validation'>
                                    <div className="w-full mt-10 my-3 bg-blue-100 border-blue-400 border-2 rounded-xl p-3">


                                        <div className=''>
                                            <p className='text-xl font-bold my-3'>Add {addName}</p>


                                            <div className='w-full flex justify-between gap-2 items-center flex-wrap '>
                                                {
                                                    options.map((element, index) => {
                                                        return <div key={index} className='w-full md:w-[45%] my-2'>
                                                            {element.field === 'Text' || element.field === 'Number' ?

                                                                <>
                                                                    <label htmlFor={element.label} className="form-label">{element.label}</label>
                                                                    <input type={element.type} className="form-control" id={element.label} required value={(state?.[element.keyName] && state?.[element.keyName]) || null} focused
                                                                        onChange={(e) => {
                                                                            setState({ ...state, [element.keyName]: e.target.value })
                                                                        }} />
                                                                </>

                                                                : null}




                                                            {element.field === 'Select' ?
                                                                <div className={`w-full ${classes}`}>
                                                                    <label htmlFor={element.label} className="form-label">{element.label}</label>
                                                                    <select className="form-select" required id={element.label}
                                                                        onChange={(e) => {
                                                                            setState({ ...state, [element.keyName]: e.target.value })
                                                                        }}
                                                                        value={(state?.[element.keyName] && state?.[element.keyName]) || null} >
                                                                        <option disabled selected>Choose</option>
                                                                        {element.options.map((item, index) => {
                                                                            return <option value={item} key={index}>{item}</option>
                                                                        })}

                                                                    </select>

                                                                </div> : null}

                                                            {element.field === 'Year' ?
                                                                <div className={`w-full`}>
                                                                    <label htmlFor="academicYear" className="form-label">Academic Year</label>
                                                                    <select className="form-select" required id="academicYear"
                                                                        onChange={(e) => {
                                                                            setState({ ...state, [element.keyName]: e.target.value })
                                                                        }}
                                                                        value={(state?.[element.keyName] && state?.[element.keyName]) || null} >
                                                                        <option disabled selected>Choose</option>
                                                                        {Years.map((item, index) => {
                                                                            return <option value={item} key={index}>{item}</option>
                                                                        })}

                                                                    </select>

                                                                </div> : null}

                                                            {element.field === 'File' ?
                                                                <div>
                                                                    <label for="proof" className="form-label">Upload Proof</label>
                                                                    <input className="form-control" required type="file" id="proof" name="file"
                                                                        onChange={(e) => { setState({ ...state, [element.keyName]: e.target.files[0] }) }}
                                                                    />
                                                                </div> : null}


                                                        </div>
                                                    })
                                                }
                                            </div>

                                        </div>


                                        <div className='mt-4'>
                                            <SaveCancelButtons
                                                setShowInputs={setShowInputs}
                                                isForm={isForm}
                                                setInputToZero={() => {
                                                    setState({ ...state, input: 0 })
                                                }}
                                                label={label}
                                                setState={setState}
                                                state={state}
                                                setLoading={setLoading}
                                                loading={loading}
                                                model={model}
                                                refetch={refetch}
                                            />
                                        </div>






                                    </div>
                                </form>
                                }


                                {/* Edit Item */}
                                {showEditInputs === true && <form encType="multipart/form-data" onSubmit={handleChange} className='mb-4 needs-validation'>
                                    <div className="w-full mt-10 my-3 bg-blue-100 border-blue-400 border-2 rounded-xl p-3">


                                        <div className=''>
                                            <p className='text-xl font-bold my-3'>Edit {addName}</p>


                                            <div className='w-full flex justify-between gap-2 items-center flex-wrap '>
                                                {
                                                    options.map((element, index) => {
                                                        return <div key={index} className='w-full md:w-[45%] my-2'>
                                                            {element.field === 'Text' || element.field === 'Number' ?

                                                                <>
                                                                    <label htmlFor={element.label} className="form-label">{element.label}</label>
                                                                    <input type={element.type} className="form-control" id={element.label} required value={(itemToEdit?.[element.keyName] && itemToEdit?.[element.keyName]) || null} focused
                                                                        onChange={(e) => {
                                                                            setItemToEdit({ ...itemToEdit, [element.keyName]: e.target.value })
                                                                        }} />
                                                                </>

                                                                : null}




                                                            {element.field === 'Select' ?
                                                                <div className={`w-full ${classes}`}>
                                                                    <label htmlFor={element.label} className="form-label">{element.label}</label>
                                                                    <select className="form-select" required id={element.label}
                                                                        onChange={(e) => {
                                                                            setItemToEdit({ ...itemToEdit, [element.keyName]: e.target.value })
                                                                        }}
                                                                        value={(itemToEdit?.[element.keyName] && itemToEdit?.[element.keyName]) || null} >
                                                                        <option disabled selected>Choose</option>
                                                                        {element.options.map((item, index) => {
                                                                            return <option value={item} key={index}>{item}</option>
                                                                        })}

                                                                    </select>

                                                                </div> : null}

                                                            {element.field === 'Year' ?
                                                                <div className={`w-full`}>
                                                                    <label htmlFor="academicYear" className="form-label">Academic Year</label>
                                                                    <select className="form-select" required id="academicYear"
                                                                        onChange={(e) => {
                                                                            setItemToEdit({ ...itemToEdit, [element.keyName]: e.target.value })
                                                                        }}
                                                                        value={(itemToEdit?.[element.keyName] && itemToEdit?.[element.keyName]) || null} >
                                                                        <option disabled selected>Choose</option>
                                                                        {Years.map((item, index) => {
                                                                            return <option value={item} key={index}>{item}</option>
                                                                        })}

                                                                    </select>

                                                                </div> : null}

                                                            {element.field === 'File' ?
                                                                <div>
                                                                    <label htmlFor="proof" className="form-label">Upload Proof</label>
                                                                    <input className="form-control" type="file" id="proof" name="file"
                                                                        onChange={(e) => { setItemToEdit({ ...itemToEdit, [element.keyName]: e.target.files[0], }) }}
                                                                    />
                                                                </div> : null}


                                                        </div>
                                                    })
                                                }
                                            </div>

                                        </div>
                                        <div className='mt-4'>
                                            <SaveCancelButtons
                                                setShowInputs={setShowEditInputs}
                                                isForm={isForm}
                                                setInputToZero={() => {
                                                    setState({ ...state, input: 0 })
                                                }}
                                                label={label}
                                                setState={setState}
                                                state={state}
                                                setLoading={setLoading}
                                                loading={loading}
                                                model={model}
                                                refetch={refetch}
                                            />
                                        </div>
                                    </div>
                                </form>
                                }


                            </div>
                        </div>
                }


            </div>

            {
                calculateScore && <div className=" flex items-center justify-end mb-3 bg-blue-100 rounded-lg p-2 border-2 border-blue-700">
                    <div className='flex flex-col items-end justify-end'>
                        <div className='flex items-center justify-end gap-3'>
                            {
                                serviceName === 'CAS' ? <div className="btn-group" role="group" aria-label="Fetch years">
                                    {fetchingYears && fetchingYears.map((year, index) => {
                                        return <button key={index} type="button" className="btn border-blue-900 border p-2 bg-blue-700 rounded-xl text-white hover:bg-blue-600 duration-200 ease-in-out" onClick={() => { setDataFilterModal({ year, isOpen: true }); }}>Fetch {year} Data</button>
                                    })}
                                </div> :
                                    <div className="btn-group" role="group" aria-label="Fetch years">
                                        <button type="button" className="btn border-blue-900 border p-2 bg-blue-700 rounded-xl text-white hover:bg-blue-600 duration-200 ease-in-out" onClick={() => { setDataFilterModal({ isOpen: true, year: fetchingYears }); }}>Fetch {fetchingYears} Data</button>
                                    </div>
                            }




                            <button onClick={() => { recalculateScore(state, setState, data, true, setSaveLoader, scoreCalculator) }} className='p-2 rounded-xl bg-green-700 hover:bg-green-600 text-white flex items-center justify-start gap-2'><RefreshRoundedIcon />Refresh Total Score</button>
                        </div>
                        <p className='text-muted text-xs text-right'>Note: When you add a new item to the table it will be available in the filter section above. Please click the respective button above, if the item does not show up, hit Refresh button at top-right corner.</p>
                    </div>

                </div>
            }


            <div className='table-responsive text-sm'>
                <table className={`table caption-top table-bordered`}>
                    <thead className='bg-dark text-white '>
                        <tr>
                            {
                                CASDataTable[model].tableHeads.map((element, index) => {
                                    return <th scope="col" key={`head-${index}`}>{element}</th>
                                })
                            }
                            <th scope="col">Get Score</th>
                            {
                                calculateScore && <th scope="col">Score</th>
                            }
                            {/* <th>Actions</th> */}
                        </tr>
                    </thead>

                    {
                        calculateScore ? <tbody>
                            {data && data?.data?.data?.sort(function (a, b) {
                                var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                                return dateB - dateA;
                            }).map((item, index) => {
                                return state?.dataMap?.includes(item._id) && <tr key={index}>

                                    {
                                        CASDataTable[model].tableCells.map((keys, index) => {
                                            return <td>{keys === 'proof' ? <FileViewer fileName={item.proof} serviceName="faculty" /> :
                                                keys === 'link' ? <a href={item.link} target="_blank" className='text-blue-500 hover:text-blue-900 ease-in-out duration-200'>
                                                    {item.link.slice(0, 30)}{item.link.length > 30 && `...`}</a> : item[keys]}</td>
                                        })
                                    }
                                    <td>
                                        <div className='flex items-center flex-col justify-center w-20 '>
                                            {
                                                calculateScore && <button className='my-2' onClick={() => { setCalculateModal(true); setCalculateItem(item) }}>
                                                    <Tooltip title="Calculate Score" placement='left'>
                                                        <span className='text-sm p-1 m-1 bg-blue-600 hover:bg-blue-500 font-bold text-white rounded-xl'>Get Score</span>
                                                    </Tooltip>
                                                </button>
                                            }
                                        </div>
                                    </td>
                                    {
                                        calculateScore && <td className='font-bold'>{state?.scoreMap?.[item._id]?.score ? state.scoreMap?.[item._id]?.score : 0}</td>
                                    }

                                    {/* <Actions item={item} /> */}

                                </tr>

                            })}

                        </tbody>
                            :
                            <tbody>
                                {data && data?.data?.data?.sort(function (a, b) {
                                    var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
                                    return dateB - dateA;
                                }).map((item, index) => {
                                    return <tr key={index}>

                                        {
                                            CASDataTable[model].tableCells.map((keys, index) => {
                                                return <td>{keys === 'proof' ? <FileViewer fileName={item.proof} serviceName="faculty" /> :
                                                    keys === 'link' ? <a href={item.link} target="_blank" className='text-blue-500 hover:text-blue-900 ease-in-out duration-200'>
                                                        {item.link.slice(0, 30)}{item.link.length > 30 && `...`}</a> : item[keys]}</td>
                                            })
                                        }
                                        <td>
                                            <div className='flex items-center flex-col justify-center w-20 '>

                                                {
                                                    !calculateScore && <div>
                                                        <button >
                                                            <Tooltip title="Edit" placement="top">
                                                                <IconButton onClick={() => { setShowInputs(false); setShowEditInputs(true); setItemToEdit(item); setProof(item?.proof) }}>
                                                                    <EditRoundedIcon fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </button>
                                                        <button >
                                                            <Popconfirm
                                                                title="Do you want to delete this item?"
                                                                onConfirm={() => { handleDelete(item) }}
                                                                onCancel={() => { }}
                                                                okText="Yes, Delete"
                                                                cancelText="Cancel"
                                                                okButtonProps={{ "type": "default" }}>
                                                                <Tooltip title="Delete" placement="left">
                                                                    <IconButton>
                                                                        <DeleteRoundedIcon fontSize="small" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Popconfirm>
                                                        </button>
                                                    </div>
                                                }
                                            </div>
                                        </td>

                                    </tr>

                                })}

                            </tbody>
                    }


                </table>
            </div>
            {
                calculateScore && <div className='flex items-center justify-end'>
                    <div className='w-40 p-2 bg-blue-100 rounded-xl'>
                        Total Score : <span className='text-green-900 font-bold'>
                            {state?.totalScore ? state?.totalScore.toFixed(2) : 0}</span>
                    </div>
                </div>
            }

            {
                calculateScore &&
                <CalculateModal scoreCalculator={scoreCalculator} saveLoader={saveLoader} setSaveLoader={setSaveLoader} setCalculateModal={setCalculateModal} calculateModal={calculateModal}
                    calculateItem={calculateItem} state={state} setState={setState} serverData={data} isFetching={isFetching} model={model} />
            }

            {/* Filter Modal */}
            {
                calculateScore && <FilterModal scoreCalculator={scoreCalculator} saveLoader={saveLoader} setSaveLoader={setSaveLoader} title={activityName} data={data} setDataFilterModal={setDataFilterModal} dataFilterModal={dataFilterModal} model={model} state={state} setState={setState} refetch={refetch} recalculateScore={recalculateScore} />
            }

        </div>
    )
}

export default NumberToTextField


const SaveCancelButtons = ({ state, setState, setShowInputs, setLoading, model, refetch, }) => {


    const cancelData = (e) => {
        e.preventDefault();
        setShowInputs(false);
        // clear inputs
        if (state !== null) {
            setState((prev) => {
                CASDataTable?.[model]?.tableCells.forEach((key, index) => {
                    if (prev[key]) {
                        prev[key] = null
                    }
                })
                return { ...prev }
            })
        }
    }




    return (
        <div className='flex items-center justify-start gap-2'>
            <button type="submit" className='bg-blue-600 hover:bg-blue-700 text-white px-4 
                    rounded-full p-2' >
                Save Details
            </button>

            <button className='bg-red-600 hover:bg-red-700 
                    mx-2 text-white px-4 rounded-full p-2' onClick={cancelData}>
                Cancel & Clear
            </button>


        </div>
    )
}




const recalculateScore = (state, setState, serverData, saveToServer = false, setSaveLoader = () => { }, scoreCalculator = false) => {

    console.log('Running the recalculate function...')

    if (scoreCalculator) {
        scoreCalculator({ item: false, state, setState, serverData })
        setSaveLoader(true)
    } else {
        let totalScore = 0
        const scoreMapObject = state?.scoreMap

        let newMap = Object.fromEntries(serverData?.data?.data?.map(elem => [elem._id, scoreMapObject?.[elem._id]]));

        for (const key in state?.scoreMap) {
            if ((state?.scoreMap[key]?.score) && (state?.dataMap?.includes(key)) && newMap[key]) {
                totalScore += state?.scoreMap[key]?.score
            }
        }

        setState({ ...state, totalScore })

        if (saveToServer) {
            setSaveLoader(true)
            toast.success('Recalculated!')
        }
    }

}




