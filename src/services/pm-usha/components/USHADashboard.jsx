import React from 'react';
import { useQuery } from 'react-query';
import { getDashboardData } from '../js/ushaDashboardHandler';
import { Chart as ChartJs, BarElement, CategoryScale, LinearScale, ArcElement, Title, Legend, Tooltip, } from 'chart.js';
import CRDashboardUnit from './CRDashboardUnit';
import USHADashboardSkeleton from './USHADashboardSkeleton';

ChartJs.register(
    ArcElement, Title, Legend, Tooltip, BarElement, CategoryScale, LinearScale,
)

const USHADashboard = () => {

    // disable refetching on win focus
    const { data, isLoading } = useQuery('USHADashboard', () => getDashboardData(), {
        refetchOnWindowFocus: false,
        staleTime: Infinity
    });



    return (
        <div>
            {
                !isLoading ? <CRDashboardUnit serverChartData={data?.data} /> : <USHADashboardSkeleton />
            }



        </div>
    );
};

export default USHADashboard;
