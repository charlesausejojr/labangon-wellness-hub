import React from 'react'
import { User } from '@prisma/client'

function ParticipantsTable( {users} : {users : User[]}) {
    console.log(users);
    return (
        <div>
        </div>
    )
}

export default ParticipantsTable