import React from 'react'
import { fetchEvents, fetchAdminOrFacilitator, fetchEventsByQuery} from '@/lib/data'
import Link from 'next/link';
import { LinkIcon } from '@heroicons/react/16/solid';
import { CreateEvent } from '@/app/ui/dashboard/events/buttons';
import { Event } from '@/src/generated/cliet';
import { useUser } from '@clerk/nextjs';
import Search from '@/app/ui/search';
import { CalendarIcon } from '@heroicons/react/24/outline';
import EventCards from '@/app/ui/event-cards';

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
  const events : Event[]  = await fetchEventsByQuery(query); 
  const isAdminOrFacilitator = await fetchAdminOrFacilitator();
  return (
    <>
    <div className='flex flex-row justify-between items-center'>
      <div className='mb-4 font-bold text-lg'>
          Events
      </div>
      {/* If user is ADMIN or FACILITATOR */}
      { isAdminOrFacilitator && 
        <CreateEvent/> }
    </div>
    <Search placeholder='Search events...'/>
    {/* TODO: Add Breadcrumbs */}
    <EventCards events={events}/>
  </>
  )
}

export default Page