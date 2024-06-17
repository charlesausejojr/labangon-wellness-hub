import { EventCardsSkeleton } from '@/app/ui/skeletons'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function Loading() {
  return (
    <div>
        <p className='text-lg font-bold mb-4'>Events</p>
        <hr/>
        <Skeleton className='w-full h-[50px]'/>
        <div className='flex flex-col gap-4 md:flex-row my-4'> 
            <div className='flex flex-col flex-1'>
                <EventCardsSkeleton/>
            </div>
        </div>
    </div>
  )
}

export default Loading