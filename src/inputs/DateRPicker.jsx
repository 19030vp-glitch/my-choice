import React from 'react'

const DateRPicker = ({ state, setState, title, id, space = 'col-md-4' }) => {
  return (
    <div className={space}>
            <label htmlFor="validationCustom02" className="form-label">{title}</label>
            <input type="date" className="form-control" id={id} required value={state} 
            onChange={(e) => { setState(e.target.value) 
                if (e.target.id === "From_Date") {
                    document.getElementById('To_Date').setAttribute("min", e.target.value);
                }
                else if (e.target.id === "To_Date") {
                    document.getElementById('From_Date').setAttribute("max", e.target.value);
                }
            }} />
        </div>
  )
}

export default DateRPicker