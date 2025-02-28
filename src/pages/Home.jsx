import React, { useState, useEffect } from 'react'
import { Thera, Eboi, Gaku } from "../assets/images"
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
const Home = () => {
    const navigate = useNavigate()
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const characters = [
        { id: 1, name: 'WARRIOR', color: 'red', image: Eboi },
        { id: 2, name: 'MAGE', color: 'blue', image: Thera },
        { id: 3, name: 'ROGUE', color: 'green', image: Gaku },
        { id: 4, name: 'ARCHER', color: 'yellow' },
        { id: 5, name: 'KNIGHT', color: 'purple' },
        { id: 6, name: 'HEALER', color: 'cyan' },
        { id: 7, name: 'BARD', color: 'pink' },
        { id: 8, name: 'MONK', color: 'orange' },
    ];
    // const colorVariants = {
    //     red: 'border-red-500',
    //     green: 'border-green-500',
    //     yellow: 'border-yellow-500',
    //     blue: 'border-blue-500',
    //     purple: 'border-purple-500',
    //     cyan: 'border-cyan-500',
    //     pink: 'border-pink-500',
    //     orange: 'border-orange-500',
    //   };

    const handleSelect = (id) => {
        setSelectedCharacter(id)
        setTimeout(() => {
            navigate(`/character/${id}`)
        }, 1000);
    }

    useEffect(() => {
        // Hide loading after 3 seconds
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) return <Loader />

    return (
        <div className="space-y-4 h-screen">
            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-2">Welcome!</h2>
                <p>Select an AI chatbot to interact with.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {characters.map((character) => (
                    <div
                        key={character.id}
                        className={`flex flex-col items-center cursor-pointer transition-all duration-200 ${selectedCharacter === character.id ? 'transform scale-110' : ''
                            }`}
                        onClick={() => handleSelect(character.id)}
                    >
                        {/* Character avatar box */}
                        <div className={`w-full aspect-square flex items-center justify-center mb-2 border-4 ${selectedCharacter === character.id
                            ? 'border-white'
                            : `border-${character.color}-500`
                            } bg-gray-900 text-red`}>
                            {/* Placeholder avatar image */}
                            <div className="w-24 h-24 flex items-center justify-center relative">
                                {/* Simple 8-bit style character */}
                                <img src={character?.image} alt="avatar" />
                                {/* <div className={`w-8 h-8 bg-${character.color}-400`}>
                                </div> */}

                                {/* Selection indicator */}
                                {selectedCharacter === character.id && (
                                    <div className={`absolute inset-0 border-2 border-${character.color}-500 border-dashed animate-pulse`}></div>
                                )}
                            </div>
                        </div>

                        {/* Character name */}
                        <p className={`text-center ${selectedCharacter === character.id
                            ? `text-black`
                            : `text-${character.color}-400`
                            }`} style={{ fontSize: '12px' }}>
                            {character.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home