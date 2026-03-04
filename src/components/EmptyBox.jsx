import { Empty } from 'antd'
import React from 'react'

const EmptyBox = ({ classes, title = "No Data" }) => {
    return (
        <div className={`w-full flex items-center justify-center ${classes}`}>
            <div className="flex items-center justify-center flex-col">
                <Empty description={title} />
            </div>
        </div>
    )
}

export default EmptyBox