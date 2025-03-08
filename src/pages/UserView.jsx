import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  
  const navigate = useNavigate()

  const userDetails = useSelector(state => state.user)

  // Fetch users - replace with actual API call
  const fetchUsers = async () => {
    try {
      // Simulated user data - replace with actual API
      // const mockUsers = [
      //   { 
      //     id: '1', 
      //     username: 'john_doe', 
      //     name: 'John Doe', 
      //     location: 'Putiao, PH',
      //     lastActive: '2 hours ago'
      //   },
      //   { 
      //     id: '2', 
      //     username: 'jane_smith', 
      //     name: 'Jane Smith', 
      //     location: 'Bayawas, PH',
      //     lastActive: '30 mins ago'
      //   }
      // ];
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/users`, {
        headers: {
          Authorization: `Bearer ${userDetails?.idToken}`
        }
      })
      console.log(data)
      console.log(data.data)
      setUsers(data);
      setFilteredUsers(data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users');
      setLoading(false);
    }
  };
  useEffect(() => {
    

    fetchUsers();
  }, []);

  // Search functionality
  useEffect(() => {
    if (!users.length) return
    const filtered = users.filter(user => 
      user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // setFilteredUsers(filtered);
  }, [searchTerm, users]);

  // Toggle user selection
  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg className="animate-spin h-10 w-10 mr-3" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p>Loading users...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Find Friends
        </h1>

        {/* Search Input */}
        <div className="relative mb-4">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text"
            placeholder="Search users by name, username, or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Users List */}
        <div className="space-y-4">
          {filteredUsers.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No users found
            </div>
          ) : (
            filteredUsers.map(user => (
              <div 
                key={user.id} 
                className={`border rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 ${
                  selectedUsers.has(user.id) ? 'border-blue-500 border-2' : ''
                }`}
                onClick={() => navigate(`/map/${user.id}`)}
              >
                <div>
                  <div className="flex items-center">
                    <h2 className="font-semibold text-lg">{user.displayName || "User-"+user.id.slice(0,3) }</h2>
                    <span className="ml-2 text-gray-500 text-sm">
                      @{user.email}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-sm">{user.location}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Last active: {user.lastLogin?._seconds}
                  </p>
                </div>
                <button 
                  onClick={() => toggleUserSelection(user.id)}
                  className={`p-2 rounded-full ${
                    selectedUsers.has(user.id) 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {selectedUsers.has(user.id) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  )}
                </button>
              </div>
            ))
          )}
        </div>

        {/* Action Button */}
        {/* {selectedUsers.size > 0 && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg">
            <button 
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
              onClick={() => {
                // Handle sharing with selected users
                console.log('Sharing with:', Array.from(selectedUsers));
              }}
            >
              Share Location with {selectedUsers.size} User{selectedUsers.size !== 1 ? 's' : ''}
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default UsersList;