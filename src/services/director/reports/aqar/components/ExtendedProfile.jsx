import React, { useState } from 'react'
import Wrapper from '../../academic-audit/components/Wrapper'
import { useEffect } from 'react'
import Axios from 'axios'
import useDirectorAuth from '../../../../../hooks/useDirectorAuth'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import getAQARData from '../js/getAQARData'
import useScroll from '../../../../../hooks/useScroll'
import TableAccordion from '../../../../faculty/reports/aqar/components/TableAccordion'
import DirectorMainTable from '../../../components/UtilityComponents/DirectorMainTable'
import { api } from '../../../../../js/api'


const ExtendedProfile = ({ aqarYearState }) => {

    useScroll()
    useDirectorAuth()
    const directorUser = useSelector((state) => state.user.directorUser)
    const [data, setData] = useState(null)

    const [classrooms, setClassrooms] = useState(null)
    const [seminarHalls, setSeminarHalls] = useState(null)
    const [computers, setComputers] = useState(null)

    const extendedProfile = {
        classrooms: classrooms ? classrooms : 0,
        seminarHalls: seminarHalls ? seminarHalls : 0,
        computers: computers ? computers : 0
    }

    const saveData = () => {

        const link = `${api}/service/director/report/aqar/saveData`
        Axios.post(link, { extendedProfile, schoolName: directorUser?.department, academicYear: aqarYearState })
            .then((res) => {
                if (res) {
                    console.log('Saved data successfully :', res)
                    toast.success('Data saved successfully...')
                } else {
                    toast.error('Failed to save data')
                }
            }).catch((err) => {
                toast.success('Failed to save data in catch up state :', err)
            })

    }


    useEffect(() => {
        getAQARData(setData, true, { schoolName: directorUser?.department }, aqarYearState, 'director')
    }, [])

    useEffect(() => {
        if (data) {

            setClassrooms(data?.extendedProfile?.classrooms ? data?.extendedProfile?.classrooms : null)
            setSeminarHalls(data?.extendedProfile?.seminarHalls ? data?.extendedProfile?.seminarHalls : null)
            setComputers(data?.extendedProfile?.computers ? data?.extendedProfile?.computers : null)
        }
    }, [data])

    const AQARTables = [
        {
            title: 'Newly introduced program(s) during this year',
            component: <DirectorMainTable model="NewPrograms" academicYear={[aqarYearState]} />
        },
        {
            title: 'Courses in all programs during the year',
            component: <DirectorMainTable model="CourceInAllProgram" academicYear={[aqarYearState]} />
        },
    ]

    return (
        <div>
            <div className='my-5'>




                <TableAccordion AQARTables={AQARTables} />

                <Wrapper title="3. Total Classrooms, Seminar halls & Computers for academic purposes">
                    <div>
                        {/* <div className="row">
                            <div className="col">
                                <input type="number" className="form-control" placeholder="Total no. of Classrooms & Seminar halls" aria-label="classroom" value={classrooms} onChange={(e) => { setClassrooms(e.target.value) }} />
                            </div>
                            <div className="col">
                                <input type="number" className="form-control" placeholder="Total no. of Computers for Academic purpose" aria-label="computer" value={computers} onChange={(e) => { setComputers(e.target.value) }} />
                            </div>
                        </div> */}
                    </div>

                    <div className="grid gap-6 mb-6 md:grid-cols-4">
                        <div>
                            <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Classrooms</label>
                            <input type="number" value={classrooms} onChange={(e) => { setClassrooms(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Total Classrooms" />
                        </div>
                        <div>
                            <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Seminar Halls</label>
                            <input type="number" value={seminarHalls} onChange={(e) => { setSeminarHalls(e.target.value) }} id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Total Seminar Halls" />
                        </div>
                        <div>
                            <label for="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Computers</label>
                            <input type="number" value={computers} onChange={(e) => { setComputers(e.target.value) }} id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Total Computers" />
                        </div>

                    </div>
                    <div className="mt-4">
                        <button onClick={saveData} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </div>
                </Wrapper>
            </div>

        </div>
    )
}

export default ExtendedProfile
