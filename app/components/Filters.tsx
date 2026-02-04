"use client";

import React, { useState, useEffect } from "react";
import { occasions } from "../lib/venueData";
import { FilterParams } from "../lib/filterLogic";
import { requestLocation } from "../lib/location";

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
    const [isLocating, setIsLocating] = useState(false);

    useEffect(() => {
        if (initialLocation && !location) {
            setLocation(initialLocation);
        }
    }, [initialLocation]);

    const handleDetectLocation = async () => {
        setIsLocating(true);
        const detected = await requestLocation();
        if (detected) {
            setLocation(detected);
        }
        setIsLocating(false);
    };

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
                    <div style={{ position: "relative" }}>
                        <input
                            type="text"
                            className="input"
                            placeholder="Where?"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            style={{ height: "48px", width: "100%", paddingRight: "40px" }}
                        />
                        <button
                            onClick={handleDetectLocation}
                            disabled={isLocating}
                            title="Detect my location"
                            type="button"
                            style={{
                                position: "absolute",
                                right: "8px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "var(--color-primary)",
                                opacity: isLocating ? 0.5 : 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            {isLocating ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="animate-spin"
                                >
                                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="22" y1="12" x2="18" y2="12"></line>
                                    <line x1="6" y1="12" x2="2" y2="12"></line>
                                    <line x1="12" y1="6" x2="12" y2="2"></line>
                                    <line x1="12" y1="22" x2="12" y2="18"></line>
                                </svg>
                            )}
                        </button>
                    </div>
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
