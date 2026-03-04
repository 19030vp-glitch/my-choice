import React from 'react'
import Bred from './Bred'
import Footer from './Footer'

const CredSkeleton = ({ bred, head, children, linkLine, onSubmit }) => {
    return (
        <>

            <div className='mt-3'>
                <Bred links={bred} />
            </div>
            <div className='md:w-1/2 sm:w-3/4 mx-auto p-1 h-screen animate-fade-up animate-once'>

                {head}

                <div className='rounded-xl bg-gray-100 py-3 sm:px-3 sm:py-3'>
                    <div className="flex items-center justify-center mt-3 rounded-xl bg-gray-100 p-3">
                        <form className='flex flex-col gap-1' onSubmit={onSubmit}>

                            {children}

                        </form>
                    </div>

                    <div className='mt-2 mb-8'>
                        {linkLine && linkLine}
                    </div>

                </div>


            </div>

            <Footer />

        </>
    )
}

export default CredSkeleton