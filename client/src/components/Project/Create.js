import React from 'react'
import useCookie from "react-use-cookie"
import { useState } from 'react'
import axios from 'axios'

export default function ProjectCreate() {
  const [name, setName] = useState('')
  const [token, setToken] = useCookie("token", "0")

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3001/project/create', { name, ownerId: window.localStorage.getItem('userID') }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response)
      window.location.href = `/project/${response.data.id}`
    } catch (error) {
      console.error(error)
    }
  }

  if (token === "0") {
    window.location.href = "/login";
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='text-white flex flex-col justify-center items-center py-8 gap-4 w-1/2'>
        <h1 className='text-white text-2xl'>Create a project</h1>
        <form className='flex flex-col w-3/4 gap-3' onSubmit={handleSubmit}>
          <input className='bg-slate-900 text-white h-10 placeholder:italic p-2' onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Name" />
          <button className='bg-slate-800 text-white h-10 text-start p-2 hover:bg-slate-600' type="submit">Create</button>
        </form>
      </div>
    </div>
  )
}
