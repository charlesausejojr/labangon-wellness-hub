import React from 'react'
import { fetchUsers } from '@/lib/data'

async function Page() {
  const users = await fetchUsers();
  console.log(users); 
  return (
    <div>
      Manage Users (Admin Only)
      {/* Search before rendering */}
    </div>
  )
}

export default Page