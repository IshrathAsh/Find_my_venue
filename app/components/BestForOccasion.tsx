import React from "react";
import { Venue, mockVenues } from "../lib/venueData";
import VenueCard from "./VenueCard";

interface BestForOccasionProps {
    occasion: string;
}

export default function BestForOccasion({ occasion }: BestForOccasionProps) {
    if (!occasion) return null;

    const curatedVenues = mockVenues
        .filter((v) => v.supportedOccasions.includes(occasion))
        .sort((a, b) => {
            // Sort by rating + popularityScore
            const scoreA = a.rating * 10 + a.popularityScore;
            const scoreB = b.rating * 10 + b.popularityScore;
            return scoreB - scoreA;
        })
        .slice(0, 4);

    if (curatedVenues.length === 0) return null;

    return (
        <section className="container" style={{ background: "#fff", borderRadius: "var(--radius-lg)", margin: "var(--space-8) auto", padding: "var(--space-8)" }}>
            <h2 style={{ marginBottom: "var(--space-6)" }}>Top venues for {occasion}</h2>
            <div className="grid grid-4">
                {curatedVenues.map((venue) => (
                    <VenueCard key={venue.id} venue={venue} />
                ))}
            </div>
        </section>
    );
}
