import React from 'react'
import axios from 'axios'
import useCookie from "react-use-cookie"
import { useState, useEffect } from 'react'
import SignleProject from './SingleProject'

export default function UserProject() {
    const [token, setToken] = useCookie("token", "0")
    const [projectowner, setProjectOwner] = useState([])

    useEffect(() => {
        async function getProjectOwner() {
            try {
                const response = await axios.get('http://localhost:3001/project/owner/' + window.localStorage.getItem('userID'), {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setProjectOwner(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        getProjectOwner()
    }, [token])



    return (
        <div className='flex flex-col gap-8 mt-8 items-center bg-slate-950'>
            <h1 className='text-3xl font-bold text-white text-center'>Your Projects</h1>
            <div className='flex flex-col gap-8 justify-center w-3/4'>
                {projectowner.map((project) => {
                    return (
                        <SignleProject key={project._id} name={project.name} owner={window.localStorage.getItem('name')} />
                    )
                })}
            </div>
            
            <h1 className='text-3xl font-bold text-white text-center'>Projects Followed</h1>
            <div className='flex flex-col gap-8 justify-center w-3/4'>
                {projectowner.map((project) => {
                    return (
                        <SignleProject key={project._id} name={project.name} owner={window.localStorage.getItem('name')} />
                    )
                })}
            </div>
        </div>
    )
}
