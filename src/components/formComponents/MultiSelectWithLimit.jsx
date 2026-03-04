import { Select } from 'antd';
import React from 'react'

const MultiSelectWithLimit = ({ className = "col-md-6", id, label, setState, value, options, required = true, limit }) => {

    

    const selectProps = {
        mode: "multiple",
        id,
        style: {
            width: "100%",
        },
        value,
        options,
        onChange: (newValue) => {
          if (newValue.length <= limit) {
          setState((pri) => {
              return {
                  ...pri,
                  [id]: newValue
              }
          });
        }
      },
        placeholder: `Select options with limit ${limit} ...`,
        maxTagCount: "responsive"
    };

  return (
    <div className={`col-12 p-1 ${className}`}>
    <label htmlFor="choose" className="form-label" >{label}</label>
        <Select dropdownStyle={{ zIndex: 1500, maxHeight: '200px' }} bordered={false} {...selectProps} className='border-[1px] rounded-lg border-gray-400' required={required} />
    </div>
  )
}

export default MultiSelectWithLimit
