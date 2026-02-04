import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import FloatingNavbar from "./components/FloatingNavbar";
import { AuthProvider } from "./components/AuthProvider";

export const metadata: Metadata = {
    title: "Find My Venue | Calm & Trusted Venue Discovery",
    description: "We'll help you find the perfect venue for your next occasion. No surprises, just calm discovery.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
            </head>
            <body style={{
                backgroundImage: "radial-gradient(circle at top right, var(--color-accent-soft), transparent 400px), radial-gradient(circle at bottom left, var(--color-accent-soft), transparent 400px)",
                backgroundAttachment: "fixed",
                minHeight: "100vh",
                position: "relative"
            }}>
                <AuthProvider>
                    <FloatingNavbar />

                    {/* Spacer for floating navbar */}
                    <div style={{ height: "120px" }}></div>

                    {children}

                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
