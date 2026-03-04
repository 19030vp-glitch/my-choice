import React, { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Popconfirm } from 'antd';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { TableCell, IconButton } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import { api } from '../../js/api';

export default function TblEditDelete({ val, module, customDelete, fatchdata, setItemToEdit, editIcon, deleteDisabled, EditDisabled, CheckBox, checkedData, setCheckedData, loc, proofFolder = {} }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteRecord = async (id, model) => {
    if (customDelete) {
      customDelete(id, fatchdata);
    } else {
      setIsDeleting(true);
      try {
        const response = await axios.post(`${api}/${module}/deleteRecord`, { ...proofFolder, model, id });
        if (!response) {
          toast.error("Something wrong!");
        } else {
          toast.success(response.data);
          fatchdata();
          setIsDeleting(false);
        }
      } catch (err) {
        console.error(err);
        setIsDeleting(false);
      }
    }
  };

  const checkHandler = (e) => {
    if (e.target.checked === true) {
      setCheckedData((prev) => [...prev, e.target.value]);
    } else if (e.target.checked === false) {
      setCheckedData(checkedData.filter((value) => value !== e.target.value));
    }
  };

  return (
    <TableCell sx={{ fontSize: "12px" }}>
      {CheckBox === true ? <input className='form-check-input' style={{ margin: '5px' }} type="checkbox" checked={checkedData.includes(val) ? true : false} onChange={(e) => { checkHandler(e) }} value={val} /> : ""}
      {EditDisabled === true ? "" : (
        <IconButton onClick={() => setItemToEdit(val)} sx={{ color: "primary" }}>
          {editIcon === "Active" ? <CheckCircleOutlineIcon sx={{ color: "#33a733" }} /> : editIcon === "InActive" ? <CancelOutlinedIcon sx={{ color: "#c75d5d" }} /> : <EditIcon />}
        </IconButton>
      )}
      {deleteDisabled === true ? "" : (
        <Popconfirm placement="topRight" title={"Do you want to delete this record?"} onConfirm={() => deleteRecord(val, loc)} okText="Yes, Delete" cancelText="Cancel" okButtonProps={{ "type": "default" }}>
          <IconButton>{isDeleting ? <DeleteOutlineIcon sx={{ color: "gray" }} /> : <DeleteOutlineIcon sx={{ color: "#c75d5d" }} />}</IconButton>
        </Popconfirm>
      )}
    </TableCell>
  );
}

