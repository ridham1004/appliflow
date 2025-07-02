"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/context/UserContext";
import ResumeUploader from "@/components/ResumeUploader";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Resume {
  id: string;
  file_url: string;
  created_at: string;
}

export default function ResumesPage() {
  const { user } = useUser();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchResumes();
    }
  }, [user]);

  const fetchResumes = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("resumes")
      .select("id, file_url, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      setError("Failed to fetch resumes: " + error.message);
    } else {
      setResumes(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (resumeId: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;
    
    // First, delete the record from the database
    const { error: dbError } = await supabase
      .from("resumes")
      .delete()
      .eq("id", resumeId);

    if (dbError) {
      alert("Failed to delete resume: " + dbError.message);
      return;
    }
    
    // Optionally, delete from storage - for now, we'll just orphan it for simplicity
    // This can be improved with edge functions later

    // Refresh the list
    fetchResumes();
  };

  return (
    <ProtectedRoute>
      <div style={{ padding: 32 }}>
        <h1>Manage Resumes</h1>
        <ResumeUploader onUploadSuccess={fetchResumes} />
        <hr style={{ margin: "2rem 0" }} />
        <h2>Your Uploaded Resumes</h2>
        {loading && <p>Loading resumes...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {resumes.map((resume) => (
            <li key={resume.id} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
              <a href={resume.file_url} target="_blank" rel="noopener noreferrer">
                Resume from {new Date(resume.created_at).toLocaleString()}
              </a>
              <button onClick={() => handleDelete(resume.id)} style={{ background: "red", color: "white" }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  );
} 