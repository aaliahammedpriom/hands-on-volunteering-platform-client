import React, { useContext } from 'react';
import AuthContext from '../provider/AuthContext';
import Spinner from '../component/Commmon/Spinner';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {
    const {user , loading} = useContext(AuthContext)
    const location = useLocation()
    if(loading){
        return <Spinner></Spinner>
    }
    if(user){
        return children
    }
    else{
        return <Navigate to={'/signin'} state={{from: location}} replace></Navigate>
    }
};

export default PrivateRoutes;