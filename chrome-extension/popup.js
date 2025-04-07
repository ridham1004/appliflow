document.addEventListener('DOMContentLoaded', () => {
  // Function to simulate dynamic job analysis
  function simulateJobAnalysis() {
    const jobData = {
      title: "Frontend Developer",
      atsScore: "90/100",
      suggestions: [
        "Add React experience details.",
        "Include recent project links.",
        "Quantify achievements with numbers."
      ]
    };

    // Update job title and ATS score
    document.querySelector('#job-title span').textContent = jobData.title;
    document.querySelector('#ats-score span').textContent = jobData.atsScore;

    // Update suggestions list
    const suggestionsList = document.getElementById('suggestions-list');
    suggestionsList.innerHTML = ""; // Clear current suggestions
    jobData.suggestions.forEach(suggestion => {
      const li = document.createElement('li');
      li.textContent = suggestion;
      
      // Add a minimal copy button
      const copyBtn = document.createElement('button');
      copyBtn.classList.add('copy-btn');
      copyBtn.textContent = "Copy";
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(suggestion);
      });
      li.appendChild(copyBtn);
      
      suggestionsList.appendChild(li);
    });
  }

  // Set initial placeholder data
  document.querySelector('#job-title span').textContent = "Loading...";
  document.querySelector('#ats-score span').textContent = "--";

  // Simulate fetching dynamic data after 2 seconds
  setTimeout(simulateJobAnalysis, 2000);

  // Event listener for cover letter generation button
  document.getElementById('generate-cover-letter').addEventListener('click', () => {
    alert("Generating cover letter...");
  });
});
