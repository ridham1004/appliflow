"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user === null) {
      router.replace("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) return null;
  if (!user) return null;
  return <>{children}</>;
} 