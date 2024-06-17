import CustomNotFound from '@/app/ui/custom-not-found'
import React from 'react'

function NotFound() {
  return (
    <>
      <CustomNotFound
        name='event'
        path='/dashboard/events'
      />
    </>
  )
}

export default NotFound