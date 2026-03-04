import React from 'react'

const Week = ({ className }) => {
    return (
        <div className={`${className} bg-white rounded-md p-3 border`}>

            <div>
                <div className='md:flex items-center justify-between'>
                    <p className='text-xs text-muted md:hidden block'>Today • 5 mins ago</p>
                    <p className='font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                    <p className='text-xs text-muted md:block hidden'>Today • 5 mins ago</p>
                </div>


                <div className='flex lg:flex-row flex-col items-start justify-start gap-2 mt-4 rounded-sm mb-3'>
                    <img src="/assets/news2.jfif" className='w-[50%]' />

                    <p className='text-muted text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate soluta omnis nemo quam consequatur tempore. Placeat accusantium quas obcaecati cum.</p>
                </div>
            </div>
        </div>
    )
}

export default Week