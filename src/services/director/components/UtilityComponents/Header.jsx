import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Button, Link, IconButton, Tooltip, Drawer, Box } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import useDirectorAuth from "../../../../hooks/useDirectorAuth";
import Bred from "../../../../components/Bred";
import OnlyNav from "../../../../components/OnlyNav";
import siteLinks from "../../../../components/siteLinks";
import { setDirectorActive } from "../../../../redux/slices/DirectorActiveSlice";
import directorTables from "../../js/directorTables";

export default function Header() {

    const [currentPage, setcurrentPage] = useState('')
    let nevigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.directorUser)
    const DirectorActive = useSelector(state => state.directorActive.directorActive)

    const [isDrowerOpen, setIsDrowerOpen] = useState(false)

    useDirectorAuth()
    
    useEffect(() => {
        let title = directorTables?.[DirectorActive]?.title
        setcurrentPage(title)
    }, [DirectorActive])

    return (
        <div>
            <OnlyNav user={user} logout={{ token: 'director-token', link: siteLinks.welcome.link }}
                heading={{ title: 'School Data Management', link: siteLinks.directorHome.link }}
                li={[siteLinks.directorHome, siteLinks.ssm, siteLinks.aaa]} userType="director"

            />

            <div className='mt-2'>
                <Bred links={[siteLinks.welcome, siteLinks.directorHome, siteLinks.sdm, { title: currentPage, link: '' }]} />
            </div>

            <div className='w-full mt-2 hidden sm:block' id="accordionNav">
                <div className="accordion" id="accordionExample" style={{ border: "solid #60a5fa 2px", borderRadius: "10px" }}>
                    <div className="accordion-item" style={{ borderRadius: "10px" }} >
                        <h2 className="accordion-header" id="headingOne" style={{ background: "#e7f1ff", borderRadius: "10px" }}>
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{ color: "#60a5fa", borderRadius: "10px" }} >
                                School Profile
                            </button>
                        </h2>

                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <div className='flex items-center justify-center gap-2 flex-wrap'>

                                    <div style={{ width: '100%', display: 'flex', flexFlow: 'row wrap', justifyContent: "center" }}>
                                        {Object.keys(directorTables)?.map((e, index) => (
                                            <div onClick={() => { dispatch(setDirectorActive(e)) }} key={index} className={`flex items-center duration-200 ease-in-out cursor-pointer hover:bg-blue-200 justify-start gap-2 px-2 py-2 text-sm rounded-full mx-1 my-1 ${DirectorActive === e ? 'bg-blue-200' : 'bg-blue-100'}`}>
                                                {directorTables[e].icon}
                                                <p className='text-blue-900'>{directorTables[e].title}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* drower */}

            <div id='drowerNav'  >
                <div style={{ backgroundColor: '#e7f1ff', display: 'flex', padding: '7px', border: "solid #60a5fa 2px", borderRadius: "10px", marginTop: "8px" }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: "flex-start" }}>
                    <IconButton onClick={() => setIsDrowerOpen(true)}>
                        <MenuIcon sx={{ color: '#60a5fa' }} />
                    </IconButton>
                        <h3 style={{ color: "#60a5fa", alignItems: "center", display: "flex", fontSize: "17px", paddingLeft: "12px", fontWeight: "400" }}> School profile</h3>
                    </div>
                </div>
                <Drawer anchor='left' open={isDrowerOpen} onClose={() => setIsDrowerOpen(false)}>
                    <Box width='335px' textAlign='center' role='presentation' >
                        <div style={{ display: 'flex', justifyContent: "space-between", padding: '20px' }}>
                            <Tooltip title="Logout" placement="top">
                                <IconButton onClick={() => { localStorage.removeItem('director-token'); nevigate(siteLinks.welcome.link) }} sx={{ color: "#c75d5d" }} >
                                    <LogoutIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Close Menu" placement="top">
                                <IconButton color="primary" onClick={() => setIsDrowerOpen(false)}>
                                    <ClearIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                        {Object.keys(directorTables).map((e, index) => (
                            <Button key={index}
                                startIcon={directorTables[e].icon}
                                as={Link} to={e.path}
                                name={e.path}
                                value={directorTables?.[e]?.title}
                                size="large"
                                sx={{ mx: "5px", my: "4px" }}
                                variant="contained"
                                onClick={() => { dispatch(setDirectorActive(e)); setIsDrowerOpen(false); }}
                                style={{
                                    borderRadius: 30,
                                    backgroundColor: `${DirectorActive === e ? '#7ca6f8' : '#c2d7ff'}`,
                                    color: "#1e3a8a",
                                    fontSize: 12,
                                    textDecoration: "none",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    marginTop: 7,
                                    width: "325px",
                                    height: "50px"
                                }}>
                                {directorTables?.[e]?.title}
                            </Button>


                        ))}
                        <div style={{ padding: '15px' }}></div>
                    </Box>
                </Drawer>
            </div>

        </div>
    );
}