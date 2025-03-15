import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const VolunteerRank = () => {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        useAxiosPublic().get(`/team?leaderboard=leaderboard`)
            .then(res => setDatas(res.data));
    }, []);

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="table-auto w-full border-collapse border border-gray-200 bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2 text-left font-semibold">Rank</th>
                        <th className="border px-4 py-2 text-left font-semibold">Team Name</th>
                        <th className="border px-4 py-2 text-left font-semibold">Owner</th>
                        <th className="border px-4 py-2 text-left font-semibold">Membership</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map((data, index) => (
                        <tr key={data._id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{data.teamName}</td>
                            <td className="border px-4 py-2">{data.email}</td>
                            <td className="border px-4 py-2">{data.membership}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VolunteerRank;
