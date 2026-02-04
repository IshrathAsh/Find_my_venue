"use client";

import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import StandardPage from '../components/StandardPage';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const router = useRouter();

    const handleGoogleLogin = async () => {
        setLoading(true);
        setMessage(null);

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin
                }
            });

            if (error) throw error;
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message });
            setLoading(false);
        }
    };

    return (
        <StandardPage
            title="Account Access"
            content={
                <div style={{ maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
                            Join our community to save your favorite venues and track your bookings.
                        </p>
                    </div>

                    {message && (
                        <div style={{
                            padding: 'var(--space-4)',
                            borderRadius: 'var(--radius-md)',
                            background: '#fef2f2',
                            color: '#991b1b',
                            fontSize: 'var(--font-size-sm)',
                            border: '1px solid #fecaca',
                            marginBottom: 'var(--space-4)'
                        }}>
                            {message.text}
                        </div>
                    )}

                    <button
                        className="btn surface glass"
                        disabled={loading}
                        onClick={handleGoogleLogin}
                        style={{
                            width: '100%',
                            height: '56px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 'var(--space-4)',
                            fontSize: 'var(--font-size-md)',
                            fontWeight: '600',
                            border: '1px solid var(--color-border)',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.02)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>

                    <p style={{ textAlign: 'center', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-4)' }}>
                        By continuing, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            }
        />
    );
}
