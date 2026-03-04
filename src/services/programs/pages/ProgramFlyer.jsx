import React, { useEffect, useState } from 'react';
import GoBack from '../../../components/GoBack';
import siteLinks from '../../../components/siteLinks';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchPrograms } from '../js/fetchPrograms';
import { useQuery } from 'react-query';
import UserLoading from '../../../pages/UserLoading';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import QRCode from 'react-qr-code';
import Footer from '../../../components/Footer';
import ContactMailRoundedIcon from '@mui/icons-material/ContactMailRounded';
import serverLinks from '../../../js/serverLinks';
import title from '../../../js/title';
import ProgramHeader from '../components/ProgramHeader';

const ProgramFlyer = () => {
    const navigate = useNavigate();
    const { programId } = useParams();
    const [program, setProgram] = useState(null);

    const params = { filter: { _id: programId }, singleItem: true };
    const { data, isLoading } = useQuery(['SingleProgram', programId], () => fetchPrograms(params), {
        staleTime: 60000,
        cacheTime: 60000,
    });

    useEffect(() => {

        if (data?.data?.data === null) {
            navigate(siteLinks.programs.link);
        } else {
            setProgram(data?.data?.data);
        }
    }, [data]);

    let bredLinks = [siteLinks.welcome, siteLinks.programs,
    { title: program?.title ? `${program?.title?.slice(0, 40)}...` : 'Loading Program...', link: `/program/${programId}` }, { title: "Brochure / Flyer", url: "" }];



    title(program?.title ? `${program?.title?.slice(0, 40)}...` : 'Loading Program')

    return (
        <div>
            <GoBack backUrl={-1} pageTitle="Program Brochure / Flyer" bredLinks={bredLinks} />
            <div className="animate-fade-up animate-once">
                {isLoading ? (
                    <UserLoading title="Fetching Program Details" />
                ) : (
                    <section className='rounded-xl bg-cover bg-no-repeat mt-3' style={{ backgroundImage: "url('/assets/programHeroBG.png')" }} >
                        <div className="py-3 ">
                            <ProgramHeader />
                        </div>
                        <div className="pb-3 text-white px-4 mx-auto max-w-screen-xl text-center z-10 relative">
                            <div className='text-blue-900'>
                                <p className="mt-3 mb-2 text-lg font-bold ">{program?.prefix}</p>
                                <h1 className="mb-2 text-xl font-semibold sm:font-extrabold sm:tracking-tight leading-none md:text-3xl lg:text-4xl">{program?.title}</h1>
                                <i className="mb-2 text-xl font-semibold sm:font-extrabold sm:tracking-tight leading-none md:text-2xl underline lg:text-3xl">{program?.programDate}</i>


                                <div className="my-3 ">
                                    <p className="text-sm">Organized by </p> <b className="text-lg">{program?.arrangedBy}</b>
                                </div>
                            </div>

                            <div className='md:grid grid-cols-9 gap-4 mt-5'>
                                <div className="col-span-4">
                                    <Cards id="About" title="Theme of the Program" text={program?.summary} />
                                    <Cards id="About" title="Objectives of the Program">
                                        <div className="lg:text-lg md:text-base sm:text-xs text-justify hyphens-auto">
                                            1. Importance of developing MOOCs <br />
                                            2. Different agencies developing MOOCs<br />
                                            3. Eligibility to develop MOOCs<br />
                                            4. Structure of MOOCs<br />
                                        </div>

                                    </Cards>

                                    <Cards id="About" title="Resource Person" >
                                        <div>
                                            <div className="grid sm:grid-cols-3 gap-3 my-3">
                                                <div className="col-span-2 text-left">
                                                    <p className="text-lg font-bold">{program?.pName}</p>
                                                    <p className="font-medium">{program?.pDesignation}</p>
                                                    <p className="font-medium">{program?.pAddress.split(',').map((part, index) => (
                                                        <React.Fragment key={index}>
                                                            {index > 0 && <br />}
                                                            {part}
                                                        </React.Fragment>
                                                    ))}</p>
                                                </div>
                                                <img className="md:w-24 md:h-24 w-14 h-14 rounded object-cover"
                                                    src={serverLinks.showFile(program?.pPhotoURL, "program")}
                                                    alt="Large avatar"></img>

                                            </div>
                                            <hr />
                                            <div className="mt-2">
                                                <p className="text-lg  text-justify hyphens-auto">
                                                    {program?.pSummary}
                                                </p>
                                            </div>
                                        </div>
                                    </Cards>
                                </div>

                                <div className="col-span-5">
                                    <div>
                                        <div className="grid grid-cols-2 gap-x-2">
                                            <Info color="blue" >
                                                <div>
                                                    <p>Last date of Registration:</p> <b>{program?.finalRegistrationDate}</b><br />
                                                    <Link to={`/program/${programId}/registration-form`} type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg mt-2 text-xs px-4 py-1 text-center inline-flex items-center">
                                                        Register Now
                                                        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </Info>
                                            <Info color="blue" >

                                                <p>Program Venue:</p><b>{program?.venue}</b><br />
                                                <a href="https://www.google.com/maps/place/Swami+Ramanand+Teerth+Marathwada+University,+Nanded/@19.102273,77.2827441,1524m/data=!3m1!1e3!4m6!3m5!1s0x3bce298abb43ab1d:0x4f9b6277bce2a8e1!8m2!3d19.102196!4d77.2843176!16s%2Fm%2F03c3737?entry=ttu" type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg mt-2 text-xs px-4 py-1 text-center inline-flex items-center" target='_blank'>
                                                    Locate Venue
                                                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                    </svg>
                                                </a>
                                            </Info>
                                        </div>

                                        <Cards color="About" title="Who can participate?" >
                                            <p className="text-base">{program?.whoCanParticipate}</p>
                                        </Cards>

                                        <Cards id="Reg" title="Registration Details" program={program} programId={programId} />
                                        {/* <div className="grid grid-cols-2 gap-x-2"> */}
                                        <Cards id="about" title="Chief Patron" >
                                            <div className="text-center">
                                                <b className='text-base'>Dr. Udhav Bhosle</b>
                                                <p>Vice-Chancellor, SRTMUN</p>
                                            </div>
                                        </Cards>
                                        <Cards id="about" title="Patron" >
                                            <div className="text-center">
                                                <b className='text-base'>Dr. Jogendrasingh Bisen</b>
                                                <p>Pro-Vice-Chancellor, SRTMUN</p>
                                            </div>
                                        </Cards>
                                        {/* </div> */}
                                        <Cards id="blue" title="Advisors" >
                                            <div>
                                                <div className="grid grid-cols-2 gap-x-2 mt-3 text-center">
                                                    <div>
                                                        <b className="text-base">Dr. M. K. Patil </b>
                                                        <p>Dean,</p>
                                                        <p> Faculty of Science and Technology, <br /> SRTMUN </p>
                                                    </div>
                                                    <div>
                                                        <b className="text-base">Dr. D. M. Khandare </b>
                                                        <p>Dean,</p>
                                                        <p> Faculty of Commerce and Management, <br /> SRTMUN</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Cards>
                                        <div className="grid grid-cols-2 gap-x-2">
                                            <Cards id="blue" title="Convenor" >
                                                <div className="text-center">
                                                    <b className='text-base'>Dr. D. D. Pawar</b>
                                                    <p>Director, IQAC</p>
                                                    <p>&</p>
                                                    <p>School of Mathematical Sciences</p>
                                                </div>
                                            </Cards>
                                            <Cards id="blue" title="Organizing Secretary" >
                                                <div className="text-center">
                                                    <b className='text-base'>Dr. B. Surendranath Reddy</b>
                                                    <p>Associate Director, IQAC, SRTMUN</p>
                                                    <p>Email: {program?.cEmail1}</p>
                                                    <p>Phone: {program?.cPhone1}</p>
                                                </div>
                                            </Cards>
                                        </div>

                                        {/* <Cards id="About" title="Contact Details">
                                            <div class="mt-2 mb-4 text-sm text-left">
                                                <div>
                                                    <div class="grid grid-cols-2">

                                                        {
                                                            program?.cName0 && <div class="text-blue-900">
                                                                <div class="text-sm font-normal">{program?.cName0}</div>
                                                                <div class="text-sm font-normal">{program?.cPosition0}</div>
                                                                <div class="text-sm font-normal">Email: {program?.cEmail0}</div>
                                                                <div class="text-sm font-normal">Phone: {program?.cPhone0}</div>
                                                            </div>
                                                        }
                                                        {
                                                            program?.cName1 && <div class="text-blue-900">
                                                                <div class="text-sm font-normal">{program?.cName1}</div>
                                                                <div class="text-sm font-normal">{program?.cPosition1}</div>
                                                                <div class="text-sm font-normal">Email: {program?.cEmail1}</div>
                                                                <div class="text-sm font-normal">Phone: {program?.cPhone1}</div>
                                                            </div>
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </Cards> */}

                                    </div>
                                </div>
                            </div>


                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ProgramFlyer;

const Info = ({ color, children }) => {
    return <div id="alert-border-1" className={`rounded-md text-center p-4 mb-2 text-${color}-800 border-l-2 border-r-2 border-b-2 border-t-4 bg-blue-50 border-${color}-800`} role="alert">

        <div className="text-sm font-medium">
            {children}
        </div>
    </div>
}

const Cards = ({ id, title, programId, text, children, program }) => {


    return <div id="alert-additional-content-1" className="px-3 pt-2 mb-2 text-blue-800 border-l-2 border-r-2 border-b-2 border-t-4 border-blue-900 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
        <h3 className="text-lg font-bold bg-blue-100 rounded-md p-1 text-center">{title}</h3>
        <div className="mt-2 mb-4 text-sm text-left">
            {
                id === "Reg" ?
                    <div className="flex items-center flex-col justify-center text-center">
                        <div>
                            <div className='grid grid-cols-3 gap-x-2'>
                                <div className='text-left col-span-2'>
                                    {/* {program?.registrationDetails} */}
                                    <ol className='text-base'>
                                        <li>1. There is no registration fee to attend this workshop</li>
                                        <li>2. No TA/DA will be provided</li>
                                        <li>3. Lunch and refreshments will be provided</li>
                                        <li>4. It is mandatory to attend all the sessions to get participation certificate</li>
                                    </ol>
                                    <Link to={`/program/${programId}/registration-form`} type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 mt-3 text-center inline-flex items-center">
                                        Click to Register
                                        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </Link>
                                </div>
                                <div>
                                    <p className='mt-2 mb-3 text-center'>Scan to go to Registration Page</p>
                                    <div className="flex justify-center items-center bg-gray-100 p-4 rounded-lg shadow-md max-w-md mx-auto">

                                        <div className="relative">

                                            <QRCode value={`https://srtmun-uims.org/program/${programId}/registration-form`} size={110} level="L" />

                                            {/* Absolute centering for the icon */}
                                            <div className="absolute inset-0 flex justify-center items-center">
                                                <img src="/assets/logo.jpg" className='rounded-full' alt="qrlogo" height="25" width="25" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                    :
                    <div>

                        <p className="lg:text-lg md:text-base sm:text-xs text-justify hyphens-auto">{text}</p>
                        {children}
                    </div>
            }
        </div>
    </div>
}
