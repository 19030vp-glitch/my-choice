import React from 'react'

const designations = ['Assistant Professor', 'Associate Professor', "Professor", "Professor & Director", "Senior Professor"]

const DesignationSelect = ({ id, state, setState, classes, showLabel = false }) => {
    return (
        <div className={classes}>
            {
                showLabel && <label className='mb-2' htmlFor={id}>Choose Designation</label>
            }

            <select className="form-select" id={id} required
                value={state} onChange={(e) => { setState(e.target.value) }}>
                <option selected disabled value="">Choose</option>
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Associate Professor">Associate Professor</option>
                <option value="Professor">Professor</option>
                <option value="Senior Professor">Senior Professor</option>
            </select>
        </div>
    )
}

export default DesignationSelect

export { designations }