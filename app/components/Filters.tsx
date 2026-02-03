"use client";

import React, { useState, useEffect } from "react";
import { requestLocation } from "../lib/location";
import { occasions } from "../lib/venueData";

interface FiltersProps {
    initialLocation?: string;
    onFilterChange: (filters: { location: string; occasion: string; guestCount: number }) => void;
}

export default function Filters({ initialLocation, onFilterChange }: FiltersProps) {
    const [location, setLocation] = useState(initialLocation || "");
    const [occasion, setOccasion] = useState("");
    const [guestCount, setGuestCount] = useState<number | "">("");

    useEffect(() => {
        if (initialLocation && !location) {
            setLocation(initialLocation);
        }
    }, [initialLocation]);

    const handleChange = (field: string, value: any) => {
        const newFilters = {
            location: field === "location" ? value : location,
            occasion: field === "occasion" ? value : occasion,
            guestCount: field === "guestCount" ? Number(value) || 0 : Number(guestCount) || 0,
        };

        if (field === "location") setLocation(value);
        if (field === "occasion") setOccasion(value);
        if (field === "guestCount") setGuestCount(value);

        onFilterChange(newFilters);
    };

    return (
        <div className="container" style={{ marginTop: "calc(-1 * var(--space-8))", position: "relative", zIndex: 10 }}>
            <div className="search-bar surface">
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                    <label style={{ fontSize: "var(--font-size-xs)", fontWeight: "var(--font-weight-medium)" }}>Location</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Where?"
                        value={location}
                        onChange={(e) => handleChange("location", e.target.value)}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                    <label style={{ fontSize: "var(--font-size-xs)", fontWeight: "var(--font-weight-medium)" }}>Occasion</label>
                    <select
                        className="select"
                        value={occasion}
                        onChange={(e) => handleChange("occasion", e.target.value)}
                    >
                        <option value="">Select Occasion</option>
                        {occasions.map((occ) => (
                            <option key={occ} value={occ}>{occ}</option>
                        ))}
                    </select>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                    <label style={{ fontSize: "var(--font-size-xs)", fontWeight: "var(--font-weight-medium)" }}>Guests</label>
                    <input
                        type="number"
                        className="input"
                        placeholder="How many?"
                        value={guestCount}
                        onChange={(e) => handleChange("guestCount", e.target.value)}
                    />
                </div>

                <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <button className="btn btn-primary" style={{ width: "100%" }}>
                        Find Venues
                    </button>
                </div>
            </div>
        </div>
    );
}
