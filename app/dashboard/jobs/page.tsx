"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/context/UserContext";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  source_url: string;
}

const JobForm = ({ onJobAdded, jobToEdit, setJobToEdit }: { onJobAdded: () => void; jobToEdit: Job | null; setJobToEdit: (job: Job | null) => void; }) => {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");

  useEffect(() => {
    if (jobToEdit) {
      setTitle(jobToEdit.title);
      setCompany(jobToEdit.company);
      setDescription(jobToEdit.description);
      setSourceUrl(jobToEdit.source_url);
    } else {
      clearForm();
    }
  }, [jobToEdit]);

  const clearForm = () => {
    setTitle("");
    setCompany("");
    setDescription("");
    setSourceUrl("");
    setJobToEdit(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !title || !company) return;

    const jobData = { user_id: user.id, title, company, description, source_url: sourceUrl };

    if (jobToEdit) {
      // Update existing job
      const { error } = await supabase.from("jobs").update(jobData).eq("id", jobToEdit.id);
      if (error) alert("Error updating job: " + error.message);
    } else {
      // Insert new job
      const { error } = await supabase.from("jobs").insert([jobData]);
      if (error) alert("Error adding job: " + error.message);
    }
    
    clearForm();
    onJobAdded();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
      <h3>{jobToEdit ? "Edit Job" : "Add New Job"}</h3>
      <input type="text" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="url" placeholder="Job Post URL" value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} />
      <div style={{display: 'flex', gap: '1rem'}}>
        <button type="submit">{jobToEdit ? "Update Job" : "Add Job"}</button>
        {jobToEdit && <button type="button" onClick={clearForm}>Cancel Edit</button>}
      </div>
    </form>
  );
};


export default function JobsPage() {
  const { user } = useUser();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobToEdit, setJobToEdit] = useState<Job | null>(null);

  const fetchJobs = async () => {
    if (!user) return;
    const { data, error } = await supabase.from("jobs").select("*").eq("user_id", user.id);
    if (data) setJobs(data);
  };

  const deleteJob = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await supabase.from("jobs").delete().eq("id", id);
    fetchJobs();
  };
  
  useEffect(() => {
    if (user) fetchJobs();
  }, [user]);

  return (
    <ProtectedRoute>
      <div style={{ padding: 32 }}>
        <h1>Job Tracker</h1>
        <JobForm onJobAdded={fetchJobs} jobToEdit={jobToEdit} setJobToEdit={setJobToEdit} />
        <hr />
        <h2>Your Jobs</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {jobs.map((job) => (
            <li key={job.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
              <h4>{job.title} at {job.company}</h4>
              <p>{job.description}</p>
              <a href={job.source_url} target="_blank">View Job Post</a>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                <button onClick={() => setJobToEdit(job)}>Edit</button>
                <button onClick={() => deleteJob(job.id)} style={{background: 'red', color: 'white'}}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  );
} 