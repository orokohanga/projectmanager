import React from 'react'
import { NavLink } from 'react-router-dom'
import useCookie from "react-use-cookie"

export default function NavBar() {
  const [token, setToken] = useCookie("token", "0")
  function logout() {
    localStorage.clear()
    setToken("0")
  }
  console.log(token)
  return (
    <header className='flex gap-4 justify-center bg-slate-800 text-white h-14 items-center'>
      <NavLink to='/'>Home</NavLink>
      {token === "0" ?
        (<>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/register'>Register</NavLink>
        </>)
        :
        (
          <>
            <p>{window.localStorage.getItem('name')}</p>
            <NavLink to='/myprojects'>My projects</NavLink>
            <NavLink to='/project/create'>Create a project</NavLink>
            <button onClick={logout}>Logout</button>
          </>
        )
      }
    </header>
  )
}
