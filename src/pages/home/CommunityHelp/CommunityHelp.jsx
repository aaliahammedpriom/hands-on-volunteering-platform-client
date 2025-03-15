import React, { useEffect, useState } from 'react';
import Spinner from '../../../component/Commmon/Spinner';
import CommunityHelpCard from './CommunityHelpCard';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const CommunityHelp = () => {
    const [datas, setDatas] = useState(null);
    const [location, setLocation] = useState('');
    const [urgency, setUrgency] = useState('');
    const [availability, setAvailability] = useState('');

    useEffect(() => {
        useAxiosPublic().get(`/communityhelp?location=${location}&urgency=${urgency}&availability=${availability}`)
            .then(res => setDatas(res.data));
    }, [location, urgency, availability]);

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
                <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="select select-bordered w-full max-w-xs"
                >
                    <option value="">Select Urgency</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="urgent">Urgent</option>
                </select>
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
                {datas.map(data => <CommunityHelpCard key={data._id} data={data} />)}
            </div>
        </div>
    );
};

export default CommunityHelp;
