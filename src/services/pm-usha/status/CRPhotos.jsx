import ConstructionRenovationUpload from "./CRUpload"
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import CorporateFareRoundedIcon from '@mui/icons-material/CorporateFareRounded';
import { crRadiosStatus } from "../js/constants";


const ConstructionRenovationPhotos = ({ tabId, setStatusData, statusData, selected, serverData, refetch }) => {
    return (
        <div className="border-l-4 border-double border-blue-400 pl-3 space-y-5">

            {/* 1. BEFORE */}
            <div className="bg-gray-50 border p-3 rounded" key="beforePhotos">
                <div className="grow pt-0.5">
                    <h3 className="flex gap-x-1.5 font-semibold text-gray-800 items-center">
                        <span><HourglassEmptyRoundedIcon /></span>Photos before {selected.workType}
                    </h3>
                    <ConstructionRenovationUpload tabId={tabId} refetch={refetch} statusData={statusData} selected={selected} type="beforePhotos"
                        serverDataPhotos={serverData["beforePhotos"]} />
                </div>
            </div>


            {/* 2. ONGOING */}

            {
                (statusData[selected.id]?.status === crRadiosStatus[1] || statusData[selected.id]?.status === crRadiosStatus[2]) && <div className="bg-gray-50 border p-3 rounded" key="ongoingPhotos">
                    <div className="grow pt-0.5">
                        <h3 className="flex gap-x-1.5 font-semibold text-gray-800 items-center">
                            <span><ConstructionRoundedIcon /></span> Photos of ongoing {selected.workType}
                        </h3>
                        <ConstructionRenovationUpload tabId={tabId} refetch={refetch} statusData={statusData} selected={selected} type="ongoingPhotos" serverDataPhotos={serverData["ongoingPhotos"]} />
                    </div>
                </div>
            }



            {/* 3. AFTER */}

            {
                statusData?.[selected.id]?.status === crRadiosStatus[2] && <div key="afterPhotos" className="bg-gray-50 border p-3 rounded">
                    <div className="grow pt-0.5">
                        <h3 className="flex gap-x-1.5 items-center font-semibold text-gray-800">
                            <span><CorporateFareRoundedIcon /></span> Photos after {selected.workType}
                        </h3>
                        <ConstructionRenovationUpload tabId={tabId} refetch={refetch} statusData={statusData} selected={selected} type="afterPhotos" serverDataPhotos={serverData["afterPhotos"]} />
                    </div>
                </div>
            }




        </div>
    )
}

export default ConstructionRenovationPhotos
