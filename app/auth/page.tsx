"use client";

import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import StandardPage from '../components/StandardPage';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const router = useRouter();

    const handleAuth = async (isSignUp: boolean) => {
        setLoading(true);
        setMessage(null);

        try {
            const { error } = isSignUp
                ? await supabase.auth.signUp({ email, password })
                : await supabase.auth.signInWithPassword({ email, password });

            if (error) throw error;

            if (isSignUp) {
                setMessage({ type: 'success', text: 'Check your email for the confirmation link!' });
            } else {
                router.push('/');
            }
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <StandardPage
            title="Account Access"
            content={
                <div style={{ maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                    <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                        Sign in to save your favorite venues and track your bookings.
                    </p>

                    {message && (
                        <div style={{
                            padding: 'var(--space-4)',
                            borderRadius: 'var(--radius-md)',
                            background: message.type === 'success' ? '#ecfdf5' : '#fef2f2',
                            color: message.type === 'success' ? '#065f46' : '#991b1b',
                            fontSize: 'var(--font-size-sm)',
                            border: `1px solid ${message.type === 'success' ? '#a7f3d0' : '#fecaca'}`
                        }}>
                            {message.text}
                        </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)' }}>Email Address</label>
                            <input
                                type="email"
                                className="input"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                            <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)' }}>Password</label>
                            <input
                                type="password"
                                className="input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                        <button
                            className="btn btn-primary"
                            disabled={loading}
                            onClick={() => handleAuth(false)}
                            style={{ width: '100%', height: '48px' }}
                        >
                            {loading ? 'Processing...' : 'Sign In'}
                        </button>
                        <button
                            className="btn"
                            disabled={loading}
                            onClick={() => handleAuth(true)}
                            style={{
                                width: '100%',
                                height: '48px',
                                background: 'transparent',
                                border: '1px solid var(--color-border)'
                            }}
                        >
                            Create New Account
                        </button>
                    </div>
                </div>
            }
        />
    );
}
