"use client";

import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";

interface Review {
    id: string;
    user: string;
    rating: number;
    text: string;
    occasion?: string;
    venueName: string;
    venueId: string;
}

const mockReviews: Review[] = [
    {
        id: "r1",
        user: "Amit Sharma",
        rating: 5,
        text: "The service at Golden Oak was exceptional. They handled our wedding flawlessly. The staff was incredibly attentive and ensured every guest was comfortable.",
        occasion: "Wedding",
        venueName: "Golden Oak Banquet",
        venueId: "v1"
    },
    {
        id: "r2",
        user: "Priya Singh",
        rating: 4,
        text: "Great ambience for a birthday party. Kids had a lot of fun! The catering was excellent, especially the dessert section.",
        occasion: "Birthday",
        venueName: "The Grand Regal",
        venueId: "v2"
    },
    {
        id: "r3",
        user: "Rahul Verma",
        rating: 5,
        text: "A very professional setup for corporate events. The audio-visual support was perfect for our multi-city presentation. Highly recommended for business gatherings.",
        occasion: "Corporate Event",
        venueName: "Emerald Gardens",
        venueId: "v3"
    }
];

export default function Reviews({ occasion }: { occasion?: string }) {
    const filteredReviews = occasion
        ? mockReviews.filter(r => r.occasion === occasion)
        : mockReviews.slice(0, 3);

    return (
        <section className="container">
            {!occasion && <h2 style={{ marginBottom: "var(--space-8)", textAlign: "center", fontSize: "var(--font-size-xl)" }}>What our guests are saying</h2>}
            <div className="grid grid-3" style={{ gap: "var(--space-6)" }}>
                {filteredReviews.map((review) => (
                    <div
                        key={review.id}
                        className="surface glass review-card-hover"
                        style={{
                            padding: "var(--space-8)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "var(--space-4)",
                            minHeight: "340px",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            border: "1px solid var(--color-border)",
                            position: "relative"
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill={i < review.rating ? "var(--color-accent)" : "none"} color="var(--color-accent)" />
                            ))}
                        </div>
                        <p style={{
                            fontStyle: "italic",
                            fontSize: "var(--font-size-md)",
                            lineHeight: "1.6",
                            color: "var(--color-text-primary)",
                            flex: 1
                        }}>
                            "{review.text}"
                        </p>
                        <div style={{
                            marginTop: "auto",
                            borderTop: "1px solid var(--color-border)",
                            paddingTop: "var(--space-4)",
                            display: "flex",
                            alignItems: "center",
                            gap: "var(--space-4)"
                        }}>
                            <div style={{
                                width: "48px",
                                height: "48px",
                                borderRadius: "50%",
                                background: "var(--color-accent)",
                                color: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "700",
                                fontSize: "18px"
                            }}>
                                {review.user.charAt(0)}
                            </div>
                            <div>
                                <div style={{ fontSize: "var(--font-size-sm)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)" }}>{review.user}</div>
                                <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginTop: "2px" }}>
                                    Visited <Link href={`/venue/${review.venueId}`} style={{ color: "var(--color-accent)", fontWeight: "600" }}>{review.venueName}</Link>
                                </p>
                                <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-secondary)", marginTop: "4px", display: "block" }}>
                                    {review.occasion}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
