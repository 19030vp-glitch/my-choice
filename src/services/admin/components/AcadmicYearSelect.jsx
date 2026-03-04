import React from 'react'
import { Select } from 'antd'

const AcadmicYearSelect = ({ className = "col-md-6", id, label, setState, value, required = true, customClasses = "border-[1px] rounded-lg border-gray-400" }) => {

    let year = new Date().getFullYear();
    const ly = year - 29;
    let i = 1
    let options = []
    for (year; year >= ly; year--) {
        let privyear = year.toString().slice(-2);
        let last = year - 1 + "-" + privyear;
        last = last.toString();

        options.push({ value: last })
        i++
    }
    const selectProps = {
        mode: "multiple",
        id,
        style: {
            width: "100%",
        },
        value,
        options,
        onChange: (newValue) => {
            setState((pri) => {
                return {
                    ...pri,
                    [id]: newValue
                }
            });
        },
        placeholder: "Select Years...",
        maxTagCount: "responsive"
    };

    return (
        <div className={`col-12 p-1 ${className}`}>
            <label htmlFor="choose" className="form-label" >{label}</label>
            <Select allowClear bordered={false} {...selectProps} className={customClasses} />
        </div>
    )
}
export default AcadmicYearSelect
