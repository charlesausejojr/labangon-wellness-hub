import { PowerIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavLinks from './nav-links'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { currentUser } from '@clerk/nextjs/server'
import { fetchAdminOrFacilitator, isAdmin } from '@/lib/data'

async function Sidenav() {
    const user = await currentUser();
    // const isAdminOrFacilitator = await fetchAdminOrFacilitator();
    const isUserAdmin = await isAdmin();
    return (
        <div className='flex h-full flex-col px-3 py-4 md:px-2'>
            <div className='bg-slate-100 flex h-20 rounded-md my-2'>
                <Link 
                    className='flex justify-center h-full p-4 rounded-md w-full md:justify-start'
                    href="/dashboard">
                    <Image 
                        src = "/lotus.png"
                        width={50}
                        height={12}
                        alt='logo'
                    />
                    <div className='flex-row px-2 ml-3 text--400'>
                        <p className='text-lg font-bold'>Labangon</p>
                        <p className='text-sm'>Wellness Hub</p>
                    </div>
                </Link>
            </div>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <SignedIn>
                    <NavLinks />
                    {/* If Admin */}
                    {isUserAdmin &&
                        <Link
                            href="/dashboard/manage_users"
                            className='flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-slate-100 p-3 text-sm font-medium hover:bg-rose-100 hover:text-rose-600 md:flex-none md:justify-start md:p-2 md:px-3'
                        >
                            <UserGroupIcon className="w-6" />
                            <p className="hidden md:block">Manage Users</p>
                        </Link>
                    }
                </SignedIn>
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                <SignedIn>
                    <div
                        className="flex h-[48px] md:h-[75px] w-full grow items-center justify-center gap-2 rounded-md text-black bg-slate-100 p-3 text-sm font-medium hover:bg-rose-100 hover:text-rose-600 md:flex-none md:justify-start md:p-2 md:px-3"
                    >
                        <UserButton/>
                        <div className='m-2 text-md'>
                            {user?.firstName}
                        </div>
                    </div>
                </SignedIn>
                <SignedOut>
                    <Button asChild className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md text-black bg-slate-100 p-3 text-sm font-medium hover:bg-rose-100 hover:text-rose-600 md:flex-none md:justify-start md:p-2 md:px-3">
                        <div> 
                            <PowerIcon className="w-6 my-3" />
                            <SignInButton/>
                        </div>
                    </Button>
                </SignedOut>
                { /* 
                <form
                </div>action={async () => {
                    'use server';
                    await signOut();
                }}
                >
                <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-slate-100 p-3 text-sm font-medium hover:bg-rose-100 hover:text-rose-600 md:flex-none md:justify-start md:p-2 md:px-3">
                    <PowerIcon className="w-6" />
                    <div className="hidden md:block">Sign Out</div>
                </button>
                </form> */}

            </div>
        </div>
    )
}

export default Sidenav
