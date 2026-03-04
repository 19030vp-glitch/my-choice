import React, { useEffect, useState } from 'react'
import TvRoundedIcon from '@mui/icons-material/TvRounded';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
// import File from '../../../inputs/File';
import Text from '../../../inputs/Text';
import Year, { academicYearGenerator } from '../../../inputs/Year';
import submit from '../js/submit';
import refresh from '../js/refresh';
import Actions from './Actions';
// import View from './View';
// import handleEditWithFile from '../js/handleEditWithFile';
import { useQuery } from 'react-query';
import Loader from '../../../components/Loader';
import EmptyBox from '../../../components/EmptyBox';
import FormWrapper from '../components/FormWrapper';
import { Dialog, DialogContent } from '@mui/material';
import BulkExcel from '../../../components/BulkExcel';
import handleEdit from '../js/handleEdit';
import sortByAcademicYear from '../../../js/sortByAcademicYear';
import allTableHeads from '../../admin/js/allTableHeads';


const Lectures = ({ filterByAcademicYear = false, academicYear, setPulledData = false }) => {
    const [lectureModal, setLectureModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    // states
    const [course, setCourse] = useState('')
    const [level, setLevel] = useState('')
    const [mode, setMode] = useState('')
    const [noOfClasses, setNoOfClasses] = useState('')
    const [classesTaken, setClassesTaken] = useState('')


    // const [proof, setProof] = useState(null)
    const [year, setYear] = useState(academicYear ? academicYear : '')
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)

    const [filteredItems, setFilteredItems] = useState([])

    const user = useSelector(state => state.user.user);
    const typeObject = {
        course: 'text', level: 'text', teachingMode: 'text', noOfClasses: 'number', classesTaken: "number", year: academicYearGenerator(29, true, true),
    }

    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true)

        const data = { course, level, mode, noOfClasses, classesTaken, year, userId: user?._id }
        clearStates()
        submit(data, 'lectures', refetch, setLoading, setLectureModal, setIsFormOpen)
    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)

        const theItem = { itemId: itemToDelete._id, course, level, mode, noOfClasses, classesTaken, year, }
        clearStates()

        handleEdit(theItem, 'Lectures', setEditModal, refetch, setLoading, setIsFormOpen)

    }


    function pencilClick(itemId) {
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setCourse(item.course)
                setLevel(item.level)
                setMode(item.teachingMode)
                setNoOfClasses(item.noOfClasses)
                setClassesTaken(item.classesTaken)
                setYear(item.year)
                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setCourse('')
        setLevel('')
        setMode('')
        setNoOfClasses('')
        setClassesTaken('')
        setYear('')
        setEditModal(false)

    }


    let param = { model: 'Lectures', userId: user?._id }

    // main fetcher
    const { data, isLoading, refetch } = useQuery([param.model, param], () => refresh(param))


    useEffect(() => {
        if (data) {
            let filteredData = sortByAcademicYear(data?.data?.data, 'year', filterByAcademicYear, academicYear)
            setFilteredItems(filteredData)

            if (setPulledData) {
                setPulledData(filteredData)
            }
        }
    }, [data, academicYear && academicYear])

    return (
        <div>
            {/* // 1. HEADER */}


            <Header exceldialog={setOpen} dataCount={filteredItems ? filteredItems.length : 0} add="Details of Course taught" editState={setEditModal} clearStates={clearStates} state={setLectureModal} icon={<TvRoundedIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title="Lectures, Seminars, Tutorials, Practicals, Contact Hours" />

            <BulkExcel data={data?.data?.data} tableHead={allTableHeads.Lectures} typeObject={typeObject} commonFilds={{ userId: user?._id }} sampleFile='LecturesFaculty' title='Lectures, Seminars' SendReq='Lectures' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />

            {/* // 2. FIELDS */}


            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setLectureModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit Lecture/Seminar' : 'Add a new Lecture/Seminar'}</p>

                        <Text space='col-md-8' title='Course/Paper' state={course} setState={setCourse} />

                        <Text title='Level' state={level} setState={setLevel} />

                        <Text title='Teaching Mode' state={mode} setState={setMode} />

                        <Text type='number' space='col-md-3' title='No of classes alloted' state={noOfClasses} setState={setNoOfClasses} />

                        <Text type='number' space='col-md-3' title='No of classes taken' state={classesTaken} setState={setClassesTaken} />

                        <Year state={year} setState={setYear} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>





            {/* // 2. TABLE */}

            <div className='mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base'>
                <table className="table table-bordered table-hover">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Sr No</th>
                            <th scope="col">Course/Paper</th>
                            <th scope="col">Level</th>
                            <th scope="col">Teaching Mode</th>
                            <th scope="col"><div className="max-w-56">No of classes alloted</div></th>
                            <th scope="col"><div className="max-w-56">No of classes taken</div></th>
                            <th scope="col"><div className="w-20">Year</div></th>
                            <th scope="col">Action</th>


                        </tr>
                    </thead>
                    <tbody>
                        {data && filteredItems.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.course}</td>
                                    <td>{item.level}</td>
                                    <td>{item.teachingMode}</td>
                                    <td>{item.noOfClasses}</td>
                                    <td>{item.classesTaken}</td>
                                    <td>{item.year}</td>
                                    {/* <td><View proof={item.proof} /></td> */}
                                    <td> <Actions item={item} model="Lectures" refreshFunction={refetch} pencilClick={() => pencilClick(item._id)} editState={setEditModal} addState={setLectureModal} /></td>



                                </tr>
                            )
                        })}

                    </tbody>
                </table>
                {
                    isLoading && <Loader />
                }
                {
                    (data && data?.data?.data === undefined || filteredItems.length === 0) && <EmptyBox />
                }
            </div>
        </div>
    )
}









export default Lectures