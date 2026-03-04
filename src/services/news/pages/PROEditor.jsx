import React, { useEffect, useState } from 'react'
import GoBack from '../../../components/GoBack'
import title from '../../../js/title'
import { InboxOutlined } from '@ant-design/icons';
import Header from '../components/Header';
import Footer from '../../../components/Footer';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { message, Upload } from 'antd';
import { IconButton } from '@mui/material';
import { toast } from 'react-hot-toast';
import Axios from 'axios';
import useProAuth from '../../../hooks/useProAuth';
import siteLinks from '../../../components/siteLinks';
import Bred from '../../../components/Bred';
import { useNavigate } from 'react-router-dom';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import serverLinks from '../../../js/serverLinks';
import FileViewer from '../../../components/FileViewer';
import { api } from '../../../js/api';

const PROEditor = () => {

    title('Post a News | PRO')
    useProAuth(false)
    const navigate = useNavigate()

    return (
        <div className='w-full'>
            <div>
                <Header title="PRO Editor" showSearch={false} />
            </div>
            <div className='mt-2 flex items-center justify-between'>
                <Bred links={[siteLinks.welcome, siteLinks.proEditor]} />
                <div onClick={() => { navigate(siteLinks.allNews.link) }} className='cursor-pointer rounded-full bg-blue-200 hover:bg-blue-300 text-sm px-2 py-1 border flex items-center justify-center gap-2'>
                    <p className='hover:text-black'>Go to All News</p>
                    <ArrowForwardRoundedIcon sx={{ fontSize: '20px' }} />
                </div>
            </div>
            <div className='w-full'>
                <EditorForm />
            </div>

            <Footer />
        </div>
    )
}

export default PROEditor

const EditorForm = ({ actionToPerform = "Add", news = null, setIsModalOpen, refetch }) => {

    const { Dragger } = Upload;

    const [date, setDate] = useState(null)
    const [headline, setHeadline] = useState(null)
    const [file, setFile] = useState([])
    const [desc, setDesc] = useState(null)
    const [base64, setBase64] = useState([])
    const [loading, setLoading] = useState(false)
    const [uploadedFiles, setUploadedFiles] = useState([])

    const publishNews = (e) => {
        e.preventDefault();
        if (actionToPerform === 'Add') {
            if (file?.length > 0 && file?.length <= 5) {
                setLoading(true)

                const formData = new FormData()

                formData.append('date', date)
                formData.append('headline', headline)
                file.forEach((fileItem, index) => {
                    formData.append(`file-${index + 1}`, fileItem);
                });
                formData.append('desc', desc)

                const url = `${api}/api/news/publish`
                Axios.post(url, formData).then((res) => {
                    if (res.data.status === 'success') {
                        setLoading(false)
                        setHeadline('')
                        setFile(null)
                        setDesc('')
                        toast.success(res.data.message)
                    } else if (res.data.status === 'error') {
                        toast.error(res.data.message)
                        setLoading(false)
                        return
                    }
                }).catch((err) => {
                    toast.error('Something went wrong')
                    setLoading(false)
                    return
                })
            } else {
                toast.error(file?.length === 0 ? 'Please select at least one file to upload...' : 'Total files uploaded and selected files should be less than or equal to 5')
            }
        } else if (actionToPerform === 'Edit') {
            let totalLength = file?.length + uploadedFiles?.length
            if (totalLength > 0 && totalLength <= 5) {
                setLoading(true)

                const formData = new FormData()

                formData.append('date', date)
                formData.append('headline', headline)
                file.forEach((fileItem, index) => {
                    formData.append(`file-${index + 1}`, fileItem);
                });
                formData.append('desc', desc)
                formData.append('id', news._id)
                formData.append('previousPhotoURL', JSON.stringify(uploadedFiles))

                const url = `${api}/api/news/edit`
                Axios.post(url, formData).then((res) => {
                    if (res.data.status === 'success') {
                        setLoading(false)
                        setDate(null)
                        setHeadline('')
                        setFile(null)
                        setDesc('')
                        refetch()
                        toast.success(res.data.message)
                        setIsModalOpen(false)
                    } else if (res.data.status === 'error') {
                        toast.error(res.data.message)
                        setLoading(false)
                        setIsModalOpen(false)
                        return
                    }
                }).catch((err) => {
                    toast.error('Something went wrong')
                    setLoading(false)
                    setIsModalOpen(false)
                    return
                })
            } else {
                toast.error(totalLength === 0 ? 'Please select at least one file to upload...' : 'Previously uploaded photos and newly selected photos should be less than or equal to 5 photos')
            }
        }
    }

    useEffect(() => {
        if (actionToPerform === 'Edit') {
            setDate(news.date)
            setHeadline(news.headline)
            setUploadedFiles(typeof news.photoURL === 'string' ? [news.photoURL] : news.photoURL)
            setDesc(news.desc)
        }
    }, [news])

    const getFiles = (e) => {
        const selectedFiles = e.target.files;
        const maxAllowedFiles = 5;

        if (selectedFiles.length <= maxAllowedFiles) {
            const fileListArray = Array.from(selectedFiles);
            setFile(fileListArray);
            convertFilesToBase64(fileListArray)
                .then((base64Array) => {
                    setBase64(base64Array);
                })
                .catch((error) => {
                    console.error('Error converting files to base64:', error);
                });
        } else {
            toast.error(`Maximum of ${maxAllowedFiles} files can be selected.`);
            e.target.value = null;
        }
    };

    const removeSelectedFiles = (index) => {
        const arrayFile = [...file || []];
        const newArray = arrayFile.filter((i, idx) => idx !== index)
        setFile(() => [...newArray || []])
        convertFilesToBase64(newArray)
            .then((base64Array) => {
                console.log(base64Array);
                setBase64(base64Array);
            })
            .catch((error) => {
                console.error('Error converting files to base64:', error);
            });

    }

    const removeUploadedFiles = (index) => {
        const arrayFile = [...uploadedFiles || []];
        const newArray = arrayFile.filter((i, idx) => idx !== index)
        setUploadedFiles(() => [...newArray || []])

    }

    // Function to convert all files in the fileListArray to base64
    const convertFilesToBase64 = async (fileListArray) => {
        const base64Array = [];
        for (const file of fileListArray) {
            try {
                const base64 = await convertFileToBase64(file);
                base64Array.push(base64);
            } catch (error) {
                console.error('Error converting file to base64:', error);
            }
        }
        return base64Array;
    };

    // Function to convert each file to base64
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    useEffect(() => {
        console.log('Selected Files :', file)
        console.log('Uploaded Files :', uploadedFiles)
    }, [uploadedFiles, file]);


    return <div className="w-full">
        <form className="col g-3" onSubmit={publishNews} >

            <div className='md:flex items-center justify-start gap-4'>
                <div className="my-3 lg:col-md-3">
                    <label htmlFor="titleofthenews" className="form-label">Date of the News ( बातमीचे दिनांक )</label>
                    <input type="date" value={date} onChange={(e) => { setDate(e.target.value) }} className="form-control" required />
                </div>
                <div className="my-3 flex-auto">
                    <label htmlFor="titleofthenews" className="form-label">Headline of the News ( बातमीचे शीर्षक )</label>
                    <input type="text" value={headline} onChange={(e) => { setHeadline(e.target.value) }} className="form-control" id="titleofthenews" placeholder='Title / Headline' required />
                </div>
            </div>

            <div className="mt-2 mb-3">
                <label htmlFor="descofthenews" className="form-label">Description of the News ( बातमीचे वर्णन ) <span className='text-muted text-xs'>(Optional)</span></label>
                <textarea type="text" value={desc} onChange={(e) => { setDesc(e.target.value) }} placeholder="News in brief..." className="form-control" id="descofthenews" />
            </div>

            <div className='my-3 w-full hover:border-blue-600 border-blue-300 border-2 border-dashed rounded-md cursor-pointer' onClick={() => document.getElementById('file').click()}>
                <Dragger className='pointer-events-none border-none outline-none'>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                        <p>Please click on the this area to upload your files. You can select a maximum of 5 photos at a time.</p> ( तुमच्या फाइल्स अपलोड करण्यासाठी कृपया या क्षेत्रावर क्लिक करा. तुम्ही एका वेळी कमाल 5 फोटो निवडू शकता. )</p>
                    <p className="ant-upload-hint">

                        Please ensure that the picture you are uploading is less than 1 MB in size.
                        ( कृपया तुम्ही अपलोड करत असलेल्या फोटोचा आकार 1 MB पेक्षा कमी असल्याची खात्री करा. )
                    </p>

                </Dragger>
            </div>

            <input type="file" accept="image/png, image/jpg, image/jpeg" multiple className='hidden' name="file" id="file" onChange={(e) => getFiles(e)} />

            {
                file?.length > 0 && <ol className="list-group ">

                    <li className="list-group-item list-group-item-action" aria-current="true">
                        Selected files {`(${file?.length})`}
                    </li>

                    {
                        file.map((item, index) => {
                            return <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="me-auto">
                                    <div className="font-semibold">
                                        {
                                            <img src={base64[index]} width="100px" />
                                        }
                                        {item?.name || item} </div>
                                </div>
                                <span><IconButton onClick={() => removeSelectedFiles(index)}><DeleteRoundedIcon /></IconButton></span>
                            </li>
                        })
                    }


                </ol>
            }

            {
                (actionToPerform !== "add" && uploadedFiles?.length > 0) && <ol className="list-group mt-3">

                    <li className="list-group-item list-group-item-action" aria-current="true">
                        Uploaded files {`(${uploadedFiles?.length})`}
                    </li>

                    {
                        uploadedFiles.map((item, index) => {
                            return <li className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="me-auto">
                                    <div className="font-semibold">


                                        <FileViewer fileName={item} serviceName="news" >
                                            <img src={serverLinks.showFile(item, 'news')}
                                                className='object-cover cursor-pointer w-20 hover:brightness-75 ease-in-out duration-200 ' />
                                        </FileViewer>


                                        {item} </div>
                                </div>
                                <span><IconButton onClick={() => removeUploadedFiles(index)}><DeleteRoundedIcon /></IconButton></span>
                            </li>
                        })
                    }


                </ol>
            }

            <div className='flex items-center justify-start gap-2'>
                {
                    !loading ? <div className="my-3">
                        <button className="btn btn-primary bg-primary" type="submit">Publish News</button>
                    </div> :
                        <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Publishing...
                        </button>
                }

                <div className="my-3" onClick={(e) => { e.preventDefault(); setIsModalOpen(false) }}>
                    <button className="btn btn-danger bg-danger">Cancel</button>
                </div>
            </div>
        </form>
    </div>
}

export { EditorForm }
