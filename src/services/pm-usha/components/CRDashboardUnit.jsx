import React from 'react'
import { constructionAndRenovationDetails } from '../js/constants';
import { Bar, Pie } from 'react-chartjs-2';
import { EQUIPDashboardUnit, SOFTDashboardUnit } from './SOFTEQUPDashboardUnit';

const CRDashboardUnit = ({ serverChartData }) => {


    const conRenChartDetails = [
        { title: "Construction", chartData: "conChartData", themeColor: 'red' },
        { title: "Renovation", chartData: "renChartData", themeColor: 'blue' }]

    return (
        <div>
            <div className='md:flex items-start gap-4'>
                {/*1. SHOW OVERALL CHART DATA FOR CONREN */}
                <div className='md:w-[65%]'>

                    {/* I. OVERALL CONREN DATA */}
                    {serverChartData?.conRenChartData &&
                        <div className="mt-4 bg-[#f3fff2] border-2 border-[#d2fccd] rounded-xl p-3 ">
                            <h2 className='text-center text-[#305f2b] font-semibold'>Construction & Renovation Status</h2>
                            <div className='md:flex items-start gap-4 mt-4'>

                                <div className='h-80 flex-1 w-full'>
                                    <Bar data={serverChartData?.conRenChartData} options={{
                                        plugins: {
                                            tooltip: {
                                                callbacks: {
                                                    label: function (context) {
                                                        return context.parsed.y + '%';
                                                    }
                                                }
                                            },
                                            legend: {
                                                display: true,
                                                position: 'bottom',
                                                fullSize: true
                                            }
                                        }
                                    }} />

                                </div>
                                <div className="space-y-0 md:space-y-4 md:w-[25%] md:block flex items-start flex-wrap gap-2">
                                    {
                                        Object.values(constructionAndRenovationDetails).map((tab, index) => {
                                            return tab.map((item) => {
                                                return <p className="text-xs text-gray-500" key={item.name}><b>{item.id}</b>: {item.name}</p>
                                            })
                                        })
                                    }
                                </div>
                            </div>
                        </div>}


                    {/* II. EQUIPMENT STATUS */}
                    <EQUIPDashboardUnit chartData={serverChartData?.equipmentChartData} />


                </div>

                {/* 2. INDIVIDUAL CON REN CHART DATA */}
                <div className='flex-1'>
                    {
                        conRenChartDetails?.map((chartData) => {
                            return serverChartData?.[chartData?.chartData] &&
                                <div key={chartData?.title} className={`mt-4 h-96 bg-${chartData.themeColor}-50 border-2 border-${chartData.themeColor}-100 rounded-xl p-3`}>
                                    <h2 className={`text-center text-${chartData.themeColor}-600 font-semibold`}>{chartData.title} Status</h2>
                                    <div className='h-80 flex items-center justify-center mt-4'>
                                        <Pie data={serverChartData?.[chartData.chartData]} options={{
                                            plugins: {
                                                tooltip: {
                                                    callbacks: {
                                                        label: function (context) {
                                                            return context.parsed + '%';
                                                        }
                                                    }
                                                },
                                                legend: {
                                                    display: true,
                                                    position: 'bottom',
                                                    fullSize: true
                                                }
                                            }
                                        }} />
                                    </div>
                                </div>
                        })
                    }

                </div>
            </div>
            <SOFTDashboardUnit chartData={serverChartData?.softChartData} />
        </div>
    )
}

export default CRDashboardUnit
