import { Button, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT } from '../../redux/authReducer/auth.actionTypes'

export default function LandingPage() {
  const dispatch = useDispatch()
  const { isAuth } = useSelector(s => s.auth)
  const [logstate, setLogstate] = useState('login')

  useEffect(() => {
    if(isAuth)
    setLogstate('logout')
  }, []);

  const handleLogout = () => {
    dispatch({ type: LOGOUT })
    setLogstate('login')
  }

  console.log(logstate);

  return (
    <div>
      <h1>Landing Page</h1>
    </div>
  )
}
