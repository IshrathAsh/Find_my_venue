import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="container" style={{ padding: "var(--space-16) var(--space-6)" }}>
            <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
                <h1 style={{ marginBottom: "var(--space-4)" }}>We're here to help.</h1>
                <p style={{ marginBottom: "var(--space-12)", color: "var(--color-text-secondary)" }}>
                    If you have any questions or need assistance with a booking,
                    please reach out. We’ll get back to you as soon as we can.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
                    <div className="surface" style={{ padding: "var(--space-6)", display: "flex", alignItems: "center", gap: "var(--space-4)", textAlign: "left" }}>
                        <div style={{ background: "var(--color-accent-soft)", padding: "var(--space-3)", borderRadius: "var(--radius-md)", color: "var(--color-accent)" }}>
                            <Mail size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: "var(--font-size-md)" }}>Email us</h3>
                            <p style={{ fontSize: "var(--font-size-sm)" }}>hello@findmyvenue.com</p>
                        </div>
                    </div>

                    <div className="surface" style={{ padding: "var(--space-6)", display: "flex", alignItems: "center", gap: "var(--space-4)", textAlign: "left" }}>
                        <div style={{ background: "#ecfdf5", padding: "var(--space-3)", borderRadius: "var(--radius-md)", color: "var(--color-success)" }}>
                            <Phone size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: "var(--font-size-md)" }}>Call my team</h3>
                            <p style={{ fontSize: "var(--font-size-sm)" }}>+91 999 000 1234</p>
                        </div>
                    </div>

                    <div className="surface" style={{ padding: "var(--space-6)", display: "flex", alignItems: "center", gap: "var(--space-4)", textAlign: "left" }}>
                        <div style={{ background: "#fff7ed", padding: "var(--space-3)", borderRadius: "var(--radius-md)", color: "#f97316" }}>
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: "var(--font-size-md)" }}>Our office</h3>
                            <p style={{ fontSize: "var(--font-size-sm)" }}>Vasant Vihar, New Delhi, India</p>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: "var(--space-12)" }}>
                    <Link href="/" className="btn btn-secondary">
                        Back to home
                    </Link>
                </div>
            </div>
        </main>
    );
}
