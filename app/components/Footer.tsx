import React from "react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer style={{ background: "#fff", borderTop: "1px solid var(--color-border)", padding: "var(--space-8) 0", marginTop: "var(--space-8)" }}>
            <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "var(--space-8)" }}>
                <div>
                    <Link href="/">
                        <div style={{ height: "40px", marginBottom: "var(--space-4)", display: "flex", alignItems: "center" }}>
                            <img src="/newlogo.png" alt="Find My Venue" style={{ height: "100%", width: "auto" }} />
                        </div>
                    </Link>
                    <p style={{ maxWidth: "250px" }}>
                        The easiest way to find your next event space. Like a trusted butler, we anticipate your needs.
                    </p>
                </div>
                <div className="grid grid-3">
                    <div>
                        <h4 style={{ fontSize: "var(--font-size-sm)", marginBottom: "var(--space-3)" }}>Company</h4>
                        <ul style={{ listStyle: "none", padding: 0, fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)" }}>
                            <li style={{ marginBottom: "var(--space-2)" }}><Link href="/about">About Us</Link></li>
                            <li style={{ marginBottom: "var(--space-2)" }}><Link href="/contact">Contact</Link></li>
                            <li style={{ marginBottom: "var(--space-2)" }}><Link href="/careers">Careers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: "var(--font-size-sm)", marginBottom: "var(--space-3)" }}>Support</h4>
                        <ul style={{ listStyle: "none", padding: 0, fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)" }}>
                            <li style={{ marginBottom: "var(--space-2)" }}><Link href="/contact">Help Center</Link></li>
                            <li style={{ marginBottom: "var(--space-2)" }}><Link href="/about">Safety</Link></li>
                            <li style={{ marginBottom: "var(--space-2)" }}><Link href="/terms">Cancellation</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: "var(--font-size-sm)", marginBottom: "var(--space-3)" }}>Legal</h4>
                        <ul style={{ listStyle: "none", padding: 0, fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)" }}>
                            <li style={{ marginBottom: "var(--space-2)" }}><Link href="/privacy">Privacy Policy</Link></li>
                            <li style={{ marginBottom: "var(--space-2)" }}><Link href="/terms">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container" style={{ marginTop: "var(--space-8)", textAlign: "center", borderTop: "1px solid var(--color-border)", paddingTop: "var(--space-4)" }}>
                <p style={{ fontSize: "var(--font-size-xs)" }}>© 2024 Find My Venue. All rights reserved.</p>
            </div>
        </footer>
    );
}
