import React from 'react'
import TicketBookingLayout from './(components)/TicketBookingLayout'
import { getSession } from '@/lib/auth'; 

export default async function page({ params }) {
  const session = await getSession();
  return (
    <div className='w-full h-full'>
      <TicketBookingLayout id={params.id} session={session} />
    </div>

  )
}
