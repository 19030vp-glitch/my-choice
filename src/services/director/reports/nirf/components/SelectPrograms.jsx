import React, { useEffect, useState } from 'react';
import programsByNIRF from '../js/programsByNIRF';
import ArrowButton from '../../../../../components/ArrowButton';
import { useDispatch, useSelector } from 'react-redux';
import { savePrograms } from '../js/savePrograms';
import UserLoading from '../../../../../pages/UserLoading';
import { setNIRFPrograms } from '../../../../../redux/slices/NIRFSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { navigateToURL } from './StudentIntake';
import useNIRFGetProgram from '../../../../../hooks/director-hooks/useNIRFGetProgram';
import toast from 'react-hot-toast';

function SelectPrograms() {
    const [selectedPrograms, setSelectedPrograms] = useState([]);
    const user = useSelector((state) => state.user?.directorUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { academicYear } = useParams()
    const [isProgramLoading, setIsProgramLoading] = useState(false)

    const { programs, isLoading } = useNIRFGetProgram(user, academicYear)

    useEffect(() => {
        setSelectedPrograms(programs || [])
    }, [programs])


    const handleCheckboxChange = (value) => {
        if (selectedPrograms?.includes(value)) {
            setSelectedPrograms((prevItems) => prevItems.filter(item => item !== value));
        } else {
            setSelectedPrograms((prevItems) => [...prevItems, value]);
        }
    };

    const onSubmit = async () => {

        if (selectedPrograms.length === programs.length && selectedPrograms.every((value, index) => value === programs[index])) {
            toast.success('Programs saved successfully')
        } else {
            await savePrograms(user?.department, academicYear, selectedPrograms, dispatch, setNIRFPrograms, setIsProgramLoading)
        }

        navigateToURL(academicYear, 'sanctioned-intake', navigate)
    }

    return (
        <div>
            <p className="text-center">Select program(s) offered by your School</p>


            {
                isLoading ? <div>
                    <UserLoading title="Loading Programs" />
                </div> :

                    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-4 mb-3 sm:mx-5 border p-3 rounded-md">

                        {
                            Object.keys(programsByNIRF).map((program) => {
                                return <div className="form-check my-2" key={program}>
                                    <input className="form-check-input"
                                        value={program}
                                        checked={selectedPrograms.includes(program)}
                                        onChange={() => handleCheckboxChange(program)}
                                        type="checkbox" id={program} />
                                    <label className="form-check-label" htmlFor={program}>
                                        {programsByNIRF[program].name}
                                    </label>
                                </div>
                            })
                        }
                    </div>

            }




            <div className='text-center my-4'>
                <ArrowButton className="mt-3" onClickFunction={onSubmit}
                    title={!isProgramLoading ? "Save Programs & Continue" : "Saving Programs..."} showArrow={!isProgramLoading} />
            </div>
        </div>
    );
}

export default SelectPrograms;
