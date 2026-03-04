import React from 'react'

const Footer = () => {




    return (
        <footer className="w-full p-3 text-black border-t mt-10 left-0 bottom-0 ">
            <div>
                <p className="text-center text-sm sm:text-base">Copyright ©{new Date().getFullYear()} SRTMUN-UIMS.</p>
                <p className="text-center text-sm sm:text-sm mt-3">University Information Management System</p>
                <p className='text-xs sm:text-sm text-gray-500 text-center'>Developed by School of Mathematical Sciences, SRTMU, Nanded.</p>
            </div>

        </footer>
    )
}

export default Footer