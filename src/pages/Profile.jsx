import React from 'react'

const Profile = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex flex-col items-center mb-4">
                <div className="w-24 h-24 bg-gray-300 rounded-full mb-2"></div>
                <h2 className="text-xl font-bold">User Profile</h2>
                <p className="text-gray-600">edward@dev.io</p>
            </div>
            <div className="border-t pt-4">
                <p className="text-gray-700">Profile settings would go here...</p>
            </div>
        </div>
    )
}

export default Profile
