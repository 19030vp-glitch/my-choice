import React from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import FormHelperText from '@mui/material/FormHelperText';

function SCTextField(props) {

  const handleChange = (e) => {
    const  value1 = e.target.value
    const id = props.id
    props.onch((pri) => {
      return {
        ...pri, [id]: value1
      }
    })
  };
  return (
    <Grid item p={2}>
      <TextField
        select
        value={props.value}
        id={props.id}
        required={props.required}
        onChange={handleChange}
        label={props.label}
        type="text"
        size="large"
        variant="standard"
        InputProps={{ style: { fontSize: 15 } , readOnly: props.disabled }}
        sx={{ width: 290 }}
        InputLabelProps={{
          shrink: true,
          style: { fontSize: 19 }
        }}
      >
        {props.select.map((e, index) => (
          <MenuItem sx={{ fontSize: 13 }} key={index} value={e}>{e}</MenuItem>
        ))}
      </TextField>
      <FormHelperText sx={{color:"red"}}>{ props.disabled ? props.error : "" }</FormHelperText>
    </Grid>
  )
}
export default SCTextField;