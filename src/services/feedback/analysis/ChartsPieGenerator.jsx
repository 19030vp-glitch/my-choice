import React from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import MainTitle from '../components/Title'
import { Chart as ChartJs, BarElement, CategoryScale, LinearScale, ArcElement, Title, Legend, Tooltip } from 'chart.js';

ChartJs.register(
    ArcElement, Title, Legend, Tooltip, BarElement, CategoryScale, LinearScale,
)

const ChartsPieGenerator = ({ analytics, forReport }) => {
    return (
        <div className="my-5">
            {
                analytics?.map((item, index) => {
                    return <div>

                        <div style={{ pageBreakInside: item.type !== 'table' && 'avoid' }}>
                            <MainTitle title={`${index + 1}. ${item.question}`} className="mt-5" />
                            <div>

                                {item.type === 'text' &&

                                    <div className="bg-gray-50 my-3 border-l-4 ">
                                        <div className="px-5 py-2 border-l-gray-400 grid grid-cols-4 gap-2">
                                            {
                                                item.data.map((comment, index) => {
                                                    return <p className='p-2 my-1 border bg-gray-100 rounded-sm'>{index + 1}. {comment}</p>
                                                })
                                            }
                                        </div>
                                    </div>

                                }

                                {item.type === 'radio' &&

                                    <div className="bg-gray-50 my-3">
                                        <div className="px-5 py-2 border-l-gray-400 grid grid-cols-2 gap-2">

                                            {item?.show ?
                                                <div className={forReport && 'w-[500px]'}> <Bar data={item.data} options={{
                                                    plugins: {
                                                        legend: {
                                                            display: false
                                                        },
                                                    }
                                                }} /> </div>
                                                :
                                                <div className={forReport ? 'w-[500px]' : 'w-[50%]'}>
                                                    <Pie data={item.data} />
                                                </div>}
                                        </div>
                                    </div>

                                }

                                {
                                    item.type === 'table' && <div className="grid grid-cols-2 p-2 bg-gray-50 rounded-md m-2">
                                        {item.data.map(({ question, data }, index) => (
                                            <div key={question} className='mt-3 mb-5' style={{ pageBreakInside: 'avoid' }}>
                                                <h4 className="font-semibold mb-3 text-center text-muted">
                                                    {index + 1}. {question}
                                                </h4>
                                                <div className="flex items-center justify-center">
                                                    <div className={forReport ? 'w-[500px]' : 'w-[50%]'}>
                                                        <Pie data={data} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                }


                            </div>
                        </div>

                    </div>

                })
            }
        </div>
    )
}

export default ChartsPieGenerator
