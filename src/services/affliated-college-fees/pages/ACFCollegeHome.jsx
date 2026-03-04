import React, { useEffect, useState } from 'react'
import GoBack from '../../../components/GoBack'
import siteLinks from '../../../components/siteLinks'
import title from '../../../js/title'
import { useNavigate, useParams } from 'react-router-dom'
import DomainAddRoundedIcon from '@mui/icons-material/DomainAddRounded';
import Footer from '../../../components/Footer'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import ArrowButton from '../../../components/ArrowButton'
import DialogBox from '../../../components/DialogBox'
import Text from '../../../components/formComponents/Text'
import Select from '../../../components/formComponents/Select'
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import editYFProfile from '../../youthfestival/js/editYFProfile'
import { useQuery } from 'react-query'
import { getACFCollegeData } from '../js/acfDataHandler'
import ACFCheckPrograms from '../components/ACFCheckPrograms'
import UserLoading from '../../../pages/UserLoading'
import toast from 'react-hot-toast'

const ACFCollegeHome = () => {
    const navigate = useNavigate()
    const bredLinks = [siteLinks.welcome, siteLinks.acfCollegeHome]
    title(siteLinks.acfCollegeHome.title)
    const model = 'ACFCollege';
    const { collegeCode: paramsCollegeCode, collegeCodeHash } = useParams();
    const link = `/affiliated-college/fee-details/${paramsCollegeCode}/${collegeCodeHash}/select-year`
    const [user, setUser] = useState(null)
    const filter = { collegeCode: paramsCollegeCode, collegeCodeHash }

    const { data: collegeData, isLoading } = useQuery('ACFCollegeData', () => getACFCollegeData(model, filter), { refetchOnWindowFocus: false })

    const [open, setOpen] = useState(false)

    const initialState = { collegeName: "", principalName: "", mobile: "", address: "", district: "", collegeCode: "", programsOffered: [] }
    const [values, setValues] = useState(initialState)
    const { collegeName, principalName, mobile, address, district, collegeCode, programsOffered } = values

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        if (!isLoading) {
            if (collegeData?.data.length === 1) {
                setUser(collegeData.data[0])
                const { _id, ...newObj } = collegeData.data[0]
                setValues(newObj)
            } else {
                navigate('/page-not-found')
            }
        }
    }, [collegeData])

    const onSubmit = (e) => {
        e.preventDefault();

        if (programsOffered.length === 0) {
            toast.error('Select at least one program to proceed');
            return;
        }

        editYFProfile(values, user, setUser, setOpen, model, filter)
    }

    return (
        <div className="min-h-screen">
            <GoBack pageTitle={siteLinks.acfCollegeHome.title} bredLinks={bredLinks} />

            {
                isLoading ? <UserLoading title="Fetching college details" /> : <div className='my-3 border rounded-xl gray animate-fade-up animate-once h-screen'>
                    <div className='p-3'>
                        <div className="flex items-center justify-between p-3 mb-4 text-sm text-blue-800 rounded-lg bg-[#d7d7fa61] " role="alert">
                            <div className="flex items-center flex-auto">
                                <DomainAddRoundedIcon />
                                <span className="sr-only">Info</span>
                                <div>
                                    <span className="font-medium text-xl ml-3">{user?.collegeName}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="bg-[#d7d7fa61] p-3 rounded-lg grid grid-rows-4 gap-2">
                                <div className="flex items-center justify-between">
                                    <p className='font-medium'>College Details</p>
                                    <p className='text-yellow-700 font-medium cursor-pointer' onClick={() => setOpen(true)} >Edit Details</p>
                                </div>
                                <InfoTile icon={<PersonRoundedIcon />} value={user?.principalName} />
                                <InfoTile icon={<MailRoundedIcon />} value={user?.email} />
                                <InfoTile icon={<LocalPhoneRoundedIcon />} value={user?.mobile} />
                                <InfoTile icon={<LocationOnRoundedIcon />} value={`${user?.address}, Dst. ${user?.district}`} />
                                <InfoTile icon={<PasswordRoundedIcon />} value={user?.collegeCode} />
                                <InfoTile icon={<SchoolRoundedIcon />} value={user?.programsOffered?.join(', ') || 'N/A'} />

                            </div>
                            <div className="bg-[#d7d7fa61] rounded-lg p-3">
                                <p className='font-medium'>Instructions to fill Fee Details</p>
                                <div className="text-sm mt-2">
                                    <p>Step 1: Choose Academic Year of which <strong>Fee Details</strong> Form is to be submitted.</p>
                                    <p>Step 2: Among all the programs offered by the College, click on the desired program for which you wish to submit.</p>
                                    <p>Step 3: Start addint the data in the table by clicking on the <strong>+ Add</strong> button. </p>
                                    <p>Step 4: While you're filling the data, you can switch between the program any time.</p>
                                    <p>Step 5: Once you're done with all the programs, finally hit <strong>Submit Details</strong> button to conclude the form. </p>
                                    <p>Step 6: Start filling Fee Details by clicking on the <strong>Fill Data</strong> button below. </p>

                                    <ArrowButton onClickFunction={() => { navigate(link) }} title="Fill Data" className="mt-3" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            }


            <DialogBox isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={handleClose} title="Edit College Details" buttonName="Save Changes">
                <div className="row g-3">
                    <Text className="col-md-6" id="collegeName" value={collegeName} setState={setValues} label="College Name" />
                    <Text className="col-md-3" id="collegeCode" value={collegeCode} setState={setValues} label="College Code" />

                    <Select options={["Nanded", "Latur", "Parbhani", "Hingoli"]} className="col-md-3" id="district" value={district} setState={setValues} label="Distict" />

                    <Text className="col-md-6" id="principalName" value={principalName} setState={setValues} label="Principal Name" />

                    <Text className="col-md-3" id="mobile" value={mobile} setState={setValues} label="Mobile Number" type='number' />

                    <Text className="col-md-9" id="address" value={address} setState={setValues} label="College Address" />

                    <ACFCheckPrograms programsOffered={programsOffered} setValues={setValues} />

                </div>
            </DialogBox>

            <div className="mt-5">
                <Footer />
            </div>


        </div>
    )
}

export default ACFCollegeHome

const InfoTile = ({ icon, value }) => {
    return <p className="flex items-center gap-3">
        <span>{icon} </span> <span>{value}</span>
    </p>
}