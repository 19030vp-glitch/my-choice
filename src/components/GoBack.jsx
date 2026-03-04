import React from 'react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Avatar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import serverLinks from '../js/serverLinks';
import Bred from './Bred';

const GoBack = ({ backUrl = -1, pageTitle, children = null, shouldScroll = false, functionOnBack = false, showAvatar = false, bredLinks = false }) => {

    const navigate = useNavigate()

    const scrollToId = () => {
        const element = document.getElementById('GoBack');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (shouldScroll) {
            scrollToId()
        }
    }, [])

    return (
        <div>
            <div className='py-1 flex items-center justify-between border-b' id="GoBack">
                <div className='flex items-center justify-start'>
                    <IconButton onClick={() => { functionOnBack ? functionOnBack() : navigate(backUrl) }}>
                        <ArrowBackRoundedIcon />
                    </IconButton>
                    <span className='mx-2 font-bold text-lg'>{pageTitle}</span>
                </div>
                <div>
                    <div>
                        {children}
                    </div>

                    <div>
                        {showAvatar && <Avatar src={serverLinks.showFile(showAvatar.photoURL, showAvatar.userType)} />}
                    </div>
                </div>
            </div>

            {
                bredLinks && <div className='mt-2'>
                    <Bred links={bredLinks} />
                </div>
            }

        </div>
    )
}

export default GoBack