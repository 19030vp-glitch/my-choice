import { Grid, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ClearIcon from '@mui/icons-material/Clear';

function SubmitButton(props) {
    const clearFilds =(e)=>{
        props.setval(props.init)
    }
    return (
        <Grid container my={2} >
            <Grid item p={3}>
                <LoadingButton color="success" 
                startIcon={<SaveAltIcon />}
                sx={{ width: 190, fontSize: 13 ,backgroundColor: "#759b77"}} 
                size="large" 
                loading={props.Loading}
                loadingPosition="start"
                variant="contained" 
                type="submit" > 
                    {props.label} 
                </LoadingButton >
            </Grid>
            <Grid item p={3}>
                <Button color='error'
                startIcon={<ClearIcon />}
                onClick={clearFilds}
                sx={{ width: 190, fontSize: 13 }} 
                size="large" 
                variant="outlined" 
                type="button" > 
                    Clear
                </Button>
            </Grid>
        </Grid>
    )
}
export default SubmitButton;