import React, { useEffect, useState } from 'react'
import ProgramTitle from '../components/ProgramTitle';
import UserLoading from '../../../pages/UserLoading';
import title from '../../../js/title';
import GoBack from '../../../components/GoBack';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../../components/Footer';
import siteLinks from '../../../components/siteLinks';
import { fetchPrograms } from '../js/fetchPrograms';
import { useQuery } from 'react-query';

const AddProgramPhotos = () => {
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


    let bredLinks = [siteLinks.welcome, siteLinks.programs, { title: program?.title ? `${program?.title?.slice(0, 40)}...` : 'Loading Program...', link: `/program/${programId}` }, { title: "Upload Program Photographs", url: '' }];

    title("Upload Program Photographs")

    return (
        <div>
            <GoBack pageTitle="Upload Program Photographs" bredLinks={bredLinks} />

            <div className=' h-screen'>
                {
                    isLoading ?
                        <UserLoading title="Fetching the program details" />
                        :
                        <div className='animate-fade-up animate-once'>
                            <div className="mt-4">
                                <ProgramTitle program={program} />
                            </div>

                            <div className="grid grid-cols-3 mt-5 gap-5">
                                <div>
                                    <input type="file" name="photos" id="photos" hidden />
                                    <label htmlFor="photos" className="p-3 border-dashed border-2 border-blue-600 w-full cursor-pointer rounded-xl bg-blue-50 hover:bg-blue-100">
                                        <p className="text-center text-blue-700">Click to choose the image you want to upload</p>
                                        <p className="text-center text-xs text-muted">Please make sure the image is less than 1 MB in size.</p>
                                    </label>
                                </div>

                                <div className="bg-gray-100 rounded-xl p-3 col-span-2 w-full">
                                    <p>Selected Photos</p>

                                    <div className="mt-3">
                                        <div className='w-full flex items-start justify-start gap-3 bg-white p-2 rounded-md'>
                                            <img src="/assets/male.jpg" alt="male" className="h-14 w-14" />
                                            <div>
                                                <p>Male Photo.jpg</p>
                                                <p className='text-sm font-medium text-green-600'>Uploaded Successfully</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>

            <div className="mt-5">
                <Footer />
            </div>
        </div>
    )
}

export default AddProgramPhotos
