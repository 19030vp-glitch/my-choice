import React from 'react'

const Instructions = ({ forPrintOut }) => {
    return (
        <div>
            <div>
                <br /><br /><br /><br />

                <p>I certify that the information provided is correct as per record available with the university and all the documents enclosed along with the duly filled PBAS Performa.</p>

                <br /><br /><br /><br />
                <br /><br /><br /><br />
                <br /><br /><br /><br />
                <br /><br /><br /><br />

                <div className='mr-36'>
                    <p className="text-right mr-14">Signature</p>
                    <p className="text-right">(Faculty with designation)</p>

                    <br /><br /><br /><br />
                    <p className="text-right mr-16">Signature</p>
                    <p className="text-right">(HOD / Director / Principal)</p>
                </div>
                <br /><br /><br /><br />

            </div>


            <p className="academic-start"></p>
            <div>
                <p>(Adverse remarks, as well as remarks of appreciation of any outstanding work, shall be brought to the notice of the person concerned by the Vice Chancellor or head of the University Department with a view to make improvement in the work by the person concerned.)</p>
            </div>

            <div className="my-3">
                <p className='font-semibold'>1 . (a) Assessment by the Vice Chancellor / Director of the School of the work done under each Head of Activity. </p>
                <i className='my-2'>Assessment of teaching Extension and Reserved activities should be based on verified API score under respective category and shall be made in the following manner.</i>
            </div>

            <div>
                <table className='table table-bordered'>
                    <thead className={`${forPrintOut === 'false' && "bg-[#009879] text-white"}`}>
                        <tr>
                            <th>Teaching</th>
                            <th>Extension</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Grade</th>
                                            <th>Teaching Performance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Good</td>
                                            <td>80% and above</td>
                                        </tr>
                                        <tr>
                                            <td>Satisfactory</td>
                                            <td>Below 80% but 70%</td>
                                        </tr>
                                        <tr>
                                            <td>Not-Satisfactory</td>
                                            <td>Less than 70%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Grade</th>
                                            <th>Active Involvement</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Good</td>
                                            <td>Involved in at least 3 activities</td>
                                        </tr>
                                        <tr>
                                            <td>Satisfactory</td>
                                            <td>Involved in 1-2 activities</td>
                                        </tr>
                                        <tr>
                                            <td>Not-Satisfactory</td>
                                            <td>Not involved in any activities</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <br /><br />

            <div>
                <table className='table table-bordered' >
                    <thead className={`${forPrintOut === 'false' && "bg-[#009879] text-white"}`}>
                        <tr>
                            <td></td>
                            <td>Outstanding (A+)</td>
                            <td>Very Good (A)</td>
                            <td>Positively Good (B+)</td>
                            <td>Good (B)</td>
                            <td>Average (B-)</td>
                            <td>Below Average (C)</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Teaching</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Extension</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Research</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Administration</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <br />
            <p className='font-semibold'>1 . (b) Grading among Outstanding (A+), Very Good (A), Positively Good (B+), Good (B), Average (B-), Below Average (C)</p>

            <br /><br />
            <p className='font-semibold'>1 . (c) Justification of assessment of work as outstanding / below average : </p>

            <br /><br /><br /><br />
            <br /><br /><br />


            <p className='font-semibold'>2. Comments of the Vice-Chancellor / Director of School on 1(b) & 1(c) : </p>

            <br /><br /><br /><br />
            <br /><br /><br />
            <p className='font-semibold'>3. Remarks and suggestions: </p>
            <br /><br /><br /><br />



            <div className="mr-36">
                <p className="text-right mr-12">Signature </p>
                <p className="text-right">(Head / School Director)</p>
            </div>

            <br /><br />

            <p className="font-semibold">Remarks of the Vice-Chancellor (Adverse remarks as well as remarks of appreciation)</p>
            <br /><br /><br /><br />
            <br /><br /><br /><br />

            <div className="mr-36">
                <p className="text-right mr-7">Signature </p>
                <p className="text-right">(Vice-Chancellor)</p>
            </div>



        </div>
    )
}

export default Instructions