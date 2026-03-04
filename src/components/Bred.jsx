import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
}); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591


export default function Bred({ links }) {

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const navigate = useNavigate();
    return (
        <div role="presentation">
            <Breadcrumbs separator={<ChevronRightRoundedIcon fontSize="small" />}
                aria-label="breadcrumb">

                {
                    links?.map((link, index) => {
                        return (
                            <StyledBreadcrumb
                                key={index}
                                label={link?.title}
                                href={link?.link}
                                icon={link?.title?.includes('Home') ? <HomeIcon fontSize="small" sx={{ color: 'white' }} /> : link?.title === 'Welcome' ? <LocationOnRoundedIcon fontSize="small" /> : null}
                                onClick={() => { navigate(link?.link) }}
                            />
                        )
                    })
                }

            </Breadcrumbs>
        </div>
    );
}
