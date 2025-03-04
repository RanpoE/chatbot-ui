import React, { useState, useEffect } from 'react';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup, Polyline, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import { BusIcon, MapIcon } from '../assets/images';


const Locator = () => {
    const [myLocation, setMyLocation] = useState(null);
    const [otherLocation, setOtherLocation] = useState(null);
    const [distance, setDistance] = useState(null);
    const [routeDistance, setRouteDistance] = useState(null);
    const [error, setError] = useState(null);
    const [isSharing, setIsSharing] = useState(false);
    const [shareId, setShareId] = useState('');
    const [joinId, setJoinId] = useState('');
    const [mapLoaded, setMapLoaded] = useState(false);
    const [routes, setRoutes] = useState(null)
    const [bounds, setBounds] = useState([]);

    // Get user's current location
    const getCurrentLocation = () => {
        setError(null);

        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                setMyLocation(location);

                // Update map
                if (mapLoaded) {
                    updateMap(location, otherLocation);
                }
            },
            () => {
                setError('Unable to retrieve your location');
            }
        );
    };

    // Initialize map when component mounts
    useEffect(() => {
        // In a real implementation, you would load the Leaflet library and initialize the map
        // This is a simplified version for demonstration
        const loadMap = () => {
            console.log("Leaflet map would be loaded here");
            setMapLoaded(true);
        };


        getCurrentLocation();
        loadMap();
    }, []);

    // Update map with markers and route
    const updateMap = (location1, location2) => {
        // In a real implementation, this would update the Leaflet map
        // with markers and a route between the points
        console.log("Map updated with", location1, location2);
    };

    // Calculate distance between two points using Haversine formula
    const calculateDistance = (loc1, loc2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(loc2.lat - loc1.lat);
        const dLng = deg2rad(loc2.lng - loc1.lng);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(loc1.lat)) * Math.cos(deg2rad(loc2.lat)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    // Simulate sharing location
    const shareLocation = () => {
        if (!myLocation) {
            getCurrentLocation();
            return;
        }

        const mockShareId = Math.random().toString(36).substring(2, 8).toUpperCase();
        setShareId(mockShareId);
        setIsSharing(true);

        // Simulate the other person's location for demo
        setTimeout(() => {
            // Create a location 1-3km away
            const bearing = Math.random() * 2 * Math.PI; // Random direction
            const distance = 1 + Math.random() * 2; // 1-3km

            // Calculate new point based on distance and bearing
            const lat2 = Math.asin(
                Math.sin(deg2rad(myLocation.lat)) * Math.cos(distance / 6371) +
                Math.cos(deg2rad(myLocation.lat)) * Math.sin(distance / 6371) * Math.cos(bearing)
            );

            const lng2 = deg2rad(myLocation.lng) +
                Math.atan2(
                    Math.sin(bearing) * Math.sin(distance / 6371) * Math.cos(deg2rad(myLocation.lat)),
                    Math.cos(distance / 6371) - Math.sin(deg2rad(myLocation.lat)) * Math.sin(lat2)
                );

            const simulatedLocation = {
                lat: lat2 * (180 / Math.PI),
                lng: lng2 * (180 / Math.PI)
            };

            setOtherLocation(simulatedLocation);

            // Calculate distances
            const directDist = calculateDistance(myLocation, simulatedLocation);
            setDistance(directDist);

            // Simulate road distance (typically longer than direct)
            const roadFactor = 1.2 + (Math.random() * 0.3); // Roads are typically 20-50% longer
            const routeDist = directDist * roadFactor;
            setRouteDistance(routeDist);

            updateMap(myLocation, simulatedLocation);
        }, 2000);
    };

    // Join with ID
    const joinWithId = () => {
        if (!myLocation) {
            getCurrentLocation();
            return;
        }

        if (!joinId) {
            setError('Please enter a share ID');
            return;
        }

        setError(null);
        setIsSharing(true);

        // Simulate finding the other person
        setTimeout(() => {
            // Create a location 1-5km away
            const bearing = Math.random() * 2 * Math.PI; // Random direction
            const distance = 1 + Math.random() * 4; // 1-5km

            // Calculate new point based on distance and bearing
            const lat2 = Math.asin(
                Math.sin(deg2rad(myLocation.lat)) * Math.cos(distance / 6371) +
                Math.cos(deg2rad(myLocation.lat)) * Math.sin(distance / 6371) * Math.cos(bearing)
            );

            const lng2 = deg2rad(myLocation.lng) +
                Math.atan2(
                    Math.sin(bearing) * Math.sin(distance / 6371) * Math.cos(deg2rad(myLocation.lat)),
                    Math.cos(distance / 6371) - Math.sin(deg2rad(myLocation.lat)) * Math.sin(lat2)
                );

            const simulatedLocation = {
                lat: lat2 * (180 / Math.PI),
                lng: lng2 * (180 / Math.PI)
            };

            setOtherLocation(simulatedLocation);

            // Calculate distances
            const directDist = calculateDistance(myLocation, simulatedLocation);
            setDistance(directDist);

            // Simulate road distance
            const roadFactor = 1.2 + (Math.random() * 0.3);
            const routeDist = directDist * roadFactor;
            setRouteDistance(routeDist);
            console.log(simulatedLocation, " mock")

            updateMap(myLocation, simulatedLocation);
            getRoute(myLocation, simulatedLocation)
        }, 1500);
    };

    const getRoute = async (start, end) => {
        const response = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
        );
        const data = await response.json();
        setRoutes(data.routes[0].geometry);

        // Calculate bounds to fit both markers and the route
        const routePoints = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
        setBounds([...routePoints, start, end]);
        return data;
    };

    const createCustomIcon = (imageURL) => {
        return L.icon({
          iconUrl: imageURL,
          iconSize: [30, 30],     // Size of the icon
          iconAnchor: [15, 30],   // Point of the icon which corresponds to marker's location
          popupAnchor: [0, -30]   // Point from which the popup should open
        });
      };

    // Format distance for display
    const formatDistance = (dist) => {
        if (dist < 1) {
            return `${Math.round(dist * 1000)} meters`;
        }
        return `${dist.toFixed(2)} kilometers`;
    };

    const routeStyle = {
        color: '#3388ff',
        weight: 6,
        opacity: 0.65
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">Location Distance Tracker</h1>

            {/* Map Container - This would be a real Leaflet map in production */}
            <div className="mb-4 bg-white rounded-lg shadow-sm overflow-hidden">
                {myLocation && (
                    <MapContainer center={myLocation || [0, 0]} zoom={13} style={{ height: '400px', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {myLocation &&
                            <Marker position={[myLocation.lat, myLocation.lng]} icon={createCustomIcon(MapIcon)}>
                                <Popup>
                                    Your location
                                </Popup>
                            </Marker>
                        }
                        {otherLocation &&
                            <Marker position={[otherLocation.lat, otherLocation.lng]} icon={createCustomIcon(BusIcon)}>
                                <Popup>Other person</Popup>
                            </Marker>
                        }
                        {/* {myLocation && otherLocation &&
                            <Polyline positions={[[myLocation.lat, myLocation.lng], [otherLocation.lat, otherLocation.lng]]} />
                        } */}

                        {routes && <GeoJSON data={routes} style={routeStyle} />}

                    </MapContainer>)}
            </div>

            {/* Location Controls */}
            <div className="mb-4 p-3 bg-white rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-2">Your Location</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}

                {myLocation ? (
                    <div className="text-sm text-gray-700 flex justify-between items-center">
                        <div>
                            <p>Lat: {myLocation.lat.toFixed(6)}</p>
                            <p>Lng: {myLocation.lng.toFixed(6)}</p>
                        </div>
                        <button
                            onClick={getCurrentLocation}
                            className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
                        >
                            Refresh
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={getCurrentLocation}
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                        Get My Location
                    </button>
                )}
            </div>

            {/* Distance Display */}
            {myLocation && otherLocation && (
                <div className="mb-4 p-3 bg-white rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-3">Distance</h2>
                    <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="p-2 bg-blue-50 rounded-md">
                            <p className="text-xs text-gray-500 mb-1">Direct Distance</p>
                            <p className="font-bold text-blue-600">{formatDistance(distance)}</p>
                        </div>
                        <div className="p-2 bg-green-50 rounded-md">
                            <p className="text-xs text-gray-500 mb-1">Road Distance</p>
                            <p className="font-bold text-green-600">{formatDistance(routeDistance)}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Share or Join */}
            {myLocation && !isSharing && (
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                        <h2 className="text-lg font-semibold mb-2">Share Your Location</h2>
                        <button
                            onClick={shareLocation}
                            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                        >
                            Generate Sharing Code
                        </button>
                    </div>

                    <div className="p-3 bg-white rounded-lg shadow-sm">
                        <h2 className="text-lg font-semibold mb-2">Join Someone's Location</h2>
                        <input
                            type="text"
                            value={joinId}
                            onChange={(e) => setJoinId(e.target.value)}
                            placeholder="Enter share code"
                            className="w-full p-2 border border-gray-300 rounded-md mb-2"
                        />
                        <button
                            onClick={joinWithId}
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                        >
                            Join
                        </button>
                    </div>
                </div>
            )}

            {/* Sharing Status */}
            {isSharing && (
                <div className="mb-4 p-3 bg-white rounded-lg shadow-sm">
                    {shareId && (
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold mb-2">Your Share Code</h2>
                            <div className="bg-gray-100 p-3 rounded-md text-center text-xl font-mono">
                                {shareId}
                            </div>
                            <p className="text-sm text-gray-500 mt-1 text-center">Share this code with the other person</p>
                        </div>
                    )}

                    {!otherLocation && (
                        <div className="text-center py-4">
                            <p className="mb-2">Waiting for connection...</p>
                            <div className="loader mx-auto w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>
            )}

            {/* Reset Button */}
            {isSharing && (
                <button
                    onClick={() => {
                        setIsSharing(false);
                        setShareId('');
                        setJoinId('');
                        setOtherLocation(null);
                        setDistance(null);
                        setRouteDistance(null);
                    }}
                    className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
                >
                    Reset
                </button>
            )}
        </div>
    );
};

export default Locator;