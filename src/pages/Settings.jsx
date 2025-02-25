import React from 'react'

const Settings = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Settings</h2>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span>Dark Mode</span>
                    <div className="w-12 h-6 bg-gray-300 rounded-full p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span>Notifications</span>
                    <div className="w-12 h-6 bg-blue-500 rounded-full p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
