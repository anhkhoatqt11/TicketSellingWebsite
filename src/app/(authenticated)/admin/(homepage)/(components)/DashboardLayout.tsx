'use client';

import React, {useEffect} from 'react'
import Dashboard from './Dashboard'
import Popular from './Popular'
import Loader from '@/components/Loader';

const DashboardLayout = () => {


    return (
        <div className='w-full h-full mt-5 pl-7 pr-7'>
            <div className='flex flex-col md:flex-row w-full'>
                <Dashboard />
                <Popular />
            </div>
        </div>)
}

export default DashboardLayout