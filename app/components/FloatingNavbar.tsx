"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, ChevronRight, User } from "lucide-react";
import { requestLocation } from "../lib/location";

export default function FloatingNavbar() {
    const [location, setLocation] = useState<string | null>(null);
    const [status, setStatus] = useState<"idle" | "detecting" | "denied" | "resolved">("idle");

    const handleDetect = async (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setStatus("detecting");
        const detected = await requestLocation();
        if (detected) {
            setLocation(detected);
            setStatus("resolved");
        } else {
            setStatus("denied");
        }
    };

    React.useEffect(() => {
        handleDetect();
    }, []);

    return (
        <div style={{
            position: "fixed",
            top: "var(--space-4)",
            left: "0",
            right: "0",
            zIndex: 1500,
            display: "flex",
            justifyContent: "center",
            padding: "0 var(--space-4)",
            pointerEvents: "none"
        }}>
            <nav className="glass animate-fade-in" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "75%",
                maxWidth: "1100px",
                gap: "var(--space-6)",
                padding: "10px 20px",
                borderRadius: "var(--radius-full)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                border: "1px solid rgba(255,255,255,0.4)",
                pointerEvents: "auto",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            }}>
                {/* Brand / Logo - Left Section */}
                <div style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
                    <Link href="/" style={{ display: "flex", alignItems: "center" }}>
                        <div style={{
                            height: "60px",
                            display: "flex",
                            alignItems: "center",
                        }}>
                            <img
                                src="/logo.png?v=1.2"
                                alt="logo"
                                style={{
                                    height: "60%",
                                    width: "auto",
                                    objectFit: "contain"
                                }}
                            />
                        </div>
                    </Link>
                </div>

                {/* Navigation Links - Center Section */}
                <div style={{ display: "flex", gap: "var(--space-8)", alignItems: "center", justifyContent: "center" }}>
                    <Link href="/about" className="nav-link">About</Link>
                    <Link href="/contact" className="nav-link">Contact Us</Link>
                    <Link href="/reviews" className="nav-link">Reviews</Link>
                </div>

                {/* Actions / Account - Right Section */}
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "var(--space-4)" }}>
                    <button
                        onClick={handleDetect}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "var(--space-2)",
                            padding: "8px 16px",
                            borderRadius: "var(--radius-full)",
                            background: status === "resolved" ? "var(--color-accent-soft)" : "rgba(0,0,0,0.03)",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            border: "none",
                            outline: "none"
                        }}
                    >
                        <MapPin size={14} color={status === "resolved" ? "var(--color-accent)" : "var(--color-text-secondary)"} />
                        <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--color-text-primary)", whiteSpace: "nowrap" }}>
                            {status === "idle" && "Find nearby"}
                            {status === "detecting" && "Searching..."}
                            {status === "denied" && "Enable GPS"}
                            {status === "resolved" && location}
                        </span>
                    </button>

                    <div style={{ width: "1px", height: "20px", background: "rgba(0,0,0,0.08)" }}></div>

                    <Link href="/contact" className="btn btn-primary" style={{ padding: "8px 20px", height: "40px", fontSize: "14px" }}>
                        <User size={14} /> Sign in
                    </Link>
                </div>
            </nav>

            <style jsx>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                .nav-link { 
                    font-size: var(--font-size-sm); 
                    font-weight: 500; 
                    color: var(--color-text-primary);
                    opacity: 0.8;
                    transition: opacity 0.2s;
                }
                .nav-link:hover { opacity: 1; }
                nav:hover { transform: translateY(1px); boxShadow: 0 12px 40px rgba(0,0,0,0.15); }
            `}</style>
        </div >
    );
}
