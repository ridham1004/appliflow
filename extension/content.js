console.log("AppliFlow content script loaded.");

function getJobData() {
  // For the MVP, we just use the document title.
  // A real implementation would use selectors for specific job boards.
  return {
    title: document.title
  };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_JOB_DATA') {
    const jobData = getJobData();
    // Send data back to the popup
    chrome.runtime.sendMessage({ type: 'JOB_DATA', data: jobData });
  }
}); 