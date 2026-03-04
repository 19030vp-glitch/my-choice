import React, { useEffect, useState } from 'react';
import sortYear from '../js/sortYear';

const MultipleYearSelect = ({ space = 'col-md-2', state, setState, title = "Choose Year", numberOfYearsToDisplay = 30 }) => {

    // generate years
    const now = new Date().getUTCFullYear();
    const arrayOfYears = Array(numberOfYearsToDisplay).fill('').map((_, idx) => {
        const startYear = now - idx;
        const endYear = startYear + 1;
        return `${startYear}-${endYear.toString().slice(2, 4)}`;
    });

    const handleYearClick = (year) => {
        if (state.includes(year)) {
            setState(sortYear(state.filter(selectedYear => selectedYear !== year)));
        } else {
            setState(sortYear([...state, year]));
        }
    };


    return (
        <div className={space}>
            <label htmlFor="validationCustom04" className="form-label">{title}</label>
            <div className="multiple-year-select border border-secondary-subtle rounded-md h-[200px] overflow-auto">
                {arrayOfYears.map((year, index) => (
                    <div key={index}
                        className={`p-1 m-1 cursor-pointer rounded-md  ${state.includes(year) ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
                        onClick={() => handleYearClick(year)}>
                        {year} {state.includes(year) && <span className='ml-5'>&#10003;</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MultipleYearSelect;
