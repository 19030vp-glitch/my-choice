import React from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { DatePicker, Space } from 'antd';



const Filter = ({ search, setSearch, setRangeDate }) => {
    const { RangePicker } = DatePicker;

    const handleDateWiseFiltering = (e) => {
        if (e) {
            let start = `${e[0][`$y`]}-${(e[0]['$M'] + 1).toString().padStart(2, '0')}-${e[0]['$D'].toString().padStart(2, '0')}`;
            let end = `${e[1][`$y`]}-${(e[1]['$M'] + 1).toString().padStart(2, '0')}-${e[1]['$D'].toString().padStart(2, '0')}`;


            setRangeDate({ start, end })
        } else {
            setRangeDate(null)
        }
    }

    return (
        <div>
            <div className='w-full px-2 grid md:grid-cols-2 gap-3'>
                <div className={`bg-white p-2 border-2 ${search && 'border-blue-400'} rounded-md flex items-center justify-start gap-2`}>
                    <SearchRoundedIcon className='text-muted' />
                    <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search news articles...' className="outline-none bg-transparent w-full" />
                </div>
                <RangePicker onChange={handleDateWiseFiltering} className='p-2' />
            </div>
        </div>
    )
}

export default Filter