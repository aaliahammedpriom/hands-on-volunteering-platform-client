import React, { useContext } from 'react';
import AuthContext from '../../provider/AuthContext';

const Spinner = ({ children }) => {
    const { loading } = useContext(AuthContext)
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner text-info text-2xl"></span>
            </div>
        )
    }
    return children
};

export default Spinner;
