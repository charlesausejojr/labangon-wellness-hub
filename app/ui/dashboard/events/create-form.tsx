'use client'

import React from 'react'
import { useState } from 'react'
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import "react-datepicker/dist/react-datepicker.css";
import { Button as SubmitButton } from '@/app/ui/button';
import { Button } from "@/components/ui/button"
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
import { CalendarIcon } from '@heroicons/react/24/outline';
import { createEvent } from '@/lib/actions';

function CreateForm() {

    async function handleSubmit(formData:FormData) {
        const hour = Number(formData.get("time")?.toString().split(":")[0]) || 0;
        const min = Number(formData.get("time")?.toString().split(":")[1]) || 0;

        date.setHours(hour,min);
        const formattedDate = date.toISOString();

        // console.log(date);
        // console.log(formattedDate);
        console.log(format(formattedDate,'MMMM do yyyy, hh:mm:ss a'));

        formData.append("date",formattedDate);
        await createEvent(formData);
    }
    const [date, setDate] = useState(new Date());
    return (
        <form action={handleSubmit}>

            <div>
                <div className='my-3 font-bold text-lg'>
                    Create Event
                </div>
                <label
                    htmlFor='title'
                    className='my-2 block text-sm font-medium'
                >
                    Title
                </label>
                <input
                    id="title"
                    name="title"
                    placeholder="Enter event title"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="title-error"
                    required={true}
                />
                <label
                    htmlFor='description'
                    className='my-2 block text-sm font-medium'
                >
                    Description
                </label>
                <input
                    id="description"
                    name="description"
                    placeholder="Enter event description"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    required={true}
                />
                <div className='block w-full my-2'>
                    <label
                        htmlFor='date'
                        className='my-2 block text-sm font-medium'
                    >
                    Date
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
                                date < new Date()
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className='block w-full my-2'>
                    <label
                        htmlFor='time'
                        className='my-2 block text-sm font-medium'
                    >
                        Time
                    </label>
                    <input 
                        id="time"
                        name="time"
                        className="p-3 peer w-[240px] block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        aria-label="time" 
                        type="time" 
                        required={true}
                    /> 
                </div>
            </div>
            <SubmitButton type='submit'>
                Submit
            </SubmitButton>
        </form>
    )
}

export default CreateForm