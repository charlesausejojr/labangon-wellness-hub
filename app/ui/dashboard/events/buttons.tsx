import { PlusIcon } from "@heroicons/react/16/solid";
import { PencilIcon } from "@heroicons/react/24/outline";
import { SendIcon } from "lucide-react";
import Link from "next/link";

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

export function RegisterToEvent() {
    return (
      <Link
        href="/dashboard/events/create"
        className="justify-center w-1/4 flex h-10 items-center rounded-lg bg-rose-400 px-4 text-sm font-medium text-white transition-colors hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
      >
        <span className="hidden md:block">Register</span>{' '}
        <PencilIcon className="h-5 md:ml-4" />
      </Link>
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