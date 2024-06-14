import React from 'react'
import { Event } from '@/src/generated/cliet'
import Link from 'next/link'
import { CalendarIcon } from '@heroicons/react/24/outline'
import { format } from "date-fns"

function EventCards(
    { events } :
    { events : Event[]}
) {

  // Sort events by date
  events.sort((a, b) => a.date.getTime() - b.date.getTime())

  return (
    <div className='overflow-y-auto w-full no-scrollbar'>
    {events.map((event) => {
        return (
          <Link
            key={event.id}
            href={`/dashboard/events/${event.id}`}
            className='drop-shadow-md m-3 flex h-[48px] grow items-center justify-between gap-2 rounded-md bg-slate-100 p-3 text-sm font-medium hover:bg-rose-100 hover:text-rose-600 md:flex-none md:justify-start md:p-2 md:px-3'
          >
            <div className='flex flex-row flex-1'>
              <CalendarIcon className="w-4 h-4 mr-2" />
              <p className="hidden md:block">{event.title}</p>
            </div>
            <div className='flex'>
              {event.date > new Date() ? 
                <span className='text-emerald-700'>{format(event.date,'MMMM do, yyy')}</span>   :
                <span className='text-rose-700'>Event Finished</span>}
            </div>
          </Link>
        )
      })}
      </div>
  )
}

export default EventCards