import React, { useEffect, useState } from 'react'
import { fetchEventById, isUserRegisteredToEvent } from '@/lib/data'
import { format } from "date-fns"
import moment from 'moment'
import AppAvatar from '@/app/ui/app-avatar';
import { RegisterToEvent } from '@/app/ui/dashboard/events/buttons';
import { registerToEvent } from '@/lib/actions';
import { PencilIcon } from '@heroicons/react/24/outline';

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
    const eventId = params.id;
    const event = await fetchEventById(eventId);
    const eventDate = event?.date || new Date();
    const formattedDate = format(eventDate, "MMMM do yyyy, hh:mm a");
    const fromNow = getDaysToNow(eventDate);

    const registerToEventById = registerToEvent.bind(null, eventId);
    const isUserRegistered = await isUserRegisteredToEvent(eventId);

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
                </div>
                {fromNow && !isUserRegistered &&
                    <form action={registerToEventById}
                        className='flex flex-col'
                    >
                        <button 
                            type='submit'
                            className="w-fit justify-center flex h-10 items-center rounded-lg bg-rose-400 px-4 text-sm font-medium text-white transition-colors hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
                        >
                            <span className="hidden md:block">Register</span>{' '}
                            <PencilIcon className="h-5 md:ml-4" />
                        </button>
                    </form>
                }
                {isUserRegistered && 
                    // TODO: Add unregister
                    <div>Unregister</div>
                }
            </div>
            <hr/>
            <div className='my-3 text-md'>
                {event?.description}
            </div>
        </div>
    )
}

export default Page