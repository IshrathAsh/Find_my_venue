import React from "react";

export default function Hero() {
    return (
        <section className="hero-section" style={{
            padding: "var(--space-24) 0",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            background: "linear-gradient(to bottom, transparent, var(--color-background))"
        }}>
            {/* Subtle Background Overlay */}
            <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "url('/venues/v3     .png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(5px)", /* Reduced blur from 60px */
                opacity: 0.1, /* Increased opacity from 0.1 */
                zIndex: -1,
                transform: "scale(1.1)"
            }}></div>

            <div className="container animate-fade-in" style={{ position: "relative", zIndex: 1, maxWidth: "1000px" }}>
                <h1 style={{
                    marginBottom: "var(--space-8)",
                    color: "var(--color-text-primary)",
                    fontSize: "var(--font-size-2xl)",
                    lineHeight: "1.2",
                    letterSpacing: "-0.04em",
                    width: "100%"
                }}>
                    Looking for a venue? <span style={{ color: "var(--color-accent)" }}>We’ll help you find the right one.</span>
                </h1>
                <p style={{
                    color: "var(--color-text-secondary)",
                    maxWidth: "600px",
                    margin: "0 auto",
                    fontSize: "var(--font-size-md)",
                    lineHeight: "1.6",
                    opacity: 0.9
                }}>
                    Tell us where, when, and for how many people. <br />
                    We’ll take care of the rest—with professional, curated service.
                </p>

            </div>
        </section>
    );
}
