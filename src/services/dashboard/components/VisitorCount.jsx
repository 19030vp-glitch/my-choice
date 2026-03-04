import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { api } from '../../../js/api';
const Count = () => {
    const cookies = new Cookies();
    const [uniqueVisitors, setUniqueVisitors] = useState(0);

    useEffect(() => {
        const id = cookies.get('id');

        if (!id) {
            const newId = Math.random().toString(36).substr(2, 9);
            cookies.set('id', newId);
            fetchUniqueVisitors(newId);
        } else {
            fetchUniqueVisitors(id);
        }
    }, []);

    const fetchUniqueVisitors = (id) => {

        const link = `${api}/api/unique-visitors`

        axios.post(link, { id: id }).then((res) => {
            setUniqueVisitors(res.data.uniqueVisitors);
        })
    }

    return (
        uniqueVisitors && <div className='text-center mt-4 bg-white p-1 rounded-sm border'>
            <p className='font-bold '>{uniqueVisitors}</p>
            <p className='text-[10px]'>Website Visitors</p>
        </div>
    );
};

export default Count;
