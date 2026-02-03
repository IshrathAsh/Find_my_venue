import React from "react";
import StandardPage from "../components/StandardPage";

export default function CareersPage() {
    return (
        <StandardPage
            title="Careers"
            content={
                <>
                    <p>We are always looking for people who believe in calm discovery and helpful service. If you're a designer, developer, or event expert who values clarity over noise, we'd love to hear from you.</p>
                    <h3 style={{ marginTop: "var(--space-6)", color: "var(--color-text-primary)" }}>Our values</h3>
                    <p>Reduce anxiety. Increase clarity. Stay honest. These aren't just for our users—they're for our team too.</p>
                    <h3 style={{ marginTop: "var(--space-6)", color: "var(--color-text-primary)" }}>Current openings</h3>
                    <p>We are currently growing our venue partnership and design teams. Please reach out to careers@findmyvenue.com with your portfolio or thoughts.</p>
                </>
            }
        />
    );
}
