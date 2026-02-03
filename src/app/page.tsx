import {prisma} from "@/lib/db"
import React from 'react'


const page = async () => {
  const user  = await prisma.user.findMany();
  console.log(user);
  return (
    <div className='text-red-500'>
    {JSON.stringify(user)}
    </div>
  )
}

export default page;