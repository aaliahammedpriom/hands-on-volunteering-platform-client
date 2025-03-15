import React from 'react';

const RequestForPermission = () => {
    return (
        <div className="flex flex-col items-center justify-center h-80 bg-green-100 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold text-green-600">Request Sent Successfully! ✅</h2>
            <p className="text-gray-700 mt-2 text-center">
                Your request has been sent to the team creator. You will be notified once they approve your access.
            </p>
            <p className="text-gray-500 text-sm mt-2">
                If you don’t receive a response soon, you can contact the creator directly.
            </p>
        </div>
    );
};

export default RequestForPermission;