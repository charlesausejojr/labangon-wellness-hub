'use client'

import React from 'react'
import { 
    HomeIcon, 
    CalendarDaysIcon,
    UserGroupIcon, 
    Cog8ToothIcon 
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon},
    { name: 'Events', href: '/dashboard/events', icon: CalendarDaysIcon},
    { name: 'Participants', href: '/dashboard/participants', icon: UserGroupIcon},
    { name: 'Settings', href: '/dashboard/settings', icon: Cog8ToothIcon},
]
function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                        'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-rose-100 hover:text-rose-600 md:flex-none md:justify-start md:p-2 md:px-3',
                        {
                            'bg-rose-100 text-rose-600': pathname === link.href,
                        },
                        )}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    )
}

export default NavLinks