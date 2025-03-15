import React from 'react';
import { Link } from 'react-router';

const ContributionHistoryCard = ({data}) => {
    return (
        <tr>
            <td className="px-6 py-4"><Link to={`/events/${data.eventId}`} className='btn'>{(data.title)}</Link> </td>
            <td className="px-6 py-4">{new Date(data.eventDate).toLocaleString()}</td>
            <td className="px-6 py-4">{data.location}</td>
        </tr>
    );
};

export default ContributionHistoryCard;