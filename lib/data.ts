'use server';

import { unstable_noStore as noStore } from 'next/cache'
import prisma from './prisma';
import { currentUser } from '@clerk/nextjs/server';


export async function fetchAdminOrFacilitator() {
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    // This will prevent loading
    const user = await currentUser();
    const userDB = await prisma.user.findFirst({
        where: {
            id: user?.id,
            role: 'ADMIN' || 'FACILITATOR',
        },
    });
    if (!userDB) {
        return false;
    }
    return true;
}

export async function fetchEvents() {
    noStore();
    try {
        const events = await prisma.event.findMany({
            orderBy: [ 
                {
                    date: 'asc',
                }
            ],
            include: {
                attendees: {
                    select: {
                        firstName: true,
                    }
                }
            }
        });
        // TODO: add where date is equal or greater than now
        return events;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch events.');
    }

}

export async function fetchEventById(eventId : string){
    try {
        const event = await prisma.event.findUnique({
            where: {
                id: eventId
            },
            include: {
                creator: true,
            }
        });
        return event;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch event.');
    }

}

export async function isUserRegisteredToEvent(eventId: string) {
    const user = await currentUser();
     try {
        const event = await prisma.event.findFirst({
            where: {
                id: eventId
            },
            include: {
                attendees: {
                    select: {
                        id: true,
                    },
                },
            }
        });
        if (!event) {
            return false
        } 
        for (let i = 0; i < event.attendees.length; i ++) {
            if (event.attendees[i].id == user?.id) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch event.');
    }
}