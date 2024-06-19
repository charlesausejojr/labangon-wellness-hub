import React, { Suspense } from 'react'
import { fetchAdminOrFacilitator, fetchEventsByQuery} from '@/lib/data'
import { CreateEvent } from '@/app/ui/dashboard/events/buttons';
import { Event } from '@/src/generated/client';
import Search from '@/app/ui/search';
import EventCards from '@/app/ui/event-cards';
import { Metadata } from 'next';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
    title: 'Events',
  };

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
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/events/">Events</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
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