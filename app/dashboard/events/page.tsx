import React from 'react'
import { fetchEvents, fetchAdminOrFacilitator, fetchEventsByQuery} from '@/lib/data'
import Link from 'next/link';
import { LinkIcon } from '@heroicons/react/16/solid';
import { CreateEvent } from '@/app/ui/dashboard/events/buttons';
import { Event } from '@/src/generated/cliet';
import { useUser } from '@clerk/nextjs';
import Search from '@/app/ui/search';
import { CalendarIcon } from '@heroicons/react/24/outline';

async function Page( {
  searchParams,
  }: {
      searchParams?: {
      query?: string;
      page?: string;
      };
  }
) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  console.log(query);
  const events : Event[]  = await fetchEventsByQuery(query); 
  const isAdminOrFacilitator = await fetchAdminOrFacilitator();
  return (
    <>
    <div className='m-3 flex flex-row justify-between items-center mb-4'>
      <div className='my-3 font-bold text-lg'>
          Events
      </div>
      {/* If user is ADMIN or FACILITATOR */}

      { isAdminOrFacilitator && 
        <CreateEvent/> }
    </div>
    <Search placeholder='Search events...'/>
    {/* TODO: Add Breadcrumbs */}
    <div className='overflow-auto'>
      {events.map((event) => {
        return (
          <Link
            key={event.id}
            href={`/dashboard/events/${event.id}`}
            className='m-3 flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-slate-100 p-3 text-sm font-medium hover:bg-rose-100 hover:text-rose-600 md:flex-none md:justify-start md:p-2 md:px-3'
          >
            <CalendarIcon className="w-4 h-4" />
            <p className="hidden md:block">{event.title}</p>
          </Link>
        )
      })}
  </div>
  </>
  )
}

export default Page