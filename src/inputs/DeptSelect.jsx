import React from 'react'
import SchoolsProgram from '../components/SchoolsProgram'

const DeptSelect = ({ title, state, setState, selectId, classes = "", allSchoolTag = false }) => {
  return (
    <div>
      <label htmlFor={selectId} className="form-label">{title} </label>
      <select className={`form-select ${classes}`} id={selectId} value={state} onChange={(e) => { setState(e.target.value) }} required>
        <option selected disabled value="">Choose School</option>
        {
          allSchoolTag && <option>All Schools</option>
        }
        {
          Object.keys(SchoolsProgram).map(item => {
            return <option key={item}>{item}</option>
          })
        }
      </select>
    </div>
  )
}

export default DeptSelect