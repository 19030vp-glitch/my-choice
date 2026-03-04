import React from 'react'
import { useQuery } from 'react-query'
import { deleteCompetitions, fetchYouthData } from '../js/competitionHandler'
import UserLoading from '../../../pages/UserLoading'
import { Empty, Popconfirm } from 'antd'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { IconButton } from '@mui/material'



const CompetitionList = ({ setCompId, setEdit, isGroup, isLoading, data, setCompDetails, refetch }) => {
    const thead = ["स्पर्धकाचे नाव", "कायमचा पत्ता", "भ्रमणध्वनी क्रमांक", "लिंग", "जन्म दिनांक", "वय", "रक्त गट"]
    const accessor = ['ParticpantName', 'permentAddress', 'mobileNo', 'gender', 'dob', 'age', 'bloodGroup']
    const groupMaximumParticipationsList = {

    }

    const editItem = (item) => {
        if (!isGroup) {
            setCompDetails({ competitionName: item?.competitionName })
        } else {
            setEdit(true);
            setCompId(item?._id);
            setCompDetails({ competitionName: item?.competitionName })
        }
    }

    return (
        <div>
            {
                isLoading ?
                    <UserLoading title="Fetching Data" />
                    :
                    data?.length > 0 ?
                        <div className="table-responsive">
                            <p className="mt-4 mb-2">निवडलेले सर्व स्पर्धा आणि विद्यार्थी </p>
                            <table className='table table-bordered'>
                                <thead className='bg-primary text-light'>
                                    <tr>
                                        <th>क्रमांक</th>
                                        <th>स्पर्धेचे नाव</th>
                                        <th>Action</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {
                                        data?.map((item, index) => {
                                            return <tr>
                                                <th>{index + 1}</th>
                                                <td className='p-2'>
                                                    <table className="table table-sm text-sm caption-top table-bordered">
                                                        <caption className="text-black font-bold">{item?.competitionName}</caption>
                                                        <thead className='bg-primary text-light'>
                                                            <tr>
                                                                <th>क्रमांक</th>

                                                                {
                                                                    thead.map((head) => {
                                                                        return <th>{head}</th>
                                                                    })
                                                                }

                                                            </tr>

                                                        </thead>
                                                        <tbody>

                                                            {
                                                                item?.students?.map((student, i) => {
                                                                    return <tr>

                                                                        <th>{i + 1}</th>
                                                                        {accessor?.map((get) => {
                                                                            return <td> {student?.[get]} </td>
                                                                        })}
                                                                    </tr>
                                                                })
                                                            }




                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td>
                                                    <div>
                                                        <IconButton onClick={() => editItem(item)}><EditRoundedIcon sx={{ fontSize: '18px' }} /></IconButton>
                                                        <Popconfirm
                                                            title="तुम्हाला खात्री आहे, की तुम्ही ही स्पर्धा डिलिट करू इच्छिता?"
                                                            onConfirm={() => deleteCompetitions(item?._id, refetch)}
                                                            onCancel={() => { }}
                                                            okText="हो, डिलिट करा"
                                                            cancelText="नाही, कॅन्सल करा"
                                                            okButtonProps={{ "type": "default" }}>
                                                            <IconButton>
                                                                <DeleteRoundedIcon sx={{ fontSize: '20px' }} />
                                                            </IconButton>
                                                        </Popconfirm>
                                                    </div>
                                                </td>
                                            </tr>
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                        : <div className="my-3">
                            <Empty description={isGroup ? "अद्याप कोणतीही गट स्पर्धा जोडलेली नाही, स्पर्धा जोडल्यानंतर येथे दिसतील." : "अद्याप कोणतीही वैयक्तिक स्पर्धा जोडलेली नाही, स्पर्धा जोडल्यानंतर येथे दिसतील."} />
                        </div>
            }

        </div >
    )
}

export default CompetitionList
