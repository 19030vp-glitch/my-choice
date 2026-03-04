import { Link, useNavigate, useParams } from "react-router-dom"
import { proposalData } from "./USHACards"
import toast from "react-hot-toast"
import { Suspense, useEffect } from "react"
import authParamsObject from "../../../js/authParamsObject"
import useOtherServiceAuth from "../../../hooks/useOtherServiceAuth"
import GoBack from "../../../components/GoBack"
import siteLinks from "../../../components/siteLinks"
import Footer from "../../../components/Footer"
import ArrowButton from "../../../components/ArrowButton"
import title from "../../../js/title"
import { lazy } from "react"
import UserLoading from "../../../pages/UserLoading"

const USHADetails = lazy(() => import('../components/USHADetails'))


const USHATabDetails = () => {
    const ushaAuthParams = authParamsObject.usha
    useOtherServiceAuth({ ...ushaAuthParams, shouldNavigate: false })
    const { tabName } = useParams()
    const navigate = useNavigate()
    const tabDetails = proposalData[tabName]



    useEffect(() => {
        if (!tabDetails) {
            toast.error("Invalid URL")
            navigate('/page-not-found', { replace: true })
        }
    }, [navigate, tabDetails, tabName])

    const breds = [siteLinks.welcome, siteLinks.ushaHome,
    { title: `${tabDetails.title} Details`, link: `/pm-usha/${tabName}/details` }]
    title(`${tabDetails.title} Details`)
    return (
        <div>
            <div className="min-h-screen">
                <GoBack pageTitle={tabDetails.description} bredLinks={breds} />

                <div className="mt-4 flex items-center justify-between animate-once animate-fade-up">
                    <div className={`flex items-center gap-2 font-semibold text-blue-700 text-2xl`}>
                        <span className="text-5xl">{`(${tabDetails.id})`}</span>
                        <div>
                            <p className="mt-2 font-bold">{tabDetails.title} Details</p>
                            <p className="text-sm italic">{tabDetails.annexure}</p>
                        </div></div>

                    <Link to={`/pm-usha/${tabName}/status`}><ArrowButton title="Proceed to Status Details" /></Link>
                </div>

                <div className="mt-4">
                    <Suspense fallback={<UserLoading title={`Fetching ${tabDetails.title} details...`} />}>
                        <USHADetails id={tabDetails.id} />
                    </Suspense>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default USHATabDetails
