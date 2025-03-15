import React, { useContext, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import AuthContext from '../../../provider/AuthContext';

const PermissionDenied = ({ permissionData }) => {
    const {refetch , setRefetch} =useContext(AuthContext)
    const [message, setMessage] = useState('')
    const sendRequest = () => {
        permissionData = {
            ...permissionData,
            permission : "pending",
            message
        }
        useAxiosSecure().post('/teamrequest', permissionData)
            .then(res => {
                if(res.data.insertedId){
                    setRefetch(!refetch)
                }
            })
    }
    return (
        <div className="flex flex-col items-center justify-center h-80 bg-red-100 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold text-red-600">You don’t have permission to access this team.</h2>
            <p className="text-gray-600 mt-2">Send a request to the team creator for access.</p>

            {/* Request Input */}
            <textarea
                className="w-full max-w-md mt-4 p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Write your request message (max 200 characters)..."
                maxLength={200}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                id="requestMessage"
            ></textarea>

            {/* Request Button */}
            <button
                onClick={sendRequest}
                disabled={!message.length && true} className="btn btn-error text-white mt-4 px-6"
            >
                Send Request
            </button>
        </div>
    );
};

export default PermissionDenied;