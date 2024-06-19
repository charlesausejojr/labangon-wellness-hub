import { EventCardsSkeleton } from '@/app/ui/skeletons'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function Loading() {
  return (
    <div>
        <p className='text-lg font-bold mb-4'>Dashboard</p>
        <hr/>
        <div className='flex flex-col gap-4 md:flex-row my-4'> 
            <div className='flex flex-col flex-1'>
                <Skeleton className='w-[100px] h-[20px]'/>
                <Skeleton className='bg-slate-200 flex h-[480px] rounded-md my-2 p-3'>
                    <EventCardsSkeleton/>
                </Skeleton>
            </div>
            <div className='flex flex-col flex-1'>
                <Skeleton className='w-[100px] h-[20px]'/>
                <Skeleton className='bg-slate-200 flex h-[480px] rounded-md my-2 p-3'>
                    <EventCardsSkeleton/>
                </Skeleton>
            </div>
        </div>
        <Skeleton className='w-full h-[550px]'/>
    </div>
  )
}

export default Loading