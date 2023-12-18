import React from 'react'
import Login from './Login'
import { alreadyLoggedIn } from '@/lib/auth';

const page = async () => {
    await alreadyLoggedIn();
    return (
        <div className="p-12 relative h-screen w-full ">
            <div className="lg:p-8 sm:p-12 ">
                <div className="mx-auto h-full flex w-full flex-col justify-center space-y-6 ">
                    <div className="flex flex-col space-y-2 text-center mb-10">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Chào mừng đến với TicketNow
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Nhập thông tin đăng nhập của bạn
                        </p>
                    </div>
                    <Login />
                </div>
            </div>
        </div>)
}

export default page