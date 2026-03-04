import React from "react";
import { TextareaAutosize } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid";
import { academicYearGenerator } from "../../../inputs/Year";
import SchoolsProgram from "../../../components/SchoolsProgram";

const EditableInputFields = ({ id, value, field, hasFocus, type = "textarea", options, inputType = "text" }) => {
    const apiRef = useGridApiContext();
    const ref = React.useRef();

    React.useLayoutEffect(() => {
        if (hasFocus) {
            ref.current.focus();
        }
    }, [hasFocus]);

    const handleValueChange = (event) => {
        const newValue = event.target.value; // The new value entered by the user
        apiRef.current.setEditCellValue({ id, field, value: newValue });
    };

    return (
        <>
            {Array.isArray(type) ? (
                <select
                    ref={ref}
                    className="form-select mx-2 text-sm w-full"
                    id="validationCustom05"
                    required
                    value={value}
                    onChange={handleValueChange}
                >
                    <option selected disabled value="">
                        Choose
                    </option>
                    {type.map((option, i) => {
                        return (
                            <option key={i} value={option}>
                                {option}
                            </option>
                        );
                    })}
                </select>
            ) : type === "AY" ? (
                <select
                    ref={ref}
                    className="form-select mx-2 text-sm w-full"
                    id="validationCustom05"
                    required
                    value={value}
                    onChange={handleValueChange}
                >
                    <option selected disabled value="">
                        Choose Year
                    </option>
                    {academicYearGenerator(30, null, true).map((option, i) => {
                        return (
                            <option key={i} value={option}>
                                {option}
                            </option>
                        );
                    })}
                </select>
            ) : type === "schools" ? (
                <select
                    ref={ref}
                    className="form-select mx-2 text-sm w-full"
                    id="validationCustom05"
                    required
                    value={value}
                    onChange={handleValueChange}
                >
                    <option selected disabled value="">
                        Choose School
                    </option>
                    {Object.keys(SchoolsProgram).map((option, i) => {
                        return (
                            <option key={i} value={option}>
                                {option}
                            </option>
                        );
                    })}
                </select>
            ) : (

                (inputType === 'date' || inputType === 'number') ?

                    (<>
                        <input type={inputType} className="form-control" id="validationCustom02" dataDateFormat="mm-dd-yy" required ref={ref} value={value} onChange={handleValueChange} />
                    </>) :

                    <TextareaAutosize
                        ref={ref}
                        itemType={inputType}
                        type={inputType}
                        value={value}
                        onChange={handleValueChange}
                        className="p-2 border-2 border-transparent w-full rounded-md focus:border-blue-500 outline-none auto-expanding-textarea"
                        style={{ resize: "none" }}
                    />
            )}
        </>
    );
};

export default EditableInputFields;
