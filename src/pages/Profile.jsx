import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/actions/userActions'
import app from '../utils/firebase'

const Profile = () => {

    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.user)
    const navigate = useNavigate()

    const handleLogout = async () => {
        await app.auth().signOut().then(() => {
            dispatch(logoutUser())
            navigate('/')
        }).catch((err) => console.error(err))
    }


    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex flex-col items-center mb-4">
                <div className="w-24 h-24 bg-gray-300 rounded-full mb-2"></div>
                <h2 className="text-xl font-bold">{userDetails.displayName || 'User Profile'}</h2>
                <p className="text-gray-600">{userDetails.email}</p>
            </div>
            <div className="border-t pt-4">
                <p className="text-gray-700">Profile settings would go here...</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Profile
