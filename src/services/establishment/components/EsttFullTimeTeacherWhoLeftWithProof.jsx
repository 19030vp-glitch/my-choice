import React, { useEffect } from 'react'
import { useState } from 'react'
import uploadSupportingDocument, { fetchSupportingDocuments } from '../../krc/js/uploadSupportingDocument'
import UserLoading from '../../../pages/UserLoading'
import ArrowButton from '../../../components/ArrowButton'
import { useQuery } from 'react-query'
import { TableSupportingProof } from '../../exam/pages/ExamAQAR'
import OtherMainTable from '../../../components/OtherMainTable'


const EsttFullTimeTeacherWhoLeftWithProof = ({ academicYear }) => {

    const [file, setFile] = useState(null)
    const [proof, setProof] = useState(null)

    const filter = { academicYear, userType: 'estt', proofType: 'EsttFullTimeTeacherWhoLeftWithProof' }
    const { data, isLoading, refetch } = useQuery(`EsttFullTimeTeacherWhoLeftWithProof-${academicYear}`, () => fetchSupportingDocuments(filter), { refetchOnWindowFocus: false })

    const submitProofFunction = () => {
        const formData = new FormData()
        if (file) {
            formData.append('file', file)
        }
        formData.append('userType', 'estt')
        formData.append('proofType', 'EsttFullTimeTeacherWhoLeftWithProof')
        formData.append('academicYear', academicYear)

        uploadSupportingDocument(formData, refetch)

    }

    useEffect(() => {
        if (data?.data?.status === 'success') {
            setProof(data?.data?.data?.proof)
        }
    }, [data])

    return <div>
        {
            isLoading ? <UserLoading title="Fetching details..." />
                :
                <div>
                    <div className="bg-gray-50 rounded-md p-3 mt-3 border">
                        <TableSupportingProof proof={proof} setFile={setFile} file={file} title='Upload relevant proof for above information.' />
                        <div className='mt-2'>
                            <ArrowButton className="mt-2" title="Upload Proof" onClickFunction={submitProofFunction} />
                        </div>
                    </div>
                    <OtherMainTable model="EsttFullTimeTeacherWhoLeft" academicYear={[academicYear]} />

                </div>
        }

    </div>
}

export default EsttFullTimeTeacherWhoLeftWithProof

