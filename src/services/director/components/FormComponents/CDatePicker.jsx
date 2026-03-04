import React from "react";
import { TextField, MenuItem, Grid } from '@mui/material';
import YearPicker from "./YearPicker";
import FormHelperText from '@mui/material/FormHelperText';

function CDatePicker(props) {
    const handleChange = (e) => {
        const value = e.target.value
        const id  = props.id
        props.onch((pri) => {
          return {
            ...pri, [id]: value
          }
        })
      };
      return (<Grid item p={2} > <TextField
        select
        id={props.id}
        value={props.value}
        required={props.required}
        onChange={handleChange}
        label={props.label}
        type="text"
        size="large"
        variant="standard"
        sx={{ width: 290 }}
        InputProps={{ style: { fontSize: 15 } , readOnly: props.disabled }}
        InputLabelProps={{
          shrink: true,
          style: { fontSize: 19 }
        }}
      >
        {YearPicker().map((e, index) => (
          <MenuItem sx={{ fontSize: 13 }} key={index} value={e.value}>{e.value}</MenuItem>
        ))}
      </TextField>
      <FormHelperText sx={{color:"red"}}>{ props.disabled ? props.error : "" }</FormHelperText>
      </Grid>
      )
}
export default CDatePicker;