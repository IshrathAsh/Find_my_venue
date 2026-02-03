import React from "react";
import StandardPage from "../components/StandardPage";

export default function TermsPage() {
    return (
        <StandardPage
            title="Terms of Service"
            content={
                <>
                    <p>By using Find My Venue, you agree to our simple and honest terms. We aim to keep things clear and reduced in jargon.</p>
                    <h3 style={{ marginTop: "var(--space-6)", color: "var(--color-text-primary)" }}>Our commitment</h3>
                    <p>We provide a platform to help you discover venues. We strive for accuracy and transparency in all venue listings.</p>
                    <h3 style={{ marginTop: "var(--space-6)", color: "var(--color-text-primary)" }}>Your responsibility</h3>
                    <p>We ask that you provide accurate information when requesting availability or booking. Respect the house rules of the venues you visit.</p>
                    <h3 style={{ marginTop: "var(--space-6)", color: "var(--color-text-primary)" }}>Cancellations</h3>
                    <p>Each venue has its own cancellation policy, which we will clearly outline before you confirm your booking. No surprises.</p>
                </>
            }
        />
    );
}
