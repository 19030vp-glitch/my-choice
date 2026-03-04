import { TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { Remark } from './Teaching'

const AddChapter = ({ publicationData, setPublicationData, chapter, setChapter }) => {


    const chapterEditor = [
        { title: 'Editor of Book by National Publishers', remark: '08', points: 8 },
        { title: 'Editor of Book by International Publishers', remark: '10', points: 10 }
    ]

    useEffect(() => {
        let chapterSum = 0
        let index = 0;
        if (chapter) {
            if (chapter.input === '' || chapter.input === 0 || chapter.input === null || chapter.check === false) {
                setChapter({ ...chapter, points: 0 })
            }
            else {
                for (const key in chapter.editorType) {
                    if (index !== parseInt(chapter.input)) {
                        if (chapter.editorType[key] === 'National') {
                            chapterSum += 8
                        }
                        else if (chapter.editorType[key] === 'International') {
                            chapterSum += 10
                        }
                        else {
                            chapterSum += 0
                        }
                        index++
                    }
                }
                setChapter({ ...chapter, points: chapterSum })
            }
        }
    }, [chapter?.input, chapter?.check, chapter?.editorType])


    return (
        <div className="mt-2">
            <div className="form-check items-center gap-2 ">
                <input className="form-check-input" type="checkbox" value="" id="chapterInput"
                    onChange={(e) => { setChapter({ ...chapter, check: e.target.checked }) }} checked={chapter?.check} />
                <label className="form-check-label flex items-center justify-between" htmlFor="chapterInput">
                    <div>
                        Chapters in Edited Book
                    </div>
                    <div className='flex items-center justify-end gap-2'>
                        <p>Score : <span className='text-green-900 font-bold'>{chapter?.check ?
                            chapter.points : 0}</span> </p>
                    </div>
                </label>
            </div>

            {
                chapter?.check &&
                <div className="bg-white p-3 rounded-xl mt-3">
                    <div>
                        <label htmlFor="chapterLabel" className="form-label text-muted">Enter total Chapter in Edited Books</label>
                        <input type="number" min={0} className="form-control w-full md:w-[8%]" id="chapterLabel" value={chapter.input === 0 ? null : chapter.input} onChange={(e) => { setChapter({ ...chapter, input: e.target.value, }) }} />
                    </div>

                    <div className="mt-3">
                        {
                            [...Array(chapter.input === '' ? 0 : parseInt(chapter.input))].map((e, i) =>
                                <div className="flex items-center justify-start gap-3">

                                    <div className='w-[80%] my-3'>
                                        <TextField key={i} id={`chapter${i}`} fullWidth label="Title" variant="standard" className="my-2"
                                            value={chapter.titles[`chapter${i}`] ?
                                                chapter.titles[`chapter${i}`] : null}
                                            onChange={(e) => {
                                                setChapter({ ...chapter, titles: { ...chapter.titles, [e.target.id]: e.target.value } })
                                            }}
                                        />
                                    </div>


                                    <div className='w-[20%]'>
                                        <select className="form-select" id={`chapterSelect${i}`} required onChange={(e) => { setChapter({ ...chapter, editorType: { ...chapter.editorType, [`chapterSelect${i}`]: e.target.value } }) }}

                                            value={chapter.editorType[`chapterSelect${i}`] ?
                                                chapter.editorType[`chapterSelect${i}`] : null}>

                                            <option selected disabled>Choose Author Type</option>
                                            <option value='National'>National (8)</option>
                                            <option value='International'>International (10)</option>

                                        </select>
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

export default AddChapter




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