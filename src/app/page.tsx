import React from 'react'
import { caller } from "@/trpc/server";

const page = async () => {
  const user  = await caller.getUsers();
  console.log(user);
  return (
    <div className='text-red-500'>
    {JSON.stringify(user)}
    </div>
  )
}

export default page;