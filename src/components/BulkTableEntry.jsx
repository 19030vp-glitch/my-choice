import React, { useEffect, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { TextareaAutosize } from '@mui/material';

function BulkTableEntry({ tableHead, typeObject, tableData, setTableData, model }) {

  const handleDeleteRow = (index) => {
    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1);
    setTableData(updatedTableData);
  };

  const handleInputChange = (event, index, columnName) => {
    const newValue = event.target.value;

    const updatedTableData = [...tableData];
    updatedTableData[index][columnName] = newValue;
    setTableData(updatedTableData);
  };



  return (
    <div>
      <div className='table-responsive mt-4' style={{ maxHeight: "71vh" }}>
        <table className="table table-bordered" >
          <thead className="sticky-top bg-blue-600 text-[#fff]" >
            {
              model === "ReservedSeats" ?
                <tr>
                  <th colSpan={2}></th>
                  <th colSpan={6}>Number of seats earmarked for reserved category as per GOI or State Government rule</th>
                  <th colSpan={6}>Number of students admitted from the reserved category</th>
                  <th></th>
                </tr> : null
            }
            <tr>
              {Object.keys(typeObject).map((columnName) => (
                <th key={columnName}>{tableHead[columnName]}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='bg-blue-200'>
            {tableData.map((rowData, rowIndex) => (
              <tr key={`row${rowIndex}`} >
                {Object.keys(typeObject).map((columnName, cellIndex) => (
                  <td key={`${columnName}${cellIndex}`}>
                    {Array.isArray(typeObject[columnName]) ? (
                      <select className="p-1 border-2 border-transparent w-full rounded-md focus:border-blue-500 outline-none auto-expanding-textarea" value={rowData[columnName]}
                        onChange={(e) => handleInputChange(e, rowIndex, columnName)} required >
                        <option selected disabled value="">Choose</option>
                        {typeObject[columnName].map((option, index) => (
                          <option key={`option${index}`} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (

                      typeObject[columnName] === 'number' || typeObject[columnName] === 'date' ?

                        (<input type={typeObject[columnName]}
                          className="p-1 border-2 border-transparent w-full rounded-md focus:border-blue-500 outline-none auto-expanding-textarea"
                          value={rowData[columnName]}
                          onChange={(e) => handleInputChange(e, rowIndex, columnName)}
                        />)
                        :
                        (<TextareaAutosize
                          className="p-1 border-2 border-transparent w-full rounded-md focus:border-blue-500 outline-none auto-expanding-textarea"
                          value={rowData[columnName]}
                          style={{ resize: 'none' }}
                          onChange={(e) => handleInputChange(e, rowIndex, columnName)}
                        />)
                    )}

                  </td>
                ))}
                <td>
                  <button onClick={() => handleDeleteRow(rowIndex)}><DeleteOutlineIcon color='error' /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BulkTableEntry;

