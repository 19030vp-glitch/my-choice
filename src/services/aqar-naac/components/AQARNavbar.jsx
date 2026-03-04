import { Drawer } from 'antd';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowButton from '../../../components/ArrowButton';


const AQARNavbar = () => {

    const navigate = useNavigate()
    const { stageName, academicYear, userType } = useParams();

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
                            return <span onClick={() => navigate(`/${userType}/aqar/${academicYear}/${navbarLinks[item].abbv}`)} className={`${item === stageName && 'border-b-2 text-blue-600 border-b-blue-600'}  hover:bg-gray-50 p-2 cursor-pointer text-xs md:text-sm text-center font-medium select-none`} key={index}>{navbarLinks[item].title}</span>
                        })
                    }
                </div>
                <div>
                    {!open && <div className="block md:hidden">
                        <ArrowButton title="Show Criteria List" onClickFunction={showDrawer} showArrow={false} />
                    </div>}

                    <Drawer title="AQAR Criteria" placement="right" onClose={onClose} open={open}>
                        <div className="flex flex-col gap-3">
                            {
                                Object.keys(navbarLinks).map((item, index) => {
                                    return <span onClick={() => {
                                        navigate(`/${userType}/aqar/${academicYear}/${navbarLinks[item].abbv}`);
                                        onClose();
                                    }} className={`${item === stageName && 'border-b-2 text-blue-600 border-b-blue-600'}  hover:bg-gray-50 p-2 cursor-pointer text-xs md:text-sm font-medium select-none`} key={index}>{navbarLinks[item].title}</span>
                                })
                            }
                        </div>
                    </Drawer>

                </div>
            </div>
        </div>
    )
}

export default AQARNavbar

const navbarLinks = {
    'extended-profile': {
        title: 'Extended Profile',
        abbv: 'extended-profile'
    },
    'criterion-1': {
        title: 'Criterion 1',
        subtitle: "Curricular Aspects",
        abbv: 'criterion-1',
    },
    'criterion-2': {
        title: 'Criterion 2',
        subtitle: "Teaching, Learning & Evaluation",
        abbv: 'criterion-2',
    },
    'criterion-3': {
        title: 'Criterion 3',
        subtitle: "Research, Innovations and Extension",
        abbv: 'criterion-3',
    },
    'criterion-4': {
        title: 'Criterion 4',
        subtitle: "Infrastructure & Learning Resources",
        abbv: 'criterion-4',
    },
    'criterion-5': {
        title: 'Criterion 5',
        subtitle: "Student Support & Progression",
        abbv: 'criterion-5',
    },
    'criterion-6': {
        title: 'Criterion 6',
        subtitle: "Governance, Leadership & Management",
        abbv: 'criterion-6',
    },
    'criterion-7': {
        title: 'Criterion 7',
        subtitle: "Institutional Values & Best Practices",
        abbv: 'criterion-7',
    },
}

export { navbarLinks }
