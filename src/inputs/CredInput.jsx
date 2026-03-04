import React from 'react'

const CredInput = ({ setState, state, prefix = false, placeholder, type, spacing, size = 30, prefixLetter = "TG" }) => {
    return (
        <div className={`input-group ${spacing}`}>
            {
                prefix && <span className="input-group-text p-3 font-bold rounded-lg" id="basic-addon1">{prefixLetter} - </span>
            }
            <input type={type} className="form-control p-3 rounded-lg" placeholder={placeholder} aria-label="Username" value={state} size={size} onChange={(e) => { setState(e.target.value) }} required />

        </div>
    )
}

export default CredInput