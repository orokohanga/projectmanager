import React from 'react'
import { NavLink } from 'react-router-dom'
import useCookie from "react-use-cookie"

export default function NavBar() {
  const [token, setToken] = useCookie("token", "0")

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
            <button onClick={() => setToken("0")}>Logout</button>
          </>
        )
      }
    </header>
  )
}
