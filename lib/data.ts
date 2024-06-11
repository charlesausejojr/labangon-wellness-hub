import { PrismaClient } from '@prisma/client'
import { unstable_noStore as noStore } from 'next/cache'
const prisma = new PrismaClient()

export async function fetchUsers() {
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    // This will prevent loading
    noStore();
    const users = await prisma.user.findMany();
    return users;
}

export async function fetchEvents() {
    noStore();
    const events = await prisma.event.findMany({
        include: {
            attendees: {
                select: {
                    name: true,
                }
            }
        }
    });
    // TODO: add where date is equal or greater than now
    return events;
}