import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const AuthLayout = ({children}:{children : React.ReactNode}) => {
  return (
    <div className="bg-muted flex min-h-svh  flex-col justify-center items-center gap-6 p-6 md:p-10">
      <div className='flex w-full max-w-sm flex-col items-center gap-6'>
        <Link href="/" className='flex items-center gap-2 self-center
         font-medium'>
         <Image src="/logo/logo.svg" alt="Logo" height={30} width={30}/>
          N-8-N
        </Link>
       {children}
      </div>
    </div>
  )
}

export default AuthLayout