import React, { useState } from 'react'

const Navbar = () => {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            <div className='border-b pb-2'>
                <img src="/assets/logo.png" style={{ mixBlendMode: 'darken' }} className={`h-16 mx-auto mt-2 block sm:hidden opacity-0 transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : ''}`} onLoad={() => setIsVisible(true)} alt="" />
                <div className="sm:flex items-center justify-between gap-3">
                    <img src="/assets/swami.png" style={{ mixBlendMode: 'darken' }} alt="" className={`hidden sm:block opacity-0 h-20 transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : ''}`} onLoad={() => setIsVisible(true)} />

                    <div className="sm:flex flex-col items-center justify-center">
                        <p className="text-md font-bold text-center sm:text-xl md:text-2xl">OPERANT SCIENTIFIC PVT. LTD.</p>
                        <p className="text-gray-500 text-center sm:text-sm text-xs">Pali-306 401, Rajasthan, India</p>
                        <p className='text-center text-muted p-1 rounded-full hidden sm:block text-xs md:text-sm'>Established on 17th September 1994, Recognized by UGC U/s 2(f) and 12(B) NAAC Re-accredited with 'B++' grade</p>
                    </div>
                    <img src="/assets/logo.png" style={{ mixBlendMode: 'darken' }} className={`h-20 hidden sm:block md:block lg:block xl:block 2xl:block opacity-0 transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : ''}`} onLoad={() => setIsVisible(true)} alt="" />
                </div>

            </div>
        </>
    )
}

export default Navbar