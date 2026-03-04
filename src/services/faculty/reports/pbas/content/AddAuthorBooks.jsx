import { TextField } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { Remark } from './Teaching'

const AuthorBooks = ({ setBook, book }) => {

    const authorTypes = [
        {
            title: 'Single', remark: 'Choose',
            singleType: [{ title: 'National', remark: '10', points: 10 },
            { title: 'International', remark: '12', points: 12 }]
        },

        { title: 'Multiple', remark: '05', points: 5 }
    ]

    useEffect(() => {
        let bookSum = 0
        let index = 0;
        if (book) {
            if (book.input === '' || parseInt(book.input) === 0 || book.input === null || book.check === false) {
                setBook({ ...book, points: 0 })
            }
            else {
                for (const key in book.authorType) {
                    if (index !== parseInt(book.input)) {
                        if (book.authorType[key] === 'Single') {
                            if (book.publisherType[`publisher${index}`] === 'National') {
                                bookSum += 10
                            }
                            else if (book.publisherType[`publisher${index}`] === 'International') {
                                bookSum += 12
                            }
                            else {
                                bookSum += 0;
                            }
                        }
                        else {
                            bookSum += 5
                        }
                        index++
                    }
                }
                setBook({ ...book, points: bookSum })
            }
        }
    }, [book?.input, book?.check, book?.authorType, book?.publisherType])




    return (
        <div className="mt-2">
            <div className="form-check items-center gap-2 ">
                <input className="form-check-input" type="checkbox" value="" id="bookInput"
                    onChange={(e) => { setBook({ ...book, check: e.target.checked }) }} checked={book?.check} />
                <label className="form-check-label flex items-center justify-between" htmlFor="bookInput">
                    <div>
                        Authored Books
                    </div>
                    <div className='flex items-center justify-end gap-2'>
                        <p>Score : <span className='text-green-900 font-bold'>{book?.check ?
                            book.points : 0}</span> </p>
                    </div>
                </label>
            </div>

            {
                book?.check &&
                <div className="bg-white p-3 rounded-xl mt-3">
                    <div>
                        <label htmlFor="bookLabel" className="form-label text-muted">Enter total Books Authored</label>
                        <input type="number" min={0} className="form-control w-full md:w-[8%]" id="bookLabel" value={book.input === 0 ? null : book.input} onChange={(e) => { setBook({ ...book, input: e.target.value, }) }} />
                    </div>

                    <div className="mt-3">
                        {
                            [...Array(book.input === '' ? 0 : parseInt(book.input))].map((e, i) =>
                                <div className="flex items-center justify-start gap-3">

                                    <div className='w-full md:w-[50%] my-3'>
                                        <TextField key={i} id={`book${i}`} fullWidth label="Title" variant="standard" className="my-2"
                                            value={book.titles[`book${i}`] ?
                                                book.titles[`book${i}`] : null}
                                            onChange={(e) => {
                                                setBook({ ...book, titles: { ...book.titles, [e.target.id]: e.target.value } })
                                            }}
                                        />
                                    </div>









                                </div>
                            )
                        }
                    </div>

                </div>
            }
        </div>
    )
}

export default AuthorBooks




const RadioButton = ({ id, name, action, item }) => {
    return (
        <div className="form-check my-1">
            <input className="form-check-input" type="radio" name={name} id={`${item.title}${id}`}
                onClick={() => { action() }} required />
            <label className="form-check-label flex items-center justify-between" htmlFor={`${item.title}${id}`}>
                {item.title}
                <Remark title={item.remark} color='blue' />
            </label>
        </div>
    )
}


export { RadioButton }