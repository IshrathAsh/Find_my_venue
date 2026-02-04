"use client";

import React, { useState, useMemo, useEffect } from "react";
import Hero from "./components/Hero";
import Filters from "./components/Filters";
import VenueList from "./components/VenueList";
import BestForOccasion from "./components/BestForOccasion";
import Reviews from "./components/Reviews";
import { filterVenues, FilterParams } from "./lib/filterLogic";

export default function Home() {
    const [filters, setFilters] = useState<FilterParams>({
        location: "",
        occasion: "",
        guestCount: 0,
    });

    useEffect(() => {
        const autoDetect = async () => {
            const { requestLocation } = await import("./lib/location");
            const detectedLocation = await requestLocation();
            if (detectedLocation) {
                setFilters(prev => ({ ...prev, location: detectedLocation }));
            }
        };
        autoDetect();
    }, []);

    const filteredData = useMemo(() => {
        return filterVenues(filters);
    }, [filters]);

    const isFallback = filters.location || filters.occasion || filters.guestCount
        ? filteredData.length > 0 && !filteredData.every(v =>
            (!filters.location || v.area.toLowerCase().includes(filters.location.toLowerCase())) &&
            (!filters.occasion || v.supportedOccasions.includes(filters.occasion)) &&
            (!filters.guestCount || (v.capacityMin <= filters.guestCount && v.capacityMax >= filters.guestCount))
        )
        : false;

    return (
        <main>
            <Hero />

            <Filters
                initialLocation={filters.location}
                onFilterChange={(newFilters) => setFilters(newFilters)}
            />

            <div style={{ padding: "var(--space-16) 0" }}>
                <VenueList
                    venues={filteredData}
                    title={filters.occasion ? `Recommended for ${filters.occasion}` : "Featured Venues"}
                    isFallback={isFallback}
                />
            </div>

            {filters.occasion && <BestForOccasion occasion={filters.occasion} />}

            <div style={{ background: "rgba(0,0,0,0.02)", padding: "var(--space-8) 0" }}>
                <Reviews occasion={filters.occasion} limit={3} />
            </div>
        </main>
    );
}
