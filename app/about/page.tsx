import React from "react";
import Link from "next/link";
import { Heart, Shield, Sparkles, Coffee } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="container" style={{ padding: "var(--space-16) var(--space-6)" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                <section style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
                    <h1 style={{ fontSize: "var(--font-size-2xl)", marginBottom: "var(--space-6)" }}>
                        A quiet place for <br />
                        <span style={{ color: "var(--color-accent)" }}>grand beginnings.</span>
                    </h1>
                    <p style={{ fontSize: "var(--font-size-lg)", color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
                        Finding a venue shouldn’t feel like a negotiation.
                        It should feel like the start of something beautiful.
                    </p>
                </section>

                <div className="grid grid-2" style={{ gap: "var(--space-12)", marginBottom: "var(--space-16)" }}>
                    <div className="surface" style={{ padding: "var(--space-8)" }}>
                        <div style={{
                            width: "48px",
                            height: "48px",
                            background: "var(--color-accent-soft)",
                            borderRadius: "var(--radius-md)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "var(--space-4)",
                            color: "var(--color-accent)"
                        }}>
                            <Coffee size={24} />
                        </div>
                        <h3 style={{ marginBottom: "var(--space-3)" }}>A helper, not a salesman</h3>
                        <p style={{ fontSize: "var(--font-size-sm)" }}>
                            We built this to reduce the noise. No pressure, no sales tactics, and no "limited time offers" that create unnecessary hurry.
                        </p>
                    </div>

                    <div className="surface" style={{ padding: "var(--space-8)" }}>
                        <div style={{
                            width: "48px",
                            height: "48px",
                            background: "#ecfdf5",
                            borderRadius: "var(--radius-md)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "var(--space-4)",
                            color: "var(--color-success)"
                        }}>
                            <Shield size={24} />
                        </div>
                        <h3 style={{ marginBottom: "var(--space-3)" }}>Clarity first</h3>
                        <p style={{ fontSize: "var(--font-size-sm)" }}>
                            Our goal is to reduce anxiety. We show you exactly what's needed, anticipate your questions, and stay honest about every detail.
                        </p>
                    </div>
                </div>

                <section style={{ marginBottom: "var(--space-16)" }}>
                    <h2 style={{ marginBottom: "var(--space-8)" }}>How we work</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
                        <div style={{ display: "flex", gap: "var(--space-6)" }}>
                            <div style={{ fontSize: "var(--font-size-xl)", fontWeight: "600", color: "var(--color-border)" }}>01</div>
                            <div>
                                <h3 style={{ marginBottom: "var(--space-2)" }}>Take your time</h3>
                                <p>Explore venues at your own pace. We’ll keep the details ready for whenever you’re comfortable to review them.</p>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: "var(--space-6)" }}>
                            <div style={{ fontSize: "var(--font-size-xl)", fontWeight: "600", color: "var(--color-border)" }}>02</div>
                            <div>
                                <h3 style={{ marginBottom: "var(--space-2)" }}>No surprises</h3>
                                <p>What you see is what you get. We work directly with venue managers to ensure availability and pricing are as transparent as possible.</p>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: "var(--space-6)" }}>
                            <div style={{ fontSize: "var(--font-size-xl)", fontWeight: "600", color: "var(--color-border)" }}>03</div>
                            <div>
                                <h3 style={{ marginBottom: "var(--space-2)" }}>Always flexible</h3>
                                <p>Everything can be changed before confirmation. We understand that plans evolve, and we’re here to handle that smoothly.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="surface glass" style={{ padding: "var(--space-12)", textAlign: "center" }}>
                    <Heart size={32} color="var(--color-error)" style={{ marginBottom: "var(--space-4)" }} />
                    <h2 style={{ marginBottom: "var(--space-4)" }}>Ready to find yours?</h2>
                    <p style={{ marginBottom: "var(--space-8)", color: "var(--color-text-secondary)" }}>
                        We're here to help whenever you're ready.
                    </p>
                    <Link href="/" className="btn btn-primary" style={{ padding: "16px 40px" }}>
                        Find a venue
                    </Link>
                </div>
            </div>
        </main>
    );
}
