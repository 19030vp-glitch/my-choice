import React from 'react'

const ACFCheckPrograms = ({ programsOffered, setValues }) => {
    const programs = ["UG", "PG", "Ph.D."]

    const handleCheck = (e, program) => {

        if (e.target.checked) {
            setValues((prev) => {
                return { ...prev, programsOffered: [...prev.programsOffered, program] }
            })
        } else {
            setValues((prev) => {
                return { ...prev, programsOffered: programsOffered.filter((item) => item !== program) }
            })
        }


    }


    return (
        <div>
            <label className="mr-3">Select the programs offered by your college:</label>
            {
                programs.map((program) => {
                    return <div class="form-check form-check-inline" key={program}>
                        <input class="form-check-input" checked={programsOffered.includes(program)} onChange={(e) => handleCheck(e, program)} type="checkbox" id={program} value={program} />
                        <label class="form-check-label" htmlFor={program}>{program}</label>
                    </div>
                })
            }

        </div>
    )
}

export default ACFCheckPrograms
