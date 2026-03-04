/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "react-query"
import { getACFCollegeData } from "../js/acfDataHandler"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GoBack from "../../../components/GoBack";
import title from "../../../js/title";
import ACFNavbar from "./ACFNavbar";
import UserLoading from "../../../pages/UserLoading";
import Footer from "../../../components/Footer";
import ACFTable from "./ACFTable";
import siteLinks from "../../../components/siteLinks";

const ACFFillDetails = ({ authenticate = true, customFilter = null, customAcademicYear = null, showAddButton = true }) => {
    const model = 'ACFCollege'
    const pageTitle = 'Fee Details for Affiliated College'
    const { collegeCode: paramsCollegeCode, collegeCodeHash, academicYear: paramsAcademicYear } = useParams();
    const academicYear = customAcademicYear || paramsAcademicYear
    const filter = customFilter || { collegeCode: paramsCollegeCode, collegeCodeHash }
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const { data: collegeData, isLoading } = useQuery(`ACFCollegeData-${filter.collegeCode}`, () => getACFCollegeData(model, filter), {
        refetchOnWindowFocus: false, staleTime: Infinity
    })
    const [currentProgram, setCurrentProgram] = useState(null)


    useEffect(() => {

        if (!isLoading) {
            if (collegeData?.data.length === 1) {
                setUser(collegeData.data[0])
                setCurrentProgram(collegeData.data[0]?.programsOffered[0] || null)
            } else {
                if (authenticate) {
                    navigate('/page-not-found')
                }
            }
        }
    }, [collegeData])

    const bredLinks = [siteLinks.welcome, { ...siteLinks.acfCollegeHome, link: -1 }, { title: "Select Academic Year", link: -1 }, { title: `Fill Fee Data for ${academicYear}` }]
    title(pageTitle)

    return (
        <div>
            <div className="min-h-screen">
                {authenticate && <GoBack bredLinks={bredLinks} pageTitle={`Fee Details for ${user?.collegeName} (${academicYear})`} />}

                {
                    isLoading ? <UserLoading title="Authenticating & fetching college details" />
                        : <div>
                            <div className="my-4 sticky-top">
                                <ACFNavbar setCurrentProgram={setCurrentProgram} currentProgram={currentProgram}
                                    programsOffered={user?.programsOffered} showSubmitButton={authenticate} />
                            </div>

                            {collegeData.data[0] && <div>
                                <ACFTable showAddButton={showAddButton} programName={currentProgram}
                                    collegeCode={paramsCollegeCode} academicYear={academicYear}
                                    userId={collegeData.data[0]?._id} />
                            </div>}
                        </div>
                }

            </div>
            {authenticate && <Footer />}
        </div>
    )
}

export default ACFFillDetails
