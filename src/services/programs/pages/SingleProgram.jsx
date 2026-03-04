import React, { useEffect, useState } from 'react'
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import ContactMailRoundedIcon from '@mui/icons-material/ContactMailRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import GoBack from '../../../components/GoBack';
import siteLinks from '../../../components/siteLinks';
import { fetchPrograms } from '../js/fetchPrograms';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Footer from '../../../components/Footer';
import UserLoading from '../../../pages/UserLoading';
import title from '../../../js/title';
import ProgramTitle from '../components/ProgramTitle';

const SingleProgram = () => {
    const navigate = useNavigate();

    const { programId } = useParams();
    const [program, setProgram] = useState(null);

    const params = { filter: { _id: programId }, singleItem: true };
    const { data, isLoading } = useQuery(['SingleProgram', programId], () => fetchPrograms(params));

    useEffect(() => {
        if (data?.data?.data === null) {
            navigate(siteLinks.programs.link);
        } else {
            setProgram(data?.data?.data);
        }
    }, [data]);


    let bredLinks = [siteLinks.welcome, siteLinks.programs, { title: program?.title ? `${program?.title?.slice(0, 40)}...` : 'Loading Program', url: "" }];

    title(program?.title ? `${program?.title?.slice(0, 40)}...` : 'Loading Program')



    return (
        <div>
            <GoBack pageTitle="Program Details" bredLinks={bredLinks} />

            <div className=' h-screen'>
                {
                    isLoading ?
                        <UserLoading title="Fetching the program details" />
                        :
                        <div className='animate-fade-up animate-once'>
                            <div className="mt-4">
                                <ProgramTitle program={program} />
                            </div>

                            <ul class="grid w-full gap-2 sm:gap-4 md:grid-cols-3 sm:grid-cols-2 mt-4">
                                <DetailTile program={program} id="flyer" title="See Program Brochure / Flyer" />
                                <DetailTile program={program} id="participants" title="Participant Details" />
                                <DetailTile program={program} id="email" title="Send Email to Participants" />
                                <DetailTile program={program} id="feedback" title="Program Feedback" />
                                <DetailTile program={program} id="report" title="Upload Program Report" />
                                <DetailTile program={program} id="photos" title="Upload Program Photos" />
                            </ul>
                        </div>
                }
            </div>

            <div className="mt-5">
                <Footer />
            </div>
        </div>
    )
}

export default SingleProgram

const DetailTile = ({ id, title, program }) => {

    const navigate = useNavigate();


    let icons = {
        flyer: { icon: <ArticleRoundedIcon />, url: `/program/${program?._id}/program-flyer` },
        participants: { icon: <GroupsRoundedIcon />, url: `/program/${program?._id}/registration-details` },
        email: { icon: <ContactMailRoundedIcon />, url: `/program/${program?._id}/email-participants` },
        feedback: { icon: <MessageRoundedIcon />, url: `/program/${program?._id}/feedback-details` },
        report: { icon: <PictureAsPdfRoundedIcon />, url: `/program/${program?._id}/upload-program-report` },
        photos: { icon: <AddAPhotoRoundedIcon />, url: `/program/${program?._id}/upload-program-photos` }
    }




    return <li onClick={() => navigate(icons[id].url)} >
        <label htmlFor="react-option" className="inline-flex items-center justify-between w-full p-3 text-gray-700 border-2 border-gray-400 rounded-lg cursor-pointer  hover:text-gray-600">
            <div className="w-full flex items-start gap-2 sm:text-base text-sm"> {icons[id].icon} {title}</div>
        </label>
    </li>
}
