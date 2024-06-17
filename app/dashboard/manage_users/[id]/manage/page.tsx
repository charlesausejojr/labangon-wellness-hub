import { UserCard } from '@/app/ui/dashboard/manage_users/user-card';
import { fetchUserById } from '@/lib/data';
import { notFound } from 'next/navigation';
import React from 'react'
import { Toaster } from 'sonner';
async function Page({ params }: { params: { id: string } }) {
    const userId = params.id;
    const user  = await fetchUserById(userId);
    
    if (!user) {
        notFound();
    }

    return (
        <div>
            <div className='mb-3'>
                User: {" "} 
                <span className='font-bold'>{user?.firstName}</span>
            </div>
            <hr/>
            <div>
               {/* Type error solution is to place notFound*/} 
               <UserCard user={user}/>
            </div>
            <Toaster richColors/>
        </div>
  )
}

export default Page