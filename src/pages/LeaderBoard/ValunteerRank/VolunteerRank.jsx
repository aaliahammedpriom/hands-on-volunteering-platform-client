import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const VolunteerRank = () => {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        useAxiosPublic().get(`/users`)
            .then(res => setDatas(res.data));
    }, []);


    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Rank</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Skills</th>
                        <th className="border px-4 py-2">Causes</th>
                        <th className="border px-4 py-2">Log Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map((data, index) => (
                        <tr key={data.email}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">
                                <img src={data.image} alt={data.name} className="w-8 h-8 rounded-full inline-block mr-2" />
                                {data.name}
                            </td>
                            <td className="border px-4 py-2">{data.email}</td>
                            <td className="border px-4 py-2">{data.skills}</td>
                            <td className="border px-4 py-2">{data.causes}</td>
                            <td className="border px-4 py-2">{Math.floor(data.log / 3600)} hours </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VolunteerRank;
