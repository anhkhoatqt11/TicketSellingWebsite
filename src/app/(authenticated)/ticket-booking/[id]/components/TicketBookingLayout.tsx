'use client';

import React from 'react'
import { EventInfo } from './EventInfo'
import { BookingBreadcrumbs } from './BookingBreadcrumbs'
import TicketChoose from './(ticket-choosing)/TicketChoose'
import Loader from '@/components/Loader'
import { useQuery } from '@tanstack/react-query'
import { useEvent } from '@/hooks/useEvent'
import Cart from './Cart';
import PaymentChoose from './(payment)/PaymentChoose';



const TicketBookingLayout = ({ id }) => {


    const { fetchEventById } = useEvent();

    const [websiteBooking, setWebsiteBooking] = React.useState("choose-ticket");

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

        <div>
            <EventInfo EventDetail={EventDetail} />
            <BookingBreadcrumbs page={websiteBooking} />
            <div className='flex flex-row justify-between md:px-[180px]'>
                {websiteBooking === "choose-ticket" && (
                    <TicketChoose EventDetail={EventDetail} />
                )}
                {websiteBooking === "payment" && (
                    <PaymentChoose />
                )}
                <Cart websiteBooking={websiteBooking} setWebsiteBooking={setWebsiteBooking} />
            </div>
        </div>
    )
}

export default TicketBookingLayout