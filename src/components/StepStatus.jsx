import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';



export default function StepStatus({ activeStep, steps }) {




    return (
        <Box sx={{ width: '100%' }} >
            <Stepper activeStep={activeStep} alternativeLabel >
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};

                    return (
                        <Step key={label} {...stepProps} >
                            <StepLabel {...labelProps} sx={{ fontSize: '8px' }}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

        </Box>
    );
}
