import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../../component/Commmon/Footer';
import Navbar from '../../component/Commmon/Navbar';
import Spinner from '../../component/Commmon/Spinner';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='min-h-[70vh]'>
            <Spinner><Outlet></Outlet></Spinner>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;