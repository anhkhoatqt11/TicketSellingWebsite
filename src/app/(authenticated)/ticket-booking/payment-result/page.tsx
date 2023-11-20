import React from 'react'
import TestComponent from './components/TestComponent'

export default function page({ params }) {
  return (
    <div className='w-full h-full'>
        <TestComponent params={params} />
    </div>
  )
}
