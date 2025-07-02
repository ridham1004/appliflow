"use client";
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const handleSignIn = async () => {
    const redirectUrl = `${window.location.origin}/dashboard`;
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: redirectUrl } });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <button
        onClick={handleSignIn}
        style={{ padding: '1rem 2rem', fontSize: '1.2rem', borderRadius: 8, background: '#4285F4', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        Sign in with Google
      </button>
    </div>
  );
} 