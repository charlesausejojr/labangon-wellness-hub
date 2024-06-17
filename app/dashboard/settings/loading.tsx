import Loader from '@/app/ui/loader'
import { EventSummarySkeleton } from '@/app/ui/skeletons'
import React from 'react'

function Loading() {
  return (
    <div className='h-screen flex text-center justify-center'>
        <Loader/>
    </div>
  )
}

export default Loading