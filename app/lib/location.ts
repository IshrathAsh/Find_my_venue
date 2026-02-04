export const requestLocation = async (): Promise<string | null> => {
    if (typeof window === "undefined" || !navigator.geolocation) {
        return null;
    }

    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    // Use OpenStreetMap Nominatim for reverse geocoding
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
                    );

                    if (!response.ok) {
                        throw new Error('Geocoding service unavailable');
                    }

                    const data = await response.json();
                    const address = data.address;

                    // Prioritize specific location names
                    const locationName =
                        address.city ||
                        address.town ||
                        address.village ||
                        address.suburb ||
                        address.state_district ||
                        "Unknown Location";

                    resolve(locationName);
                } catch (error) {
                    console.error("Reverse geocoding failed:", error);
                    // Fallback to coordinates if naming fails, or just null
                    resolve(null);
                }
            },
            (error) => {
                console.error("Location access denied or failed", error);
                resolve(null);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    });
};
