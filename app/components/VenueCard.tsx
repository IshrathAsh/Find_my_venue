import React from "react";
import { Venue } from "../lib/venueData";
import { Star, Users, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

interface VenueCardProps {
    venue: Venue;
    layout?: "grid" | "list";
}

export default function VenueCard({ venue, layout = "grid" }: VenueCardProps) {
    const isList = layout === "list";

    return (
        <div className={`card venue-card animate-fade-in ${isList ? "list-view" : ""}`}>
            <Link href={`/venue/${venue.id}`} className="card-image">
                {venue.ambienceImages[0] ? (
                    <img src={venue.ambienceImages[0]} alt={venue.name} loading="lazy" />
                ) : (
                    <div style={{ width: "100%", height: "100%", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ color: "#9ca3af", fontSize: "var(--font-size-xs)" }}>[ Image coming soon ]</span>
                    </div>
                )}
                <div style={{ position: "absolute", top: "var(--space-2)", right: "var(--space-2)", display: "flex", gap: "var(--space-1)" }}>
                    {venue.popularityScore > 90 && (
                        <span className="badge glass" style={{ color: "var(--color-text-primary)", fontSize: "12px" }}>High demand</span>
                    )}
                </div>
            </Link>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)", flex: 1, width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                        <Link href={`/venue/${venue.id}`}>
                            <h3 style={{ fontSize: "var(--font-size-md)", fontWeight: "var(--font-weight-semibold)", marginBottom: "4px" }}>{venue.name}</h3>
                        </Link>
                        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", flexWrap: "wrap" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--color-text-secondary)" }}>
                                <MapPin size={14} />
                                <span style={{ fontSize: "var(--font-size-sm)" }}>{venue.area}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--color-text-secondary)" }}>
                                <Users size={14} />
                                <span style={{ fontSize: "var(--font-size-sm)" }}>Fits {venue.capacityMin}-{venue.capacityMax}</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "2px", background: "#fffbeb", padding: "2px 8px", borderRadius: "var(--radius-sm)", border: "1px solid #fde68a", flexShrink: 0 }}>
                        <Star size={14} fill="#fbbf24" color="#fbbf24" />
                        <span style={{ fontSize: "14px", fontWeight: "var(--font-weight-semibold)", color: "#92400e" }}>{venue.rating}</span>
                    </div>
                </div>

                {isList && (
                    <div style={{ marginTop: "var(--space-4)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
                            {venue.highlights?.slice(0, 3).map((tag, i) => (
                                <span key={i} style={{
                                    padding: "4px 10px",
                                    borderRadius: "var(--radius-sm)",
                                    background: "var(--color-accent-soft)",
                                    color: "var(--color-accent)",
                                    fontSize: "12px",
                                    fontWeight: "600"
                                }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", color: "var(--color-text-secondary)", fontSize: "13px" }}>
                            {venue.amenities?.slice(0, 4).map((amenity, i) => (
                                <span key={i} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                    <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--color-border)" }}></div>
                                    {amenity}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {!isList && <div className="divider"></div>}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: isList ? "var(--space-4)" : "auto" }}>
                    <div>
                        {venue.pricePerPlate && (
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <span style={{ fontSize: "var(--font-size-md)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)" }}>
                                    ₹{venue.pricePerPlate}
                                    <span style={{ fontWeight: "normal", color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)", marginLeft: "4px" }}>/ plate</span>
                                </span>
                            </div>
                        )}
                    </div>
                    <Link href={`/venue/${venue.id}`} className="btn btn-primary" style={{ padding: "10px 20px", fontSize: "14px" }}>
                        View Details <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
