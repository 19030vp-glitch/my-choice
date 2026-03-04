import React, { useEffect, useState } from 'react';
import { TableSupportingProof } from '../../exam/pages/ExamAQAR';
import ArrowButton from '../../../components/ArrowButton'
import uploadSupportingDocument, { fetchSupportingDocuments } from '../js/uploadSupportingDocument';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import UserLoading from '../../../pages/UserLoading';

const AQARCheckWithProof = ({ academicYear, isAdmin = false }) => {

    const [file, setFile] = useState(null)
    const [checkData, setCheckData] = useState(null)
    const [proof, setProof] = useState(null)
    const filter = { academicYear, userType: 'krc', proofType: 'checkForm' }
    const { data, isLoading, refetch } = useQuery(`AQARCheckData-${academicYear}`, () => fetchSupportingDocuments(filter), { refetchOnWindowFocus: false })

    const submitProofFunction = () => {
        const formData = new FormData()
        formData.append('info', checkData)
        if (file) {
            formData.append('file', file)
        }
        formData.append('userType', 'krc')
        formData.append('proofType', 'checkForm')
        formData.append('academicYear', academicYear)

        uploadSupportingDocument(formData, refetch)

    }

    useEffect(() => {
        if (data?.data?.status === 'success') {
            setCheckData(data?.data?.data?.info)
            setProof(data?.data?.data?.proof)
            console.log(data?.data?.data)
        }
    }, [data])


    const checkObject = [
        { id: "1", title: 'Any 4 or all of the above' },
        { id: "2", title: 'Any 3 of the above' },
        { id: "3", title: 'Any 2 of the above' },
        { id: "4", title: 'Any 1 of the above' },
        { id: "5", title: 'None of the above' },
    ]

    return <div>

        <div>
            <ol className="font-semibold">
                <li>1. e–journals</li>
                <li>2. e-books</li>
                <li>3. e-ShodhSindhu</li>
                <li>4. Shodhganga</li>
                <li>5. Databases</li>
            </ol>
        </div>

        {
            isLoading ? <UserLoading title="Fetching Data..." /> : <div>
                {!isAdmin && <div className="bg-gray-50 rounded-md p-3 mt-3 border">
                    <p className='mb-2'>According to the above list check one of the following options:</p>
                    {
                        checkObject.map((item, index) => {
                            return <div className="form-check" key={index}>
                                <input onChange={() => setCheckData(() => item.title)} checked={checkData === item.title} className="form-check-input" name="libraryCheck" type="radio" value="" id={item.title} />
                                <label className="form-check-label" htmlFor={item.title}>
                                    {item.title}
                                </label>
                            </div>
                        })
                    }
                </div>}

                {
                    isAdmin && <div> {checkData ? <p className="font-medium text-green-500 my-3"> Selected: {checkData}</p> : <p>No data available</p>} </div>
                }

                <div>
                    {
                        checkData && <div className='bg-gray-50 rounded-md p-3 mt-3 border'>
                            <TableSupportingProof proof={proof} setFile={setFile} file={file} title='Upload relevant proof based on the above choice' isAdmin={isAdmin} />
                        </div>
                    }
                </div>

                {!isAdmin && (checkData && <div className='mt-2'>
                    <ArrowButton title="Save Details" onClickFunction={submitProofFunction} />
                </div>)}
            </div>
        }

    </div>
}

export default AQARCheckWithProof