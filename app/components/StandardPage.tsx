import React from "react";
import Link from "next/link";

interface StandardPageProps {
    title: string;
    content: React.ReactNode;
}

export default function StandardPage({ title, content }: StandardPageProps) {
    return (
        <main className="container" style={{ padding: "var(--space-16) var(--space-6)" }}>
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
                <h1 style={{ marginBottom: "var(--space-8)" }}>{title}</h1>
                <div style={{ color: "var(--color-text-secondary)", lineHeight: "1.8" }}>
                    {content}
                </div>
                <div style={{ marginTop: "var(--space-12)", borderTop: "1px solid var(--color-border)", paddingTop: "var(--space-6)" }}>
                    <Link href="/" style={{ color: "var(--color-accent)", fontSize: "var(--font-size-sm)" }}>
                        ← Return to home
                    </Link>
                </div>
            </div>
        </main>
    );
}
