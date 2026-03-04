import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Remark } from './Teaching'

const InvitedLectures = ({ setInvitedTalks, invitedTalks, changeResearch, tabName, serverCasData, casYearState }) => {
    const [inviteds, setinviteds] = useState({ input: 0, invitedsCheck: false, titles: {}, noOfCredits: {}, points: 0 })


    useEffect(() => {
        let invitedsSum = 0
        let index = 0;
        if (inviteds.input === '' || inviteds.input === 0 || inviteds.input === null || inviteds.check === false) {
            setinviteds({ ...inviteds, points: 0 })
        }
        else {
            for (const key in inviteds.noOfCredits) {
                if (index !== parseInt(inviteds.input)) {
                    if (inviteds.noOfCredits[key] === "International (Within Country)") {
                        invitedsSum = invitedsSum + 5
                    }
                    else if (inviteds.noOfCredits[key] === "International (Abroad)") {
                        invitedsSum = invitedsSum + 7
                    }
                    else if (inviteds.noOfCredits[key] === "National") {
                        invitedsSum = invitedsSum + 3
                    }
                    else {
                        invitedsSum = invitedsSum + 2
                    }
                    index++
                }
            }
            setinviteds({ ...inviteds, points: invitedsSum })
        }

    }, [inviteds.noOfCredits, inviteds.input, inviteds.check])

    useEffect(() => {
        setInvitedTalks({ ...invitedTalks, invitedTalks: inviteds })
    }, [inviteds])

    useEffect(() => {
        if (!changeResearch) {
            setinviteds(serverCasData?.academicData.invitedTalks.invitedTalks == undefined ? inviteds && inviteds : serverCasData?.academicData.invitedTalks.invitedTalks)
        }
    }, [tabName])

    useEffect(() => {
        setinviteds({ input: 0, invitedsCheck: false, titles: {}, noOfCredits: {}, points: 0 })
    }, [casYearState])


    return (
        <div className='text-base mt-3'>

            {/* PART A : inviteds */}
            <div className='mt-4'>





                <div className='mt-2'>

                    <div className="">
                        <div className="form-check items-center gap-2 ">
                            <input className="form-check-input" type="checkbox" value="" id="invitedcheckbox"
                                onChange={(e) => { setinviteds({ ...inviteds, invitedsCheck: e.target.checked }) }} checked={inviteds.invitedsCheck} />
                            <label className="form-check-label flex items-center justify-between" htmlFor="invitedcheckbox">
                                <div>
                                    Invited Talks, Lectures and Conferences
                                </div>
                                <div className='flex items-center justify-end gap-2'>
                                    <Remark title='Choose' color='blue' />
                                    <p>Score : <span className='text-green-900 font-bold'>{inviteds.invitedsCheck ?
                                        inviteds.points : 0}</span> </p>
                                </div>
                            </label>
                        </div>

                        {
                            inviteds.invitedsCheck &&
                            <div className="bg-white p-3 rounded-xl mt-3">
                                <div>
                                    <label htmlFor="invitedscheckinput" className="form-label text-muted">Enter Total no of Invited Talks, Lectures and Conferences</label>
                                    <input type="number" min={0} className="form-control w-full md:w-[8%]" id="invitedscheckinput" value={inviteds.input === 0 ? null : inviteds.input} onChange={(e) => { setinviteds({ ...inviteds, input: e.target.value, }) }} />
                                </div>

                                <div className="mt-3">
                                    {
                                        [...Array(inviteds.input === '' ? 0 : parseInt(inviteds.input))].map((e, i) =>
                                            <div className="flex items-center justify-center gap-10">

                                                <div className='w-[80%]'>
                                                    <TextField key={i} id={`inviteds${i}`} fullWidth label="Title" variant="standard" className="my-2"
                                                        value={inviteds.titles[`inviteds${i}`] ?
                                                            inviteds.titles[`inviteds${i}`] : null}
                                                        onChange={(e) => {
                                                            setinviteds({ ...inviteds, titles: { ...inviteds.titles, [e.target.id]: e.target.value } })
                                                        }}
                                                    />
                                                </div>


                                                <div className='w-[20%]'>
                                                    <select className="form-select" id={`invitedsSelect${i}`} required onChange={(e) => { setinviteds({ ...inviteds, noOfCredits: { ...inviteds.noOfCredits, [`invitedsSelect${i}`]: e.target.value } }) }}

                                                        value={inviteds.noOfCredits[`invitedsSelect${i}`] ?
                                                            inviteds.noOfCredits[`invitedsSelect${i}`] : null}>

                                                        <option selected disabled>Choose Type</option>
                                                        <option value="State">State / University (2)</option>
                                                        <option value="National">National (3)</option>
                                                        <option value="International (Within Country)">International (Within Country) (5)</option>
                                                        <option value="International (Abroad)">International (Abroad) (7)</option>

                                                    </select>
                                                </div>


                                            </div>
                                        )
                                    }
                                </div>

                            </div>
                        }
                    </div>


                </div>
            </div>
        </div>
    )
}

export default InvitedLectures