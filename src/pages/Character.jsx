import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Thera, Eboi } from '../assets/images';
import Loader from '../components/Loader';

const Character = () => {
    const { id } = useParams()
    const [dialogues, setDialogues] = useState([
        { id: 1, text: "Greetings, traveler! Welcome to the kingdom of Eldoria.", character: "Elder Mage", isPlayer: false },
        { id: 2, text: "Where am I? How did I get here?", character: "Player", isPlayer: true },
        { id: 3, text: "You've crossed the misty veil between worlds. Your destiny awaits in these lands.", character: "Elder Mage", isPlayer: false }
    ]);


    const characters = [
        { id: 1, name: 'WARRIOR', color: 'red', image: Eboi },
        { id: 2, name: 'MAGE', color: 'blue', image: Thera },
        { id: 3, name: 'ROGUE', color: 'green' },
        { id: 4, name: 'ARCHER', color: 'yellow' },
        { id: 5, name: 'KNIGHT', color: 'purple' },
        { id: 6, name: 'HEALER', color: 'cyan' },
        { id: 7, name: 'BARD', color: 'pink' },
        { id: 8, name: 'MONK', color: 'orange' },
    ];

    const [inputText, setInputText] = useState('');
    const [characterName, setCharacterName] = useState('Player');
    const [isLoading, setIsLoading] = useState(true);
    const dialogueContainerRef = useRef(null);

    useEffect(() => {
        // Hide loading after 3 seconds
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (dialogueContainerRef.current) {
            dialogueContainerRef.current.scrollTop = dialogueContainerRef.current.scrollHeight;
        }
    }, [dialogues]);


    const handleSend = () => {
        if (inputText.trim() === '') return;

        // Add player dialogue
        const newPlayerDialogue = {
            id: dialogues.length + 1,
            text: inputText,
            character: characterName,
            isPlayer: true
        };

        setDialogues([...dialogues, newPlayerDialogue]);
        setInputText('');

        // Simulate NPC response
        setTimeout(() => {
            const responses = [
                "Interesting choice, adventurer. The path ahead grows more treacherous.",
                "Indeed! Your wisdom surprises me for one so new to our realm.",
                "Hmm, not what I expected from a hero of prophecy, but we shall see...",
                "The ancient scrolls spoke of your coming. Your words confirm my suspicions."
            ];

            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const npcDialogue = {
                id: dialogues.length + 2,
                text: randomResponse,
                character: "Elder Mage",
                isPlayer: false
            };
            setDialogues(prev => [...prev, npcDialogue]);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const activeCharacter = characters.filter(item => item.id === parseInt(id))

    return (
        <div className="relative w-full bg-transparent overflow-hidden" style={{ height: "670px" }}>
            {/* Game container - completely self-contained */}
            <div className="absolute inset-0 flex flex-col bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                {/* Fixed header with game title and image - not scrollable */}
                <div className="relative w-full h-52 bg-gray-700 flex-shrink-0 overflow-hidden">
                    <img src={activeCharacter[0].image} alt="Fantasy Scene" className="object-cover h-full w-full opacity-60" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-52"></div>
                    {/* <h1 className="absolute text-2xl font-bold text-yellow-300 top-4 left-0 right-0 text-center">The Legend of Eldoria</h1> */}
                </div>

                {/* Scrollable messages area */}
                <div
                    ref={dialogueContainerRef}
                    className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-gray-900"
                    style={{ maxHeight: "calc(100% - 140px - 100px)" }} // Header (140px) and input area (100px) heights subtracted
                >
                    {dialogues.map((dialogue) => (
                        <div
                            key={dialogue.id}
                            className={`${dialogue.isPlayer ? 'pl-4' : 'pr-4'}`}
                        >
                            <div className={`text-sm font-bold mb-1 ${dialogue.isPlayer ? 'text-blue-400' : 'text-yellow-400'
                                }`}>
                                {dialogue.character}
                            </div>
                            <div
                                className={`p-3 rounded-lg border-2 max-w-xs ${dialogue.isPlayer
                                    ? 'bg-blue-900 border-blue-700 self-end text-blue-100'
                                    : 'bg-yellow-900 border-yellow-700 self-start text-yellow-100'
                                    }`}
                            >
                                {dialogue.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Fixed input area - not scrollable */}
                <div className="w-full p-4 border-t-2 border-gray-700 bg-gray-800 flex-shrink-0" style={{ height: "100px" }}>
                    <div className="flex mb-2">
                        <div className="text-xs text-gray-400">Speaking as:</div>
                        <input
                            type="text"
                            value={characterName}
                            onChange={(e) => setCharacterName(e.target.value)}
                            className="ml-2 px-2 text-xs bg-gray-700 text-blue-300 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="What will you say?"
                            className="flex-1 py-2 px-4 bg-gray-700 text-gray-100 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                        />
                        <button
                            onClick={handleSend}
                            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            Speak
                        </button>
                    </div>
                </div>
            </div>
            {isLoading && <Loader />}
        </div>
    );
}

export default Character
