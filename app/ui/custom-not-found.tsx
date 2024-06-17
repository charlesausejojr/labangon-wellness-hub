import HeartBeat from '@/app/ui/heartbeat'
import Link from 'next/link'
import React from 'react'

function CustomNotFound(
    { name, path} : { name: string, path : string} 
) {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <HeartBeat/>
      <h2 className="mt-3 text-3xl font-semibold">404 Not Found</h2>
      <p>Could not find the {name} .</p>
      <Link
        href={path}
        className="justify-center w-1/4 flex h-10 items-center rounded-lg bg-rose-400 px-4 text-sm font-medium text-white transition-colors hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
      >
        Go Back
      </Link>
    </main>
  )
}

export default CustomNotFound