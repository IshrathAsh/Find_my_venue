"use client";

import React, { useState, useMemo, useEffect } from "react";
import Hero from "./components/Hero";
import Filters from "./components/Filters";
import VenueList from "./components/VenueList";
import BestForOccasion from "./components/BestForOccasion";
import Reviews from "./components/Reviews";
import { filterVenues, FilterParams } from "./lib/filterLogic";

export default function Home() {
    const [appliedFilters, setAppliedFilters] = useState<FilterParams>({
        location: "",
        occasion: "",
        guestCount: 0,
    });

    useEffect(() => {
        const autoDetect = async () => {
            const { requestLocation } = await import("./lib/location");
            const detectedLocation = await requestLocation();
            if (detectedLocation) {
                // Set initial applied filters so something shows up initially
                setAppliedFilters(prev => ({ ...prev, location: detectedLocation }));
            }
        };
        autoDetect();
    }, []);

    const filteredData = useMemo(() => {
        return filterVenues(appliedFilters);
    }, [appliedFilters]);

    const isFallback = appliedFilters.location || appliedFilters.occasion || appliedFilters.guestCount
        ? filteredData.length > 0 && !filteredData.every(v =>
            (!appliedFilters.location || v.area.toLowerCase().includes(appliedFilters.location.toLowerCase())) &&
            (!appliedFilters.occasion || v.supportedOccasions.includes(appliedFilters.occasion)) &&
            (!appliedFilters.guestCount || (v.capacityMin <= appliedFilters.guestCount && v.capacityMax >= appliedFilters.guestCount))
        )
        : false;

    return (
        <main>
            <Hero />

            <Filters
                initialLocation={appliedFilters.location}
                onSearch={(newFilters) => setAppliedFilters(newFilters)}
            />

            <div style={{ padding: "var(--space-16) 0" }}>
                <VenueList
                    venues={filteredData}
                    title={appliedFilters.occasion ? `Recommended for ${appliedFilters.occasion}` : "Featured Venues"}
                    isFallback={isFallback}
                />
            </div>

            {appliedFilters.occasion && <BestForOccasion occasion={appliedFilters.occasion} />}

            <div style={{ background: "rgba(0,0,0,0.02)", padding: "var(--space-8) 0" }}>
                <Reviews occasion={appliedFilters.occasion} limit={3} />
            </div>
        </main>
    );
}
