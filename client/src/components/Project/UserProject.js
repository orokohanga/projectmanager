import React from 'react'
import axios from 'axios'
import useCookie from "react-use-cookie"
import { useState, useEffect } from 'react'

export default function UserProject() {
    const [token, setToken] = useCookie("token", "0")
    const [projectowner, setProjectOwner] = useState([])

    useEffect(() => {
        async function getProjectOwner() {
            try {
                const response = await axios.get('http://localhost:3001/project/owner/' + window.localStorage.getItem('userID'),{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setProjectOwner(response.data)
                console.log(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        getProjectOwner()
    }, [token])
    


    return (
        <div>UserProject</div>
    )
}
