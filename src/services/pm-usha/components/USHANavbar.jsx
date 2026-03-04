import serverLinks from "../../../js/serverLinks"

const USHANavbar = () => {
    return (
        <div>

            <div className="flex items-center justify-end gap-2">
                <img src={serverLinks.showFile("pm-usha.png", 'usha')} alt="pm-usha" height={55} width={55} />
                <div>
                    <p className="sm:text-xl text-lg font-bold"><span className="text-orange-600">PM</span><span className="text-green-600">-</span><span className="text-blue-800">USHA</span> </p>
                    <p className="font-semibold text-gray-600 text-[10px]">Pradhan Mantri Uchchatar Shiksha Abhiyan</p>
                </div>
            </div>
        </div>
    )
}

export default USHANavbar
