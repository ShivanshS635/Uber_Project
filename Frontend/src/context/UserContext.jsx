import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const UserDataContext = createContext()

const UserContext = ({ children }) => {

    const [ user, setUser ] = useState({
        email: '',
        fullName: {
            firstName: '',
            lastName: ''
        }
    })
  return (
    <div>
        <UserDataContext.Provider value={{}}>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext