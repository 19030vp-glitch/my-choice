import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import GoBack from "../../../components/GoBack";
import title from "../../../js/title";
import Year from "../../../inputs/Year";
import { SaveButton } from "../../faculty/reports/cas/CasReportHome";
import toast from "react-hot-toast";
import Footer from "../../../components/Footer";
import siteLinks from "../../../components/siteLinks";

const ACFSelectYear = () => {
    const pageTitle = 'Select Academic Year'
    const { collegeCode: paramsCollegeCode, collegeCodeHash } = useParams();
    const navigate = useNavigate()
    const [academicYear, setAcademicYear] = useState(null)
    const link = `/affiliated-college/fee-details/${paramsCollegeCode}/${collegeCodeHash}/${academicYear}/fill-details`
    title(pageTitle)
    const bredLinks = [siteLinks.welcome, { ...siteLinks.acfCollegeHome, link: -1 }, { title: "Select Academic Year" }]


    return (
        <div>
            <div className='min-h-screen'>
                <GoBack pageTitle={pageTitle} bredLinks={bredLinks} />

                <div className='mx-auto flex items-center text-center justify-center my-5'>
                    <Year state={academicYear} setState={setAcademicYear} space='col-md-3'
                        title="Choose Academic Year" />
                </div>
                <div className='mx-auto flex items-center justify-center'>
                    <SaveButton title={`Save and Proceed`} onClickFunction={() => {
                        if (academicYear) {
                            navigate(link)
                        } else {
                            toast.error('Select Academic Year before you proceed.')
                        }
                    }} />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ACFSelectYear
