import React from 'react';
import { Outlet } from 'react-router';
import Navber from '../components/Navber';

const AuthLayout = () => {
    return (
        <div>
            <Navber></Navber>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;