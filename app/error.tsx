"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main className="container" style={{ textAlign: "center", padding: "100px 20px" }}>
            <div style={{ display: "inline-flex", padding: "var(--space-4)", background: "#fdecea", borderRadius: "50%", marginBottom: "var(--space-6)" }}>
                <AlertCircle size={48} color="var(--color-error)" />
            </div>

            <h1>Something didn’t go through.</h1>
            <p style={{ maxWidth: "400px", margin: "var(--space-2) auto var(--space-6)" }}>
                No amount was deducted. Please try again or explore other venues while I look into this.
            </p>

            <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center" }}>
                <button onClick={() => reset()} className="btn btn-primary">
                    Try again
                </button>
                <Link href="/" className="btn btn-secondary">
                    Go back home
                </Link>
            </div>
        </main>
    );
}
