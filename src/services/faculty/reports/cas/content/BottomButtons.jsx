import React from 'react'

const BottomButtons = ({ saveFunction, discardFunction }) => {
    return (
        <div className="flex item-center justify-start gap-2 mt-5 bg-none">
            <button className="border-2 px-2 py-1 border-blue-900 hover:bg-blue-50 text-blue-900 bg-blue-100 rounded-xl" type="button" onClick={() => { saveFunction() }}>Save</button>

            <button className="border-2 px-2 py-1 border-red-900 hover:bg-red-50 text-red-900 bg-red-100 rounded-xl" type="button" onClick={() => {
                discardFunction();
            }}>Discard</button>
        </div>
    )
}

export default BottomButtons