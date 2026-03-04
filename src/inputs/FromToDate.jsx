import React from 'react';
import { useEffect } from 'react';
import Year from './Year';

const FromToDate = ({ editItem, editModal, activeTitle, fromDate, setFromDate, setEndDate, endDate, active, setActive, space = "col-md-3", isYear = false, dateTitles = false }) => {


    const handleFromDateChange = (event) => {
        setFromDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    useEffect(() => {

        if (editModal) {
            if (active) {
                setEndDate('Till Date')
            } else {
                if (editItem?.durationYears?.[1] === 'Till Date') {
                    setEndDate(null)
                } else {
                    if (editItem?.durationYears?.[1]) {
                        setEndDate(editItem?.durationYears?.[1])
                    } else {
                        setEndDate(() => null)
                    }
                }
            }
        } else {
            if (active) {
                setEndDate('Till Date')
            } else {
                setEndDate(null)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, editModal, editItem])


    return (
        <>

            <div className='col-md-5 border rounded-md mt-5'>
                <div className="form-check form-switch py-[0.20rem] mt-[0.28rem]">
                    <input className="form-check-input" checked={active} onChange={(e) => { setActive(e.target.checked) }} type="checkbox" role="switch" id={activeTitle} />
                    <label className="form-check-label" htmlFor={activeTitle}>{activeTitle}</label>
                </div>
            </div>

            <>
                {
                    !isYear ? <div className={`form-group ${space}`}>
                        <label htmlFor="fromDate" className='mb-2'>From Date</label>
                        <input
                            required
                            type="date"
                            className="form-control"
                            id="fromDate"
                            value={fromDate}
                            onChange={handleFromDateChange}
                        />
                    </div> : <Year title={dateTitles ? dateTitles.startTitle : "From Year"} state={fromDate} setState={setFromDate} />
                }

                {
                    active ?

                        <>
                            <div className={`form-group col-md-2`}>
                                <label htmlFor="endDate" className='mb-2'>To</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    id="endDate"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                />
                            </div>
                        </>
                        :

                        <>
                            {!isYear ? <div className={`form-group ${space}`}>
                                <label htmlFor="endDate" className='mb-2'>To</label>
                                <input
                                    required
                                    type="date"
                                    className="form-control"
                                    id="endDate"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                />
                            </div> : <Year title={dateTitles ? dateTitles.endTitle : "To Year"} state={endDate} setState={setEndDate} />}
                        </>

                }


            </>
        </>


    );
};

export default FromToDate;
