import { fetchAdminOrFacilitator, fetchAttendedEvents, fetchEvents } from '@/lib/data';
import { Event } from '@/src/generated/cliet';
import React from 'react'
import EventCards from '../../ui/event-cards';
import { currentUser } from '@clerk/nextjs/server';

async function Page() {
    const events : Event[]  = await fetchEvents(); 
    const user = await currentUser();
    const createdEvents = events.filter((event) => event.creatorId == user?.id);
    const isAdminOrFacilitator = await fetchAdminOrFacilitator();
    const attendedEvents = await fetchAttendedEvents() ;
    const upcomingEvents = events.filter((event) => event.date > new Date());
    
    return (
        <div className='flex flex-col'>
            <p className='text-lg font-bold mb-4'>Dashboard</p>
            <hr/>
            <div className='flex flex-col gap-4 md:flex-row my-4'> 
                <div className='flex flex-col flex-1'>
                    <p className='text-sm md:text-base'>{isAdminOrFacilitator ? "Created" : "Registered"} Events</p>
                    <div className='bg-slate-200 flex h-[480px] rounded-md my-2 p-3'>
                        {isAdminOrFacilitator ? 
                            <EventCards events={createdEvents}/> :
                            <EventCards events={attendedEvents}/> 
                        }
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <p className='text-sm md:text-base'>Upcoming Events</p>
                    <div className='bg-slate-200 flex h-[480px] rounded-md my-2 p-3'>
                        <EventCards events={upcomingEvents}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page