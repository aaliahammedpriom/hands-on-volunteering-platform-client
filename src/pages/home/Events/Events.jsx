import React, { useEffect, useState } from 'react';
import EventCart from './EventCart';
import Spinner from '../../../component/Commmon/Spinner';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const Events = () => {
    const [datas, setDatas] = useState(null);
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [availability, setAvailability] = useState('');

    useEffect(() => {
        useAxiosPublic().get(`/events?location=${location}&category=${category}&availability=${availability}`)
            .then(res => setDatas(res.data))
            
    }, [location, category, availability]);

    if (!datas) {
        return <Spinner />;
    }

    return (
        <div >
            <div className="flex flex-wrap justify-center gap-4 p-4">
                <input
                    type="text"
                    placeholder="Filter by location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
                <input
                    type="text"
                    placeholder="Filter by category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
                <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="select select-bordered w-full max-w-xs"
                >
                    <option value="">All</option>
                    <option value="true">Available</option>
                    <option value="false">Unavailable</option>
                </select>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2'>
                {datas.map(data => <EventCart key={data._id} data={data} />)}
            </div>
        </div>
    );
};

export default Events;
