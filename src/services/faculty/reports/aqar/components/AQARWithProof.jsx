import React from 'react'
import { TableSupportingProof } from '../../../../exam/pages/ExamAQAR'
import ArrowButton from '../../../../../components/ArrowButton'
import { useState } from 'react'
import { useQuery } from 'react-query'
import uploadSupportingDocument, { fetchSupportingDocuments } from '../../../../krc/js/uploadSupportingDocument'
import { useEffect } from 'react'
import FileViewer from '../../../../../components/FileViewer'
import serverLinks from '../../../../../js/serverLinks'
import toast from 'react-hot-toast'

const AQARWithProof = ({ supportingProofMetaData, children, isAdmin }) => {


    const { academicYear, proofType, userType, school } = supportingProofMetaData

    const [proof, setProof] = useState(null)
    const [proofs, setProofs] = useState(null)

    const filter = isAdmin ? { academicYear: academicYear, userType, proofType } : { academicYear: academicYear, userType, proofType, school: school || null }

    const { data, isLoading, refetch } = useQuery(`Proof-${proofType}-${academicYear}-${school ? school : 'admin'}`, () => fetchSupportingDocuments(filter, isAdmin), { refetchOnWindowFocus: false })


    const submitProofFunction = (changedFile) => {
        const formData = new FormData()
        if (changedFile) {
            formData.append('file', changedFile)
        }
        formData.append('userType', userType)
        formData.append('proofType', proofType)
        formData.append('school', school)
        formData.append('academicYear', academicYear)

        uploadSupportingDocument(formData, refetch)

    }

    useEffect(() => {
        if (data?.data?.status === 'success') {
            console.log(data?.data?.data)
            if (isAdmin) {
                setProofs(data?.data?.data)
            } else {
                setProof(data?.data?.data?.proof)
            }
        }
    }, [data])


    return <div>
        <div className="bg-gray-50 rounded-md p-3 mt-3 border">
            {
                isAdmin ? <div>

                    <div >
                        {
                            proofs && proofs.length > 0 ? <div>
                                <p className='text-semibold mb-3 font-medium'>School wise supporting documents:</p>
                                <div className="max-h-72 overflow-y-scroll">
                                    <table className="table table-responsive table-bordered ">
                                        <thead className="bg-primary text-white">
                                            <tr>
                                                <th>School Name</th>
                                                <th>Proof</th>
                                                <th>Proof Web Link</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                proofs.map((proof) => {
                                                    return <tr>
                                                        <td>
                                                            {proof.school}
                                                        </td>
                                                        <td>
                                                            <FileViewer fileName={proof.proof} showFullFileName={true} serviceName="aqar" />
                                                        </td>
                                                        <td>
                                                            <button onClick={() => {
                                                                navigator.clipboard.writeText(serverLinks.showFile(proof.proof, "aqar"));
                                                                toast.success('Link copied')
                                                            }} type="button" class="px-3 py-2 text-xs font-medium text-center text-[#0000ff] bg-[#d2ebff] rounded-lg hover:bg-[#a8d0f0]">Copy Link</button>
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div> : <div>
                                <p className="text-center my-3 text-yellow-500">No proofs available for this data</p>
                            </div>
                        }

                    </div>
                </div>
                    :
                    <div>
                        <div className="my-3">
                            <label htmlFor="resultFile">Upload a supporting / relevant document here for the table below</label>
                            <input onChange={(e) => submitProofFunction(e.target.files[0])} type="file" name="file" id="resultFile" className='form-control mt-1' />
                            {
                                proof && <div className="mt-3">
                                    <p className="my-1 text-xs text-muted">Uploaded Document</p>
                                    <FileViewer fileName={proof} showFullFileName={true} serviceName="aqar" />
                                </div>
                            }

                        </div>
                    </div>
            }



        </div>
        <div>
            {
                children
            }
        </div>
    </div>
}

export default AQARWithProof