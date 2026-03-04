import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import PageNotFound from './PageNotFound'
import { api } from '../js/api'

const DeveloperServices = () => {
    const [validated, setValidated] = useState(false)
    const validation = (e) => {
        if (e.target.value === 'SRTMUN') {
            setValidated(true)
        }
        else {
            setValidated(false)
        }
    }

    return (
        <div>
            {
                validated === false ? <PageNotFound /> :
                    <div style={{ margin: 20, display: "flex", justifyContent: "space-between" }}>
                        <button className='btn btn-outline-warning' onClick={() => { axios.post(`${api}/developer/pdfsclear`) }}>Clear Pdfs</button>
                        <button className='btn btn-outline-primary' onClick={() => { axios.post(`${api}/developer/excelsclear`) }}>Clear Excels</button>
                        <button className='btn btn-success' onClick={() => { axios.post(`${api}/developer/mongodump`) }}>Mongo Dump</button>
                        <button className='btn btn-primary' onClick={() => { axios.post(`${api}/developer/networkConnect`) }} >Connect Network</button>
                    </div>
            }
            <input type="password" className='form-control' id='srtmun' onChange={(e) => { validation(e) }} />
        </div>
    )
}

export default DeveloperServices