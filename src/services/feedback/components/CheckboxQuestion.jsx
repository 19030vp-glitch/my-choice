import React from 'react'

const CheckboxQuestion = () => {
    return (
        <div className="my-5">
            <p className='my-2'>How much of the syllabus was covered in class by Dr. G. V. Chowdhary?</p>
            <div className="form-check">
                <CheckboxButton id="id-sajed" title="Sajed" />
                <CheckboxButton id="id-shaikh" title="Shaikh" />
                <CheckboxButton id="id-ahmed" title="Ahmed" />
                <CheckboxButton id="id-moiz" title="Moiz" />
            </div>
        </div>
    )
}

export default CheckboxQuestion

const CheckboxButton = ({ id, title }) => {
    return <div>
        <input className="form-check-input" type="checkbox" name="radioQuestion" id={id} />
        <label className="form-check-label" htmlFor={id}>
            {title}
        </label>
    </div>
}