import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const Popup = () => {
  const [jobTitle, setJobTitle] = useState('');

  useEffect(() => {
    // Listener for messages from the content script
    const messageListener = (message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
      if (message.type === 'JOB_DATA') {
        setJobTitle(message.data.title);
      }
    };
    
    chrome.runtime.onMessage.addListener(messageListener);

    // Request job data from content script when popup opens
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && tabs[0].id) {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_JOB_DATA' });
        }
    });

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  return (
    <div>
      <h1>AppliFlow Helper</h1>
      <h3>Scraped Job Title:</h3>
      <p>{jobTitle || 'No job title found. Navigate to a job page.'}</p>
      <hr />
      <p><em>Resume matching coming soon...</em></p>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<Popup />); 