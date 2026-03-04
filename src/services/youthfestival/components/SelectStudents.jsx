import React, { useEffect, useState } from 'react'
import DialogBox from '../../../components/formComponents/DialogBox'
import { StudentInfo } from './YFStudentsList'
import UserLoading from '../../../pages/UserLoading';
import Note from '../../director/reports/academic-audit/components/Note';
import toast from 'react-hot-toast';
import { fetchStudentsData } from '../js/competitionHandler';
import { useQuery } from 'react-query';

const SelectStudents = ({ isLoading, isModalOpen, setIsModalOpen, compDetails, setCompDetails, onSubmit, onCancel, students, setSelectedStudents, selectedStudents, filterByAcademicYear, user, isGroup, edit, compId }) => {

    // check if the data is available for the selected competition
    const key = `${filterByAcademicYear}-Select-${user?._id}-${isGroup}-${compDetails.competitionName}`
    const filter = edit && isGroup ? {
        academicYear: filterByAcademicYear, college: user?._id, isGroup,
        _id: compId
    } : { academicYear: filterByAcademicYear, college: user?._id, isGroup, competitionName: compDetails.competitionName }


    const param = { filter }
    const { data, isLoading: isStudentLoading, refetch } = useQuery(key, () => fetchStudentsData(param))
    const [isEdit, setIsEdit] = useState(false)
    const [filteredStudents, setFilteredStudents] = useState([])
    const [alreadySelectedStudents, setAlreadySelectedStudents] = useState([])

    useEffect(() => {
        console.log("Data after select:", data?.data?.data)
        if (isGroup === false || edit) {
            if (data?.data?.data?.students?.length > 0) {
                let arr = data?.data?.data?.students?.map((student) => student?._id)
                setSelectedStudents(arr)
                setAlreadySelectedStudents(arr)
                if (arr?.length > 0) {

                    const presentInDbStudents = students?.filter((student) => arr.includes(student?._id))
                    const lessThanFourStudents = students?.filter((student) => student?.competitions?.length !== 4)
                    const totalStudentsToShow = [...new Map([...presentInDbStudents, ...lessThanFourStudents].map(item => [item._id, item])).values()];
                    setFilteredStudents(totalStudentsToShow)
                } else {
                    setFilteredStudents(() => students?.filter((student) => student?.competitions?.length !== 4))
                }
                setIsEdit(true)
            } else {
                setFilteredStudents(() => students?.filter((student) => student?.competitions?.length !== 4))
            }
        } else {
            setFilteredStudents(() => students?.filter((student) => student?.competitions?.length !== 4))
        }
    }, [data])

    const handleCheckboxChange = (id) => {
        if (selectedStudents.includes(id)) {
            setSelectedStudents((prevIds) => prevIds.filter((prevId) => prevId !== id));
        } else {
            setSelectedStudents((prevIds) => [...prevIds, id]);
        }
    };

    const submitFunction = (e) => {
        e.preventDefault();
        if (filteredStudents?.length > 0) {
            if (selectedStudents?.length > 0) {
                onSubmit(e, isEdit, alreadySelectedStudents)
            } else {
                toast.error('कृपया सबमिट करण्यासाठी किमान एक विद्यार्थी निवडा')
            }
        } else {
            toast.error('एकही विद्यार्थी शिल्लक नसल्याने फॉर्म सबमिट करता येत नाही')
        }
    }

    return (
        <div>
            <DialogBox loading={isLoading} title={compDetails?.competitionName ? `${compDetails?.competitionName}साठीचे विद्यार्थी निवडा ` : ''} buttonName="Submit" isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onClickFunction={submitFunction} onCancel={onCancel} maxWidth="lg">

                {
                    filteredStudents?.length > 0 ? <div>
                        <Note title="ज्या विद्यार्थ्यांनी 4 कार्यक्रमात भाग घेतला आहे ते या यादीत दाखवलेले नाहीत" />
                        <div className="mb-2 p-2 mt-2 border rounded-md">
                            <p>{compDetails?.competitionName}साठी निवडलेल्या विद्यार्थ्यांची संख्या : <span className="mx-1 font-bold">{selectedStudents?.length ? selectedStudents.length : 0}</span></p>
                        </div>
                        <div className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg grid grid-cols-4 ">

                            {
                                filteredStudents?.map((student, i) => {
                                    return <div class={`w-full ${i !== students?.length - 1 && "border-b"} border-gray-200 rounded-t-lg p-2`}>
                                        <div class="flex items-center gap-3">
                                            <input checked={selectedStudents.includes(student?._id)} onChange={() => handleCheckboxChange(student?._id)} id={student?._id} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded " />
                                            <label className="cursor-pointer truncate" htmlFor={student?._id}>
                                                <StudentInfo student={student} />
                                            </label>
                                        </div>
                                    </div>
                                })
                            }



                        </div>
                    </div> : <div className="my-5">
                        <Note title="प्रत्येक विद्यार्थी जास्तीत जास्त 4 स्पर्धांमध्ये भाग घेऊ शकतो, आणि या महाविद्यालयातील प्रत्येक नोंदणीकृत विद्यार्थ्याने 4 स्पर्धांमध्ये भाग घेतला आहे, त्यामुळे या स्पर्धेत सहभागी होण्यासाठी कोणताही विद्यार्थी येथे दिसणार नाही." />
                    </div>
                }

            </DialogBox>
        </div>
    )
}

export default SelectStudents
