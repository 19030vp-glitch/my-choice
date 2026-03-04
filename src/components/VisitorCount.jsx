// {"namespace":"srtmun-uims.org","key":"38182242-f428-4483-b89a-d9b13f699fb8","value":0}

import React, { useState } from 'react'
import Axios from 'axios'
import { useEffect } from 'react'

const VisitorCount = () => {

  const [count, setCount] = useState(null)

  useEffect(() => {

    const link1 = "https://api.countapi.xyz/get/srtmun-uims.org/38182242-f428-4483-b89a-d9b13f699fb8"
    const link2 = `https://api.countapi.xyz/hit/srtmun-uims.org/38182242-f428-4483-b89a-d9b13f699fb8?callback=websiteVisits`


    Axios.get(link2).then((res) => {
      const value = Number(res.data.match(/{"code":\d+,"value":(\d+)}/)[1]);
      // const value = res.data.value
      setCount(value)
    })
  }, [])

  return (
    count && <div className='text-center mt-4 bg-white p-1 rounded-sm border'>
      <p className='font-bold '>{count}</p>
      <p className='text-[10px]'>Website Visitors</p>
    </div>
  )
}

export default VisitorCount