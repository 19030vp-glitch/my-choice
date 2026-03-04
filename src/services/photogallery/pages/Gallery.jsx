import { useState } from 'react';
import { useQuery } from 'react-query';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { IconButton } from '@mui/material';
import GoBack from '../../../components/GoBack';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSingleEvent } from '../js/fetchEvents';
import serverLinks from '../../../js/serverLinks';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

const images = [
    { src: '/assets/male.jpg', caption: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla, sapiente!' },
];

function Gallery() {

    const { eventId } = useParams()

    let params = { filter: { _id: eventId } }
    const { data, isLoading, isError, error, refetch } = useQuery([params, params.filter], () => fetchSingleEvent(params))

    useEffect(() => {
        console.log('Event :', data)
    }, [data])


    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (index) => {
        setSelectedImage(index);
    };

    const handlePrevClick = () => {
        setSelectedImage((selectedImage - 1 + data?.data?.data?.photos?.length) % data?.data?.data?.photos?.length);
    };

    const handleNextClick = () => {
        setSelectedImage((selectedImage + 1) % data?.data?.data?.photos?.length);
    };

    const handleClose = () => {
        setSelectedImage(null);
    };

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.keyCode === 37) {
                // left arrow
                handlePrevClick();
            } else if (event.keyCode === 39) {
                // right arrow
                handleNextClick();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedImage]);


    return (
        <div className="mx-auto">
            <GoBack pageTitle={data?.data?.data?.eventTitle} >
                <p className='flex items-start gap-2'>
                    <span>
                        <CalendarMonthRoundedIcon sx={{ fontSize: '32px', marginTop: '0px' }} />
                    </span>
                    <span className="font-semibold font-sm leading-4">
                        <p>{data?.data?.data?.eventDuration}</p>
                        <p className='text-xs text-muted font-normal'>Event Duration</p>
                    </span>
                </p></GoBack>
            <div className='mt-3'>
                <p>{data?.data?.data?.eventSummary}</p>
            </div>
            <div className="flex items-center justify-start flex-wrap gap-2 rounded-md mt-3">
                {data?.data?.data?.photos?.map((image, index) => (
                    <div key={image.id} className="relative border" onClick={() => handleImageClick(index)}>
                        <img src={serverLinks.showFile(image?.file, 'event')} alt={image.caption} className="w-60 h-60 object-cover hover:brightness-90 cursor-pointer" />
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50">
                            <p className="text-white text-sm font-medium truncate">{image.caption}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage !== null && (
                <div className="fixed top-0 left-0 right-0 bottom-0 h-full w-full bg-[#00000096] z-50 flex shadow-md border items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                        <div className='flex items-center justify-between mt-3 mx-3 gap-2'>
                            <p className='text-muted text-xs text-center'>Note: You can use keyboard arrow keys to navigate between the images</p>

                            <IconButton onClick={handleClose}>
                                <CloseRoundedIcon />
                            </IconButton>
                        </div>

                        <img
                            src={serverLinks.showFile(data?.data?.data?.photos[selectedImage].file, 'event')}
                            alt={data?.data?.data?.photos[selectedImage].caption}
                            className="object-cover w-[300px] mx-auto mt-3"
                        />
                        <div className="p-4 flex justify-between items-center">
                            <IconButton className='border mx-5' onClick={handlePrevClick}>
                                <ArrowBackIosNewRoundedIcon />
                            </IconButton>

                            <p className="text-lg font-medium">{data?.data?.data?.photos[selectedImage].caption}</p>

                            <IconButton className='border mx-5' onClick={handleNextClick}>
                                <ArrowForwardIosRoundedIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}

export default Gallery
