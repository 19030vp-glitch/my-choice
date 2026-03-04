import React from 'react'

const QuestionHandler = ({ question, formData, setFormData, dynamicQuestion = false, dynamicValue }) => {


    return (
        <div>
            {
                question.type === 'text' && <div className="mb-5 bg-blue-50 rounded-md p-2 border-t-4 border-t-blue-500" id={dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question} >
                    <div className="w-full">
                        <label htmlFor={`${question.question}`} className="form-label font-semibold">{dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question}</label>

                        <input type="text" value={formData?.[dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question] ? formData[dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question] : null}
                            onChange={(e) => { setFormData({ ...formData, [dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question]: e.target.value }) }} className="form-control w-full" id={`${question.question}`} placeholder="Your answer" />

                    </div>
                </div>
            }

            {
                question.type === 'date' && <div className="mb-5 bg-blue-50 rounded-md p-2 border-t-4 border-t-blue-500" id={dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question} >
                    <div className="w-full">
                        <label htmlFor={`${question.question}`} className="form-label font-semibold">{dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question}</label>
                        <input type="date" value={formData?.[dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question] ? formData[dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question] : null}
                            onChange={(e) => { setFormData({ ...formData, [dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question]: e.target.value }) }} className="form-control w-full" id={`${question.question}`} placeholder="Your answer" />
                    </div>
                </div>
            }

            {
                question.type === 'radio' && <div className="mb-5 bg-blue-50 rounded-md p-2 border-t-4 border-t-blue-500" id={dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question}>
                    <p className='my-2 font-semibold'>{dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question}</p>
                    <div className="form-check">
                        {
                            question.options?.map((option) => {
                                return <div>
                                    <input
                                        checked={formData && formData[dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question] && formData[dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question] === option}

                                        className="form-check-input" type="radio" name={dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question} id={`${dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question}-${option}`} value={option} onChange={(e) => { setFormData({ ...formData, [dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question]: e.target.value }) }} />

                                    <label className="form-check-label" htmlFor={`${dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question}-${option}`} >
                                        {option}
                                    </label>
                                </div>
                            })
                        }
                    </div>
                </div>
            }

            {
                question.type === 'check' && <div className="mb-5 bg-blue-50 rounded-md p-2 border-t-4 border-t-blue-500" id={dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question} >
                    <p className='my-2 font-semibold'>{dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question}</p>
                    <div className="form-check">
                        {
                            question.options.map((option) => {
                                return <div>
                                    <input
                                        checked={formData && formData[dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question] && formData[dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question].includes(option)}

                                        className="form-check-input" type="checkbox" name={dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question} id={`${dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question}-${option}`} value={option} onChange={(e) => {
                                            if (e.target.checked) {


                                                if (formData[dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question]?.length > 0) {
                                                    setFormData({ ...formData, [dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question]: [...formData[dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question], option] })
                                                } else {
                                                    setFormData({ ...formData, [dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question]: [option] })
                                                }
                                            } else {
                                                setFormData({ ...formData, [dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question]: formData[dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question].filter((newOption) => newOption !== option) })
                                            }


                                        }} />

                                    <label className="form-check-label" htmlFor={`${dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question}-${option}`}>
                                        {option}
                                    </label>
                                </div>
                            })
                        }
                    </div>

                    <p className="text-muted text-xs mt-3">You can choose multiple options</p>
                </div>
            }

            {
                question.type === 'table' && <div className="mb-5 bg-blue-50 rounded-md p-2 border-t-4 border-t-blue-500" id={dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question}>
                    <p className='my-2 font-semibold'>{dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question}</p>

                    <div className='table-responsive'>
                        <table className="table mx-auto align-middle">
                            <thead className='sticky top-0 bg-white'>
                                <tr className='p-3'>
                                    <td></td>
                                    {question.head.map((head) => (
                                        <td key={head} className='whitespace-nowrap text-center'>{head}</td>
                                    ))}
                                </tr>

                            </thead>


                            <tbody>
                                {question.cell.map((cell) => (
                                    <tr key={cell}>
                                        <td className="w-20">{cell}</td>
                                        {question.head.map((head) => (
                                            <td key={head} className='text-center'>
                                                <input
                                                    required={question.required ? true : false}
                                                    type="radio"
                                                    className="form-check-input w-6 h-6 cursor-pointer"
                                                    name={`${dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question}-${cell}`}
                                                    value={head}
                                                    checked={formData && formData[dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question] && formData[dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question][cell] === head}



                                                    onChange={() => {
                                                        setFormData((prevFormData) => ({
                                                            ...prevFormData,
                                                            [dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question]: {
                                                                ...prevFormData[dynamicQuestion ? `${question.question} ${dynamicValue}` : question.question],
                                                                [cell]: head,
                                                            },
                                                        }));
                                                    }}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            }

        </div>
    )
}

export default QuestionHandler

const TableRadioButton = () => {
    return <td className="text-center" ><input className="form-check-input cursor-pointer w-5 h-5" type="radio" name="flexRadioDefault" id="flexRadioDefault1" /></td>
}

