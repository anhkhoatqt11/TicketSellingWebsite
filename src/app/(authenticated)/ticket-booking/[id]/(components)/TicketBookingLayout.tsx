'use client';

import React from 'react'
import { EventInfo } from './EventInfo'
import { BookingBreadcrumbs } from '../../(components)/BookingBreadcrumbs';
import TicketChoose from './(ticket-choosing)/TicketChoose'
import Loader from '@/components/Loader'
import { useQuery } from '@tanstack/react-query'
import { useEvent } from '@/hooks/useEvent'
import Cart from './Cart';
import PaymentChoose from './(payment)/PaymentChoose';

const TicketBookingLayout = ({ id, session }) => {

    const { fetchEventById } = useEvent();
    const [websiteBooking, setWebsiteBooking] = React.useState("choose-ticket");
    const [paymentMethod, setPaymentMethod] = React.useState("");


    const { data: EventDetail } = useQuery({
        queryKey: ['EventDetail', id],
        queryFn: async () => {
            const res = await fetchEventById(id);
            return res?.[0];
        },
    })

    if (EventDetail === undefined) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader />
            </div>
        )
    }

    return (
        <div className='bg-slate-50'>
            <EventInfo EventDetail={EventDetail} />
            <BookingBreadcrumbs page={websiteBooking} />
            <div className='flex flex-col md:flex-row justify-between md:px-8'>
                {websiteBooking === 'choose-ticket' && (
                    <TicketChoose EventDetail={EventDetail} />
                )}
                {websiteBooking === 'payment' && (
                    <PaymentChoose
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                    />
                )}
                <Cart
                    websiteBooking={websiteBooking}
                    setWebsiteBooking={setWebsiteBooking}
                    paymentMethod={paymentMethod}
                    EventDetail={EventDetail}
                    session={session}
                />
            </div>
        </div>
    );
}

export default TicketBookingLayout