import React from 'react'
import { setDeleteModal } from '../redux/slices/ModalSlice'
import { useDispatch } from 'react-redux'

const DeleteModal = () => {
    const dispatch = useDispatch()
    return (
        <div className="bg-[#39557375] w-full rounded-lg overflow-hidden absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center">
            <div className='bg-white p-4 rounded-lg w-1/3'>
                <p className='text-center text-lg'>Do you want to delete the item ?</p>
                <div className="col-12 flex items-center justify-center my-3 gap-3">
                    <button type="submit" className="bg-red-800 text-white px-4 rounded-full p-2">Delete Now</button>

                    <button className="border-2 border-green-600  text-green-600 px-4 rounded-full p-2" onClick={() => { dispatch(setDeleteModal(false)) }}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal