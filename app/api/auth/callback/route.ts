import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/';

  if (code) {
    // Supabase needs to exchange the code for a session
    // But the client-side auth helper handles this automatically
    // just need to redirect to the intended page
    return NextResponse.redirect(`${origin}${next}`);
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
} 