import React from 'react'
import { useGridApiContext } from "@mui/x-data-grid";

const EditableTableUploadButton = (props) => {


    const { id, value, field, hasFocus } = props;
    const apiRef = useGridApiContext();
    const ref = React.useRef();

    const handleValueChange = (event) => {
        const newValue = event.target.files[0]; // The new value entered by the user
        apiRef.current.setEditCellValue({ id, field, value: newValue });
    };

    return <div className="flex items-center justify-center w-full">
        <label htmlFor={id} className="flex flex-col items-center justify-center w-full py-2 border-2 border-blue-700 border-dashed rounded-lg cursor-pointer text-blue-700 bg-blue-50 m-2 p-1 hover:bg-blue-100 ">
            {
                value && <p className="text-xs text-green-700">Selected</p>
            }
            <p className="text-xs text-center">Choose File</p>
            <input ref={ref} onChange={handleValueChange} id={id} name="file" type="file" className="hidden" />
        </label>
    </div>

}

export default EditableTableUploadButton
