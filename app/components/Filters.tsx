"use client";

import React, { useState, useEffect } from "react";
import { occasions } from "../lib/venueData";
import { FilterParams } from "../lib/filterLogic";

interface FiltersProps {
    initialLocation?: string;
    onSearch: (filters: FilterParams) => void;
}

export default function Filters({ initialLocation, onSearch }: FiltersProps) {
    const [location, setLocation] = useState(initialLocation || "");
    const [occasion, setOccasion] = useState("");
    const [guestSelection, setGuestSelection] = useState<string>("any");
    const [customGuestCount, setCustomGuestCount] = useState<string>("");
    const [maxPrice, setMaxPrice] = useState<string>("any");

    useEffect(() => {
        if (initialLocation && !location) {
            setLocation(initialLocation);
        }
    }, [initialLocation]);

    const handleSearch = () => {
        const finalGuestCount = guestSelection === "custom"
            ? parseInt(customGuestCount) || 0
            : guestSelection === "any"
                ? 0
                : parseInt(guestSelection);

        onSearch({
            location,
            occasion,
            guestCount: finalGuestCount,
            maxPrice: maxPrice === "any" ? undefined : parseInt(maxPrice)
        });
    };

    return (
        <div className="container" style={{ marginTop: "calc(-1 * var(--space-8))", position: "relative", zIndex: 10 }}>
            <div className="search-bar surface luxury-shadow" style={{
                padding: "var(--space-6)",
                borderRadius: "var(--radius-lg)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr auto",
                gap: "var(--space-4)",
                alignItems: "end"
            }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                    <label style={{ fontSize: "var(--font-size-xs)", fontWeight: "600", color: "var(--color-text-secondary)" }}>Location</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Where?"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        style={{ height: "48px" }}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                    <label style={{ fontSize: "var(--font-size-xs)", fontWeight: "600", color: "var(--color-text-secondary)" }}>Occasion</label>
                    <select
                        className="select"
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        style={{ height: "48px" }}
                    >
                        <option value="">Any Occasion</option>
                        {occasions.map((occ) => (
                            <option key={occ} value={occ}>{occ}</option>
                        ))}
                    </select>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                    <label style={{ fontSize: "var(--font-size-xs)", fontWeight: "600", color: "var(--color-text-secondary)" }}>Guests</label>
                    {guestSelection === "custom" ? (
                        <div style={{ display: "flex", gap: "4px" }}>
                            <input
                                type="number"
                                className="input"
                                placeholder="Number"
                                value={customGuestCount}
                                onChange={(e) => setCustomGuestCount(e.target.value)}
                                style={{ height: "48px", flex: 1 }}
                            />
                            <button
                                className="btn surface"
                                style={{ padding: "0 8px", height: "48px" }}
                                onClick={() => setGuestSelection("any")}
                            >
                                ✕
                            </button>
                        </div>
                    ) : (
                        <select
                            className="select"
                            value={guestSelection}
                            onChange={(e) => setGuestSelection(e.target.value)}
                            style={{ height: "48px" }}
                        >
                            <option value="any">Any Capacity</option>
                            <option value="100">100 Guests</option>
                            <option value="200">200 Guests</option>
                            <option value="300">300 Guests</option>
                            <option value="500">500+ Guests</option>
                            <option value="custom">Custom...</option>
                        </select>
                    )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                    <label style={{ fontSize: "var(--font-size-xs)", fontWeight: "600", color: "var(--color-text-secondary)" }}>Budget (Per Table/Plate)</label>
                    <select
                        className="select"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        style={{ height: "48px" }}
                    >
                        <option value="any">Any Price</option>
                        <option value="500">Up to ₹500</option>
                        <option value="1000">Up to ₹1,000</option>
                        <option value="1500">Up to ₹1,500</option>
                        <option value="2500">Up to ₹2,500</option>
                    </select>
                </div>

                <button
                    className="btn btn-primary"
                    onClick={handleSearch}
                    style={{ height: "48px", padding: "0 var(--space-8)", fontWeight: "700" }}
                >
                    Find Venues
                </button>
            </div>
        </div>
    );
}
