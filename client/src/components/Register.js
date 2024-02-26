import React from 'react'
import axios from 'axios'
import useCookie from "react-use-cookie"
import { useState } from 'react'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookie("token", "0")

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3001/auth/register', { name, email, password })
            setToken(response.data.token)
            window.localStorage.setItem('userID', response.data.userID)
            window.localStorage.setItem('name', response.data.name)
            window.location.href = '/'
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='text-white flex flex-col justify-center items-center py-8 gap-4 w-1/2'>
                <h1 className='text-white text-2xl'>Login</h1>
                <form className='flex flex-col w-3/4 gap-3' onSubmit={handleSubmit}>
                    <input className='bg-slate-900 text-white h-10 placeholder:italic p-2' onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Name" />
                    <input className='bg-slate-900 text-white h-10 placeholder:italic p-2'  onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email" />
                    <input className='bg-slate-900 text-white h-10 placeholder:italic p-2' onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password" />
                    <button className='bg-slate-800 text-white h-10 text-start p-2 hover:bg-slate-600' type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}
