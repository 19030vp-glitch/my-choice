import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react'
import Note from './Note';
import Axios from 'axios';
import toast from 'react-hot-toast';
import ShowAAAFetchButton from './ShowAAAFetchButton';
import { api } from '../../../../../js/api';

const Wrapper = ({ classes, children, title, type = 'noFeedback', state, setState, submitFeedback, allYearAAAData, fetchPreviousYears = false, tableToFetch = null }) => {
    const [expanded, setExpanded] = React.useState(false);
    const [feedbackLoading, setFeedbackLoading] = useState(false)
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFeedbackLoading(true)
        console.log('Feedback :', state);
        const formData = new FormData();
        formData.append('alumni', state.alumni.input);
        formData.append('expert', state.expert.input);
        formData.append('teacher', state.teacher.input);
        formData.append('industry', state.industry.input);

        const url = `${api}/api/director/academic-audit/saveFeedbackReports`
        Axios.post(url, formData)
            .then((res) => {
                if (res.data.status === 'success') {
                    submitFeedback(res.data.data)
                    setFeedbackLoading(false)
                    toast.success('Feedback Uploaded successfully')
                }
                else {
                    console.log('Failed...')
                    setFeedbackLoading(false)
                    toast.error('Could not upload feedback, please try again...')
                }
            }).catch(function (err) {
                setFeedbackLoading(false)
                toast.error('Failed due to Internal Server error')
            })
    }

    return (
        <div className={`border-[#8c8cd9] rounded-lg p-1 border-2 my-3 text-sm lg:text-base ${classes} w-full`} >
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ boxShadow: 'none' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ color: 'blue', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {title}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {
                        type === "noFeedback" ?
                            <div className='flex flex-col gap-3'>
                                <div>
                                    {
                                        (fetchPreviousYears && allYearAAAData) && <ShowAAAFetchButton allYearAAAData={allYearAAAData} setState={setState} state={state} tableToFetch={tableToFetch} />
                                    }
                                </div>
                                <form>
                                    {children}
                                </form></div>
                            :
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                {children}
                                {
                                    (state.teacher.input || state.expert.input || state.industry.input || state.alumni.input)
                                    &&
                                    <div className='mt-5'>
                                        {
                                            feedbackLoading ? <button className="p-2 rounded-md text-white bg-blue-600 hover:bg-blue-500 text-base" type="button" disabled>
                                                <span className="spinner-border spinner-border-sm mr-3" role="status" aria-hidden="true"></span>
                                                Submitting Feedback...
                                            </button> : <button type="submit" className="p-2 rounded-md text-white bg-blue-600 hover:bg-blue-500 text-base"
                                            >Submit Feedback</button>
                                        }
                                        <Note title="You need to submit the feedback (if selected), before you proceed to submit the form."
                                            classes='mt-2' />
                                    </div>
                                }
                            </form>
                    }
                </AccordionDetails>
            </Accordion>


        </div>
    )
}

export default Wrapper

