import { GridRowModes, GridToolbarContainer } from "@mui/x-data-grid";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { randomId } from "@mui/x-data-grid-generator";

const EditToolbar = (props) => {
    const { setRows, setRowModesModel } = props;


    const handleClick = () => {
        const _id = randomId();
        const newRow = { _id, isNew: true };
        setRows((oldRows) => [newRow, ...oldRows]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [_id]: { mode: GridRowModes.Edit, fieldToFocus: 'lectureTitle' },
        }));
    };


    return (
        <GridToolbarContainer sx={{ marginTop: '10px', marginBottom: '10px' }}>

            <button onClick={handleClick} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                <AddRoundedIcon />
                Add Record
            </button>
        </GridToolbarContainer>
    );
}

export default EditToolbar