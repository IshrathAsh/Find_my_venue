import React from "react";
import { mockVenues } from "../../../lib/venueData";
import { ShieldCheck, Info } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function CheckoutPage({ params }: { params: { id: string } }) {
    const venue = mockVenues.find((v) => v.id === params.id);

    if (!venue) {
        notFound();
    }

    const guestCount = 100; // Mocked from state/params
    const totalPrice = (venue.pricePerPlate || 0) * guestCount;

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
                    {/* Left: Reassurance & Form */}
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
                                placeholder="Is there anything specific you'd like the venue manager to know? (e.g., dietery restrictions, setup preferences)"
                                style={{ resize: "none" }}
                            ></textarea>
                        </div>
                    </div>

                    {/* Right: Summary */}
                    <div className="surface" style={{ padding: "var(--space-6)" }}>
                        <h3 style={{ marginBottom: "var(--space-4)" }}>Booking Summary</h3>

                        <div className="checkout-summary">
                            <Link href={`/venue/${venue.id}`} style={{ display: "flex", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
                                <div style={{ width: "80px", height: "60px", background: "#eee", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
                                    <img src={venue.ambienceImages[0]} alt={venue.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: "var(--font-size-sm)", margin: 0 }}>{venue.name}</h4>
                                    <p style={{ fontSize: "var(--font-size-xs)", margin: 0 }}>{venue.area}</p>
                                </div>
                            </Link>

                            <div className="divider"></div>

                            <div className="price-row">
                                <span>₹{venue.pricePerPlate} x {guestCount} guests</span>
                                <span>₹{totalPrice.toLocaleString()}</span>
                            </div>
                            <div className="price-row">
                                <span>Service fee</span>
                                <span>₹0 (Calm discovery)</span>
                            </div>
                            <div className="price-row">
                                <span>Taxes</span>
                                <span>₹{(totalPrice * 0.18).toLocaleString()}</span>
                            </div>

                            <div className="divider"></div>

                            <div className="price-row" style={{ fontWeight: "var(--font-weight-medium)", fontSize: "var(--font-size-md)" }}>
                                <span>Total</span>
                                <span>₹{(totalPrice * 1.18).toLocaleString()}</span>
                            </div>

                            <button className="btn btn-primary" style={{ width: "100%", marginTop: "var(--space-4)" }}>
                                Confirm and reserve this venue
                            </button>

                            <p style={{ textAlign: "center", fontSize: "10px", color: "var(--color-text-secondary)", marginTop: "var(--space-2)" }}>
                                <Info size={10} style={{ verticalAlign: "middle", marginRight: "2px" }} />
                                By clicking confirm, you agree to the venue's house rules and cancellation policy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
