import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import SoftAndEquipmentTable from './SoftAndEquipmentTable';
import {staticData, SoftSubTitle} from '../js/saeStaticData'

const SoftIterator = ( isEditable=true ) => {
    const [expandedAccordion, setExpandedAccordion] = useState();

    const handleChangeAccordion = (index) => {
        setExpandedAccordion(index === expandedAccordion ? null : index);
    };

    const type = "Soft"
  return (
            Object.keys(staticData.Soft).map((e,i)=><div className={`border-[#8c8cd9] rounded-lg p-1 border-2 my-3 text-sm lg:text-base w-full`}>
                <Accordion sx={{ boxShadow: 'none' }} TransitionProps={{ unmountOnExit: true }} expanded={expandedAccordion === i} onChange={() => handleChangeAccordion(i)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}
                        aria-controls={`main-content-${e}-${i}`}
                        id={`main-accordion-${e}-${i}`}
                    >
                        <Typography sx={{ color: 'blue', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>{`${i+1}. ${SoftSubTitle[e]}`}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <SoftAndEquipmentTable isEditable={false} type={type} subType={e} />
                    </AccordionDetails>
                </Accordion>
            </div>)
  )
}

export default SoftIterator
