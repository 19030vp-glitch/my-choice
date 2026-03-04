import React from 'react'

const GenderSelect = ({ id, state, setState, className, showLabel = false, title = false }) => {
    return (
        <div className={className}>
            {showLabel && <label htmlFor={id}>{title}</label>}
            <select className={`form-select ${className} mt-2`} id={id} required onChange={(e) => { setState(e.target.value) }} value={state}>
                <option selected disabled value="">Choose</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>

            </select>
        </div>
    )
}

export default GenderSelect


const CasteSelect = ({ id, state, setState, className, showLabel = false, title = false }) => {
    return <div className="col-md-4">
        {showLabel && <label htmlFor={id}>{title}</label>}
        <select className={`form-select ${className} mt-2`} id={id} required onChange={(e) => { setState(e.target.value) }} value={state}>
            <option selected disabled value="">Choose</option>
            <option>Open</option>
            <option>SC</option>
            <option>ST</option>
            <option>VJ / NT(A)</option>
            <option>VJ / NT(B)</option>
            <option>VJ / NT(C)</option>
            <option>VJ / NT(D)</option>
            <option>SBC</option>
            <option>OBC</option>
            <option>PH</option>
            <option>EWS</option>
            <option>Minority</option>
            <option>NRI</option>
            <option>Foreign National</option>
        </select>
    </div>
}

export { CasteSelect }