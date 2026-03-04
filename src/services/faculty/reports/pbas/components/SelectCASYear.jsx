import React from 'react'
import Year from '../../../../../inputs/Year';

const SelectCASYear = ({ casYearState, setCasYearState }) => {

    return (
        <div className='w-full'>



            {/* // Choose years */}
            <div className='mx-auto flex items-center justify-center'>
                <Year state={casYearState} setState={setCasYearState} space='col-md-3'
                    title="Choose Academic Year" numberOfYearsToDisplay={13} />
            </div>


        </div>
    )
}

export default SelectCASYear