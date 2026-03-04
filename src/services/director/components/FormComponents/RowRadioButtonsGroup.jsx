import React from 'react';
import { Radio, FormControlLabel, RadioGroup, FormControl, FormLabel, Grid } from '@mui/material';

function RowRadioButtonsGroup(props) {
    const handleChange = (e) => {
        const value = e.target.value
        const id  = props.id
        props.onch((pri) => {
          return {
            ...pri, [id]: value
          }
        })
    };

    return (
        <Grid item p={2}>
            <FormControl>
                <FormLabel style={{ fontSize: 15 }} id={props.id} >{props.label}</FormLabel>
                <RadioGroup

                    row
                    sx={{ fontSize: '25px' }}
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel onChange={handleChange} value="female" control={<Radio />} label={<span style={{ fontSize: 15 }}>Female</span>} sx={{ px: 1 }} />
                    <FormControlLabel onChange={handleChange} value="male" control={<Radio />} label={<span style={{ fontSize: 15 }}>Male</span>} sx={{ px: 1 }} />
                    <FormControlLabel onChange={handleChange} value="other" control={<Radio />} label={<span style={{ fontSize: 15 }}>Other</span>} sx={{ px: 1 }} />
                </RadioGroup>
            </FormControl>
        </Grid>
    );
}
export default RowRadioButtonsGroup;