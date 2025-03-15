import React from 'react';
import Spinner from '../../../component/Commmon/Spinner';
import ContributionHistoryCard from './ContributionHistoryCard';

const ContributionHistory = ({userContribution}) => {
    if(!userContribution){
        return <Spinner></Spinner>
    }
    return (
        <div className="space-y-4">
            <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4 mb-4">
                <table className="min-w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Title</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Location</th>
                        </tr>
                    </thead>

                    <tbody>
                        {userContribution.map((data) => (
                            <ContributionHistoryCard key={data._id} data={data} />
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ContributionHistory;