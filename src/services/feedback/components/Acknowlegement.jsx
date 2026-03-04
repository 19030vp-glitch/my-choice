import React from 'react'
import { useNavigate } from 'react-router-dom'

const Acknowlegement = () => {
    const navigate = useNavigate()
    return (
        <div className="mx-auto max-w-screen-md text-center mt-5" >
            <h2 className="mb-4 text-xl md:text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Submission Successful, Thank You!</h2>
            <p className="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
                We appreciate your feedback, as it helps us continually improve. We will carefully consider it to enhance our offerings and provide an even better experience.</p>


            <button onClick={() => navigate('/')} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-4">Done</button>

        </div>
    )
}

export default Acknowlegement
