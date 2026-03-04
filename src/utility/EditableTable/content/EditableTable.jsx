import * as React from 'react';
import Box from '@mui/material/Box';
import EditToolbar from '../components/EditToolbar';
import EditableInputFields from '../components/EditableInputFields';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowModes, DataGrid, GridActionsCellItem, GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { useEffect } from 'react';
import TableDeleteAction from '../components/TableDeleteAction';
import View from '../../../services/faculty/tables/View';
import EditableTableUploadButton from '../components/EditableTableUploadButton';
import { deleteRecord, upsertRecord } from '../js/EditableTableOperations';
import { useState } from 'react';
import generateFormData from '../js/generateFormData';

const slots = {
    toolbar: EditToolbar,
}


export default function EditableTable({ tableColumns, formDataArray, formDataAdditionalArray, sortedData, refetch, info, }) {

    const [rows, setRows] = useState([]);
    const [uploadRowCount, setUploadRowCount] = useState(0)

    useEffect(() => {
        setRows(sortedData)
    }, [sortedData])


    useEffect(() => {
        let count = 0;
        rows?.forEach((row) => {
            if (row?.isNew) {
                count += 1
            }
        })

        setUploadRowCount(() => count)

    }, [rows])


    // Function to adjust the textarea's height based on content
    const adjustTextareaHeight = (element) => {
        element.style.height = "auto";
        element.style.height = element.scrollHeight + "px";
    };

    // Effect to adjust textarea height when the component updates or textarea content changes
    useEffect(() => {
        const textareaElements = document.querySelectorAll(
            ".auto-expanding-textarea"
        );
        textareaElements.forEach((textarea) => {
            adjustTextareaHeight(textarea);
        });

        // Listen for input changes in the textarea and adjust height
        textareaElements.forEach((textarea) => {
            textarea.addEventListener("input", () => {
                adjustTextareaHeight(textarea);
            });
        });

        return () => {
            // Cleanup: remove event listeners when the component unmounts
            textareaElements.forEach((textarea) => {
                textarea.removeEventListener("input", () => {
                    adjustTextareaHeight(textarea);
                });
            });
        };
    }, [rows]);


    const [rowModesModel, setRowModesModel] = React.useState({});
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (_id) => () => {
        setRowModesModel({ ...rowModesModel, [_id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (_id) => () => {
        setRowModesModel({ ...rowModesModel, [_id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = async (_id) => {
        const itemToDelete = rows.find((item) => item._id === _id)
        await deleteRecord(itemToDelete, info.model, refetch)
        setRows(rows?.filter((row) => row._id !== _id));
    };

    const handleCancelClick = (_id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [_id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows?.find((row) => row._id === _id);
        if (editedRow.isNew) {
            setRows(rows?.filter((row) => row._id !== _id));
        }
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = tableColumns.map((column) => {
        return {
            field: column.field,
            headerName: column.headerName,
            // flex: column.flex || 1,
            editable: true,
            renderCell: (params) => {
                if (column.type === 'proof') {
                    return params.row.isNew ? (
                        <p className='text-center text-yellow-600'>Uploading...</p>
                    ) : params.row.proof ? (
                        <div className='my-2'>
                            <View proof={params.value} />
                        </div>
                    ) : (
                        <p className='text-center text-orange-500'>No Proof</p>
                    );
                } else {
                    return <span>{params.value}</span>;
                }
            },
            renderEditCell: column.renderEditCell
                ? column.renderEditCell
                : (params) => {
                    if (column.type === 'proof') {
                        return <EditableTableUploadButton {...params} />;
                    } else {
                        // Handle other types here
                        return <EditableInputFields {...params} type={column.type} options={column.options} inputType={column.inputType} />;
                    }
                },
        };
    });

    // Append the actions column
    columns.push({
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        cellClassName: 'actions',
        getActions: (params) => {
            const _id = params.row._id;
            const isInEditMode = rowModesModel[_id]?.mode === GridRowModes.Edit;

            if (isInEditMode) {
                return [
                    <GridActionsCellItem
                        icon={<SaveIcon />}
                        label="Save"
                        sx={{
                            color: 'primary.main',
                        }}
                        onClick={handleSaveClick(_id)}
                    />,
                    <GridActionsCellItem
                        icon={<CancelIcon />}
                        label="Cancel"
                        className="textPrimary"
                        onClick={handleCancelClick(_id)}
                        color="inherit"
                    />,
                ];
            }

            return [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    className="textPrimary"
                    onClick={handleEditClick(_id)}
                    color="inherit"
                />,
                <TableDeleteAction _id={_id} handleDeleteClick={handleDeleteClick} />,
            ];
        },
    });

    // Now 'columns' contains the dynamic DataGrid column configuration



    return (
        <div>
            <div style={{ height: 350, width: '100%' }}>
                <DataGrid
                    sx={{ border: 'none' }}
                    autoHeight
                    showCellVerticalBorder={true}
                    showColumnVerticalBorder={true}
                    rows={rows}
                    columns={columns.map((col) => ({
                        ...col,
                        headerName: col.headerName, // Set headerName to the full name of the column
                        filterable: false, // Disable filtering
                        headerClassName: 'sticky-header',
                    }))}
                    getRowHeight={() => 'auto'}
                    editMode="row"
                    getRowId={(row) => row._id}
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={async (updatedRow, originalRow) => {
                        try {


                            const formData = generateFormData(updatedRow, formDataArray, formDataAdditionalArray)

                            const status = await upsertRecord(formData, refetch, uploadRowCount, info.model)

                            if (status === 200) {
                                console.log('Record updated successfully in the database.');
                                const updatedRowCopy = { ...updatedRow };
                                updatedRowCopy.isNew = false;
                                const updatedRows = rows.map((row) => (row._id === updatedRow._id ? updatedRowCopy : row));
                                setRows(updatedRows);
                                return updatedRow;
                            } else {
                                console.error('Failed to update the database record.');
                            }
                        } catch (error) {
                            console.error('An error occurred while updating the record:', error);
                        }
                        return originalRow;
                    }}
                    onProcessRowUpdateError={(params, error) => {
                        console.error('Row update error:', error);
                        return false;
                    }}
                    slots={slots}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                />
            </div>
        </div>
    );
}



const sx = {
    '& .actions': {
        color: 'text.secondary',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
        fontWeight: 'bold',
    },
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: '#1d4ed8',
        color: 'white'
    },
}





