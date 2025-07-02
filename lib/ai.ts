/**
 * Mocks an AI scoring function.
 * In a real app, this would make an API call to a service like Cohere/Gemini.
 * @returns A promise that resolves to a mock score.
 */
export async function getMockATSScore(resumeText: string, jobDescription: string): Promise<{ score: number; feedback: string }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simple scoring logic based on text length (as a proxy for detail)
  const score = Math.min(100, Math.round((resumeText.length + jobDescription.length) / 20));

  return {
    score,
    feedback: "This is a mock score. The real AI would provide detailed feedback here."
  };
} 