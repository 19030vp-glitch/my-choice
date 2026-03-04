import React from 'react'
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { ImageResizer } from '../ProfileCroper';

const UploadFile = ({ className = "col-md-6", id, label, setState, required = true, accept = "application/pdf,image/jpg,image/png,image/jpeg,", desable = false }) => {


  const HandleChange = async (e) => {

    const file = e.target.files[0];
    let value = null;
    if (file.size < 1048576) {
      onValueset(file, id);
    } else {
      if (
        file.type === "image/jpeg" ||
        file.type === "image/png"
      ) {
        value = await ImageResizer(file);
        if (value === null) {
          toast.error("Unfortunately, the sizereducer is unable to reduce the size of this file. May be it will break the file.");
        }
        console.log(value);
        onValueset(value, id);
      } else {
        toast.error("pdf must be less than 1MB");
        onValueset(null, id);
      }
    }
  };

  const onValueset = (value, id) => {
    setState((pri) => {
      return {
        ...pri,
        [id]: value,
      };
    });
  };

  return (
    <div className={`col-12 p-1 ${className}`}>
      <label for="formFile" className="form-label text-sm md:text-base">{label}</label>
      <input className="form-control" accept={accept} required={required} onChange={HandleChange} type="file" id={id} disabled={desable} />
    </div>
  )
}

export default UploadFile