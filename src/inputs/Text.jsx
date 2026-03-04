import React from 'react'

const Text = ({ state, setState, title, type = 'text', space = 'col-md-4', disabled = false, objectWiseState = false, stateKey, required = true }) => {
    return (
        <div className={space}>
            {
                objectWiseState ? <>
                    <label htmlFor="validationCustom02" className="form-label">{title}</label>
                    <input disabled={disabled} type={type} className="form-control" id="validationCustom02" dataDateFormat="mm-dd-yy" value={state[stateKey] || ''} required onChange={(e) => { setState({ ...state, [stateKey]: e.target.value }) }} placeholder={title} />
                </> : <>
                    <label htmlFor="validationCustom02" className="form-label">{title}</label>
                    <input disabled={disabled} type={type} className="form-control" id="validationCustom02" dataDateFormat="mm-dd-yy" required={required} value={state} onChange={(e) => { setState(e.target.value) }} />
                </>
            }



        </div>

    )
}

export default Text