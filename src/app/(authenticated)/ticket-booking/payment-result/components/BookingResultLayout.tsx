'use client';

import React from 'react'
import { BookingBreadcrumbs } from '../../(components)/BookingBreadcrumbs'
import BookingResult from './BookingResult'

const BookingResultLayout = () => {

    const [paymentStatus, setPaymentStatus] = React.useState("");
    return (
        <div>
            <BookingBreadcrumbs page={paymentStatus} />
            <BookingResult paymentStatus={paymentStatus} setPaymentStatus={setPaymentStatus} />
        </div>
    )
}

export default BookingResultLayout