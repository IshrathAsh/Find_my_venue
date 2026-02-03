"use client";

import React, { useState } from "react";
import { Venue } from "../lib/venueData";
import VenueCard from "./VenueCard";
import { LayoutGrid, List } from "lucide-react";

interface VenueListProps {
    venues: Venue[];
    title: string;
    isFallback?: boolean;
}

export default function VenueList({ venues, title, isFallback }: VenueListProps) {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    return (
        <div className="container" style={{ paddingBottom: "var(--space-12)" }}>
            {/* Unified Section Header */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "var(--space-8)",
                borderBottom: "1px solid var(--color-border)",
                paddingBottom: "var(--space-4)"
            }}>
                <div>
                    <h2 style={{ marginBottom: isFallback ? "var(--space-4)" : "0" }}>{title}</h2>
                    {isFallback && (
                        <div className="surface" style={{ padding: "var(--space-3) var(--space-4)", borderLeft: "4px solid var(--color-accent)", background: "var(--color-accent-soft)" }}>
                            <p style={{ color: "var(--color-text-primary)", fontWeight: "var(--font-weight-medium)", fontSize: "var(--font-size-sm)" }}>
                                We couldn’t find an exact match.
                            </p>
                            <p style={{ color: "var(--color-text-secondary)", margin: 0, fontSize: "var(--font-size-xs)" }}>
                                Would you like us to adjust the search slightly? In the meantime, here are some popular options:
                            </p>
                        </div>
                    )}
                </div>

                <div className="glass" style={{ display: "flex", padding: "4px", borderRadius: "var(--radius-full)", border: "1px solid var(--color-border)", marginBottom: "4px" }}>
                    <button
                        onClick={() => setViewMode("grid")}
                        style={{
                            padding: "6px 16px",
                            borderRadius: "var(--radius-full)",
                            background: viewMode === "grid" ? "var(--color-text-primary)" : "transparent",
                            color: viewMode === "grid" ? "#fff" : "var(--color-text-secondary)",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            transition: "all 0.2s"
                        }}
                    >
                        <LayoutGrid size={16} /> <span style={{ fontSize: "14px", fontWeight: "600" }}>Grid</span>
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        style={{
                            padding: "6px 16px",
                            borderRadius: "var(--radius-full)",
                            background: viewMode === "list" ? "var(--color-text-primary)" : "transparent",
                            color: viewMode === "list" ? "#fff" : "var(--color-text-secondary)",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            transition: "all 0.2s"
                        }}
                    >
                        <List size={16} /> <span style={{ fontSize: "14px", fontWeight: "600" }}>List</span>
                    </button>
                </div>
            </div>

            <div
                className={viewMode === "grid" ? "grid grid-3" : ""}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-6)",
                    ...(viewMode === "grid" ? { display: "grid" } : {})
                }}
            >
                {venues.map((venue) => (
                    <VenueCard key={venue.id} venue={venue} layout={viewMode} />
                ))}
            </div>

            {venues.length === 0 && (
                <div style={{ textAlign: "center", padding: "var(--space-12)" }}>
                    <h3 style={{ marginBottom: "var(--space-2)" }}>We couldn’t find an exact match.</h3>
                    <p>Would you like us to adjust the search slightly?</p>
                </div>
            )}
        </div>
    );
}
