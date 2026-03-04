import React from 'react'
import MainTitle from '../components/Title'
import { Bar, Pie } from 'react-chartjs-2'
import DownloadReportButtons from '../components/DownloadReportButtons'
import { Chart as ChartJs, BarElement, CategoryScale, LinearScale, ArcElement, Title, Legend, Tooltip } from 'chart.js';

ChartJs.register(
    ArcElement, Title, Legend, Tooltip, BarElement, CategoryScale, LinearScale,
)


const StudentAnalysis = ({ chartData, showDownloadButtons = true, schoolName, academicYear, excelClick, forReport = false }) => {

    return (
        <div>
            {showDownloadButtons && <div className="my-3">
                <DownloadReportButtons feedbackUser="Student" schoolName={schoolName} academicYear={academicYear} excelClick={excelClick} />
            </div>}
            <div>
                <div >
                    <div>
                        <MainTitle title="1. Course Feedback Ratings" />
                        <div className={`${forReport ? "grid grid-cols-2 gap-5" : "grid grid-cols-4 gap-5"} `}>
                            {chartData.programChartData?.map(({ program, data }) => (
                                <div style={{ pageBreakInside: 'avoid' }} key={program} className=" bg-gray-50 p-2 rounded-md m-2">
                                    <h4 className="font-semibold mb-3 text-center text-muted">{program}</h4>
                                    <Pie data={data} />
                                </div>
                            ))}
                        </div>

                        <p className="academic-start"></p>
                        <MainTitle title="2. Were are you provided with a course and lecture outline at the beginning?" />
                        <div style={{ pageBreakInside: 'avoid' }} className={forReport ? "grid grid-cols-2 gap-1" : "grid grid-cols-3 gap-5"}>
                            {chartData?.onlineLectureChartData?.map((programData) => (
                                <div style={{ pageBreakInside: 'avoid' }} key={programData.program} className=" bg-gray-50 p-2 rounded-md m-2">
                                    <h4 className="font-semibold mb-3 text-center text-muted">{programData.program} (in %)</h4>
                                    <Bar data={programData.data} options={{
                                        plugins: {
                                            legend: {
                                                display: false
                                            },
                                        }
                                    }} />
                                </div>

                            ))}
                        </div>



                    </div>

                    <p className="academic-start"></p>

                    <MainTitle title="3. The Syllabus was?" />
                    <div className={`${forReport ? "grid grid-cols-2" : "grid grid-cols-3 gap-5"}`}>
                        {chartData?.syllabusWasChartData?.map((data) => (
                            <div style={{ pageBreakInside: 'avoid' }} key={data.program} className="bg-gray-50 p-2 rounded-md m-2 w-full">
                                <h3 className='mb-3 font-semibold text-muted'>For {data.program}</h3>
                                <div className={forReport && 'w-[500px]'}>
                                    <Bar data={data.data} options={{
                                        plugins: {
                                            legend: {
                                                display: false
                                            },
                                        }
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>


                    <div>
                        <p className="academic-start"></p>

                        <MainTitle title="4. Facility Feedback Ratings" className="mt-5" />
                        <div className="grid grid-cols-2 gap-5 ">
                            {chartData?.facilityChartData?.map(({ question, data }, index) => (
                                <div style={{ pageBreakInside: 'avoid' }} key={question} className='bg-gray-50 p-2 rounded-md m-2' >
                                    <h4 className="font-semibold mb-3 text-center text-muted">
                                        {index + 1}. {question}
                                    </h4>
                                    <div className={forReport ? "" : "flex items-center justify-center"}>
                                        <div className={forReport ? "w-full" : 'w-[50%]'}>
                                            <Pie data={data} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <p className="academic-start"></p>

                <MainTitle title="5. Teacher Feedback Ratings" className="mt-5" />
                {chartData?.teacherChartData?.map(({ teacherName, data }, index) => (
                    <div key={teacherName} className="bg-gray-50 p-2 rounded-md m-2">
                        <h3 className="my-3 font-semibold text-blue-600 text-lg">
                            {index + 1}. {teacherName}
                        </h3>
                        <div className={`pl-10 border-l-4 border-l-gray-400 grid grid-cols-2 ${!forReport && "gap-5"}`}>
                            {data.map(({ label, data: ratings }, index) => (
                                <div style={{ pageBreakInside: 'avoid' }} key={label} className={forReport ? "my-3 w-[500px]" : "my-3 w-full"}>
                                    <h4 className="font-semibold mb-3">
                                        {index + 1}. {label}
                                    </h4>
                                    <div className='w-full'>
                                        <Bar
                                            data={{
                                                labels: ['Very Good', 'Good', 'Satisfactory', 'Un-Satisfactory'],
                                                datasets: [
                                                    {
                                                        label,
                                                        data: Object.values(ratings),
                                                        backgroundColor: ['green', 'blue', 'yellow', 'red'],
                                                        categoryPercentage: 0.6,
                                                        barPercentage: 0.4
                                                    }
                                                ]
                                            }}
                                            options={{
                                                scales: {
                                                    x: {
                                                        stacked: true
                                                    },
                                                    y: {
                                                        stacked: true,
                                                        beginAtZero: true
                                                    }
                                                },
                                                plugins: {
                                                    legend: {
                                                        display: false
                                                    },
                                                    datalabels: {
                                                        display: true,
                                                        anchor: 'end',
                                                        align: 'end'
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <p className="academic-start"></p>

                <MainTitle title="6. Syllabus Coverage Ratings" className="mt-5" />
                <div className={forReport ? "grid grid-cols-2 gap-3" : "grid grid-cols-4 gap-3"}>
                    {chartData?.syllabusCoverageChartData?.map(({ teacherName, data }, index) => (
                        <div style={{ pageBreakInside: 'avoid' }} key={teacherName} className="bg-gray-50 rounded-md my-2 p-2">
                            <h3 className="my-3 font-semibold text-blue-600 text-lg">
                                {index + 1}. {teacherName}
                            </h3>
                            <div className="flex items-center justify-center">
                                <Pie data={data} />
                            </div>
                        </div>
                    ))}
                </div>

                <p className="academic-start"></p>

                <MainTitle title="7. Comments on Teacher by Students" className="mt-5" />
                <div>
                    {
                        Object.keys(chartData?.commentsData)?.map((key, index) => {
                            return <div>
                                <p className='font-bold'>{index + 1}. Do you have any major comments to offer for {key}?</p>

                                <div className="bg-gray-50 my-3 border-l-4 ">
                                    <div className="px-5 py-2 border-l-gray-400 grid grid-cols-4 gap-2">
                                        {
                                            chartData?.commentsData[key].map((comment, index) => {
                                                return <p className='p-2 my-1 border bg-gray-100 rounded-sm'>{index + 1}. {comment}</p>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>



            </div>
        </div>
    )
}

export default StudentAnalysis
