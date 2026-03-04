import React from 'react'
import DialogBox from '../../../../../components/DialogBox'

const AgreePopup = ({ agreePopup, setAgreePopup, setTabName, handleNext, fetchYears, duration, casYearState, userDuration }) => {

    let wholeYear = casYearState.toString().slice(0, -3)
    let startYearCount = casYearState.toString().slice(0, -5)
    let lastYearCount = casYearState.toString().slice(5)
    let calculatedDuration = `${duration?.firstYear?.day} ${duration?.firstYear?.month} ${wholeYear} to ${duration?.lastYear?.day} ${duration?.lastYear?.month} ${startYearCount}${lastYearCount}`


    return (
        <DialogBox title="Confirmation" buttonName="Ok, I Agree" isModalOpen={agreePopup} setIsModalOpen={setAgreePopup}
            onClickFunction={() => { setAgreePopup(false); setTabName('first'); handleNext() }} >

            <div className='w-full'>
                <p>Please note that, the data to be fetched from
                    <strong> {fetchYears?.[0]}</strong> & <strong>{fetchYears?.[1]}</strong> should strictly fall under your CAS duration i.e. <br />

                    <p className="text-center mt-2"><span className=" bg-blue-100 rounded-full text-blue-800 font-bold p-1">{calculatedDuration}</span></p>

                </p>

            </div>


        </DialogBox>
    )
}

export default AgreePopup