import React, { useEffect, useState } from 'react'
import title from '../../../js/title';
import siteLinks from '../../../components/siteLinks';
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion';
import Footer from '../../../components/Footer';
import AQARStepper from '../../dsd/components/AQARStepper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material'
import otherAQARTablesObject from '../js/OtherAQARTablesObject';



const OtherAQAR = () => {
    title(siteLinks.otherAQAR.title)
    const bredLinks = [siteLinks.welcome, siteLinks.otherAQAR]
    const user = { department: "AQAR" }
    const [aqarYearState, setAqarYearState] = useState(null)

    const [expandedAccordion, setExpandedAccordion] = useState();

    const handleChangeAccordion = (index) => {
        setExpandedAccordion(index === expandedAccordion ? null : index);
    };



    const AQARTables = otherAQARTablesObject(aqarYearState)



    return (
        <div>
            <div className="min-h-screen">
                <AQARStepper showSteps={false} setAqarYearState={setAqarYearState} aqarYearState={aqarYearState} bredLinks={bredLinks} submitModel="OtherAQAR" user={user} tableTitles={[]} navigateToAfterSubmission={'/'} >

                    {
                        Object.keys(AQARTables).map((mainPoint, mainIndex) => {
                            return <div className={`border-[#8c8cd9] rounded-lg p-1 border-2 my-3 text-sm lg:text-base w-full`}>
                                <Accordion sx={{ boxShadow: 'none' }} TransitionProps={{ unmountOnExit: true }} expanded={expandedAccordion === mainIndex} onChange={() => handleChangeAccordion(mainIndex)}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`main-content-${mainPoint}-${mainIndex}`}
                                        id={`main-accordion-${mainPoint}-${mainIndex}`}
                                    >
                                        <Typography sx={{ color: 'blue', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>{mainIndex + 1}. {AQARTables[mainPoint].title}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TableAccordion AQARTables={AQARTables[mainPoint]?.components} showIndex={false} />
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        })
                    }

                </AQARStepper>

            </div>
            <Footer />
        </div>
    )
}

export default OtherAQAR



