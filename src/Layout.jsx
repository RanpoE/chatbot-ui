import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { FaMapMarkerAlt } from "react-icons/fa";

const Layout = ({ children }) => {
    const [activeTab, setActiveTab] = useState('home');
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const location = useLocation()

    useEffect(() => {
        const path = location.pathname.slice(1)
        setActiveTab(path)
        console.log(path)

    }, [location])

    useEffect(() => {
        setTimeout(() => {
            setFontsLoaded(true);
        }, 500);
    }, []);



    return (
        <div className="flex flex-col h-screen bg-gray-100"
            style={{
                fontFamily: fontsLoaded ? "'VT323', monospace" : "monospace",
                fontSize: fontsLoaded ? "16px" : "14px"
            }}>
            <style>
                {`
          @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
        `}
            </style>
            {/* App Header */}
            <header className="bg-[#6A0DAD] text-white p-4 shadow-md">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">Chat Mobile</h1>
                    <button className="md:hidden p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto p-4">
                {children}
            </main>
            <nav className="bg-white border-t md:hidden">
                <div className="flex justify-around">
                    <Link to="/">
                        <button
                            className={`p-4 flex flex-col items-center flex-1 ${activeTab === '' ? 'text-blue-600' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('home')}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                            </svg>
                            <span className="text-xs mt-1">Home</span>
                        </button>
                    </Link>
                    <Link to="locator">
                        <button
                            className={`p-4 flex flex-col items-center flex-1 ${activeTab === 'locator' ? 'text-blue-600' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('locator')}
                        >
                            <FaMapMarkerAlt />
                            <span className="text-xs mt-1">Locator</span>
                        </button>
                    </Link>
                    <Link to="settings">
                        <button
                            className={`p-4 flex flex-col items-center flex-1 ${activeTab === 'settings' ? 'text-blue-600' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('settings')}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span className="text-xs mt-1">Settings</span>
                        </button>
                    </Link>
                    <Link to="/profile">
                        <button
                            className={`p-4 flex flex-col items-center flex-1 ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-500'}`}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            <span className="text-xs mt-1">Profile</span>
                        </button>
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default Layout
