import React, { useEffect, useState } from 'react'
import { fetchEventById, fetchRegisteredCount, isUserRegisteredToEvent } from '@/lib/data'
import { format } from "date-fns"
import moment from 'moment'
import { registerToEvent, unregisterToEvent } from '@/lib/actions';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Toaster, toast } from 'sonner';
import { register } from 'module';
import { RegisterToEvent, UnregisterToEvent } from '@/app/ui/dashboard/events/buttons';

function getDaysToNow(date : Date) {
    // const momentDate = moment().format(formattedDate);
    const today = new Date();
    const fromNow = moment(date).fromNow();
    if (date.getTime() > today.setHours(0,0,0,0)) {
        return fromNow;
    }
    else {
        return null;
    }
}


async function Page({ params }: { params: { id: string } }) {
    const user = await currentUser();

    const eventId = params.id;
    const event = await fetchEventById(eventId);

    if (!event) {
        notFound();
    }

    const eventDate = event?.date || new Date();
    const formattedDate = format(eventDate, "MMMM do yyyy, hh:mm a");
    const fromNow = getDaysToNow(eventDate);

    const isUserRegistered = await isUserRegisteredToEvent(eventId);
    const isAuthor = event?.creatorId == user?.id;
    const registeredCount = await fetchRegisteredCount(eventId);

    return (
        <div className=''>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-col align-center mb-3'> 
                    <p className='flex font-bold text-lg'>
                        {event?.title}
                    </p>
                    <span className='flex text-sm'>
                        {formattedDate}  
                    </span>
                    {fromNow != null ? 
                        <span className='text-emerald-700'>{" "}{fromNow.charAt(0).toUpperCase() + fromNow.slice(1)}</span>  :
                        <span className="text-rose-700">{" "}Event Finished</span>
                    }
                    <span>Created By: {event?.creator?.firstName ?? "Anonymous"}</span>
                    <span>Users Registered: {registeredCount == 0 ? "None" : registeredCount}</span>
                </div>
                {fromNow && !isUserRegistered && !isAuthor &&
                    /* This is on another file that is a client component since 
                       we are handling a loading toast that needs a client component  
                    */
                    <RegisterToEvent eventId={eventId}/>
                }
                {isUserRegistered && !isAuthor && 
                    <UnregisterToEvent eventId={eventId}/>
                }
                { fromNow && isAuthor && 
                    <Link
                        href={`/dashboard/events/${event?.id}/edit`}
                        className="w-fit justify-center flex h-10 items-center rounded-lg bg-rose-400 px-4 text-sm font-medium text-white transition-colors hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
                    >
                        <span>Edit Event</span>
                        <PencilSquareIcon className='w-4 h-4 ml-2'/>
                    </Link>

                }
            </div>
            <hr/>
            <div className='my-3 text-md'>
                {event?.description}
            </div>
            <Toaster richColors/>
        </div>
    )
}

export default Page