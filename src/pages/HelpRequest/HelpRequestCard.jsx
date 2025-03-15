import React from 'react';
import { Link } from 'react-router';

const HelpRequestCard = ({data}) => {
    return (
        <tr>
            <td className="px-6 py-4 "><Link >{(data.title)}</Link> </td>
            <td className="px-6 py-4">{data?.email}</td>
            <td className="px-6 py-4">{data?.message}</td>
        </tr>
    );
};

export default HelpRequestCard;