import React, { useEffect, useState } from 'react'
import Text from '../../../inputs/Text'
import ArrowButton from '../../../components/ArrowButton'
import { fetchInfo, saveGeneralInfo } from '../js/generalInfoHandler'
import { useQuery } from 'react-query'
import UserLoading from '../../../pages/UserLoading'
import Note from '../../director/reports/academic-audit/components/Note'

const GeneralInfo = ({ academicYear, user }) => {
    const [info, setInfo] = useState({ maleName: "", femaleName: "", maleMobile: "", femaleMobile: "", admissionFees: "", dsdFees: "" })


    const filter = { academicYear, college: user?._id }
    const { data, isLoading, refetch } = useQuery(`GeneralInfo-${academicYear}`, () => fetchInfo(filter), { refetchOnWindowFocus: false })

    const saveForm = (e) => {
        e.preventDefault();
        saveGeneralInfo(JSON.stringify(info), academicYear, user)
    }

    useEffect(() => {
        if (data?.data?.status === 'success') {
            setInfo(JSON.parse(data?.data?.data?.info) || {})
        }
    }, [data])

    return (
        <div className='my-3'>
            {isLoading ? <UserLoading title="Fetching Details" /> : <form onSubmit={saveForm}>
                <Note title="तुम्ही फॉर्म बदलल्यानंतर सबमिट बटणावर क्लिक करा, तुमचे बदल अन्यथा दिसून येणार नाहीत." />
                <div className='row grid grid-cols-2'>
                    {
                        formDetails?.map((formDetail) => {
                            return <div className='my-3' key={formDetail.title}>
                                <Text type={formDetail.type ? formDetail.type : 'text'} title={formDetail.title} space='' state={info} setState={setInfo} objectWiseState={true} stateKey={formDetail.stateKey} />
                            </div>
                        })
                    }
                </div>

                <ArrowButton type="submit" className="mt-3" title="Save Form" onClickFunction={saveForm} />

            </form>}
        </div>
    )
}

export default GeneralInfo

const formDetails = [
    {
        title: "संघव्यस्थापकाचे नाव",
        stateKey: "maleName"
    },
    {
        title: "संघव्यस्थापिकेचे नाव",
        stateKey: "femaleName"
    },
    {
        title: "संघव्यस्थापकाचे भ्रमणव्वनी क्रमांक",
        stateKey: "maleMobile"
    },
    {
        title: "संघव्यवस्थापिकाचे भ्रमणव्वनी क्रमांक",
        stateKey: "femaleMobile"
    },
    {
        title: "युवक महोत्सव प्रवेशिका शुल्क पावती क्रमांक",
        stateKey: "admissionFees"
    },
    {
        title: "युवक महोत्सव प्रवेशिका शुल्क पावती दिनांक",
        stateKey: "admissionDate",
        type: 'date'
    },
    {
        title: "विद्यार्थी विकास निधी शुल्क पावती क्रमांक",
        stateKey: "dsdFees"
    },
    {
        title: "विद्यार्थी विकास निधी शुल्क पावती दिनांक",
        stateKey: "dsdDate",
        type: 'date'
    },
]
