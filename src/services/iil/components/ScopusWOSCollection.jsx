import React, { useEffect, useState } from 'react'
import UserLoading from '../../../pages/UserLoading'
import ArrowButton from '../../../components/ArrowButton'
import uploadSupportingDocument, { fetchSupportingDocuments } from '../../krc/js/uploadSupportingDocument'
import { useQuery } from 'react-query'
import { TableSupportingProof } from '../../exam/pages/ExamAQAR'

const ScopusWOSCollection = ({ type, academicYear, isScopus = true }) => {
    const [file, setFile] = useState(null)
    const [proof, setProof] = useState(null)
    const [info, setinfo] = useState(null)

    const proofType = isScopus ? `${type}-scopus` : `${type}-webOfScience`

    const filter = { academicYear, userType: 'iil', proofType }
    const { data, isLoading, refetch } = useQuery(`${type}-${academicYear}-${proofType}`, () => fetchSupportingDocuments(filter), { refetchOnWindowFocus: false })

    const submitProofFunction = () => {
        const formData = new FormData()
        formData.append('info', info)
        if (file) {
            formData.append('file', file)
        }
        formData.append('userType', 'iil')
        formData.append('proofType', proofType)
        formData.append('academicYear', academicYear)

        uploadSupportingDocument(formData, refetch)

    }

    useEffect(() => {
        if (data?.data?.status === 'success') {
            setinfo(data?.data?.data?.info)
            setProof(data?.data?.data?.proof)
        }
    }, [data])

    return <div className="grid grid-cols-2 gap-4 mt-3">
        {
            isLoading ? <UserLoading title="Fetching details..." />
                :
                <>
                    <div className="col-md-10">
                        <label htmlFor="info" className="form-label">{isScopus ? "Scopus" : "Web of Science"}</label>
                        <input type="text" value={info} onChange={(e) => setinfo(() => e.target.value)} className="form-control" id="usage" placeholder="Enter here" />
                    </div>
                    {
                        info && <TableSupportingProof proof={proof} setFile={setFile} file={file} title={`Upload relevant proof based on the above ${isScopus ? "Scopus" : "Web of Science"} Information`} />
                    }
                    {info && <div className='my-2'>
                        <ArrowButton note="Please submit in order to save the changes you have done." title="Save Details" onClickFunction={submitProofFunction} />
                    </div>}
                </>
        }

    </div>
}

export default ScopusWOSCollection
