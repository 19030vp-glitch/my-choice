import React from "react";
import TextField from '@mui/material/TextField';
import { Grid } from "@mui/material";


function DateRPick(props) {

    const HandleChange = (e) => {
        const id = props.id;
        const value = e.target.value;
        props.onch((pri) => {
            return {
              ...pri, [id]: value
            }
          })
        if (e.target.id === "rmwfd") {
            document.getElementById('rmwtd').setAttribute("min", e.target.value);
        }
        else if (e.target.id === "rmwtd") {
            document.getElementById('rmwfd').setAttribute("max", e.target.value);
        }
        else if (e.target.id === "tpofd") {
            document.getElementById('tpotd').setAttribute("min", e.target.value);
        }
        else if (e.target.id === "tpotd") {
            document.getElementById('tpofd').setAttribute("max", e.target.value);
        }
        else if (e.target.id === "From_Date") {
            document.getElementById('To_Date').setAttribute("min", e.target.value);
        }
        else if (e.target.id === "To_Date") {
            document.getElementById('From_Date').setAttribute("max", e.target.value);
        }
    }
    return (
        <Grid item p={2}><TextField
            id={props.id}
            required={props.required}
            label={props.label}
            type="date"
            size="large"
            variant="standard"
            value={props.value}
            onChange={HandleChange}
            InputProps={{ style: { fontSize: 15 } }}
            sx={{ width: 290 }}
            InputLabelProps={{
                shrink: true,
                style: { fontSize: 18 }
            }}
        /></Grid>)

}
export default DateRPick;