import { Bar, Doughnut } from "react-chartjs-2";
import { softActivities } from "./SoftAndEquipmentTable";
import { SoftSubTitle } from "../js/saeStaticData";

export const EQUIPDashboardUnit = ({ chartData }) => {
    return (
        chartData && <div className={`mt-4 h-96 bg-green-50 border-2 border-green-100 rounded-xl p-3`}>
            <h2 className={`text-center text-green-600 font-semibold`}>Equipments Status</h2>
            <div className='h-96 flex items-center justify-center'>
                <Doughnut data={chartData} options={{
                    plugins: {
                        legend: {
                            display: true,
                            position: 'right',
                            fullSize: true,
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed) {
                                        label += context.parsed;
                                    }
                                    return label;
                                }
                            }
                        },
                    }
                }} />
            </div>
        </div>
    )
}


export const SOFTDashboardUnit = ({ chartData }) => {

    return (
        <div>
            {chartData && <div className={`mt-4 md:h-[28rem] bg-orange-50 border-2 border-orange-100 rounded-xl p-3`}>
                <div className="md:flex items-start">
                    <div className="flex-1 w-full">
                        <h2 className={`text-center text-orange-600 font-semibold`}>Soft Component Status</h2>
                        <div className='h-[24rem] flex items-center justify-center'>
                            <Bar data={chartData} options={{
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: function (context) {
                                                let label = context.dataset.label || '';
                                                if (context.parsed) {
                                                    label = context.parsed.y + ' ' + label;
                                                }
                                                return label;
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

                    <div className="md:w-[28%] md:block flex items-start flex-wrap gap-2 space-y-0 md:space-y-3">
                        {
                            softActivities.map((item, index) => {
                                return <p className="text-xs text-gray-500"><b>Activity-{index + 1}</b>: {SoftSubTitle[item]}</p>
                            })
                        }
                    </div>
                </div>
            </div>}



        </div>
    )
}
