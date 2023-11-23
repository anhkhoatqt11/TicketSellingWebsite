import React from 'react'
import BookingResultLayout from './components/BookingResultLayout'


export default function page({ params }) {
  return (
    <div className='w-full h-screen bg-slate-50'>
        <BookingResultLayout/>
    </div>
  )
}
