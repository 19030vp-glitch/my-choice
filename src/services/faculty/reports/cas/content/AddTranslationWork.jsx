import { TextField } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { RadioButton } from './AddAuthorBooks'

const AddTranslationWork = ({ setPublicationData, publicationData, work, setWork }) => {

    const publicationTypes = [
        { title: 'Chapter or Research Paper', remark: '03', points: 3 },
        { title: 'Book', remark: '08', points: 8 }
    ]

    useEffect(() => {
        let workSum = 0
        let index = 0;
        if (work) {
            if (work.input === '' || work.input === 0 || work.input === null, work.check === false) {
                setWork({ ...work, points: 0 })
            }
            else {
                for (const key in work.authorType) {
                    if (index !== parseInt(work.input)) {
                        if (work.authorType[key] === 'Chapter or Research Paper') {
                            workSum += 3
                        }
                        else if (work.authorType[key] === 'Book') {
                            workSum += 8
                        }
                        else {
                            workSum += 0
                        }
                        index++
                    }
                }
                setWork({ ...work, points: workSum })
            }
        }
    }, [work?.input, work?.authorType, work?.check])

    return (
        <div className="mt-2">
            <div className="form-check items-center gap-2 ">
                <input className="form-check-input" type="checkbox" value="" id="workInput"
                    onChange={(e) => { setWork({ ...work, check: e.target.checked }) }} checked={work?.check} />
                <label className="form-check-label flex items-center justify-between" htmlFor="workInput">
                    <div>
                        Translation Work
                    </div>
                    <div className='flex items-center justify-end gap-2'>
                        <p>Score : <span className='text-green-900 font-bold'>{work?.check ?
                            work.points : 0}</span> </p>
                    </div>
                </label>
            </div>

            {
                work?.check &&
                <div className="bg-white p-3 rounded-xl mt-3">
                    <div>
                        <label htmlFor="workLabel" className="form-label text-muted">Enter total Translation Work</label>
                        <input type="number" min={0} className="form-control w-full md:w-[8%]" id="workLabel" value={work.input === 0 ? null : work.input} onChange={(e) => { setWork({ ...work, input: e.target.value, }) }} />
                    </div>

                    <div className="mt-3">
                        {
                            [...Array(work.input === '' ? 0 : parseInt(work.input))].map((e, i) =>
                                <div className="flex items-center justify-start gap-3">

                                    <div className='w-[80%] my-3'>
                                        <TextField key={i} id={`work${i}`} fullWidth label="Title" variant="standard" className="my-2"
                                            value={work.titles[`work${i}`] ?
                                                work.titles[`work${i}`] : null}
                                            onChange={(e) => {
                                                setWork({ ...work, titles: { ...work.titles, [e.target.id]: e.target.value } })
                                            }}
                                        />
                                    </div>


                                    <div className='w-[20%]'>
                                        <select className="form-select" id={`workSelect${i}`} required onChange={(e) => { setWork({ ...work, authorType: { ...work.authorType, [`workSelect${i}`]: e.target.value } }) }}

                                            value={work.authorType[`workSelect${i}`] ?
                                                work.authorType[`workSelect${i}`] : null}>

                                            <option selected disabled>Choose Author Type</option>
                                            <option value='Chapter or Research Paper'>Chapter or Research Paper (3)</option>
                                            <option value='Book'>Book (8)</option>

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

export default AddTranslationWork