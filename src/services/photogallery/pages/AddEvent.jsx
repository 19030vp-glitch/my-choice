import React, { useEffect } from 'react'
import GoBack from '../../../components/GoBack'
import { useState } from 'react';
import { IconButton } from '@mui/material';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import Footer from '../../../components/Footer';
import { default as pageTitle } from '../../../js/title';
import Axios from 'axios'
import { toast } from 'react-hot-toast';
import { DatePicker } from 'antd';
import { api } from '../../../js/api';


const AddEvent = () => {

    pageTitle("Add an Event")
    const { RangePicker } = DatePicker;

    const [eventTitle, setEventTitle] = useState("")
    const [eventSummary, setEventSummary] = useState("")
    const [eventDuration, setEventDuration] = useState(null)
    const [picker, setPicker] = useState(null)
    const [imageList, setImageList] = useState([{ id: 1, file: null, caption: '' }]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (picker) {
            setEventDuration(`${picker[0]['$D']}-${picker[0]['$M'] + 1}-${picker[0]['$y']} to ${picker[1]['$D']}-${picker[1]['$M'] + 1}-${picker[1]['$y']}`)
        }
    }, [picker])

    function addTheEvent(e) {
        e.preventDefault();

        console.log('eventDuration :', eventDuration)

        if (eventDuration === null || eventDuration === undefined || eventDuration === "") {
            toast.error('Please choose the event duration')
            return
        }


        setLoading(true)
        const formData = new FormData()
        formData.append('eventTitle', eventTitle)
        formData.append('eventSummary', eventSummary)
        formData.append('eventDuration', eventDuration)

        imageList.forEach((image) => {
            if (image.file && (image.caption !== undefined || image.caption !== null || image.caption !== "")) {
                formData.append(`file${image.id}`, image.file);
                formData.append(`caption${image.id}`, image.caption);
            }
        })

        const link = `${api}/api/event/add`
        Axios.post(link, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((res) => {
            if (res.data.status === 'success') {
                toast.success('Event saved successfully')
                setLoading(false)
            } else {
                toast.error(res.data.error)
                setLoading(false)
            }
        }).catch((err) => {
            toast.error('Something went wrong')
            setLoading(false)
        })

    }

    useEffect(() => {
        console.log('Duration is :', picker)
    }, [picker])


    return (
        <div>
            <GoBack pageTitle="Add an event" />

            <div className="mt-4">
                <form onSubmit={addTheEvent} encType='multipart/form-data' >

                    <div className="bg-gray-200 rounded-md border p-3 ">
                        <div className='flex items-start gap-3 justify-between'>
                            <div className="mb-3 flex-auto">
                                <label htmlFor="title" className="form-label">Title of the event</label>
                                <input type="text" required placeholder='Title goes here...' maxLength={200} value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} className="form-control" id="title" aria-describedby="emailHelp" />
                                <div id="titleHelp" className="form-text">The event title should not exceed 200 characters.</div>
                            </div>

                            <div className='flex-auto'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Duration of the event </label>
                                    <div>
                                        <RangePicker onChange={(e) => setPicker(e)} className='border border-black p-2' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Brief event summary </label>
                                <textarea required placeholder='Write about the event in brief...' maxLength={1200} value={eventSummary} onChange={(e) => setEventSummary(e.target.value)} className="form-control" id="title" aria-describedby="emailHelp" />
                            </div>
                        </div>
                    </div>



                    <div className="bg-gray-200 rounded-md border p-3 mt-3">
                        <div>
                            <label htmlFor="photos" className="form-label">Choose event photographs</label>
                            <div id="photoHelp" className="form-text">Note: Select a photo in the input to add another photo. (You can add maximum of 5 photos of an event.)</div>
                            <div id="photoHelp" className="form-text mb-2"></div>
                            <div className="border-l-4 border-gray-400">
                                <div className="ml-5">
                                    <ImageUploader setImageList={setImageList} imageList={imageList} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-200 rounded-md border p-3 mt-3">
                        <label htmlFor="choosen" className="form-label">Upload Event</label>
                        <div className="d-grid gap-2">
                            {
                                !loading ?
                                    <button className="btn bg-blue-600 hover:bg-blue-700 text-white p-3" type="submit">
                                        <span className='flex items-center justify-center gap-2'>
                                            <FileUploadRoundedIcon />
                                            Upload event
                                        </span>
                                    </button> :

                                    <button disabled className="btn bg-blue-600 hover:bg-blue-700 text-white p-3" type="submit">
                                        <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span> Uploading Event...
                                    </button>
                            }
                        </div>
                    </div>


                </form>
            </div>

            <Footer />
        </div>
    );
};




export default AddEvent


function ImageUploader({ imageList, setImageList }) {

    function handleImageChange(event, id) {
        const updatedList = imageList.map((image) =>
            image.id === id ? { ...image, file: event.target.files[0] } : image
        );
        setImageList(updatedList);
    }

    function handleCaptionChange(event, id) {
        const updatedList = imageList.map((image) =>
            image.id === id ? { ...image, caption: event.target.value } : image
        );
        setImageList(updatedList);
    }

    function handleAddImage() {
        if (imageList.length < 5 && imageList.every((image) => image.file !== null)) {
            const newId = imageList[imageList.length - 1].id + 1;
            setImageList([...imageList, { id: newId, file: null }]);
        }
    }

    function handleRemoveImage(id) {
        const updatedList = imageList.filter((image) => image.id !== id);
        setImageList(updatedList);
    }


    return (
        <div>
            {imageList.map((image, index) => (
                <div key={index} className='flex items-center justify-start gap-4 my-3'>
                    <div className='flex items-center gap-2 w-full'>
                        <div className="flex-auto col-md-2">
                            <input className="form-control" type="file" id="photo1" required
                                onChange={(event) => handleImageChange(event, image.id)} />
                        </div>
                        <div className='flex-auto'>
                            <input placeholder="Caption the photo..." type="text" required maxLength={100}
                                value={image.caption} className="form-control" id="title" aria-describedby="emailHelp"
                                onChange={(event) => handleCaptionChange(event, image.id)}
                            />
                        </div>
                    </div>
                    {imageList.length > 1 && (
                        <IconButton sx={{ border: '1px solid red' }}
                            onClick={() => handleRemoveImage(image.id)}>
                            <RemoveRoundedIcon sx={{ color: "red", fontSize: '20px' }} />
                        </IconButton>
                    )}
                </div>
            ))}
            {imageList.length < 5 && imageList.every((image) => image.file !== null) && (
                <button className="btn bg-blue-600 mt-1 hover:bg-blue-700 text-white" type="button" onClick={handleAddImage}>
                    <span className='flex items-center justify-center gap-2'>
                        <AddPhotoAlternateRoundedIcon /> Add more
                    </span>
                </button>
            )}
        </div>
    );
}



