"use client";
import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/context/UserContext";

export default function ResumeUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();
  const [status, setStatus] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setStatus("You must be signed in to upload.");
      return;
    }
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setStatus("Please select a file.");
      return;
    }
    setUploading(true);
    setStatus(null);
    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}/${Date.now()}.${fileExt}`;
    // Upload to storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from("resumes")
      .upload(filePath, file);
    if (storageError) {
      setStatus("Upload failed: " + storageError.message);
      setUploading(false);
      return;
    }
    // Get public URL
    const { data: publicUrlData } = supabase.storage.from("resumes").getPublicUrl(filePath);
    const fileUrl = publicUrlData?.publicUrl || "";
    // Insert into DB
    const { error: dbError } = await supabase.from("resumes").insert([
      {
        user_id: user.id,
        file_url: fileUrl,
      },
    ]);
    if (dbError) {
      setStatus("DB insert failed: " + dbError.message);
    } else {
      setStatus("Upload successful!");
    }
    setUploading(false);
  };

  return (
    <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
      <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" />
      <button type="submit" disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Resume"}
      </button>
      {status && <div>{status}</div>}
    </form>
  );
} 