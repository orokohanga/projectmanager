import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <header className='flex gap-4 justify-center'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/register'>Sign up</NavLink>
    </header>
  )
}
