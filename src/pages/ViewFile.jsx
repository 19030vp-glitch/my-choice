import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Bred from '../components/Bred';
import title from '../js/title';
import { api } from '../js/api';

const ViewFile = () => {

    const navigate = useNavigate()
    const location = useLocation()
    let links = [{ name: 'Welcome', link: '/' }, { name: 'Home', link: '/home' }, { name: 'Faculty Profile', link: '/faculty-profile' }, { name: 'File Viewer', link: '/viewFile' }]
    title("File Viewer")


    return (
        <div>

            <div className='mt-2'>
                <Bred links={links} />
            </div>
            <div className="flex items-center justify-center my-2 gap-2 text-gray-800">
                <FilePresentRoundedIcon className='cursor-pointer text-blue-500' sx={{ 'fontSize': '25px' }} />
                <p className='text-xl text-blue-500 mb-1 font-bold'>View Your Uploaded File</p>
            </div>


            <hr />
            <div className='flex items-center justify-start gap-2 text-xl my-2 cursor-pointer' onClick={() => { navigate(-1) }}>
                <ArrowBackRoundedIcon /> Home
            </div>
            <hr />

            {
                location.state ?

                    <>
                        {location.state.fileName ?

                            <>

                                {/* // Your file div */}
                                <div className="w-full my-3">
                                    {
                                        location.state.fileName.endsWith('.pdf')

                                            ?

                                            <iframe src={`${api}/showFile/${location.state.fileName && location.state.fileName}`} className="rounded mx-auto w-full h-1/2 sm:h-screen sm:w-1/2 " alt="file" />
                                            :

                                            <img
                                                src={`${api}/showFile/${location.state.fileName && location.state.fileName}`} className="rounded-xl mx-auto w-full h-1/2 sm:h-screen sm:w-1/2 border-4 border-gray-500 img-responsive object-contain" alt="" />


                                    }

                                </div>

                            </>

                            :
                            'Loading...'
                        }
                    </>

                    :

                    <div className="flex flex-col items-center justify-center">
                        <img src={`/assets/filenotfound.svg`} className="rounded-xl mx-auto w-96 img-responsive" alt="" />
                        <p className="text-xl text-gray-500">File you're looking for is not available</p>
                    </div>
            }



        </div >
    )
}

export default ViewFile