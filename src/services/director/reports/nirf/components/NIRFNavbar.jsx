import { Drawer } from 'antd';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowButton from '../../../../../components/ArrowButton';


const NIRFNavbar = ({ userType = "director" }) => {

    const navigate = useNavigate()
    const { module, academicYear } = useParams();

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <div className="sm:bg-gray-100 rounded-lg p-2">
                <div className="hidden md:flex items-center justify-between gap-2 text-center">
                    {
                        Object.keys(navbarLinks).map((item, index) => {
                            return <span onClick={() => navigate(`/${userType}/nirf/${academicYear}/${navbarLinks[item].abbv}`)} className={`${item === module && 'border-b-2 text-blue-600 border-b-blue-600'}  hover:bg-gray-50 p-2 cursor-pointer text-xs md:text-sm text-center font-medium select-none`} key={index}>{navbarLinks[item].title}</span>
                        })
                    }
                </div>
                <div>
                    {!open && <div className="block md:hidden z-10">
                        <ArrowButton title="Show NIRF Module List" onClickFunction={showDrawer} showArrow={false} />
                    </div>}

                    <Drawer className='z-20' title="NIRF Modules" placement="right" onClose={onClose} open={open}>
                        <div className="flex flex-col gap-3">
                            {
                                Object.keys(navbarLinks).map((item, index) => {
                                    return <span onClick={() => {
                                        navigate(`/${userType}/nirf/${academicYear}/${navbarLinks[item].abbv}`);
                                        onClose();
                                    }} className={`${item === module && 'border-b-2 text-blue-600 border-b-blue-600'}  hover:bg-gray-50 p-2 cursor-pointer text-xs md:text-sm font-medium select-none`} key={index}>{navbarLinks[item].title}</span>
                                })
                            }
                        </div>
                    </Drawer>

                </div>
            </div>
        </div>
    )
}

export default NIRFNavbar

const navbarLinks = {
    'programs': {
        title: 'School Programs',
        abbv: 'programs'
    },
    'sanctioned-intake': {
        title: 'Sanctioned Intake',
        abbv: 'sanctioned-intake',
    },
    'student-strength': {
        title: 'Student Strength',
        abbv: 'student-strength',
    },
    'placement-and-higher-education': {
        title: 'Placement & Higher Education',
        abbv: 'placement-and-higher-education',
    },
    'patents': {
        title: 'Patents',
        abbv: 'patents',
    },
    'consultancy': {
        title: 'Consultancy',
        abbv: 'consultancy',
    },
    'programs-organized': {
        title: 'Programs Organized',
        abbv: 'programs-organized',
    },
}

export { navbarLinks }
