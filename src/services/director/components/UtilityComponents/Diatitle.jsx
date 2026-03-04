import { DialogTitle, IconButton } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import React from 'react'

export default function Diatitle({ title, clear, setItemToEdit, EditClear, Edit, init, setval}) {
    
    const HandleChange = (e) => {
        setval(init)
        clear(false)
        EditClear(false)
        setItemToEdit(null)
    }

    return (
        <DialogTitle style={{ display: "flex", background: "#e5eaf0" }}>
            <span style={{ width: '50%', display: 'flex', justifyContent: "flex-start" }}>{Edit ? `Edit ${title}` : title} </span>
            <span style={{ width: '50%', display: 'flex', justifyContent: "flex-end" }}>
                <IconButton color="error" onClick={HandleChange}>
                    <ClearIcon />
                </IconButton></span>
        </DialogTitle>
    )
}
