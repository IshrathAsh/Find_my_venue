"use client";

import React, { useState, useEffect } from "react";
import { mockVenues } from "../../lib/venueData";
import { Star, Users, MapPin, CheckCircle, Info, ArrowLeft, Share2, Heart, Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function VenuePage({ params }: { params: { id: string } }) {
    const venue = mockVenues.find((v) => v.id === params.id);
    const [isLiked, setIsLiked] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showToast, setShowToast] = useState<string | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
    const [guestCount, setGuestCount] = useState(100);
    const [eventDate, setEventDate] = useState("2024-12-25");

    if (!venue) {
        notFound();
    }

    const nextImage = () => {
        if (activeImageIndex !== null) {
            setActiveImageIndex((activeImageIndex + 1) % venue.ambienceImages.length);
        }
    };

    const prevImage = () => {
        if (activeImageIndex !== null) {
            setActiveImageIndex((activeImageIndex - 1 + venue.ambienceImages.length) % venue.ambienceImages.length);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (activeImageIndex === null) return;
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "Escape") setActiveImageIndex(null);
        };

        if (activeImageIndex !== null) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [activeImageIndex]);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        triggerToast("Link copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleLike = () => {
        setIsLiked(!isLiked);
        triggerToast(!isLiked ? "Added to wishlist" : "Removed from wishlist");
    };

    const triggerToast = (msg: string) => {
        setShowToast(msg);
        setTimeout(() => setShowToast(null), 3000);
    };

    return (
        <main style={{ paddingBottom: "var(--space-16)", position: "relative" }}>
            {/* Toast Notification */}
            {showToast && (
                <div style={{
                    position: "fixed",
                    bottom: "var(--space-8)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--color-text-primary)",
                    color: "#fff",
                    padding: "var(--space-3) var(--space-6)",
                    borderRadius: "var(--radius-full)",
                    zIndex: 2000,
                    fontSize: "var(--font-size-sm)",
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-2)",
                    boxShadow: "var(--shadow-lg)",
                    animation: "fadeIn 0.3s ease-out"
                }}>
                    <Check size={16} color="var(--color-success)" /> {showToast}
                </div>
            )}

            {/* Lightbox / Carousel */}
            {activeImageIndex !== null && (
                <div
                    onClick={() => setActiveImageIndex(null)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.95)",
                        zIndex: 3000,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backdropFilter: "blur(12px)",
                        animation: "fadeIn 0.3s ease-out"
                    }}
                >
                    <button
                        onClick={(e) => { e.stopPropagation(); setActiveImageIndex(null); }}
                        style={{ position: "absolute", top: "var(--space-6)", right: "var(--space-6)", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", padding: "12px", borderRadius: "50%", cursor: "pointer", zIndex: 3100 }}
                    >
                        <X size={24} />
                    </button>

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        height: "85vh",
                        padding: "0 var(--space-4)",
                        position: "relative"
                    }}>
                        {/* Overlay Controls */}
                        <button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            style={{
                                position: "absolute",
                                left: "var(--space-8)",
                                zIndex: 3200,
                                background: "rgba(0,0,0,0.3)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: "#fff",
                                padding: "20px",
                                borderRadius: "50%",
                                cursor: "pointer",
                                backdropFilter: "blur(4px)"
                            }}
                        >
                            <ChevronLeft size={36} />
                        </button>

                        <div onClick={(e) => e.stopPropagation()} style={{ flex: 1, height: "100%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "0 var(--space-20)" }}>
                            <img
                                key={activeImageIndex}
                                src={venue.ambienceImages[activeImageIndex]}
                                alt={`Gallery ${activeImageIndex}`}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    boxShadow: "0 30px 60px rgba(0,0,0,0.8)",
                                    animation: "slideIn 0.4s ease-out"
                                }}
                            />
                        </div>

                        <button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            style={{
                                position: "absolute",
                                right: "var(--space-8)",
                                zIndex: 3200,
                                background: "rgba(0,0,0,0.3)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: "#fff",
                                padding: "20px",
                                borderRadius: "50%",
                                cursor: "pointer",
                                backdropFilter: "blur(4px)"
                            }}
                        >
                            <ChevronRight size={36} />
                        </button>
                    </div>

                    <div onClick={(e) => e.stopPropagation()} style={{ marginTop: "var(--space-4)", display: "flex", gap: "var(--space-3)", overflowX: "auto", maxWidth: "95%", padding: "var(--space-4)", scrollbarWidth: "none" }}>
                        {venue.ambienceImages.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImageIndex(idx)}
                                style={{
                                    width: "120px",
                                    height: "80px",
                                    border: activeImageIndex === idx ? "3px solid var(--color-accent)" : "3px solid transparent",
                                    borderRadius: "var(--radius-md)",
                                    overflow: "hidden",
                                    flexShrink: 0,
                                    opacity: activeImageIndex === idx ? 1 : 0.4,
                                    cursor: "pointer",
                                    padding: 0,
                                    background: "none",
                                    transition: "all 0.3s"
                                }}
                            >
                                <img src={img} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </button>
                        ))}
                    </div>

                    <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "var(--font-size-sm)", fontWeight: "500" }}>
                        {activeImageIndex + 1} / {venue.ambienceImages.length}
                    </div>

                    <style jsx>{`
                        @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                    `}</style>
                </div>
            )}

            {/* Dynamic Header */}
            <div className="container" style={{ padding: "var(--space-6) 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)" }}>
                    <Link href="/" className="btn btn-secondary" style={{ padding: "8px 16px" }}>
                        <ArrowLeft size={16} /> Back to search
                    </Link>
                    <div style={{ display: "flex", gap: "var(--space-2)" }}>
                        <button
                            onClick={handleShare}
                            className="btn btn-secondary"
                            style={{ padding: "8px", position: "relative" }}
                            title="Share"
                        >
                            {copied ? <Check size={18} color="var(--color-success)" /> : <Share2 size={18} />}
                        </button>
                        <button
                            onClick={toggleLike}
                            className="btn btn-secondary"
                            style={{ padding: "8px" }}
                            title={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                        >
                            <Heart size={18} fill={isLiked ? "var(--color-error)" : "none"} color={isLiked ? "var(--color-error)" : "currentColor"} style={{ transition: "all 0.2s" }} />
                        </button>
                    </div>
                </div>

                {/* Gallery */}
                <div className="grid" style={{ gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "repeat(2, 200px)", gap: "var(--space-3)", marginBottom: "var(--space-8)" }}>
                    <div
                        onClick={() => setActiveImageIndex(0)}
                        style={{ gridRow: "span 2", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)", cursor: "pointer" }}
                    >
                        <img src={venue.ambienceImages[0]} alt={venue.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div
                        onClick={() => setActiveImageIndex(1 % venue.ambienceImages.length)}
                        style={{ background: "#f3f4f6", borderRadius: "var(--radius-lg)", overflow: "hidden", cursor: "pointer" }}
                    >
                        <img src={venue.ambienceImages[1] || venue.ambienceImages[0]} alt="2" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div
                        onClick={() => setActiveImageIndex(2 % venue.ambienceImages.length)}
                        style={{ background: "#f3f4f6", borderRadius: "var(--radius-lg)", overflow: "hidden", cursor: "pointer" }}
                    >
                        <img src={venue.ambienceImages[2] || venue.ambienceImages[0]} alt="3" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div
                        onClick={() => setActiveImageIndex(3 % venue.ambienceImages.length)}
                        style={{ background: "#f3f4f6", borderRadius: "var(--radius-lg)", overflow: "hidden", position: "relative", cursor: "pointer" }}
                    >
                        <img src={venue.ambienceImages[3] || venue.ambienceImages[0]} alt="4" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)", color: "#fff", fontWeight: "600" }}>+{venue.ambienceImages.length > 4 ? venue.ambienceImages.length - 4 : 12} photos</div>
                    </div>
                    <div
                        onClick={() => setActiveImageIndex(4 % venue.ambienceImages.length)}
                        style={{ background: "#f3f4f6", borderRadius: "var(--radius-lg)", overflow: "hidden", cursor: "pointer" }}
                    >
                        <img src={venue.ambienceImages[4] || venue.ambienceImages[0]} alt="5" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                </div>

                <div className="grid grid-3" style={{ gridTemplateColumns: "2fr 1fr", gap: "var(--space-12)" }}>
                    {/* Main Info */}
                    <div>
                        <div style={{ marginBottom: "var(--space-8)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-2)", marginBottom: "var(--space-2)" }}>
                                <span className="badge badge-success">Highly Recommended</span>
                                <span style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)" }}>{venue.reviewCount} verified reviews</span>
                            </div>
                            <h1 style={{ marginBottom: "var(--space-3)", display: "block", width: "100%" }}>{venue.name}</h1>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-6)" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                    <Star size={18} fill="#fbbf24" color="#fbbf24" />
                                    <span style={{ fontWeight: "600" }}>{venue.rating}</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--color-text-secondary)" }}>
                                    <MapPin size={18} />
                                    <span>{venue.area}</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--color-text-secondary)" }}>
                                    <Users size={18} />
                                    <span>{venue.capacityMin} - {venue.capacityMax} Guests</span>
                                </div>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div style={{ padding: "var(--space-6) 0" }}>
                            <h2 style={{ marginBottom: "var(--space-4)" }}>About this venue</h2>
                            <p style={{ marginBottom: "var(--space-8)", color: "var(--color-text-secondary)", fontSize: "var(--font-size-md)", lineHeight: "1.7" }}>
                                {venue.description}
                            </p>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-10)", marginBottom: "var(--space-10)" }}>
                                <div>
                                    <h3 style={{ marginBottom: "var(--space-4)", fontSize: "var(--font-size-md)", fontWeight: "var(--font-weight-semibold)" }}>Key Highlights</h3>
                                    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                                        {venue.highlights.map((highlight, i) => (
                                            <li key={i} style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", fontSize: "var(--font-size-sm)" }}>
                                                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-accent)" }}></div>
                                                {highlight}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 style={{ marginBottom: "var(--space-4)", fontSize: "var(--font-size-md)", fontWeight: "var(--font-weight-semibold)" }}>Top Amenities</h3>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
                                        {venue.amenities.map((amenity, i) => (
                                            <span key={i} className="glass" style={{ padding: "6px 12px", borderRadius: "var(--radius-full)", fontSize: "12px", border: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>
                                                {amenity}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="surface" style={{ padding: "var(--space-6)", background: "var(--color-accent-soft)", borderColor: "var(--color-accent)" }}>
                                <h3 style={{ marginBottom: "var(--space-4)", display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                                    <Info size={20} color="var(--color-accent)" /> Before you book
                                </h3>
                                <ul style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
                                    {[
                                        "Ample parking for guests",
                                        "Customizable lighting & sound system",
                                        "In-house and outside catering options",
                                        "Dedicated event coordinator provided",
                                        "Wheelchair accessible entrance",
                                        "Back-up power generators on site"
                                    ].map((item, i) => (
                                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-2)", fontSize: "var(--font-size-sm)" }}>
                                            <CheckCircle size={14} color="var(--color-success)" style={{ marginTop: "3px" }} /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Booking Card */}
                    <aside>
                        <div className="surface glass" style={{ padding: "var(--space-8)", position: "sticky", top: "100px" }}>
                            <div style={{ marginBottom: "var(--space-6)" }}>
                                <div style={{ fontSize: "28px", fontWeight: "var(--font-weight-semibold)" }}>
                                    ₹{venue.pricePerPlate?.toLocaleString()}
                                    <span style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)", fontWeight: "normal" }}> / plate</span>
                                </div>
                                <div style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)", marginTop: "4px" }}>No hidden taxes. No surprises.</div>
                            </div>

                            <div className="grid" style={{ gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
                                <div>
                                    <label style={{ fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-secondary)", display: "block", marginBottom: "6px" }}>Event Date</label>
                                    <input
                                        type="date"
                                        className="input"
                                        value={eventDate}
                                        onChange={(e) => setEventDate(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-secondary)", display: "block", marginBottom: "6px" }}>Guest Count</label>
                                    <input
                                        type="number"
                                        className="input"
                                        placeholder="How many?"
                                        value={guestCount}
                                        onChange={(e) => setGuestCount(parseInt(e.target.value) || 0)}
                                        min={venue.capacityMin}
                                        max={venue.capacityMax}
                                    />
                                </div>
                            </div>

                            <Link
                                href={`/venue/${venue.id}/checkout?guests=${guestCount}&date=${eventDate}`}
                                className="btn btn-primary"
                                style={{ width: "100%", padding: "16px" }}
                            >
                                Check Availability & Price
                            </Link>

                            <div style={{ textAlign: "center", marginTop: "var(--space-4)" }}>
                                <p style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>
                                    You won’t be charged yet. We’ll just check if they’re free.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
