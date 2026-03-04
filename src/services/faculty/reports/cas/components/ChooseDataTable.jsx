import React, { useEffect } from 'react'
import useFetchData from '../../../../../hooks/useFetchData'
import sortByAcademicYear from '../../../../../js/sortByAcademicYear'
import UserLoading from '../../../../../pages/UserLoading'
import TblView from '../../../../../components/tableComponents/TblView'

const ChooseDataTable = ({ model, module = "faculty", filter, tableHeads, year = "year", isMultiYear = false, setSelectedItems, selectedItems, filterByAcademicYear, academicYear, getproof = "proof", proof, showTable, setChooseData = null }) => {
    const { data: serverData, isLoading } = useFetchData(model, module, filter, showTable, () => { }, false)

    const checkUncheckItem = (e, itemId) => {
        if (e.target.checked) {
            setSelectedItems((prev) => [...prev, itemId])
        } else {
            setSelectedItems((prev) => prev.filter((arrayItem) => arrayItem !== itemId))
        }
    }


    useEffect(() => {
        if (serverData?.data) {
            if (setChooseData) {
                setChooseData(serverData?.data)
            }
        }
    }, [serverData?.data])


    return (
        <div className='h-screen overflow-y-auto table-responsive'>
            <table className='table table-light'>
                <thead className='sticky-top'>
                    <tr>
                        <th>Select</th>
                        {
                            Object.values(tableHeads).map((head) => {
                                return <th key={head}>{head}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {serverData?.data && sortByAcademicYear(serverData?.data, year, filterByAcademicYear, academicYear, isMultiYear).map((item, index) => {
                        return <tr key={index}>
                            <td>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value={item._id} id={item._id}
                                        onChange={(e) => { checkUncheckItem(e, item._id) }} checked={selectedItems?.includes(item._id)} />
                                </div>
                            </td>
                            {
                                Object.keys(tableHeads).map((key) => {
                                    return (key.includes("Upload_Proof") || key.includes("Proof")) ? (
                                        <TblView val={getproof ? item?.[getproof] : key?.Upload_Proof} module={proof ? proof : module} />
                                    ) : <td><label htmlFor={item._id}>{item?.[key]}</label></td>
                                })
                            }
                        </tr>
                    })}
                </tbody>
            </table>
            {isLoading && <div> <UserLoading title="Fetching data..." /> </div>}

        </div>
    )
}

export default ChooseDataTable
