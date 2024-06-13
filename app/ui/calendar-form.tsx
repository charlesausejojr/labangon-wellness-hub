"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"

const FormSchema = z.object({
  dob: z.date({
    required_error: "Date is required.",
  }),
})

export  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

export function CalendarForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const [date, setDate] = useState(new Date());
  return (
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
  )
}
