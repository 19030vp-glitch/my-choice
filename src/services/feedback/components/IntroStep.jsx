import React from 'react'
import { academicYearGenerator } from '../../../inputs/Year'
import { SaveButton } from '../../faculty/reports/cas/CasReportHome'
import DeptSelect from '../../../inputs/DeptSelect'
import toast from 'react-hot-toast'

const IntroStep = ({ setActiveStep, setAcademicYear, academicYear, schoolName, setSchoolName, customYears = false }) => {
    return (
        <div className="flex items-center justify-center mt-4">
            <form className='text-center' onSubmit={(e) => {
                e.preventDefault();
                academicYear ? setActiveStep(1) : toast.error('Choose Academic Year')
            }}>
                {schoolName === 'donotshow' ? null : <DeptSelect title="Select your School" setState={setSchoolName} state={schoolName} selectId="registerDept" classes='rounded-lg mb-2' />}
                <div className='mt-4'>
                    <label className='mb-2' htmlFor="selectFor">Choose Academic Year</label>
                    <select id="selectFor" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} className="rounded-lg form-select" aria-label="Default select example" required={true} >
                        <option selected>Choose Year</option>
                        {
                            (customYears ? customYears : academicYearGenerator(2)).map((year) => {
                                return <option value={year}>{year}</option>
                            })
                        }
                    </select>
                </div>
                <div className="mt-4 flex item-center justify-center">
                    <SaveButton title='Proceed to Form' type="submit" />
                </div>
            </form>

        </div>
    )
}

export default IntroStep
