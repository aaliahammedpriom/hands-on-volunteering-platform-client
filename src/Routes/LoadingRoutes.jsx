import React, { useContext } from 'react';
import Spinner from '../component/Commmon/Spinner';
import AuthContext from '../provider/AuthContext';

const LoadingRoutes = ({ children}) => {
    const{loading}= useContext(AuthContext)
    if (loading) {
        return <Spinner></Spinner>
    }
    return children
};

export default LoadingRoutes;