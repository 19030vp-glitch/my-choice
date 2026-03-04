import React, { useState } from 'react';
import NavigationRoundedIcon from '@mui/icons-material/NavigationRounded';
import { IconButton } from '@mui/material';

const ScrollToTopButton = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 100) {
            setVisible(true)
        }
        else if (scrolled <= 100) {
            setVisible(false)

        }
    };

    const scrollToTop = () => {
        console.log('scrollToTop called')
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (

        <IconButton onClick={scrollToTop} style={{ display: visible ? 'flex z-50' : 'none', justifyContent: 'end' }}>
            <NavigationRoundedIcon fontSize="large" className='bg-blue-100 rounded-full p-1 text-blue-600' />
        </IconButton>

    );
}

export default ScrollToTopButton;
