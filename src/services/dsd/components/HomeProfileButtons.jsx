import React from 'react'

const HomeProfileButtons = ({ title, onClick }) => {
  return (
    <button onClick={onClick} className='p-2 rounded-full flex-auto border-2 text-sm sm:text-base hover:bg-blue-700 border-blue-800 bg-blue-800 text-white'>
      {title}
    </button>
  )
}

export default HomeProfileButtons
