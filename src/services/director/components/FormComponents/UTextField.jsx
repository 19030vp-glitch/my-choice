import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { Grid, Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormHelperText from '@mui/material/FormHelperText';
import { ImageResizer } from "../../../../components/ProfileCroper";
import { toast } from "react-hot-toast";


function UTextField(props) {
   const [fileName, setFileName] = useState("");
   const HandleChange = async (e) => {

  const file = e.target.files[0];
  let value = "";
  if (file.size < 1048576) {
    value = file;
    setFileName(file.name);
    onValueset(value, props.id);
  } else {
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png"
    ) {
      value = await ImageResizer(file);
      console.log(value);
      setFileName(value.name);
      onValueset(value, props.id);
    } else {
      toast.error("pdf must be less than 1MB");
      value = "";
      setFileName("");
      onValueset(value, props.id);
    }
  }
};

const onValueset = (value, id) => {
   props.onch((pri) => {
     return {
       ...pri,
       [id]: value,
     };
   });
};

   return (
      <>
         <Grid item p={2} style={{ display:"flex", flexDirection:"column"}}>
            <Button
               variant="contained"
               component="label"
               disabled={props.dis}
               startIcon={<CloudUploadIcon />}
               sx={{ width: 290, fontSize: 14, backgroundColor: "#5591cc" }}>
               {props.label}
               <TextField
                  hidden
                  id={props.id}
                  label={props.label}
                  type="file"
                  inputProps={{accept:"application/pdf,image/jpg,image/png,image/jpeg,"}}
                  required={props.required}
                  size="large"
                  variant="standard"
                  onChange={HandleChange} />
            </Button><p style={{display:"flex",justifyContent:"center"}}>{fileName}</p>
            <FormHelperText sx={{color:"#375a39"}}>{ !props.required ? "If you want to change old file select a file else leave" : "" }</FormHelperText>
         </Grid>
      </>
   )
}
export default UTextField;
