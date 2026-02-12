"use client"
import React from 'react'
import { Button } from '../ui/button'
import { authClient } from '@/lib/auth-client'

type Props = {}

const Button_Logout = (props: Props) => {
   
  return (
    <Button onClick={() => authClient.signOut()}>
    Logout
  </Button>
  )
}

export default Button_Logout