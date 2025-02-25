import React, { useState, useEffect } from 'react'

const Loader = () => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => {
                if (prev.length >= 3) return '';
                return prev + '.';
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-75"></div>

            <div className="relative bg-gray-800 rounded-lg border-2 border-purple-700 p-8 w-80 max-w-md shadow-lg z-10">
                <div className="flex flex-col items-center">
                    {/* Animated rune circle */}
                    <div className="w-24 h-24 mb-6 relative">
                        <div className="absolute inset-0 border-4 border-purple-500 rounded-full animate-spin opacity-30"></div>
                        <div className="absolute inset-0 border-4 border-transparent border-t-yellow-400 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
                        <div className="absolute inset-2 border-4 border-transparent border-l-blue-400 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                                <div className="w-8 h-8 bg-purple-600 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Loading text */}
                    <h2 className="text-xl font-medieval text-yellow-300 mb-2">Setting up chatbot</h2>
                    <p className="text-purple-300 text-lg font-bold">
                        Loading{dots}
                        <span className="invisible">...</span>
                    </p>

                    {/* Flavor text */}
                    <p className="mt-6 text-sm text-gray-400 text-center italic">
                        "The ancient scrolls are being unraveled, the magical energies gathered..."
                    </p>

                    {/* Close button for demo purposes */}

                </div>
            </div>
        </div>
    )
}

export default Loader
