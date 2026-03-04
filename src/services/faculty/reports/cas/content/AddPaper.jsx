import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import NumberToTextField from '../components/NumberToTextField'
import { BGPad } from './Teaching'
import Axios from 'axios'
import { toast } from 'react-hot-toast'
import FileViewer from '../../../../../components/FileViewer'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Tooltip } from 'antd';
import { api } from '../../../../../js/api'


const AddPaper = ({ researchPaper, setResearchPaper, casYearState, saveLoader, setSaveLoader }) => {



    return (
        <BGPad classes='mt-3'>

            <div>
                <div className='mt-2 text-sm md:text-base'>


                    <NumberToTextField saveLoader={saveLoader} setSaveLoader={setSaveLoader} facultyTableAvailable="ResearchPapersUGC"
                        state={researchPaper} setState={setResearchPaper} casYearState={casYearState}
                        isForm={true} activity="Activity 1" classes='my-3' model="ResearchPaper" addName="Research Paper" activityName="Research Paper"
                    >

                    </NumberToTextField>

                </div>
            </div>
        </BGPad>
    )
}

export default AddPaper


const PaperPoints = ({ item, setState, state, isFetching, serverData, }) => {

    const [upload, setUpload] = useState(null)

    const impactFactorList = [
        { id: 'a', points: 5, title: 'Paper in refereed journals without impact factor' },
        { id: 'b', points: 10, title: 'Paper with impact factor less than 1' },
        { id: 'c', points: 15, title: 'Paper with impact factor 1 and 2' },
        { id: 'd', points: 20, title: 'Paper with impact factor 2 and 5' },
        { id: 'e', points: 25, title: 'Paper with impact factor 5 and 10' },
        { id: 'f', points: 30, title: 'Paper with impact factor > 10' },

    ]

    const facultyList = [
        { id: '1', points: 8, title: 'Faculty of Sciences / Engineering / Agriculture / Medical / Veternary Sciences', keyword: 'sciences' },

        { id: '2', points: 10, title: 'Faculty of Languages / Humanity / Arts / Social Sciences / Library / Education / Physical Education / Commerce / Management & other related disciplines', keyword: 'language' },
    ]


    const submitAttendance = (name) => {
        if (!upload) {
            toast.error('Please select an attachment to upload')
            return
        }
        else {
            const formData = new FormData();
            formData.append(name, upload);

            const url = `${api}/api/faculty/CAS-Report/saveTeachingActivityDocs`

            Axios.post(url, formData)
                .then((res) => {
                    if (res.data.status === 'success') {
                        setState({
                            ...state, scoreMap: {
                                ...state?.scoreMap, [item._id]: {
                                    ...state?.scoreMap?.[item?._id],
                                    refreedIFProof: {
                                        file: res.data?.data?.[name] && res.data?.data?.[name]
                                    }
                                }
                            }
                        })
                        toast.success('Proof Uploaded Successfully')
                    }
                    else {
                        console.log('Failed...')
                        toast.error('Could not upload proof please try again...')
                    }
                }).catch(function (err) {
                    console.log(err)
                    toast.error('Failed due to Internal Server error')
                })
        }
    }

    const deleteFile = (fileName) => {

        if (window.confirm('Are you sure you want to delete this proof?')) {
            const url = `${api}/api/deleteFile`
            Axios.post(url, { fileName, path: 'CAS' })
                .then((res) => {
                    if (res.data.status === 'deleted') {
                        setState({
                            ...state, scoreMap: {
                                ...state?.scoreMap, [item._id]: {
                                    ...state?.scoreMap?.[item?._id],
                                    refreedIFProof: null
                                }
                            }
                        })

                        toast.success('File deleted successfully')
                    } else {
                        toast.error('Error deleting File')
                    }
                })
        } else {
            return
        }


    }

    function func() {

    }

    useEffect(() => {
        const newItem = state?.scoreMap?.[item._id]
        const scoreMapObject = state?.scoreMap
        const newDataMap = state?.dataMap

        let newMap = Object.fromEntries(serverData?.data?.data?.map(elem => [elem._id, scoreMapObject[elem._id]]));

        let individualScore = 0

        let faculty = facultyList[newItem?.facultyType] ? facultyList[newItem?.facultyType].points : 0
        let impact = impactFactorList[newItem?.impactFactor] ? impactFactorList[newItem?.impactFactor].points : 0
        individualScore = faculty + impact


        if (newItem?.authorType === 'Two') {
            individualScore = individualScore * 70 / 100
        }
        else if (newItem?.authorType === 'Multiple') {
            if (newItem?.multipleAuthorType === 'First') {
                individualScore = individualScore * 70 / 100
            }
            else if (newItem?.multipleAuthorType === 'Other') {
                individualScore = individualScore * 30 / 100
            }
            else {
                individualScore = 0
            }
        }


        let totalResearchPaperScore = 0

        for (const key in newMap) {
            if ((newMap[key]?.score && key !== item?._id) && (newDataMap?.includes(key)) && state?.dataMap?.includes(key)) {
                totalResearchPaperScore += newMap[key].score
            }
        }

        totalResearchPaperScore = totalResearchPaperScore + individualScore

        setState((current) => {
            return {
                ...current,
                totalScore: totalResearchPaperScore,
                scoreMap:
                    { ...newMap, [item._id]: { ...current.scoreMap?.[item._id], score: individualScore } },
            }
        })



    }, [state?.scoreMap?.[item._id]?.authorType, state?.scoreMap?.[item._id]?.impactFactor, state?.scoreMap?.[item._id]?.multipleAuthorType, state?.scoreMap?.[item._id]?.facultyType])



    return <div>

        <div className="w-full flex justify-between gap-2 items-center flex-wrap  ">

            {/* choose facultyType */}
            <div className='w-full md:w-[30%]'>
                <select className="form-select" required onChange={(e) => {
                    setState({
                        ...state, scoreMap: {
                            ...state?.scoreMap, [item._id]: {
                                ...state?.scoreMap?.[item?._id],
                                facultyType: e.target.value
                            }
                        }
                    })
                }}
                    value={state?.scoreMap?.[item._id]?.facultyType}
                >
                    <option disabled selected>Choose Faculty</option>
                    {facultyList.map((facultyItem, index) => {
                        return <option value={index} key={index}> {facultyItem.title}</option>
                    })}

                </select>
            </div>

            {/* choose impactFactor */}
            <div className='w-full md:w-[30%]'>
                <select className="form-select" required onChange={(e) => {
                    setState({
                        ...state, scoreMap: {
                            ...state?.scoreMap, [item._id]: {
                                ...state?.scoreMap?.[item?._id],
                                impactFactor: e.target.value
                            }
                        }
                    })
                }}
                    value={state?.scoreMap?.[item._id]?.impactFactor}
                >
                    <option selected disabled>Choose Paper Type</option>

                    {
                        impactFactorList.map((item, index) => {
                            return <option key={index}
                                value={index}>{item.title}</option>
                        })
                    }


                </select>
            </div>


            {/* author type */}
            <div className='w-full md:w-[30%]'>
                <select className="form-select" required onChange={(e) => {
                    setState({
                        ...state, scoreMap: {
                            ...state?.scoreMap, [item._id]: {
                                ...state?.scoreMap?.[item?._id],
                                authorType: e.target.value
                            }
                        }
                    })
                }}
                    value={state?.scoreMap?.[item._id]?.authorType} >

                    <option selected disabled>Choose Author Type</option>
                    <option value="Single">Single</option>
                    <option value="Two">Two</option>
                    <option value="Multiple">Multiple</option>


                </select>
            </div>


            {
                state?.scoreMap?.[item._id]?.authorType === 'Multiple' && <div className='w-full md:w-[30%]'>
                    <select className="form-select" required onChange={(e) => {
                        setState({
                            ...state, scoreMap: {
                                ...state?.scoreMap, [item._id]: {
                                    ...state?.scoreMap?.[item?._id],
                                    multipleAuthorType: e.target.value
                                }
                            }
                        })
                    }}
                        value={state?.scoreMap?.[item._id]?.multipleAuthorType}
                    >

                        <option disabled selected>Choose Multiple Author Type</option>
                        <option value={'First'}>First / Principal / Corresponding Author / Guide</option>
                        <option value={'Other'}>Other</option>
                    </select>
                </div>
            }




        </div>
        <br />
        {/* add input file button */}
        <hr />
        <div className='w-full flex items-center justify-between'>
            <div>
                {state?.scoreMap?.[item._id]?.refreedIFProof ?

                    <FileViewWithDelete fileName={state?.scoreMap?.[item._id]?.refreedIFProof?.file?.[0]?.filename} onDeleteClick={deleteFile} />
                    : 'No proof found'
                }
            </div>

            <div>
                {
                    state?.scoreMap?.[item._id]?.impactFactor === '0' ?
                        <div className="input-group mt-3 flex items-center justify-end">
                            <input type="file" className="form-control" id="refereed" aria-describedby="refereed" aria-label="Upload" name="refereed"
                                onChange={(e) => { setUpload(e.target.files[0]) }} accept="application/pdf" />
                            <button onClick={() => { submitAttendance('refereed') }} className="btn btn-primary bg-blue-700 hover:bg-blue-600" type="button" id="refereed">Upload Refereed Journal proof</button>
                        </div>
                        : parseInt(state?.scoreMap?.[item._id]?.impactFactor) > 0 ?
                            <div className="input-group mt-3 flex items-center justify-end">
                                <input type="file" className="form-control" id="impactFactor" aria-describedby="impactfactor" aria-label="Upload" name="impactFactor"
                                    onChange={(e) => { setUpload(e.target.files[0]) }} accept="application/pdf" />
                                <button onClick={() => { submitAttendance('impactFactor') }} className="btn btn-primary bg-blue-700 hover:bg-blue-600" type="button" id="impactFactor">Upload Impact Factor proof</button>
                            </div> : null
                }
            </div>
        </div>





    </div>
}

export { PaperPoints }


const FileViewWithDelete = ({ fileName, onDeleteClick, otherParams }) => {
    return <div className='flex items-center justify-start gap-2 bg-blue-100 rounded-md px-2'>
        <FileViewer serviceName="CAS"
            fileName={fileName} />

        <Tooltip title="Delete File">
            <IconButton onClick={() => { onDeleteClick(fileName, otherParams) }}>
                <DeleteRoundedIcon />
            </IconButton>
        </Tooltip>

    </div>
}


export { FileViewWithDelete }

