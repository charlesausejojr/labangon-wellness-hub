import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function AppAvatar( 
    { 
        imageURL , 
        firstName
    } : 
    { 
        imageURL : string, 
        firstName : string
}) {
  return (
    <Avatar>
        <AvatarImage src={imageURL} />
        <AvatarFallback>
            {firstName.charAt(0)}
        </AvatarFallback>
    </Avatar>
  )
}

export default AppAvatar