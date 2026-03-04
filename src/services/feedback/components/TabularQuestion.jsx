import React from 'react'

const TabularQuestion = () => {
    return (
        <div className='my-5'>
            <div className='table-responsive'>
                <table className="table table-striped mx-auto align-middle">
                    <thead>
                        <tr className='p-3'>
                            <td>Query</td>
                            <td className='whitespace-nowrap text-center'>Very Good</td>
                            <td className='whitespace-nowrap text-center'>Good</td>
                            <td className='whitespace-nowrap text-center'>Satisfactory</td>
                            <td className='whitespace-nowrap text-center'>Un-Satisfactory</td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className='p-3'>
                            <td className="w-20"> The teacher is generally well-organized and prepared for class.	</td>
                            <RadioButton />
                            <RadioButton />
                            <RadioButton />
                            <RadioButton />

                        </tr>
                        <tr className='p-3'>
                            <td className="w-20">Knowledge base of the teacher (as perceived by you)	</td>
                            <RadioButton />
                            <RadioButton />
                            <RadioButton />
                            <RadioButton />
                        </tr>
                        <tr className='p-3'>
                            <td className="w-20">Communication skills (in terms of articulation and comprehensibility)</td>
                            <RadioButton />
                            <RadioButton />
                            <RadioButton />
                            <RadioButton />
                        </tr>
                        <tr className='p-3'>
                            <td className="w-20">Ability to integrate content with other courses	</td>
                            <RadioButton />
                            <RadioButton />
                            <RadioButton />
                            <RadioButton />
                        </tr>
                        <tr className='p-3'>
                            <td className="w-20">Provision of sufficient time for feedback</td>
                            <RadioButton />
                            <RadioButton />
                            <RadioButton />
                            <RadioButton />
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TabularQuestion


const RadioButton = () => {
    return <td className="text-center" ><input className="form-check-input cursor-pointer w-5 h-5" type="radio" name="flexRadioDefault" id="flexRadioDefault1" /></td>
}