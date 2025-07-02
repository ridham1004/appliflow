"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import ResumeUploader from "@/components/ResumeUploader";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <h1>Dashboard (protected)</h1>
      <ResumeUploader />
    </ProtectedRoute>
  );
} 