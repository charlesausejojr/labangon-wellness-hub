import CustomNotFound from '@/app/ui/custom-not-found'
import React from 'react'

function NotFound() {
  return (
    <>
      <CustomNotFound
        name='user'
        path='/dashboard/manage_users'
      />
    </>
  )
}

export default NotFound