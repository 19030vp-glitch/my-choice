
import { Skeleton } from '@mui/material';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import WcRoundedIcon from '@mui/icons-material/WcRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import FamilyRestroomRoundedIcon from '@mui/icons-material/FamilyRestroomRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';

const DashboardHeroSection = ({ countData, isLoading, showDetails = false, year, showActive = false, setActiveUser }) => {
    return <div className='grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4'>
        <DashboardTile setActiveUser={setActiveUser} showActive={showActive} year={year} showDetails={showDetails} isLoading={isLoading} count={countData?.["StudentCount"]} title="Student" />
        <DashboardTile setActiveUser={setActiveUser} showActive={showActive} year={year} showDetails={showDetails} isLoading={isLoading} count={countData?.["TeacherCount"]} title="Teacher" />
        <DashboardTile setActiveUser={setActiveUser} showActive={showActive} year={year} showDetails={showDetails} isLoading={isLoading} count={countData?.["AlumniCount"]} title="Alumni" />
        <DashboardTile setActiveUser={setActiveUser} showActive={showActive} year={year} showDetails={showDetails} isLoading={isLoading} count={countData?.["ParentCount"]} title="Parent" />
        <DashboardTile setActiveUser={setActiveUser} showActive={showActive} year={year} showDetails={showDetails} isLoading={isLoading} count={countData?.["EmployerCount"]} title="Employer" />
        <DashboardTile setActiveUser={setActiveUser} showActive={showActive} year={year} showDetails={showDetails} isLoading={isLoading} count={countData?.["ExpertCount"]} title="Expert" />
    </div>
}


const DashboardTile = ({ title, count, isLoading, showDetails, year, showActive, setActiveUser }) => {

    let icons = {
        Student: <WcRoundedIcon sx={{ height: '40px', width: '40px' }} />,
        Teacher: <Person2RoundedIcon sx={{ height: '40px', width: '40px' }} />,
        Alumni: <GroupsRoundedIcon sx={{ height: '40px', width: '40px' }} />,
        Parent: <FamilyRestroomRoundedIcon sx={{ height: '40px', width: '40px' }} />,
        Employer: <PeopleRoundedIcon sx={{ height: '40px', width: '40px' }} />,
        Expert: <LocalLibraryRoundedIcon sx={{ height: '40px', width: '40px' }} />,
    }

    return (
        <div id="alert-additional-content-5" className={`p-3 border border-blue-300 rounded-lg bg-blue-50 ${showActive ? showActive === title ? 'bg-[#bad9ff]' : 'bg-blue-50' : 'bg-blue-50'}`} role="alert">
            <div className="flex items-center">
                <div className='flex items-center justify-start gap-3 text-blue-800'>
                    <span>{icons[title]}</span>
                    <span className='font-extrabold md:text-4xl text-2xl'>
                        {isLoading ? <Skeleton variant="rounded" width={40} height={40} /> : count}

                    </span>
                </div>
            </div>
            <div className="mt-2 mb-4 text-sm text-blue-800 dark:text-blue-300">
                {title} Responses for {year}
            </div>
            {
                showDetails && <div className="w-full" onClick={() => setActiveUser(() => title)}>
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                        <svg className="-ml-0.5 mr-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                            <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                        </svg>
                        View Analytics
                    </button>

                </div>
            }
        </div>
    )
}

export default DashboardHeroSection

