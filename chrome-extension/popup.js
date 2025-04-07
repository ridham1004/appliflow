// popup.js - basic script for demonstration purposes

document.addEventListener('DOMContentLoaded', () => {
    // Example: Simulate loading a job title and ATS score
    document.querySelector('#job-title span').textContent = "Software Engineer";
    document.querySelector('#ats-score span').textContent = "85/100";
    
    // Populate suggestions (this would be replaced with real data)
    const suggestions = [
      "Include relevant keywords for ATS.",
      "Quantify your achievements with numbers.",
      "Use clear, concise bullet points."
    ];
    const suggestionsList = document.getElementById('suggestions-list');
    suggestions.forEach(suggestion => {
      const li = document.createElement('li');
      li.textContent = suggestion;
      
      // Add a smart copy icon for each suggestion
      const copyIcon = document.createElement('button');
      copyIcon.textContent = "Copy";
      copyIcon.style.marginLeft = "10px";
      copyIcon.addEventListener('click', () => {
        navigator.clipboard.writeText(suggestion);
      });
      li.appendChild(copyIcon);
      
      suggestionsList.appendChild(li);
    });
    
    // Event listener for cover letter generation button
    document.getElementById('generate-cover-letter').addEventListener('click', () => {
      // This is where you would call your Gemini AI API integration
      alert("Generating cover letter...");
    });
  });
  