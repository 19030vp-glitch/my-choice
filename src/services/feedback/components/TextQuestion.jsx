import React from 'react'

const TextQuestion = ({ title, id }) => {
    return (
        <div className='my-5'>
            <div className="w-full">
                <label htmlFor="formGroupExampleInput" className="form-label">If you have other major comments to offer</label>
                <input type="text" className="form-control w-full" id="id" placeholder="Your answer" />
            </div>
        </div>
    )
}

export default TextQuestion