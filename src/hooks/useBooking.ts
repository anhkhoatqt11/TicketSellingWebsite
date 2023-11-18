'use client';

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";


import {
    increaseTicketFromBookingList,
    decreaseTicketFromBookingList,
} from '@/redux/booking-list/booking-list';

export const useBooking = () => {
    const dispatch = useDispatch();
    const booking = useSelector((state:any) => state.booking) || null;

    const onIncreaseTicketFromBookingList = useCallback(({data}) => {
        dispatch(increaseTicketFromBookingList({data}));
    },[]);

    const onDecreaseTicketFromBookingList = useCallback(({data}) => {
        dispatch(decreaseTicketFromBookingList({data}));
    },[]);
    
    return {
        onIncreaseTicketFromBookingList,
        onDecreaseTicketFromBookingList,
        booking,
    }
}