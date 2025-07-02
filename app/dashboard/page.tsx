"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/"); // Redirect to home page after sign out
  };

  return (
    <ProtectedRoute>
      <div style={{ padding: 32 }}>
        <h1>Welcome to your Dashboard, {user?.email}</h1>
        <p>Manage your job applications, resumes, and more.</p>
        <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", alignItems: "center" }}>
          <Link href="/dashboard/resumes">
            <button>Manage Resumes</button>
          </Link>
          <Link href="/dashboard/jobs">
            <button>Job Tracker</button>
          </Link>
          <button onClick={handleSignOut} style={{ marginLeft: "auto" }}>
            Sign Out
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
} 