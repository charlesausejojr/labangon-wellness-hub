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
import { toast , Toaster} from "sonner";

function CreateForm() {

    const handleSubmit = async (formData:FormData) : Promise<void> =>  {
        const startDate = date;
        const endDate = date;

        const startHour = Number(formData.get("startTime")?.toString().split(":")[0]) || 0;
        const startMin = Number(formData.get("startTime")?.toString().split(":")[1]) || 0;

        const endHour = Number(formData.get("endTime")?.toString().split(":")[0]) || 0;
        const endMin = Number(formData.get("endTime")?.toString().split(":")[1]) || 0;
        
        console.log(startHour,startMin)
        console.log(endHour,endMin)
        console.log("START",startDate)
        console.log("END",endDate)

        startDate.setHours(startHour,startMin);
        const formattedStartDate = startDate.toISOString();

        endDate.setHours(endHour,endMin);
        const formattedEndDate = endDate.toISOString();


        console.log("START",formattedStartDate)
        console.log("END",formattedEndDate)

        console.log(format(formattedStartDate,'MMMM do yyyy, hh:mm:ss a'));
        console.log(format(formattedEndDate,'MMMM do yyyy, hh:mm:ss a'));

        formData.append("startDate",formattedStartDate);
        formData.append("endDate",formattedEndDate);

        // console.log(date);
        // console.log(formattedDate);
        // console.log(format(formattedDate,'MMMM do yyyy, hh:mm:ss a'));


        // await createEvent(formData);
    }
    const [date, setDate] = useState(new Date());
    return (
        <form action={(formData) => {
            const promise = handleSubmit(formData);
            toast.promise(promise, {
                loading: "Creating event...",
                success: "Event Created!",
                error: "Error creating event",});
            }}
        >
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
                        htmlFor='startTime'
                        className='my-2 block text-sm font-medium'
                    >
                        Start Time
                    </label>
                    <input 
                        id="startTime"
                        name="startTime"
                        className="p-3 peer w-[240px] block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        aria-label="startTime" 
                        type="time" 
                        required={true}
                    /> 
                </div>
                <div className='block w-full my-2'>
                    <label
                        htmlFor='endTime'
                        className='my-2 block text-sm font-medium'
                    >
                        End Time
                    </label>
                    <input 
                        id="endTime"
                        name="endTime"
                        className="p-3 peer w-[240px] block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        aria-label="endTime" 
                        type="time" 
                        required={true}
                    /> 
                </div>
            </div>
            <SubmitButton type='submit'>
                Submit
            </SubmitButton>
            <Toaster richColors/>
        </form>
    )
}

export default CreateForm