import { LinearProgress } from '@mui/material'
import React from 'react'

const FormWrapper = ({ children, action = "Adding", loading, cancelFunc, onSubmit, setIsFormOpen = { setIsFormOpen } }) => {
    return (
        <div>
            <div className='mt-10 my-3 p-3'>

                {/* // loading Linear progress */}
                {loading && <div className='mt-2 mb-4'>
                    <p className='text-center my-2'>{action}, Please wait...</p>
                    <LinearProgress />
                </div>}

                {/* // Mounting Form as children */}
                <form className="row g-3 needs-validation" onSubmit={onSubmit} encType="multipart/form-data">

                    {children}

                    <div className="col-12 mt-5" >
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 
                    rounded-full p-2 ">Save Details</button>

                        <button onClick={() => { cancelFunc(); setIsFormOpen(false) }} className="bg-red-600 hover:bg-red-700 
                    mx-2 text-white px-4 rounded-full p-2 ">Cancel</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default FormWrapper