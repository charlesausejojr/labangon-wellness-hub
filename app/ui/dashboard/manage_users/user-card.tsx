'use client'

import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button as SubmitButton } from '@/app/ui/button';
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { fetchUsers } from '@/lib/data'
import { useState } from "react"
import { UserIcon } from "@heroicons/react/24/outline"
import { User } from "@/src/generated/cliet"
import Link from "next/link"
import { updateUserRole } from "@/lib/actions";
import { toast } from "sonner";

const roles = [
    {
        value: "ADMIN",
        label: "ADMIN"
    },
    {
        value: "BASIC",
        label: "BASIC"
    },
    {
        value: "FACILITATOR",
        label: "FACILITATOR"
    }
]


export function UserCards(
    { users } : { users: User[]}
) {
  return (
    <>
        {users.map((user) => {
            return (
                <Link 
                    key={user.id}
                    href={`/dashboard/manage_users/${user.id}/manage`}
                    className='drop-shadow-md m-3 flex h-[48px] grow items-center justify-between gap-2 rounded-md bg-slate-100 p-3 text-sm font-medium hover:bg-rose-100 hover:text-rose-600 md:flex-none md:justify-start md:p-7 md:px-3'
                >
                    <div className='flex flex-row flex-1'>
                        <UserIcon className="w-4 h-4 mr-2"/>
                        <p>{user?.firstName} {user?.lastName}</p>
                    </div> 
                </Link>
            )
        })}
    </>
  )
}

export function UserCard(
    { user } : { user : User }
){
    const handleRoleChange = async () : Promise<void> => {
        await updateUserRole(user?.id, value);
    };

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(user?.role.toString());
    return (
        <form action={ () => {
            const promise = handleRoleChange();
            toast.promise(promise, {
                loading: "Updating user role...",
                success: "User role updated!",
                error: "Failed to update role",});
        }}>
            <div className="flex flex-row justify-start items-center p-4">
                <p className="mr-3">Manage Role</p>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {value
                        ? roles.find((role) => role.value === value)?.label
                        : "Select role..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search role..." />
                        <CommandEmpty>No role found.</CommandEmpty>
                        <CommandList>
                        {roles.map((role) => (
                            <CommandItem
                            key={role.value}
                            value={role.value}
                            onSelect={(currentValue : string) => {
                                setValue(currentValue === value ? "" : currentValue)
                                setOpen(false)
                            }}
                            >
                            <Check
                                className={cn(
                                "mr-2 h-4 w-4",
                                value === role.value ? "opacity-100" : "opacity-0"
                                )}
                            />
                            {role.label}
                            </CommandItem>
                        ))}
                        </CommandList>
                    </Command>
                    </PopoverContent>
                </Popover>
            </div>
            <SubmitButton type="submit">
                Save Changes
            </SubmitButton>
        </form>
    );
}
