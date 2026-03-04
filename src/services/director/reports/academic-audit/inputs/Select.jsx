import React from 'react'

const Select = ({ classes = '', id, label, options, onChangeFunction, value, isForm, keyName, state, setState }) => {
    return (
        <div className='w-full'>
            {
                !isForm ?
                    <div className={`w-full md:w-[30%] ${classes}`}>
                        <select className="form-select" id={id} required onChange={onChangeFunction}
                            value={value} >
                            <option disabled selected>{label}</option>
                            {options.map((item, index) => {
                                return <option value={item} key={index}>{item}</option>
                            })}

                        </select>
                    </div> :

                    <div className={`w-full ${classes}`}>
                        <select className="form-select" id={`${keyName}-${id}`} required onChange={(e) => { setState({ ...state, [keyName]: { ...state[keyName], [e.target.id]: e.target.value } }) }}
                            value={(state[keyName] && state[keyName][`${keyName}-${id}`]) || null} >
                            <option disabled selected>{label}</option>
                            {options.map((item, index) => {
                                return <option value={item} key={index}>{item}</option>
                            })}

                        </select>

                    </div>

            }
        </div>
    )
}


export default Select