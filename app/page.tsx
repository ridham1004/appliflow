"use client";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const { user } = useUser();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>Hello AppliFlow</h1>
      <div>
        {user ? (
          <>
            <p>Signed in as: <b>{user.email}</b></p>
            <button onClick={handleSignOut} style={{ marginTop: 16, padding: "0.5rem 1rem" }}>
              Sign Out
            </button>
          </>
        ) : (
          <p>Not signed in</p>
        )}
      </div>
    </div>
  );
}
