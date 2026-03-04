import React, { useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';

function Select({
    className = 'col-md-6', id, label, setState, value, required = true, options, disable = false,
}) {
    const [showOtherInput, setShowOtherInput] = useState(false);

    useEffect(()=>{
        ![...options, null, "", undefined].includes(value) ? setShowOtherInput(true): setShowOtherInput(false);
    },[])

    const setValueInState = (value) => {
        setState((prev) => ({
            ...prev,
            [id]: value,
        }));
    }

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;

        if (selectedValue.toLowerCase() === 'other') {
            setValueInState("")
            setShowOtherInput(true);
        } else {
            setShowOtherInput(false);
            setValueInState(selectedValue)
        }
    };

    const handleOtherInputChange = (e) => {
        setValueInState(e.target.value)
    };

    return (
        <div className={`col-12 p-1 ${className} text-sm md:text-base`}>
            <label htmlFor={id} className="form-label flex justify-between">
                <div>{label}</div> {showOtherInput && <ClearIcon className='cursor-pointer' color="error"
                onClick={()=>{
                    setShowOtherInput(false)
                    setValueInState("")
                }} />}
            </label>
            {!showOtherInput && <select
                className="form-select"
                id={id}
                required={required}
                onChange={handleSelectChange}
                value={value || ''}
                disabled={disable}
            >
                <option selected disabled value="">
                    Choose
                </option>
                {options?.map((e) => (
                    <option key={e} value={e}>
                        {e}
                    </option>
                ))}
            </select>}
            {showOtherInput && ( <input
                    className="form-control"
                    type="text"
                    placeholder="Please specify"
                    value={value || ''}
                    autoFocus
                    onChange={handleOtherInputChange}
                />
            )}
        </div>
    );
}

export default Select;
