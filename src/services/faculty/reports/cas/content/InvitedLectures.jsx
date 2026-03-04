import React, { useEffect } from 'react'
import NumberToTextField from '../components/NumberToTextField'
import { BGPad } from './Teaching'

const InvitedLectures = ({ setInvitedTalks, invitedTalks, casYearState, saveLoader, setSaveLoader }) => {

    const talkCalculator = (calculationProp) => {

        let { item, setState, state, serverData } = calculationProp
        const scoreMapObject = state?.scoreMap

        let newMap = Object.fromEntries(serverData?.data?.data?.map(elem => [elem._id, scoreMapObject?.[elem._id]]));

        serverData?.data?.data?.forEach(item => {
            if (item.isNat === 'State/University') {
                newMap[item._id] = { score: 2, isNat: item.isNat }

            }
            else if (item.isNat === 'National') {
                newMap[item._id] = { score: 3, isNat: item.isNat }

            }
            else if (item.isNat === 'International (within country)') {
                newMap[item._id] = { score: 5, isNat: item.isNat }

            }
            else if (item.isNat === 'International (Abroad)') {
                newMap[item._id] = { score: 7, isNat: item.isNat }

            }
        });


        let grandTotal = 0

        for (const key in newMap) {
            if (newMap[key]?.score && state?.dataMap?.includes(key)) {
                grandTotal += newMap[key].score
            }
        }

        setState((current) => {
            return {
                ...current,
                totalScore: grandTotal,
                scoreMap:
                    { ...newMap },
            }
        })
    }

    return (
        <BGPad classes='mt-3'>
            <div>
                <div className='mt-2 text-sm md:text-base'>


                    <NumberToTextField scoreCalculator={talkCalculator} saveLoader={saveLoader} setSaveLoader={setSaveLoader}
                        facultyTableAvailable="InvitedTalk"
                        state={invitedTalks} setState={setInvitedTalks} casYearState={casYearState}
                        isForm={true} activity="Activity 6 (A)" classes='my-3' model="InvitedTalk" addName="Invited Talk" activityName="Invited Lectures / Resource Person / Paper Presentation in Seminars / Conferences / Full Paper in Conference Proceedings"

                    >

                    </NumberToTextField>

                </div>
            </div>
        </BGPad>
    )
}

export default InvitedLectures

const InvitedTalkPoints = ({ item, setState, state, serverData, scoreCalculator }) => {
    useEffect(() => {
        scoreCalculator({ item, setState, state, serverData })
    }, [])



    return <div>
        International (Abroad) : <strong>07</strong> Points
        <br />
        International (within country) : <strong>05</strong> Points
        <br />
        National : <strong>03</strong> Points
        <br />
        State/University : <strong>02</strong> Points

        <hr className='my-2' />
        Current Type is <strong>{item.isNat}</strong>
    </div>
}

export { InvitedTalkPoints }