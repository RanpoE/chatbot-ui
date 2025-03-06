import axios from "axios";

const {
    REACT_APP_API_URL
} = process.env

export const getRoute = async (start, end) => {
    const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
    );
    const data = await response.json();
    // setRoutes(data.routes[0].geometry);

    // Calculate bounds to fit both markers and the route
    // const routePoints = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
    return data.routes[0].geometry
};

export const getOtherLocation = async (id) => {
    if (!id) return

    const response = await axios.get(`${REACT_APP_API_URL}/location?userId=${id}`)
    const { latitude, longitude} = response.data[0]
    
    const userLocation = {
        lat: latitude,
        lng: longitude
    };

    return userLocation;
}

export const getCurrentLocation = () => {

    if (!navigator.geolocation) {
        return;
    }
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords
            const location = {
                lat: latitude,
                lng: longitude,
            };
            return location
            // Update map
        },
        (error) => {
            return error
        },
        {
            timeout: 5000,
            maximumAge: 0
        }
    );
};