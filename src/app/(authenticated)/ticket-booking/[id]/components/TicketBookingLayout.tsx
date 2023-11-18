'use client';

import React from 'react'
import { EventInfo } from './EventInfo'
import { BookingBreadcrumbs } from './BookingBreadcrumbs'
import TicketChoose from './(ticket-choosing)/TicketChoose'
import Loader from '@/components/Loader'
import { useQuery } from '@tanstack/react-query'
import { useEvent } from '@/hooks/useEvent'
import Cart from './(ticket-choosing)/Cart';



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
            {websiteBooking === "choose-ticket" && (
                <div>
                    <EventInfo EventDetail={EventDetail} />
                    <div>
                        <BookingBreadcrumbs page={"choose-ticket"} />
                        <div className='flex flex-row justify-between md:px-[180px]'>
                            <TicketChoose EventDetail={EventDetail} />
                            <Cart setWebsiteBooking={setWebsiteBooking} />
                        </div>
                    </div>
                </div>
            )}

            {websiteBooking === "payment" && (
                <div>
                    <EventInfo EventDetail={EventDetail} />
                    <div>
                        <BookingBreadcrumbs page={"payment"} />
                    </div>
                </div>
            )}

        </div>
    )
}

export default TicketBookingLayout