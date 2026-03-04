import React from 'react'

const DateRangePicker = ({ className = "col-md-6", setState, value, label, id, required = true, inputClass = "" }) => {
  return (
    <div className={`col-12 p-1 ${className}`}>
            <label htmlFor={id} className="form-label">{label}</label>
            <input className={`form-control ${inputClass}`} id={id} required={required} type="date" 
                onChange={(e) => {
                    setState((pri) => {
                        return {
                            ...pri,
                            [id]: e.target.value
                        }
                    })
                    if (e.target.id === "From_Date") {
                        document.getElementById('To_Date').setAttribute("min", e.target.value);
                    }
                    else if (e.target.id === "To_Date") {
                        document.getElementById('From_Date').setAttribute("max", e.target.value);
                    }
                }}
                value={value} />
        </div>
  )
}
export default DateRangePicker