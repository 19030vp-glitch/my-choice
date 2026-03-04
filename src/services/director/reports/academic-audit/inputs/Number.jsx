import React from 'react'

const Number = ({ label, value, onChangeFunction, classes = "", id }) => {
    return (
        <div>
            <input type="number" placeholder={label} min={0} className={`form-control w-full ${classes}`} id={id} value={value} onChange={onChangeFunction} />
        </div>
    )
}

export default Number