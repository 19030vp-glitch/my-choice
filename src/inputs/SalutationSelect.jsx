import React from 'react'

const SalutationSelect = ({ id, state, setState }) => {
    return (
        <select className="form-select" id={id} required onChange={(e) => { setState(e.target.value) }} value={state}>
            <option selected disabled value="">Choose</option>
            <option>Dr.</option>
            <option>Prof.</option>
            <option>Mr.</option>
            <option>Miss.</option>
            <option>Mrs.</option>
            <option>Shri</option>
            <option>Shrimati</option>

        </select>
    )
}

export default SalutationSelect