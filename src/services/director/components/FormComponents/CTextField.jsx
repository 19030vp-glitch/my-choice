import React from "react";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";

function CTextField(props) {
  const HandleChange = (e) => {
    const id = props.id;
    if (props.type === "number") {
      const value = parseInt(e.target.value);
      props.onch((pri) => {
        return {
          ...pri,
          [id]: value,
        };
      });
    } else {
      const value = e.target.value;
      props.onch((pri) => {
        return {
          ...pri,
          [id]: value,
        };
      });
    }
  };

  return (
    <Grid item p={2}>
      {/* <div className="col-lg-4 col-md-6 col-sm-12">
        <label>{props.label}</label>
        <input type={props.type} 
        id={props.id}
        className="form-control"
        required={props.required}
        disabled={props.dis}
        onChange={HandleChange} />
      </div> */}
      
      <TextField
            id={props.id}
            label={props.label}
            type={props.type}
            disabled={props.dis}
            required={props.required}
            value={props.value}
            size="large"
            variant="standard"
            onChange={HandleChange}
            InputProps={{ style: { fontSize: 15 } }}
            sx={{ width: 290 }}
            InputLabelProps={{
                shrink: true,
                style: { fontSize: 18 }
            }}
        />
    </Grid>
  );
}
export default CTextField;
