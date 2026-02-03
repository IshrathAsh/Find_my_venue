import React from "react";
import StandardPage from "../components/StandardPage";

export default function PrivacyPage() {
    return (
        <StandardPage
            title="Privacy Policy"
            content={
                <>
                    <p>At Find My Venue, we value your trust and your privacy. As your "digital butler," we ensure that your personal information is handled with the utmost care and respect.</p>
                    <h3 style={{ marginTop: "var(--space-6)", color: "var(--color-text-primary)" }}>What we collect</h3>
                    <p>We only collect the information necessary to help you find and book a venue. This includes your name, contact details, and event preferences.</p>
                    <h3 style={{ marginTop: "var(--space-6)", color: "var(--color-text-primary)" }}>How we use it</h3>
                    <p>Your data is used solely to facilitate your search and booking process. We never sell your personal information to third-party marketing machines.</p>
                    <h3 style={{ marginTop: "var(--space-6)", color: "var(--color-text-primary)" }}>Your control</h3>
                    <p>You can request to view or delete your data at any time. No questions asked. We stay honest and transparent about everything we do.</p>
                </>
            }
        />
    );
}
