import React from 'react'
import USHACard from '../components/USHACard'
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import DeviceThermostatRoundedIcon from '@mui/icons-material/DeviceThermostatRounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';

const USHACards = () => {

    return (
        <div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2'>
                {
                    proposalList.map((item) => {
                        return <USHACard key={item.id} details={item} />
                    })
                }
            </div>
        </div>
    )
}

export default USHACards

const proposalList = [
    {
        id: "A",
        title: 'Construction',
        icon: <EngineeringRoundedIcon sx={{ color: '#DC2626' }} />,
        description: 'Details of Infrastructure proposed to be Constructed',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        footerColor: 'red',
        link: 'construction/details',
        statusLink: 'construction/status',
        annexure: "Annexure A-1, A-2 & A-3 attached"
    },
    {
        id: "B",
        title: 'Renovation',
        icon: <ConstructionRoundedIcon sx={{ color: '#2563EB' }} />,
        description: 'Details of Infrastructure proposed to be Renovated',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        footerColor: 'blue',
        link: 'renovation/details',
        statusLink: 'renovation/status',
        annexure: "Annexure B-1, B-2 & B-3 attached"
    },
    {
        id: "C",
        title: 'Equipments',
        icon: <DeviceThermostatRoundedIcon sx={{ color: '#18A44B' }} />,
        description: 'Details of Equipment to be Procured and Installed',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        footerColor: 'green',
        link: 'equipment/details',
        statusLink: 'equipment/status',
        annexure: "Annexure C-1 attached"
    },
    {
        id: "D",
        title: 'Soft Components',
        icon: <HowToRegRoundedIcon sx={{ color: '#EA580C' }} />,
        description: 'Details of various Soft Component Activities',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        footerColor: 'orange',
        link: 'soft-component/details',
        statusLink: 'soft-component/status',
        annexure: "Annexure D-1 to D-10 attached"
    },
]

export const proposalData = {
    construction: {
        id: "A",
        title: 'Construction',
        icon: <EngineeringRoundedIcon sx={{ color: '#DC2626' }} />,
        description: 'Details of Infrastructure proposed to be Constructed',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        footerColor: 'red',
        link: 'construction/details',
        statusLink: 'construction/status',
        annexure: "Annexure A-1, A-2 & A-3 attached"
    },
    renovation: {
        id: "B",
        title: 'Renovation',
        icon: <ConstructionRoundedIcon sx={{ color: '#2563EB' }} />,
        description: 'Details of Infrastructure proposed to be Renovated',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        footerColor: 'blue',
        link: 'renovation/details',
        statusLink: 'renovation/status',
        annexure: "Annexure B-1, B-2 & B-3 attached"
    },
    equipment: {
        id: "C",
        title: 'Equipments',
        icon: <DeviceThermostatRoundedIcon sx={{ color: '#18A44B' }} />,
        description: 'Details of Equipment to be Procured and Installed',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        footerColor: 'green',
        link: 'equipment/details',
        statusLink: 'equipment/status',
        annexure: "Annexure C-1 attached"
    },
    "soft-component": {
        id: "D",
        title: 'Soft Components',
        icon: <HowToRegRoundedIcon sx={{ color: '#EA580C' }} />,
        description: 'Details of various Soft Component Activities',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        footerColor: 'orange',
        link: 'soft-component/details',
        statusLink: 'soft-component/status',
        annexure: "Annexure D-1 to D-10 attached"
    },

}