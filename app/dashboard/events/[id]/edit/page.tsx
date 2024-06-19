import EditForm from '@/app/ui/dashboard/events/edit-form';
import React from 'react'
import { fetchEventById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit Event',
  }; 

async function Page({ params }: { params: { id: string } }) {
    const eventId = params.id;
    const event = await fetchEventById(eventId);
    if (!event) {
        notFound();
    }
    return (
        <div>
            <EditForm event={event} />
        </div>
    );
    }

export default Page