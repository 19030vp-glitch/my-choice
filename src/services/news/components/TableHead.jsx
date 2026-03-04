import React from 'react'

const NewsTableHead = ({ proUser }) => {
    return (
        <thead className='bg-primary text-white'>
            <tr>
                <th scope="col">Sr.</th>
                <th scope="col">Date</th>
                <th scope="col">Photo</th>
                <th scope="col">Headline</th>
                <th scope="col">Brief</th>
                {
                    proUser && <th scope="col">Action</th>
                }
            </tr>
        </thead>
    )
}

export default NewsTableHead