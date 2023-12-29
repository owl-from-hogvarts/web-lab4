import React from 'react'
import Button from './button'
import { logoutUser } from 'app/api/users'
import { useNavigate } from 'react-router-dom'
import { isAuthorized } from 'app/auth/auth'
import BigText from './bigText'

export function LogoutButton() {
  const nav = useNavigate()

  if (!isAuthorized()) {
    return;
  }

  return <Button className='rounded' onClick={logoutUser(nav)}><BigText>Logout</BigText></Button>
}


