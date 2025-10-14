import React from 'react';
import Navbar from '../navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../footer/Footer';

const Root = () => {
    return (
        <div className='flex flex-col '>
            <Navbar></Navbar>
            <div className=' min-h-screen '>
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;