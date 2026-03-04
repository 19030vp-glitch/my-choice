import React from 'react'

const TextArea = ({ className = "col-md-6", setState, value, label, id, required = true, placeholder = "", desable = false }) => {
  return (
    <div className={`col-12 p-1 ${className} text-sm md:text-base`}>
            <label htmlFor="address" className="form-label">{label}</label>
            <textarea className="form-control" id="address" value={value} required={required} placeholder={placeholder} rows="1" onChange={(e) => {
                setState((pri) => { return { ...pri, [id]: e.target.value } })
              }} disabled={desable} ></textarea>
          </div>
  )
}

export default TextArea
