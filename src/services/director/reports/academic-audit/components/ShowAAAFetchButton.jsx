import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import DialogBox from '../../../../../components/DialogBox'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ShowAAAFetchButton = ({ allYearAAAData, setState, state, tableToFetch }) => {

    const [initialData, setInitialData] = useState(state)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectYear, setSelectYear] = useState(null)
    const auditYear = useSelector(state => state.academicAudit.auditYear)


    const fetchDataFromTheYear = () => {
        if (selectYear) {
            allYearAAAData.forEach((item) => {
                let parsedItem = JSON.parse(item)
                if (parsedItem.auditYear === selectYear) {
                    setState(parsedItem?.AAAData?.[tableToFetch[0]]?.[tableToFetch[1]])
                }
            })
        }
    }

    useEffect(() => {
        fetchDataFromTheYear()
    }, [selectYear])

    return (
        <div>

            <DialogBox title="Fetch data from any one of the listed years" buttonName="Done" onClickFunction={() => { setIsModalOpen(false) }} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}
                onCancel={() => { setState(initialData) }} cancelButtonName="Undo & Cancel">
                <div className='bg-blue-100 rounded-md p-3'>
                    {
                        allYearAAAData.map((item, index) => {
                            return <div className="form-check text-lg" key={index}>
                                <input className="form-check-input" type="radio" name="chooseAAAYear"
                                    id={`auditYear${index}`} value={JSON.parse(item).auditYear} onChange={(e) => { setSelectYear(() => e.target.value); }} />
                                <label className="form-check-label" for={`auditYear${index}`}>
                                    {JSON.parse(item).auditYear} {auditYear === JSON.parse(item).auditYear && <span className='text-green-700'><CheckCircleIcon fontSize="small" sx={{ marginBottom: '5px' }} /></span>}
                                </label>
                            </div>
                        })
                    }
                </div>
            </DialogBox>

            <button className='bg-blue-700 text-white hover:bg-blue-600 p-2 rounded-full float-right' onClick={(e) => { e.preventDefault(); setIsModalOpen(true) }}>Fetch Previous Year AAA Data</button>
        </div>
    )
}

export default ShowAAAFetchButton