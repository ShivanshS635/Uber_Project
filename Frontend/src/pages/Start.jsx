import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
        <div className = "h-screen w-full pt-8 flex justify-between flex-col bg-red-400">
            <img className='w-16 ml-8 left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></img>
            <div className = "bg-white pb-7 py-4 px-4">
                <h2 className = "text-3xl font-bold">Get Started with uber</h2>
                <Link to='/login' className = "flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5">Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start