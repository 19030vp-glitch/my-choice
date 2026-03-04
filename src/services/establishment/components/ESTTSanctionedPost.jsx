import React, { useEffect } from 'react'
import AuditTable from '../../director/reports/academic-audit/components/AuditTable'
import { EditableTd } from '../../director/reports/academic-audit/content/InformationHome'
import { useState } from 'react'
import uploadSupportingDocument, { fetchSupportingDocuments } from '../../krc/js/uploadSupportingDocument'
import UserLoading from '../../../pages/UserLoading'
import ArrowButton from '../../../components/ArrowButton'
import { useQuery } from 'react-query'
import { TableSupportingProof } from '../../exam/pages/ExamAQAR'
import Note from '../../director/reports/academic-audit/components/Note'


const ESTTSanctionedPostWithProof = ({ academicYear }) => {

    const [file, setFile] = useState(null)
    const [proof, setProof] = useState(null)
    const [teachingPosts, setTeachingPosts] = useState({
        prof: { sanctioned: 0, filled: 0, cas: 0 },
        associateProf: { sanctioned: 0, filled: 0, cas: 0 },
        assistantProf: { sanctioned: 0, filled: 0, cas: 0 },
    })

    console.log(teachingPosts)

    const filter = { academicYear, userType: 'estt', proofType: 'FacultyPostForm' }
    const { data, isLoading, refetch } = useQuery(`AQARFacultyPostData-${academicYear}`, () => fetchSupportingDocuments(filter), { refetchOnWindowFocus: false })

    const submitProofFunction = () => {
        const formData = new FormData()
        formData.append('info', JSON.stringify(teachingPosts))
        if (file) {
            formData.append('file', file)
        }
        formData.append('userType', 'estt')
        formData.append('proofType', 'FacultyPostForm')
        formData.append('academicYear', academicYear)

        uploadSupportingDocument(formData, refetch)

    }

    useEffect(() => {
        if (data?.data?.status === 'success') {
            setTeachingPosts(JSON.parse(data?.data?.data?.info))
            setProof(data?.data?.data?.proof)
        }
    }, [data])

    return <div>
        {
            isLoading ? <UserLoading title="Fetching details..." />
                :
                <div>
                    <ESTTSanctionedPost teachingPosts={teachingPosts} setTeachingPosts={setTeachingPosts} />
                    <TableSupportingProof proof={proof} setFile={setFile} file={file} title='Upload relevant proof for above information.' />
                    <div className='mt-2'>
                        <Note title="After entering the post data or uploading proof, please click the 'Save Changes' button to preserve your edits. If you don't have the information right now, you can upload the proof later; just remember to save your changes when you're ready." />
                        <ArrowButton className="mt-2" title="Save Changes" onClickFunction={submitProofFunction} />
                    </div>
                </div>
        }

    </div>
}

export default ESTTSanctionedPostWithProof






const ESTTSanctionedPost = ({ teachingPosts, setTeachingPosts }) => {



    return (
        <div>
            <AuditTable tableHead={["Designation", "Sanctioned Posts", "Filled Posts", "Vacant Posts"]}>

                <EditableTd state={teachingPosts} setState={setTeachingPosts} keyName='prof' title='Professor' />
                <EditableTd state={teachingPosts} setState={setTeachingPosts} keyName='associateProf' title='Associate Professor' />
                <EditableTd state={teachingPosts} setState={setTeachingPosts} keyName='assistantProf' title='Assistant Professor' />
                <tr>
                    <th scope="row">Total</th>

                    <th scope="row">{(teachingPosts?.prof?.sanctioned === '' ? 0 : parseInt(teachingPosts?.prof?.sanctioned)) + (teachingPosts?.assistantProf?.sanctioned === '' ? 0 : parseInt(teachingPosts?.assistantProf?.sanctioned)) + (teachingPosts?.associateProf?.sanctioned === '' ? 0 : parseInt(teachingPosts?.associateProf?.sanctioned))}</th>

                    <th scope="row">{(teachingPosts?.prof?.filled === '' ? 0 : parseInt(teachingPosts?.prof?.filled)) + (teachingPosts?.assistantProf?.filled === '' ? 0 : parseInt(teachingPosts?.assistantProf?.filled)) + (teachingPosts?.associateProf?.filled === '' ? 0 : parseInt(teachingPosts?.associateProf?.filled))}</th>


                    <th scope="row">{(teachingPosts?.prof?.cas === '' ? 0 : parseInt(teachingPosts?.prof?.cas)) + (teachingPosts?.assistantProf?.cas === '' ? 0 : parseInt(teachingPosts?.assistantProf?.cas)) + (teachingPosts?.associateProf?.cas === '' ? 0 : parseInt(teachingPosts?.associateProf?.cas))}</th>

                </tr>

            </AuditTable>
        </div>
    )
}

