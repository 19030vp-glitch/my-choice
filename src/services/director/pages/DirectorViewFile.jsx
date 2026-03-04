import React from 'react'
import { useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import title from '../../../js/title';
import { api } from '../../../js/api';

export default function DirectorViewFile() {
  const { fileName } = useParams()
  const navigate = useNavigate()
  title("File Viewer")

  return (
    <div>
      <hr />
      <div className='flex items-center justify-start gap-2 text-xl my-2 cursor-pointer' onClick={() => { navigate(-1) }}>
        <ArrowBackIcon /> Back
      </div>
      <hr />
      <br />

      <br />

      {fileName.endsWith('.pdf') ?
        <iframe title='file1' src={`${api}/showDirectorFile/${fileName}`} className="rounded mx-auto w-full h-1/2 sm:h-screen sm:w-5/6 " alt="file" />
        :

        <img
          src={`${api}/showDirectorFile/${fileName}`} className="rounded-xl mx-auto w-full h-1/2 sm:h-auto sm:w-5/6 border-4 border-gray-500 img-responsive object-contain" alt="" />
      }

      <br /><br />
    </div>
  )
}
