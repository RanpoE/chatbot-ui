import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import { useParams } from 'react-router-dom';

import { BusIcon, MapIcon } from '../assets/images';
import { useLocation } from '../utils/useLocation';
import { calculateDistance, formatDistance, deg2rad } from '../utils/distanceCalc';
import { updateMap, routeStyle } from '../utils/mapUtils';
import { createCustomIcon } from '../utils/mapUtils';

const Locator = () => {
    const { id } = useParams()
    const {
        myLocation,
        otherLocation,
        error,
        distance,
        routeDistance,
        isSharing,
        setIsSharing,
        shareId,
        setShareId,
        joinId,
        setJoinId,
        getCurrentLocation,
        setOtherLocation,
        setDistance,
        setRouteDistance,
        routes,
        setRoutes,
        getRoute,
        joinWithId,
    } = useLocation(id);

    const shareLocation = () => {
        if (!myLocation) {
            getCurrentLocation();
            return;
        }

        const mockShareId = Math.random().toString(36).substring(2, 8).toUpperCase();
        setShareId(mockShareId);
        setIsSharing(true);

        // Simulated logic for sharing location
        setTimeout(() => {
            const bearing = Math.random() * 2 * Math.PI;
            const distance = 1 + Math.random() * 2;
            const lat2 = Math.asin(
                Math.sin(deg2rad(myLocation.lat)) * Math.cos(distance / 6371) +
                Math.cos(deg2rad(myLocation.lat)) * Math.sin(distance / 6371) * Math.cos(bearing)
            );
            const lng2 = deg2rad(myLocation.lng) +
                Math.atan2(
                    Math.sin(bearing) * Math.sin(distance / 6371) * Math.cos(deg2rad(myLocation.lat)),
                    Math.cos(distance / 6371) - Math.sin(deg2rad(myLocation.lat)) * Math.sin(lat2)
                );
            const simulatedLocation = { lat: lat2 * (180 / Math.PI), lng: lng2 * (180 / Math.PI) };
            setOtherLocation(simulatedLocation);

            const directDist = calculateDistance(myLocation, simulatedLocation);
            setDistance(directDist);

            const roadFactor = 1.2 + (Math.random() * 0.3);
            const routeDist = directDist * roadFactor;
            setRouteDistance(routeDist);
            updateMap(myLocation, simulatedLocation);
            getRoute(myLocation, simulatedLocation);
        }, 2000);
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
                                    Ore
                                </Popup>
                            </Marker>
                        }
                        {otherLocation &&
                            <Marker position={[otherLocation.lat, otherLocation.lng]} icon={createCustomIcon(BusIcon)}>
                                <Popup>Queens Express</Popup>
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
                        setRoutes(null)
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