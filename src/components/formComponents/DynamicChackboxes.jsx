import React from 'react'

const DynamicCheckboxes = ({ setState, label, id, options, state }) => {


  const handleChange = (e) => {
    if (e.target.checked === true) {
      setState(pri => [...pri, e.target.value])
    }
    else if (e.target.checked === false) {
      setState(state.filter(value => value !== e.target.value))
    }
  }

  return (
    <>
      <label className="form-label" >{label}</label>
      <div className='col-12 col-md-6 form-control'>
        {
          options?.map((program, index) => {
            return <div style={{ display: "flex", alignItems: "center" }}>
              <input className='form-check-input' style={{ margin: '5px' }} type="checkbox" id={program + index} checked={state.includes(program) ? true : false} name={program} onChange={(e) => { handleChange(e) }} value={program} />
              <label className="form-check-label">{program}</label>
            </div>
          })
        }
        <br />
      </div>
    </>
  )
}

export default DynamicCheckboxes
