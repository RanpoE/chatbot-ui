export const calculateDistance = (loc1, loc2) => {
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

export const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};

export const formatDistance = (dist) => {
    if (dist < 1) {
        return `${Math.round(dist * 1000)} meters`;
    }
    return `${dist.toFixed(2)} kilometers`;
};