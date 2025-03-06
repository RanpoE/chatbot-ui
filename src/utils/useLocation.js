import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { deg2rad } from './distanceCalc';
import { updateMap } from './mapUtils';
import { calculateDistance } from './distanceCalc';

export const useLocation = (id) => {
    const [myLocation, setMyLocation] = useState(null);
    const [otherLocation, setOtherLocation] = useState(null);
    const [error, setError] = useState(null);
    const [distance, setDistance] = useState(null);
    const [routeDistance, setRouteDistance] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [routes, setRoutes] = useState(null);
    const [bounds, setBounds] = useState([]);
    const [isSharing, setIsSharing] = useState(false);
    const [shareId, setShareId] = useState('');
    const [joinId, setJoinId] = useState('');

    const newSocket = io(process.env.REACT_APP_SOCKET_URL, {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
    });

    const getCurrentLocation = () => {
        setError(null);
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const location = { lat: latitude, lng: longitude };
                newSocket.emit('update_location', {
                    latitude,
                    longitude,
                    timestamp: new Date().toISOString(),
                });
                setMyLocation(location);
            },
            (error) => {
                setError('Unable to retrieve your location ' + error.message);
            },
            { timeout: 5000, maximumAge: 0 }
        );
    };

    const getOtherLocation = async (id) => {
        const { REACT_APP_API_URL } = process.env;
        try {
            const response = await axios.get(`${REACT_APP_API_URL}/location?userId=${id}`);
            const { latitude, longitude } = response.data[0];
            const otherLoc = { lat: latitude, lng: longitude };
            setOtherLocation(otherLoc);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCurrentLocation();
        if (id) getOtherLocation(id);
        const loadMap = () => {
            console.log("Leaflet map would be loaded here");
            setMapLoaded(true);
        };
        loadMap();
    }, [id]);

    useEffect(() => {
        if (!otherLocation || !myLocation) return;
        getRoute(myLocation, otherLocation);
    }, [otherLocation, myLocation]);

    const getRoute = async (start, end) => {
        setRoutes(null);
        const response = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
        );
        const data = await response.json();
        setRoutes(data.routes[0].geometry);
        const routePoints = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
        setBounds([...routePoints, start, end]);
        setRouteDistance(data.routes[0].distance / 1000);
        return data;
    };

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
            // const roadFactor = 1.2 + (Math.random() * 0.3);
            // const routeDist = directDist * roadFactor;
            // setRouteDistance(routeDist);
            console.log(simulatedLocation, " mock")

            updateMap(myLocation, simulatedLocation);
            getRoute(myLocation, simulatedLocation)
        }, 1500);
    };


    return {
        myLocation,
        otherLocation,
        error,
        distance,
        routeDistance,
        mapLoaded,
        routes,
        bounds,
        isSharing,
        setIsSharing,
        shareId,
        setShareId,
        joinId,
        setJoinId,
        getCurrentLocation,
        getOtherLocation,
        getRoute,
        setRoutes,
        setOtherLocation,
        joinWithId,
        setRouteDistance
    };
};
