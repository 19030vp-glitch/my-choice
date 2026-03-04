import React, { useEffect, useState } from 'react'
import { Select } from 'antd'
import SchoolsProgram from '../../../components/SchoolsProgram'

const AdminSchoolSelect = ({ className = "col-md-6", id, label, setState, value, required = true }) => {

    const [options, setOptions] = useState([])

    useEffect(() => {
        let options = []
        options.push({ value: "All Schools" })
        Object.keys(SchoolsProgram)?.forEach((e) => {
            options.push({ value: e })
        })
        setOptions(options)
    }, [])

    const selectProps = {
        mode: "single",
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
                    schoolName: newValue
                }
            });
        },
        onClear: () => setState((prev) => {
            return { ...prev, schoolName: "All School" }
        }),
        placeholder: "Select School...",
        maxTagCount: "responsive"
    };

    return (
        <div className={`col-12 p-1 ${className}`}>
            <label htmlFor="choose" className="form-label" >{label}</label>
            <Select {...selectProps} />
        </div>
    )
}

export default AdminSchoolSelect