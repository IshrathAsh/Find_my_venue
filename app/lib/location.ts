export const requestLocation = async (): Promise<string | null> => {
    if (typeof window === "undefined" || !navigator.geolocation) {
        return null;
    }

    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // In a real app, we'd use a reverse geocoding API here
                // For now, we'll return a mock location based on coordinates
                const { latitude, longitude } = position.coords;
                console.log(`User coordinates: ${latitude}, ${longitude}`);
                resolve("South Delhi"); // Mock resolved city
            },
            (error) => {
                console.error("Location access denied", error);
                resolve(null);
            }
        );
    });
};
