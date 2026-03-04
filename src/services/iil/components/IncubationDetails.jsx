import React, { useEffect, useState } from 'react'
import { addIILData, getIILData } from '../js/iilHandler'
import { useQuery } from 'react-query'
import UserLoading from '../../../pages/UserLoading'

const IncubationDetails = ({ academicYear }) => {

    const params = { model: "IncubationDetails", filter: { academicYear } }
    const [details, setDetails] = useState("")

    // getting the data
    const key = `${params.model}-${academicYear}`
    const { data, isLoading } = useQuery(key, () => getIILData(params), { refetchOnWindowFocus: false })

    useEffect(() => {
        console.log(data?.data)
        if (data?.data?.status === 'success') {
            setDetails(data?.data?.data?.details)
        }
    }, [data])


    const onSubmit = (e) => {
        e.preventDefault();
        addIILData({ ...params, dataToAppend: { academicYear, details } })
    }

    return (
        <div>

            {isLoading ? <UserLoading title="Getting data" /> : <form onSubmit={onSubmit}>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
                    <div className="px-4 py-2 bg-white rounded-t-lg">
                        <label htmlFor="comment" className="sr-only">Your comment</label>
                        <textarea value={details} onChange={(e) => setDetails(() => e.target.value)} id="comment" rows="15" className="w-full px-0 text-sm text-gray-900 bg-white border-0 outline-none" placeholder="Write a comment..." required></textarea>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 border-t">
                        <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            Submit Details
                        </button>
                    </div>
                </div>
            </form>}


        </div>
    )
}

export default IncubationDetails
