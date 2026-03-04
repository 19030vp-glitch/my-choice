import React, { useRef } from 'react'
import { crRadiosStatus } from '../js/constants'
import { updateCRStatusAndOutcome } from '../js/crStatusHandler'

const ConstructionRenovationStatus = ({ statusData, setStatusData, tabId, selected, refetch }) => {



    const handleStatusChange = (e) => {
        setStatusData((prev) => {
            return { ...prev, [selected.id]: { ...prev[selected.id], status: e.target.value } }
        })

        updateCRStatusAndOutcome({ tabId, infraId: selected.id }, e.target.value, 'status', selected, refetch)
    }

    return (
        <div>
            <div>
                <label class="block mb-2 text-sm font-medium text-gray-900">Choose Status</label>
                <div className="grid sm:grid-cols-3 gap-2">
                    {
                        crRadiosStatus.map((item, index) => {
                            return <label key={index} htmlFor={item} className="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 ">
                                <input onChange={handleStatusChange} type="radio" name="status" className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" value={item} id={item} checked={statusData[selected.id]?.status === item} />
                                <span className="text-sm text-gray-500 ms-3 w-full">{item}</span>
                            </label>
                        })
                    }
                </div>
            </div>
            <div className="mt-4">
                <label class="block mb-2 text-sm font-medium text-gray-900">Slide to select the Percentage (%) of work done</label>
                <Slider setStatusData={setStatusData} statusData={statusData} tabId={tabId} selected={selected} />
            </div>

        </div>
    )
}

export default ConstructionRenovationStatus



const Slider = ({ tabId, selected, statusData, setStatusData }) => {

    const timerRef = useRef(null)

    const handleChange = (event) => {

        setStatusData((prev) => {
            return { ...prev, [selected.id]: { ...prev[selected.id], statusInPercentage: event.target.value } }
        });

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            updateCRStatusAndOutcome({ tabId, infraId: selected.id }, event.target.value, 'statusInPercentage', selected)
        }, 2000);
    };

    const handleRange = (range) => {
        handleChange({ target: { value: range } })
    }

    return <div>
        <div className='flex items-start gap-2 w-full justify-between'>
            <div className='w-full flex items-center justify-center flex-col'>
                <input disabled={statusData[selected.id]?.status !== crRadiosStatus[1]} value={statusData[selected.id]?.statusInPercentage || 0} onChange={handleChange} type="range" class="flex-1 w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
                [&::-webkit-slider-thumb]:w-2.5
                [&::-webkit-slider-thumb]:h-2.5
                [&::-webkit-slider-thumb]:-mt-0.5
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:transition-all
                [&::-webkit-slider-thumb]:duration-150
                [&::-webkit-slider-thumb]:ease-in-out
                [&::-webkit-slider-thumb]:dark:bg-neutral-700
                
                [&::-moz-range-thumb]:w-2.5
                [&::-moz-range-thumb]:h-2.5
                [&::-moz-range-thumb]:appearance-none
                [&::-moz-range-thumb]:bg-white
                [&::-moz-range-thumb]:border-4
                [&::-moz-range-thumb]:border-blue-600
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:transition-all
                [&::-moz-range-thumb]:duration-150
                [&::-moz-range-thumb]:ease-in-out
                
                [&::-webkit-slider-runnable-track]:w-full
                [&::-webkit-slider-runnable-track]:h-2
                [&::-webkit-slider-runnable-track]:bg-gray-200
                [&::-webkit-slider-runnable-track]:rounded-full
                [&::-webkit-slider-runnable-track]:dark:bg-neutral-700

  [&::-moz-range-track]:w-full
  [&::-moz-range-track]:h-2
  [&::-moz-range-track]:bg-gray-200
  [&::-moz-range-track]:rounded-full pr-[20px] mb-2" id="basic-range-slider-usage" />
                <div className='flex justify-between w-full'>
                    <span className="text-center cursor-pointer text-sm hover:font-semibold text-gray-500"
                        onClick={() => { handleRange(0) }}  >0%</span>
                    <span className="text-center cursor-pointer text-sm hover:font-semibold text-gray-500"
                        onClick={() => { handleRange(25) }}  >25%</span>
                    <span className="text-center cursor-pointer text-sm hover:font-semibold text-gray-500"
                        onClick={() => { handleRange(50) }}  >50%</span>
                    <span className="text-center cursor-pointer text-sm hover:font-semibold text-gray-500"
                        onClick={() => { handleRange(75) }}  >75%</span>
                    <span className="text-center cursor-pointer text-sm hover:font-semibold text-gray-500"
                        onClick={() => { handleRange(100) }}  >100%</span>
                </div>
            </div>
            <span className="text-lg font-semibold mx-2 w-6 text-blue-700">{statusData[selected.id]?.statusInPercentage || 0}%</span>
        </div>
    </div>
}
