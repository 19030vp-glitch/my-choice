import React from 'react'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ArrowButton from '../../../components/ArrowButton';
import siteLinks from '../../../components/siteLinks';
import { Link } from 'react-router-dom';

const AllValidComponent = ({ isValid = true, size = "w-[50%]", validFunc = null, invalidFunc = null }) => {
    return (
        <div className='w-full'>

            <div className='text-center'>
                <div className='animate-pulse'>
                    {
                        isValid && <CheckCircleRoundedIcon sx={{ color: "green", fontSize: "66px" }} />
                    }

                </div>
                <p className='mt-3 text-2xl font-medium'>{isValid ? "Your Faculty Profile data is complete." : "You may have some incomplete data in your faculty profile."}</p>
                <div className={`mt-5 text-center ${size} mx-auto`}>
                    {isValid ? <>
                        The data you filled in Faculty Profile up until now is <span className="text-green-700 font-medium">Perfectly Valid</span>. You may need to rescan your data in future data inconsistencies. Thank you. You may now proceed to Faculty Profile.
                    </>
                        :
                        <>
                            Over the period of time, we've added additional columns to various tables as needed, resulting in incomplete data due to potential lack of entries for those columns. Before proceeding with CAS, PBAS, or AQAR Forms, it is essential to ensure the completeness of your Faculty Profile. You may need to review and update the information to fill any mandatory columns that were left unfilled. This step is crucial to ensure the accuracy and completeness of your records.
                        </>}
                </div>

                <div className='mt-5'>
                    {
                        isValid ? <Link onClick={validFunc} to={siteLinks.facultyHome.link}><ArrowButton colorClasses='bg-green-700 text-white' title="Proceed to Faculty Profile" /></Link>
                            : <div >
                                <Link className='mx-3' onClick={invalidFunc} to={siteLinks.welcome.link}><ArrowButton colorClasses='bg-red-100 text-red-700' showArrow={false} title="Go Back" /></Link>
                                <Link onClick={invalidFunc} to={siteLinks.validateData.link}><ArrowButton colorClasses='bg-[#d22e06] text-white' title="Complete your profile" /></Link>
                            </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default AllValidComponent
