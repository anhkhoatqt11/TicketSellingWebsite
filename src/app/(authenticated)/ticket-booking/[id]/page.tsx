import React from 'react'
import TicketBookingLayout from './components/TicketBookingLayout'

export default function page({ params }) {
  return (
    <div className='w-full h-full'>
      <TicketBookingLayout id={params.id} />
    </div>

  )
}
