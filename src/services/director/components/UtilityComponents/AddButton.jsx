import React, { useEffect, useState } from 'react'
import navcom from './navcom'
import { useSelector } from 'react-redux';
import TableTitle from './TableTitle';

export default function AddButton({ setData, serverData, onclick, exceldialog, customName = false, dataCount, showTable = true, model, module, title, filter, serviceName, getproof, getproof2, tableHead, icon = null, BulkExcelOption, year, link = null, showActionButton = true, showAddButton = true }) {
    const DirectorActive = useSelector(state => state.directorActive.directorActive)
    const clickd = () => {
        onclick(true)
    }
    const excelClicked = () => {
        exceldialog(true)
    }
    const [directordata, setDirectorData] = useState(null)

    useEffect(() => {
        if (window.location.pathname === '/director/sdm') {
            setDirectorData(navcom?.[DirectorActive])
        }
    }, [DirectorActive])

    return (

        <div>
            <div>
                <TableTitle showAddButton={showAddButton} showActionButton={showActionButton} setData={setData} serverData={serverData} title={title} excelClicked={excelClicked} clickd={clickd} customName={customName} dataCount={dataCount} showTable={showTable} params={{ model, module, filter }} serviceName={serviceName} getproof={getproof} getproof2={getproof2} data={serverData?.data} tableHead={tableHead} icon={icon} BulkExcelOption={BulkExcelOption} year={year} link={link} />
            </div>
            <div style={{ display: "flex", width: "100%", background: `${directordata?.instruction.length > 0 ? '#ebebeb' : 'white'}`, borderRadius: "10px", margin: "auto" }} >
                <div className={`${directordata?.instruction.length > 0 ? 'text-gray-800 p-2 rounded-md ' : 'white'}`} style={{ width: "70%" }}>
                    {directordata?.instruction.length === 0 ? null : directordata?.instruction.map((e, index) => {
                        return <p key={index} className='md:text-sm text-xs'>{e}</p>
                    })}
                </div>
            </div>
        </div>

    )
}