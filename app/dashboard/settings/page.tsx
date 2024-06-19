
import React, { useState } from 'react'
import { fetchDBUser } from '@/lib/data'
import EditForm from '@/app/ui/dashboard/settings/edit-form';
import { notFound } from 'next/navigation';
import { User } from '@/src/generated/client';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Settings',
  }; 

async function Page() {
    const dbUser : User = await fetchDBUser();

    if (!dbUser) {
        notFound();
    }

    return (
        <div>
            <EditForm dbUser={dbUser}/>
        </div>
    )
    
}

export default Page