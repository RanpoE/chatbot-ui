import L from 'leaflet';

export const createCustomIcon = (imageURL) => {
    return L.icon({
        iconUrl: imageURL,
        iconSize: [30, 30], // Size of the icon
        iconAnchor: [15, 30], // Point of the icon which corresponds to marker's location
        popupAnchor: [0, -30], // Point from which the popup should open
    });
};

export const updateMap = (location1, location2) => {
    // Update the map with markers and route logic here
    console.log("Map updated with", location1, location2);
};

export const routeStyle = {
    color: '#3388ff',
    weight: 6,
    opacity: 0.65
};