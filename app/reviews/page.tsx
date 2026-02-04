import React from "react";
import StandardPage from "../components/StandardPage";
import Reviews from "../components/Reviews";

export default function ReviewsPage() {
    return (
        <StandardPage
            title="Guest Reviews"
            maxWidth="1200px"
            content={
                <div style={{ marginTop: "var(--space-8)" }}>
                    <p style={{
                        textAlign: 'center',
                        color: 'var(--color-text-secondary)',
                        maxWidth: '700px',
                        margin: '0 auto var(--space-12) auto',
                        fontSize: 'var(--font-size-md)'
                    }}>
                        Hear from the people who have celebrated their most precious moments at our curated venues.
                        We believe in honest feedback to help you make the clearest decision.
                    </p>
                    <div style={{ background: "rgba(0,0,0,0.02)", padding: "var(--space-12) 0" }}>
                        <Reviews layout="grid" showTitle={false} />
                    </div>
                </div>
            }
        />
    );
}
