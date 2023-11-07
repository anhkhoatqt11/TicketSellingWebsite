'use client';

import React, { useEffect } from 'react'
import { useEvent } from '@/hooks/useEvent'
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';



export function EventDetail ({id}) {
    const {fetchEventById} = useEvent();

    const { data: EventDetail } = useQuery({
      queryKey: ['EventDetail', id],
      queryFn: async() => {
        const res = await fetchEventById(id);
        return res?.[0];
      }
    })

    useEffect(() => {
      console.log(EventDetail);
    })


  return (
    <div>{EventDetail?.name}
    {EventDetail?.moTa}
    {EventDetail?.diaChi}</div>
  )
}
