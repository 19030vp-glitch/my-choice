import Axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { IconButton } from '@mui/material';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { api } from '../../../js/api';

const Header = ({ title, model }) => {

    function downloadToExcel() {
        Axios.post(`${api}/api/getExcelReport`, { model: model })
            .then((res) => {
                if (res.data.status === 'generated') {
                    toast.success('Excel generated successfully')
                    window.open(`${api}/downloadExcel/${res.data.filePath}`, '_blank')
                }
                else {
                    toast.error('Error generating Excel report')
                }
            }).catch((err) => {
                toast.error('Something went wrong')
            })
    }


    return (
        <div className="flex items-center justify-between">
            <p className='font-bold text-2xl text-gray-700'>{title}</p>


            <button onClick={downloadToExcel} className='bg-green-100 text-green-800 mt-2 hover:bg-green-200 border-2 border-green-200 ease-in-out duration-200 mx-2 px-3 p-1 rounded-full hidden sm:block'>
                <DownloadRoundedIcon className='text-green-800 sm:mr-2' />
                <span>Export to Excel</span>
            </button>

            <div className="btn-group mt-2 ml-2 block sm:hidden">
                <button type="button" className=" py-2 px-4  " data-bs-toggle="dropdown" aria-expanded="false">
                    <IconButton className='text-blue-500'>
                        <MoreHorizRoundedIcon />
                    </IconButton>
                </button>
                <ul className="dropdown-menu w-56">

                    <li className='p-2'>
                        <button onClick={downloadToExcel} className='bg-green-100 text-green-800 mt-2 hover:bg-green-200 border-2 border-green-200 ease-in-out duration-200 mx-2 px-3 p-1 rounded-full'>
                            <DownloadRoundedIcon className='text-green-800 sm:mr-2' />
                            <span>Export to Excel</span>
                        </button>
                    </li>



                </ul>
            </div>
        </div>
    )
}

export default Header