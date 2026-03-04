import React from 'react'
import { CircularProgress, IconButton, LinearProgress } from '@mui/material';
import Bred from './Bred'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate } from 'react-router-dom';

const GenerateReportTemplate = ({ bredLinks, backLink, title, loading, children, navRightChild = null }) => {

    const navigate = useNavigate()

    return (
        <div>

            <div className='flex items-center justify-between border-b py-1 mb-2'>
                <div className='flex items-center justify-start gap-2 text-base sm:text-xl' >
                    <IconButton onClick={() => { navigate(backLink) }}><ArrowBackRoundedIcon /></IconButton>
                    <p className=' text-sm md:text-lg text-blue-500 mb-1 font-bold'>{title}</p>
                </div>
                <div>
                    {navRightChild}
                </div>
            </div>

            <div>
                <Bred links={bredLinks} />
            </div>




            {/* // report gen loading */}

            {
                loading && loading.isLoading ? <div className='my-3'>
                    <p className='text-center mb-3 text-gray-500'>{loading.title ? loading.title : "Generating Report"}, Please wait...</p>
                    <LinearProgress />
                </div> : null
            }

            {children}
        </div>
    )
}

export default GenerateReportTemplate