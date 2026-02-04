"use client";

import React, { useState } from "react";
import { mockVenues, occasions } from "../../../lib/venueData";
import { ShieldCheck, Info, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useAuth } from "../../../components/AuthProvider";

export default function CheckoutPage({ params }: { params: { id: string } }) {
    const venue = mockVenues.find((v) => v.id === params.id);
    const { user } = useAuth();
    const router = useRouter();

    const [guestCount, setGuestCount] = useState(100);
    const [date, setDate] = useState("2024-12-25");
    const [occasion, setOccasion] = useState(venue?.supportedOccasions?.[0] || "");
    const [requirements, setRequirements] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!venue) {
        notFound();
    }

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
                    date,
                    occasion,
                    requirements,
                    userEmail: user.email
                }),
            });

            if (response.ok) {
                setSuccess(true);
            } else {
                const data = await response.json();
                alert(`Error: ${data.error || "Internal Server Error"}\n\nHint: ${data.hint || "Check your console for details."}`);
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

            <div style={{ maxWidth: "1000px", margin: "auto" }}>
                <h1 style={{ marginBottom: "var(--space-8)" }}>Please review your booking</h1>

                <div className="checkout-grid" style={{ gap: "var(--space-8)", alignItems: "start" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
                        {/* Event Details Section */}
                        <div className="surface" style={{ padding: "var(--space-6)" }}>
                            <h3 style={{ marginBottom: "var(--space-6)" }}>Event Details</h3>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-6)" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                                    <label style={{ fontSize: "var(--font-size-xs)", fontWeight: "600", color: "var(--color-text-secondary)" }}>Event Date</label>
                                    <input
                                        type="date"
                                        className="input"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        style={{ height: "48px" }}
                                    />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                                    <label style={{ fontSize: "var(--font-size-xs)", fontWeight: "600", color: "var(--color-text-secondary)" }}>Expected Guests</label>
                                    <input
                                        type="number"
                                        className="input"
                                        min={venue.capacityMin}
                                        max={venue.capacityMax}
                                        value={guestCount}
                                        onChange={(e) => setGuestCount(parseInt(e.target.value) || 0)}
                                        style={{ height: "48px" }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", marginTop: "var(--space-6)" }}>
                                <label style={{ fontSize: "var(--font-size-xs)", fontWeight: "600", color: "var(--color-text-secondary)" }}>Occasion</label>
                                <select
                                    className="select"
                                    value={occasion}
                                    onChange={(e) => setOccasion(e.target.value)}
                                    style={{ height: "48px" }}
                                >
                                    <option value="">Select Occasion</option>
                                    {occasions.map((occ) => (
                                        <option key={occ} value={occ}>{occ}</option>
                                    ))}
                                </select>
                            </div>
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

                        <div className="surface" style={{ padding: "var(--space-6)", borderLeft: "4px solid var(--color-success)" }}>
                            <h3 style={{ marginBottom: "var(--space-2)", display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                                <ShieldCheck size={20} color="var(--color-success)" /> Flexible Confirmation
                            </h3>
                            <p style={{ margin: 0, fontSize: "var(--font-size-sm)" }}>I’ve kept this flexible for you. You can still update these details with the venue manager later.</p>
                        </div>

                        {!user && (
                            <div className="surface" style={{ padding: "var(--space-6)", background: "var(--color-accent-soft)" }}>
                                <p style={{ margin: 0, fontSize: "var(--font-size-sm)", fontWeight: "600" }}>
                                    You'll be asked to Sign In before confirming this request.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="sticky-summary">
                        <div className="surface luxury-shadow" style={{ padding: "var(--space-8)" }}>
                            <h3 style={{ marginBottom: "var(--space-6)" }}>Booking Summary</h3>
                            <div className="checkout-summary">
                                <div style={{ display: "flex", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
                                    <img src={venue.ambienceImages[0]} alt={venue.name} style={{ width: "100px", height: "75px", objectFit: "cover", borderRadius: "var(--radius-md)" }} />
                                    <div>
                                        <h4 style={{ fontSize: "var(--font-size-md)", margin: "0 0 4px 0" }}>{venue.name}</h4>
                                        <p style={{ fontSize: "var(--font-size-sm)", margin: 0, color: "var(--color-text-secondary)" }}>{venue.area} • {occasion}</p>
                                    </div>
                                </div>

                                <div className="divider" style={{ margin: "var(--space-6) 0" }}></div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                                    <div className="price-row" style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-secondary)" }}>
                                        <span>₹{venue.pricePerPlate} x {guestCount} guests</span>
                                        <span>₹{totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="price-row" style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-secondary)", fontSize: "14px" }}>
                                        <span>Taxes & Service (18%)</span>
                                        <span>₹{(totalPrice * 0.18).toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="divider" style={{ margin: "var(--space-6) 0" }}></div>

                                <div className="price-row" style={{ display: "flex", justifyContent: "space-between", fontWeight: "700", fontSize: "20px" }}>
                                    <span>Total Amount</span>
                                    <span style={{ color: "var(--color-accent)" }}>₹{(totalPrice * 1.18).toLocaleString()}</span>
                                </div>

                                <button
                                    onClick={handleConfirm}
                                    disabled={loading}
                                    className="btn btn-primary"
                                    style={{ width: "100%", marginTop: "var(--space-8)", height: "60px", fontSize: "16px" }}
                                >
                                    {loading ? "Processing..." : user ? "Confirm and send request" : "Sign In to Confirm"}
                                </button>

                                <p style={{ textAlign: "center", fontSize: "12px", color: "var(--color-text-secondary)", marginTop: "var(--space-4)" }}>
                                    <Info size={14} style={{ verticalAlign: "middle", marginRight: "6px" }} />
                                    No payment is required at this stage.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
