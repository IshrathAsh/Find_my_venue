import React from "react";
import StandardPage from "../components/StandardPage";
import Reviews from "../components/Reviews";

export default function ReviewsPage() {
    return (
        <StandardPage
            title="Guest Reviews"
            content={
                <>
                    <p style={{ marginBottom: "var(--space-8)" }}>
                        Hear from the people who have celebrated their most precious moments at our curated venues.
                        We believe in honest feedback to help you make the clearest decision.
                    </p>
                    <Reviews layout="stack" />
                </>
            }
        />
    );
}
