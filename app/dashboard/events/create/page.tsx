import CreateForm from '@/app/ui/dashboard/events/create-form'
import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create Event',
  }; 

function Page() {
  return (
    <div>
        <CreateForm/>
    </div>
  )
}

export default Page