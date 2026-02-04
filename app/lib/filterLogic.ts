import { Venue, mockVenues } from "./venueData";

export interface FilterParams {
    location: string;
    occasion: string;
    guestCount: number;
    maxPrice?: number;
}

export const filterVenues = (params: FilterParams): Venue[] => {
    const { location, occasion, guestCount, maxPrice } = params;

    // 1. Strict Match
    let results = mockVenues.filter((venue) => {
        const matchesOccasion = occasion ? venue.supportedOccasions.includes(occasion) : true;
        const matchesCapacity = guestCount ? (venue.capacityMin <= guestCount && venue.capacityMax >= guestCount) : true;
        const matchesPrice = maxPrice ? (venue.pricePerPlate || 0) <= maxPrice : true;

        // Simple area match for location
        const matchesLocation = location
            ? venue.area.toLowerCase().includes(location.toLowerCase()) ||
            location.toLowerCase().includes(venue.area.toLowerCase())
            : true;

        return matchesOccasion && matchesCapacity && matchesLocation && matchesPrice;
    });

    // 2. Fallback Logic
    // If NO exact matches found for the combination, we provide fallbacks
    const isFallback = (location || occasion || guestCount) && results.length === 0;

    if (isFallback) {
        // If location was provided, maybe find same area but different capacity?
        // For now, return top popularity score venues as per user goal
        results = [...mockVenues]
            .sort((a, b) => b.popularityScore - a.popularityScore)
            .slice(0, 6);
    } else {
        // 3. Sorting Priority: Occasion relevance (if applied) > Rating > Popularity
        results.sort((a, b) => {
            if (occasion) {
                const aMatches = a.supportedOccasions.includes(occasion) ? 1 : 0;
                const bMatches = b.supportedOccasions.includes(occasion) ? 1 : 0;
                if (aMatches !== bMatches) return bMatches - aMatches;
            }
            if (b.rating !== a.rating) return b.rating - a.rating;
            return b.popularityScore - a.popularityScore;
        });
    }

    return results;
};
