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
                filter: "blur(5px)",
                opacity: 0.1,
                zIndex: -1,
                transform: "scale(1.1)"
            }}></div>

            {/* Floating Images - Top Left */}
            <div className="floating-image" style={{
                position: "absolute",
                top: "10%",
                left: "5%",
                width: "180px",
                height: "180px",
                transform: "rotate(-8deg)",
                zIndex: 0,
                opacity: 0.9
            }}>
                <img
                    src="/venues/download1.jpeg"
                    alt="Venue"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "12px",
                        border: "4px solid rgba(255, 255, 255, 0.9)",
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1)"
                    }}
                />
            </div>

            {/* Floating Images - Top Right */}
            <div className="floating-image" style={{
                position: "absolute",
                top: "15%",
                right: "8%",
                width: "160px",
                height: "160px",
                transform: "rotate(12deg)",
                zIndex: 0,
                opacity: 0.9
            }}>
                <img
                    src="/venues/download2.jpeg"
                    alt="Venue"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "12px",
                        border: "4px solid rgba(255, 255, 255, 0.9)",
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1)"
                    }}
                />
            </div>

            {/* Floating Images - Bottom Left */}
            <div className="floating-image" style={{
                position: "absolute",
                bottom: "12%",
                left: "8%",
                width: "150px",
                height: "150px",
                transform: "rotate(6deg)",
                zIndex: 0,
                opacity: 0.9
            }}>
                <img
                    src="/venues/download3.jpeg"
                    alt="Venue"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "12px",
                        border: "4px solid rgba(255, 255, 255, 0.9)",
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1)"
                    }}
                />
            </div>

            {/* Floating Images - Bottom Right */}
            <div className="floating-image" style={{
                position: "absolute",
                bottom: "8%",
                right: "6%",
                width: "170px",
                height: "170px",
                transform: "rotate(-10deg)",
                zIndex: 0,
                opacity: 0.9
            }}>
                <img
                    src="/venues/download4.jpeg"
                    alt="Venue"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "12px",
                        border: "4px solid rgba(255, 255, 255, 0.9)",
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1)"
                    }}
                />
            </div>

            <div className="container animate-fade-in" style={{ position: "relative", zIndex: 1, maxWidth: "1000px" }}>
                <h1 style={{
                    marginBottom: "var(--space-8)",
                    color: "var(--color-text-primary)",
                    fontSize: "var(--font-size-2xl)",
                    lineHeight: "1.2",
                    letterSpacing: "-0.04em",
                    width: "100%"
                }}>
                    Looking for a venue? </h1>
                <h1><span style={{ color: "var(--color-accent)" }}>We'll help you find the right one.</span>
                </h1>
                <br></br>
                <p style={{
                    color: "var(--color-text-secondary)",
                    maxWidth: "600px",
                    margin: "0 auto",
                    fontSize: "var(--font-size-md)",
                    lineHeight: "1.6",
                    opacity: 0.9,
                    paddingTop: "20px",
                }}>
                    Tell us where, when, and for how many people. <br />
                    We'll take care of the rest—with professional, curated service.
                </p>
            </div>

            <style jsx>{`
                .floating-image {
                    animation: float 6s ease-in-out infinite;
                }

                .floating-image:nth-child(2) {
                    animation-delay: 1s;
                }

                .floating-image:nth-child(3) {
                    animation-delay: 2s;
                }

                .floating-image:nth-child(4) {
                    animation-delay: 3s;
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) rotate(var(--rotation));
                    }
                    50% {
                        transform: translateY(-20px) rotate(var(--rotation));
                    }
                }

                .floating-image:nth-child(2) {
                    --rotation: -8deg;
                }

                .floating-image:nth-child(3) {
                    --rotation: 12deg;
                }

                .floating-image:nth-child(4) {
                    --rotation: 6deg;
                }

                .floating-image:nth-child(5) {
                    --rotation: -10deg;
                }

                @media (max-width: 768px) {
                    .floating-image {
                        display: none;
                    }
                }
            `}</style>
        </section>
    );
}
