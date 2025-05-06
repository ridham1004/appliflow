// background.js

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'FETCH_JOB_DESC') {
      // Relay to content script to extract job description
      chrome.tabs.sendMessage(sender.tab.id, { type: 'GET_JOB_DESC' }, sendResponse);
      return true;
    }
  
    if (msg.type === 'CALL_AI') {
      fetch(`http://localhost:5000/api/ai/${msg.endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${msg.token}`
        },
        body: JSON.stringify(msg.payload)
      })
        .then(res => res.json().then(data => sendResponse({ data })))
        .catch(err => sendResponse({ error: err.message }));
      return true;
    }
  });