"use client";

import React, { useState } from "react";
import { mockVenues } from "../../../lib/venueData";
import { ShieldCheck, Info, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useAuth } from "../../../components/AuthProvider";

export default function CheckoutPage({ params }: { params: { id: string } }) {
    const venue = mockVenues.find((v) => v.id === params.id);
    const { user } = useAuth();
    const router = useRouter();

    const [requirements, setRequirements] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!venue) {
        notFound();
    }

    const guestCount = 100; // Mocked
    const totalPrice = (venue.pricePerPlate || 0) * guestCount;

    const handleConfirm = async () => {
        if (!user) {
            router.push('/auth');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    venueId: venue.id,
                    venueName: venue.name,
                    guestCount,
                    date: "2024-12-25", // Mocked
                    requirements,
                    userEmail: user.email
                }),
            });

            if (response.ok) {
                setSuccess(true);
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Booking failed:", error);
            alert("Connection error. Check your internet.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <main className="container" style={{ padding: "100px 20px", textAlign: "center" }}>
                <div style={{ maxWidth: "500px", margin: "auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-6)" }}>
                    <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <CheckCircle2 size={48} color="var(--color-success)" />
                    </div>
                    <h1 style={{ fontSize: "var(--font-size-xl)" }}>Request Sent Successfully!</h1>
                    <p style={{ color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                        I've sent your request to **{venue.name}**. Their manager will review the requirements and reach out to you at **{user?.email}** shortly.
                    </p>
                    <Link href="/" className="btn btn-primary" style={{ padding: "16px 32px" }}>
                        Return to Discovery
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="container" style={{ padding: "var(--space-8) var(--space-6)" }}>
            <div style={{ marginBottom: "var(--space-6)" }}>
                <Link href={`/venue/${venue.id}`} style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)" }}>
                    ← Back to venue details
                </Link>
            </div>

            <div style={{ maxWidth: "800px", margin: "auto" }}>
                <h1 style={{ marginBottom: "var(--space-8)" }}>Please review your booking</h1>

                <div className="grid grid-2" style={{ gap: "var(--space-8)", alignItems: "start" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
                        <div className="surface" style={{ padding: "var(--space-6)", borderLeft: "4px solid var(--color-success)" }}>
                            <h3 style={{ marginBottom: "var(--space-2)", display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                                <ShieldCheck size={20} color="var(--color-success)" /> Everything here can be changed before confirmation.
                            </h3>
                            <p>I’ve kept this flexible for you. You can update guest counts or dates even after this step.</p>
                        </div>

                        <div className="surface" style={{ padding: "var(--space-6)" }}>
                            <h3 style={{ marginBottom: "var(--space-4)" }}>Special requirements</h3>
                            <textarea
                                className="input"
                                rows={4}
                                placeholder="Is there anything specific you'd like the venue manager to know?"
                                style={{ resize: "none" }}
                                value={requirements}
                                onChange={(e) => setRequirements(e.target.value)}
                            ></textarea>
                        </div>

                        {!user && (
                            <div className="surface" style={{ padding: "var(--space-6)", background: "var(--color-accent-soft)" }}>
                                <p style={{ margin: 0, fontSize: "var(--font-size-sm)", fontWeight: "600" }}>
                                    You'll be asked to Sign In before confirming this request.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="surface" style={{ padding: "var(--space-6)" }}>
                        <h3 style={{ marginBottom: "var(--space-4)" }}>Booking Summary</h3>
                        <div className="checkout-summary">
                            <div style={{ display: "flex", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
                                <img src={venue.ambienceImages[0]} alt={venue.name} style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "var(--radius-md)" }} />
                                <div>
                                    <h4 style={{ fontSize: "var(--font-size-sm)", margin: 0 }}>{venue.name}</h4>
                                    <p style={{ fontSize: "var(--font-size-xs)", margin: 0 }}>{venue.area}</p>
                                </div>
                            </div>

                            <div className="divider"></div>

                            <div className="price-row">
                                <span>₹{venue.pricePerPlate} x {guestCount} guests</span>
                                <span>₹{totalPrice.toLocaleString()}</span>
                            </div>
                            <div className="price-row" style={{ fontWeight: "700", marginTop: "12px", fontSize: "18px" }}>
                                <span>Total (Incl. Taxes)</span>
                                <span>₹{(totalPrice * 1.18).toLocaleString()}</span>
                            </div>

                            <button
                                onClick={handleConfirm}
                                disabled={loading}
                                className="btn btn-primary"
                                style={{ width: "100%", marginTop: "var(--space-8)", height: "56px" }}
                            >
                                {loading ? "Processing Request..." : user ? "Confirm and send request" : "Sign In to Confirm"}
                            </button>

                            <p style={{ textAlign: "center", fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "var(--space-4)" }}>
                                <Info size={12} style={{ verticalAlign: "middle", marginRight: "4px" }} />
                                No charges will be made today.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
