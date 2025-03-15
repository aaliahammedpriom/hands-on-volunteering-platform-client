import React, { useEffect, useState } from 'react';
import Spinner from '../../../component/Commmon/Spinner';
import TeamPostCart from './TeamPostCart';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const TeamPost = ({refatch}) => {
    const [datas, setDatas] = useState(null)
    useEffect(() => {
        useAxiosPublic().get('/team')
            .then(res => setDatas(res.data))
    }, [refatch])
    if (!datas) {
        return <Spinner></Spinner>
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2' >
            {
               datas.map(data => <TeamPostCart key={data._id} data={data}></TeamPostCart>)
            }
        </div>
    );
};

export default TeamPost;