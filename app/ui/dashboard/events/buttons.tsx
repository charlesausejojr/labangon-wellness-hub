'use client'

import { registerToEvent, unregisterToEvent } from "@/lib/actions";
import { PlusIcon } from "@heroicons/react/16/solid";
import { MinusCircleIcon, PencilIcon } from "@heroicons/react/24/outline";
import { SendIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function CreateEvent() {
    return (
      <Link
        href="/dashboard/events/create"
        className="flex h-10 items-center rounded-lg bg-rose-400 px-4 text-sm font-medium text-white transition-colors hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
      >
        <span className="hidden md:block">Create Event</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    );
}

export function RegisterToEvent( { eventId } : { eventId : string }) {
    const handleRegistration = async () : Promise<void> => {
      await registerToEvent(eventId)
    }

    return (
      <form action={ () => {
        const promise = handleRegistration();
        toast.promise(promise, {
          loading: "Registering to event...",
          success: "You have successfullly registered to this event!",
          error: "Failed to register",});
      }}
        className='flex flex-col'
    >
        <button 
            type='submit'
            className="w-fit justify-center flex h-10 items-center rounded-lg bg-green-500 px-4 text-sm font-medium text-white transition-colors hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
            <span className="hidden md:block">Register</span>{' '}
            <PencilIcon className="h-5 md:ml-4" />
        </button>
      </form>
    );
}

export function UnregisterToEvent( { eventId } : { eventId : string }) {
  const handleUnregistration = async () : Promise<void> => {
    await unregisterToEvent(eventId)
  }

  return (
    <form action={ () => {
      const promise = handleUnregistration();
      toast.promise(promise, {
        loading: "Unregistering to event...",
        success: "You are now unregistered to the event",
        error: "Failed to unregister",});
    }}
      className='flex flex-col'
  >
      <button 
          type='submit'
          className="w-fit justify-center flex h-10 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
      >
          <span className="hidden md:block">Unregister</span>{' '}
          <MinusCircleIcon className="h-5 md:ml-4" />
      </button>
    </form>
  );
}

export function SubmitEvent() {
    return (
        <Link
            href="/dashboard/events/create"
            className="w-1/4 flex h-10 justify-center items-center rounded-lg bg-rose-400 px-4 text-sm font-medium text-white transition-colors hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
        >
            <span className="hidden md:block">Submit Event</span>
        </Link>
    );
}