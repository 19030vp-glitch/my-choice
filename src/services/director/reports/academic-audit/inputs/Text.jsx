import { TextField } from '@mui/material'
import React from 'react'

const Text = ({ label, classes = "", value, onChangeFunction, type = "text", isForm = false, keyName, state, setState, id, key }) => {
    return (
        <div className={`${classes}`}>
            {
                !isForm ?
                    <div>
                        {
                            type === 'Date' ?
                                <div className="mb-3">
                                    <label htmlFor={label} className="form-label">{label}</label>
                                    <input type="date" className="form-control" id={label} />
                                </div>
                                : <TextField
                                    fullWidth
                                    label={label} variant="standard"
                                    value={value} focused onChange={onChangeFunction}
                                    type={type}
                                    required
                                />
                        }
                    </div>
                    :
                    <div>
                        {
                            type === "Date" ?
                                <div className="mb-3">
                                    <label htmlFor={label} className="form-label">{label}</label>
                                    <input type="date" className="form-control" value={(state[keyName] && state[keyName][`${keyName}-${id}`]) || null} focused
                                        id={`${keyName}-${id}`}
                                        onChange={(e) => { setState({ ...state, [keyName]: { ...state[keyName], [e.target.id]: e.target.value } }) }} />
                                </div>
                                :
                                <TextField
                                    fullWidth
                                    label={label} variant="standard"
                                    value={(state[keyName] && state[keyName][`${keyName}-${id}`]) || null} focused
                                    id={`${keyName}-${id}`}
                                    onChange={(e) => { setState({ ...state, [keyName]: { ...state[keyName], [e.target.id]: e.target.value } }) }}
                                    type={type}
                                    required
                                />
                        }
                    </div>
            }
        </div>
    )
}

export default Text