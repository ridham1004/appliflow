// src/api.js
export const API_URL = 'http://localhost:5000/api';

/**
 * Log in and return the JWT token.
 */
export async function login({ email, password }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Invalid credentials');
  const { token } = await res.json();
  return token;
}

/**
 * Fetch the current user's profile.
 */
export async function fetchMe(token) {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Not authenticated');
  return res.json();
}

/**
 * Fetch all jobs for the current user.
 */
export async function fetchJobs(token) {
  const res = await fetch(`${API_URL}/jobs`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return res.json();
}

/**
 * Create a new job.
 */
export async function createJob(token, jobData) {
    const res = await fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(jobData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.msg || 'Failed to create job');
    }
    return res.json();
  }