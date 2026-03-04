import React from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import useAuth from '../../../hooks/useAuth';
import Axios from 'axios';
import { toast } from 'react-hot-toast';
import { api } from '../../../js/api';

const Header = ({ showTable, icon, title, state, font = 'text-lg', add, editState, clearStates, setIsFormOpen, exceldialog, dataCount, model = null, user }) => {


    useAuth(false)


    return (
        <div className=''>
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-2'>
                <div className="bg-blue-300 p-3 text-blue-900 rounded-full w-full flex items-center justify-between">
                    <div className='flex items-center justify-start gap-2'>
                        {icon}
                        <p className={font}>{title}</p>
                        {
                            showTable && <span className="px-2 rounded-md bg-blue-200 text-blue-900 font-semibold">
                                {dataCount ? dataCount : 0}
                            </span>
                        }
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                    <button onClick={() => { exceldialog(true) }} className='flex-auto bg-green-100 px-5 text-green-800 mt-2 hover:bg-green-200 border-2 border-green-200 ease-in-out duration-200 p-1 text-center flex items-center justify-center flex-col rounded-full'>

                        <UploadFileIcon className='text-green-800' />
                        Excel
                    </button>
                    {
                        model && <button onClick={() => { getProofPDF(model, user) }} className='flex-auto bg-orange-100 px-5 text-orange-800 mt-2 hover:bg-orange-200 border-2 border-orange-200 ease-in-out duration-200 p-1 text-center flex items-center justify-center flex-col rounded-full'>

                            <FileDownloadRoundedIcon className='text-orange-800' />
                            Proofs
                        </button>
                    }

                    <button onClick={() => { clearStates(); state(true); editState(false); setIsFormOpen(true) }} className='flex-auto bg-blue-100 px-5 text-blue-800 mt-2 hover:bg-blue-200 border-2 border-blue-200 ease-in-out duration-200 p-1 text-center flex items-center justify-center flex-col rounded-full'>

                        <AddRoundedIcon className='text-blue-800' />
                        Add
                    </button>
                </div>


            </div>

        </div>
    )
}

export default Header


const getProofPDF = (model, user) => {
    const link = `${api}/faculty/getProofs`
    const filter = { userId: user?._id }
    Axios.post(link, { filter, model }).then((res) => {
        if (res.data.status === 'success') {
            window.open(`${api}/downloadPdf/${res.data.fileName}`, '_blank');
            toast.success('Proofs collected Successfully')
        } else {
            toast.error(res.data.message)
        }
    }).catch((err) => {
        toast.error('Could not collect proofs, something went wrong')
    })
}