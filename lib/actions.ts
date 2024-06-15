'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server';
import prisma from "@/lib/prisma";
import { nullable, z } from 'zod';
import { User } from '@/src/generated/cliet';
import { randomUUID } from 'crypto';


const FormSchema = z.object({
    id: z.string(),
    title: z.string({
        invalid_type_error: 'Please enter title.',
    }),
    description: z.string(),
    date: z.string({
        invalid_type_error: "Please enter date."
    }),
});

const SettingSchema = z.object({
    id: z.string(),
    firstName: z.string({
        invalid_type_error: 'Please enter first name.',
    }),
    lastName: z.string({
        invalid_type_error: 'Please enter last name.',
    }),
    address: z.string({
        invalid_type_error: 'Please enter address.',
    }),
    birthdate: z.string({
        invalid_type_error: "Please enter date."
    }),
    phoneNumber: z.string({
        invalid_type_error: "Please enter phone number."
    }),
});

const CreateEvent = FormSchema.omit({ id : true });
const UpdateUser = SettingSchema.omit({ id : true });

export type State = {
    errors?: {
      title?: string[];
      description?: string[];
      date?: string[];
    };
    message?: string | null;
};

export async function createEvent(formData: FormData) {
    const validatedFields = CreateEvent.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
        date: formData.get("date")
    });
    
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    const user = await currentUser();

    const fetchedUser = await prisma.user.findUnique({
        where : {
            id: user?.id,
        }
    });

    // Create User if not in DB
    if (!fetchedUser) {
        const userDB = await prisma.user.create({
            data : {
                id: user?.id,
                externalId: user?.externalId || "",
                firstName: user?.firstName || "",
                lastName: user?.lastName || "",
                email: user?.emailAddresses[0].emailAddress || "",
                image: user?.imageUrl || "",
            }
        })
    }

    const { title, description, date } = validatedFields.data;
    const createdAt = new Date().toISOString();

    try {
        const event = await prisma.event.create({
            data: {
                title: title,
                description: description,
                date: date,
                createdAt: createdAt,
                creator: {
                    connect : {
                        id: user?.id,
                    }
                },
            }
        })
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Create Event.',
        };
    }
    revalidatePath("/dashboard/events");
    redirect("/dashboard/events");
}

export async function updateEvent(formData: FormData) {
    const validatedFields = FormSchema.safeParse({
        id: formData.get("id"),
        title: formData.get("title"),
        description: formData.get("description"),
        date: formData.get("date")
    });
    
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    const user = await currentUser();

    const fetchedUser = await prisma.user.findUnique({
        where : {
            id: user?.id,
        }
    });

    const { title, description, date, id } = validatedFields.data;

    try {
        const event = await prisma.event.update({
            where:{
                id: id,
            },
            data : {
                title: title,
                description: description,
                date: date,
            }
        });
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Create Event.',
        };
    }
    revalidatePath(`/dashboard/events/${id}`);
    redirect(`/dashboard/events/${id}`);
}

export async function registerToEvent(eventId : string) {
    const user = await currentUser();

    let fetchedUser = await prisma.user.findUnique({
        where : {
            id: user?.id,
        }
    });

    if (!fetchedUser) {
        fetchedUser = await prisma.user.create({
            data : {
                id: user?.id,
                externalId: user?.externalId || randomUUID(),
                firstName: user?.firstName || "Anonymous",
                lastName: user?.lastName || "",
                email: user?.emailAddresses[0].emailAddress || "",
                image: user?.imageUrl || "",
            }
        })
    }

    try {
        // Append to scalar list
        const eventUpdate = await prisma.event.update({
            where: {
                id: eventId,
            },
            data : {
                attendees : {
                    set: [fetchedUser],
                },
            },
        })
    } catch(error) {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Register to Event.',
        };
    }
    revalidatePath(`/dashboard/events/${eventId}`);
    redirect(`/dashboard/events/${eventId}`);
}

export async function unregisterToEvent(eventId : string) {
    const user = await currentUser();

    let fetchedUser = await prisma.user.findUnique({
        where : {
            id: user?.id,
        }
    });

    if (!fetchedUser) {
        fetchedUser = await prisma.user.create({
            data : {
                id: user?.id,
                externalId: user?.externalId || randomUUID(),
                firstName: user?.firstName || "Anonymous",
                lastName: user?.lastName || "",
                email: user?.emailAddresses[0].emailAddress || "",
                image: user?.imageUrl || "",
            }
        })
    }

    try {
        const eventUpdate = await prisma.event.update({
            where: {
                id: eventId,
            },
            data : {
                attendees : {
                    disconnect: [fetchedUser],
                },
            },
        })

    } catch(error) {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Unregister to Event.',
        };
    }
    revalidatePath(`/dashboard/events/${eventId}`);
    redirect(`/dashboard/events/${eventId}`);
}


export async function updateDBUser(formData : FormData) {
    const user = await currentUser();
 
    const {firstName, lastName, phoneNumber, address, birthdate} = UpdateUser.parse({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        phoneNumber: formData.get("phoneNumber"),
        address: formData.get("address"),
        birthdate: formData.get("birthdate"),
    });

    try {
        const userUpdate = await prisma.user.update({
            where : {
                id: user?.id,
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                address: address,
                birthdate: birthdate,
            }
        });
        console.log(phoneNumber);
    } catch(error) {
        return {
            message: 'Database Error: Failed to Update User.',
        };
    }
    revalidatePath(`/dashboard/settings`);
    redirect(`/dashboard`);
}

