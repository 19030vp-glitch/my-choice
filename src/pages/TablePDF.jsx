import React from 'react'
import AdminMasterTable from '../services/admin/components/AdminMasterTable'
import { useParams } from 'react-router-dom'


const TablePDF = () => {

    const { title: stringTitle, paramsObject: stringFilter, proof, proof2, serviceName } = useParams()

    function convertDashToSlash(inputString) {
        return inputString.replace(/-/g, '/');
    }

    const title = convertDashToSlash(stringTitle)
    const filter = JSON.parse(stringFilter)


    return (
        <div>
            <div className="bg-blue-300 p-3 mt-3 text-blue-900 rounded-full w-full flex items-center justify-between">
                <div className='flex items-center justify-start gap-2 text-lg'>
                    <p>{title}</p>
                </div>
            </div>
            <AdminMasterTable proof2={(proof2 === 'null') || (proof2 === 'undefined') ? null : proof2} module={filter.module} forPDF={true} serviceName={serviceName} customParams={filter} heading={title} model={filter.model} proof={(proof === 'null') || (proof === 'undefined') ? null : proof} />
        </div>
    )
}

export default TablePDF
