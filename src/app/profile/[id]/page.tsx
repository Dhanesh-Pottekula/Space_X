"use client"
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function page() {
  const router = useRouter()

  async function handleLogout(){
    try {
      const response= await axios.get("/api/users/logout")
      router.push('/login')
    } catch (error:any) {
      console.log(error.message)
    }
  }
  return (
    <div>
      <button className=' bg-blue-400 p-4 text-white font-bold ' onClick={handleLogout}>
        logout 
      </button>
    </div>
  )
}

