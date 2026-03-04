import React from 'react'
import AdminNumaricalData from './AdminNumaricalData'
import title from '../../../js/title'

const PDFNumericalTable = ({ isDirector = false }) => {
    title("School Numerical Dashboard")
    return (
        <div>
            <AdminNumaricalData isDirector={isDirector} School="All Schools" />
        </div>
    )
}

export default PDFNumericalTable
