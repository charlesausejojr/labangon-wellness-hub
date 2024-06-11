import React from 'react'
import { fetchEvents } from '@/lib/data'
import Link from 'next/link';
import { LinkIcon } from '@heroicons/react/16/solid';
import { CreateEvent } from '@/app/ui/dashboard/events/buttons';
import { type Event } from '@prisma/client';

async function Page() {
  const events : Event[]  = await fetchEvents(); 
  return (
    <>
    <div className='m-3 flex flex-row justify-between items-center mb-4'>
      <p>Events</p>
      {/* If user is ADMIN or FACILITATOR */}
      <CreateEvent/>
    </div>
    {/* TODO: Add Search */}
    {/* TODO: Add Breadcrumbs */}


    {events.map((event) => {
      return (
        <Link
          key={event.id}
          href="/dashboard/events"
          className='m-3 flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-slate-100 p-3 text-sm font-medium hover:bg-rose-100 hover:text-rose-600 md:flex-none md:justify-start md:p-2 md:px-3'
        >
          <LinkIcon className="w-6" />
          <p className="hidden md:block">{event.title}</p>
        </Link>
       )
    })}
  </>
  )
}

export default Page