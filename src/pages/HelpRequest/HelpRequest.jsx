import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../provider/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Spinner from '../../component/Commmon/Spinner';
import HelpRequestCard from './HelpRequestCard';

const HelpRequest = () => {
    const { user } = useContext(AuthContext)
    const [datas, setDatas] = useState()
    useEffect(() => {
        useAxiosSecure().get(`/communityhelpmessage/${user.uid}`)
            .then(res => setDatas(res.data))
    }, [user])
    if (!datas) {
       return <Spinner></Spinner>
    }
    return (
        <div className="space-y-4">
            <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4 mb-4">
                <table className="min-w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Title</th>
                            <th className="px-6 py-3">From</th>
                            <th className="px-6 py-3">Message</th>
                            
                        </tr>
                    </thead>

                    <tbody>
                        {datas.map((data) => (
                            <HelpRequestCard key={data._id} data={data} />
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default HelpRequest;