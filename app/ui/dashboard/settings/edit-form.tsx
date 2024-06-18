'use client'

import React, { useState } from 'react'
import { Button as SubmitButton } from '@/app/ui/button';
import { toast , Toaster} from "sonner";
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { User } from '@/src/generated/client';
import { updateDBUser } from '@/lib/actions';

function EditForm(
    { dbUser } : { dbUser : User}
) {
    const handleSubmit = async (formData:FormData) : Promise<void> =>  {
        formData.append("birthdate",date.toISOString());
        console.log(formData.get("phoneNumber"))
        await updateDBUser(formData);
    }

    const [date, setDate] = useState(dbUser?.birthdate || new Date());

    //console.log(dbUser);
    return (
        <form action={(formData) => {
            const promise = handleSubmit(formData);

            toast.promise(promise, {
                loading: "Submitting changes...",
                success: "Changes submitted!",
                error: "Error submitting changes",});
        }}
        >
            <div>
                <div className='my-3 font-bold text-lg'>
                    Settings
                </div>
                <hr/>
                <div className='flex flex-row justify-between gap-4'>
                    <div className='flex-1'>
                        <label
                            htmlFor='firstName'
                            className='my-2 block text-sm font-medium'
                        >
                            First Name
                        </label>
                        <input
                            id="firstName"
                            name="firstName"
                            placeholder="Enter first name"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby="firstName-error"
                            defaultValue={dbUser?.firstName || ""}
                        />
                    </div>
                    <div className='flex-1'>
                        <label
                            htmlFor='lastName'
                            className='my-2 block text-sm font-medium'
                        >
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            name="lastName"
                            placeholder="Enter last name"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby="lastName-error"
                            defaultValue={dbUser?.lastName || ""}
                        />
                    </div>
                    <div className='flex-1'>
                        <label htmlFor="phoneNumber" 
                            className='my-2 block text-sm font-medium'>
                                Phone Number
                            </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                                    <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z"/>
                                </svg>
                            </div>
                            <input 
                                type="text" 
                                id="phoneNumber" 
                                name="phoneNumber"
                                aria-describedby="phoneNumber-error" 
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                placeholder='09123456789'
                                defaultValue={dbUser?.phoneNumber || ""}/>
                        </div>
                    </div>
                </div>
                <label
                    htmlFor='address'
                    className='my-2 block text-sm font-medium'
                >
                    Address
                </label>
                <input
                    id="address"
                    name="address"
                    placeholder="Enter address"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="address-error"
                    defaultValue={dbUser?.address || ""}
                />
                <div className='block w-full my-2'>
                    <label
                        htmlFor='date'
                        className='my-2 block text-sm font-medium'
                    >
                    Birthdate
                    </label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                                >
                                {date ? (
                                    format(date, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <Calendar
                                required={true}
                                mode="single"
                                selected={date}
                                onSelect={(date) => date && setDate(date)}
                                disabled={(date) =>
                                date > new Date()
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <SubmitButton type='submit'>
                Submit
            </SubmitButton>
            <Toaster richColors/>
        </form>
)
}

export default EditForm