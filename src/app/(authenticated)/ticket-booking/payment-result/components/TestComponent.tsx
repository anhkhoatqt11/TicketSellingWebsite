'use client'

import React, { useEffect } from 'react'

const TestComponent = ({params}) => {

    useEffect(() => {
        console.log(params);
    }, [])

  return (
    <div></div>
  )
}

export default TestComponent