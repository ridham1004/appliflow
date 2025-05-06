// popup.js

const token = ''; // TODO: load JWT from chrome.storage
const resumeText = ''; // TODO: load stored resume text

// Utility to get current tab URL
async function getCurrentUrl() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab?.url || '';
}
// Show only one section
function showSection(id) {
  ['job-ui','docs-ui','fallback-ui'].forEach(sec => {
    document.getElementById(sec).hidden = (sec !== id);
  });
}
// DOM loaded
window.addEventListener('DOMContentLoaded', async () => {
  const url = await getCurrentUrl();
  if (url.includes('docs.google.com/document')) {
    showSection('docs-ui');
    renderDocsUI();
  } else if (url.includes('workday.com') || url.match(/job|careers/)) {
    showSection('job-ui');
    renderJobUI();
  } else {
    showSection('fallback-ui');
  }

  // Minimize (hide content, keep header)
  document.getElementById('btn-hide').onclick = () => {
    document.body.classList.toggle('minimized');
  };
  // Close (save state + exit)
  document.getElementById('btn-close').onclick = () => {
    const state = {
      ats: document.getElementById('ats-pill').textContent,
      experiences: document.getElementById('experiences').innerHTML
    };
    chrome.storage.local.set({ extensionState: state }, () => window.close());
  };
});

// JOB mode UI
async function renderJobUI() {
  const { description } = await new Promise(r =>
    chrome.runtime.sendMessage({ type: 'FETCH_JOB_DESC' }, r)
  );
  const aiResp = await new Promise(r =>
    chrome.runtime.sendMessage({
      type: 'CALL_AI', endpoint: 'ats', token,
      payload: { resumeText, jobDescription: description }
    }, r)
  );
  document.getElementById('ats-pill').textContent = `ATS: ${aiResp.data.score}`;
  const container = document.getElementById('experiences');
  container.innerHTML = '';
  aiResp.data.suggestions.forEach((bullet,i) => {
    const div = document.createElement('div');
    div.className = 'experience-item';
    div.innerHTML = `<h4>Work Experience ${i+1} <span class="regen" data-idx="${i}">⟳</span></h4><p>${bullet}</p>`;
    container.appendChild(div);
  });
  document.getElementById('btn-reset').onclick = () => container.innerHTML = '';
  document.getElementById('btn-save').onclick = () => alert('Save Job clicked (implement Drive copy)');
}

// DOCS mode UI
function renderDocsUI() {
  document.getElementById('btn-generate-impact').onclick = async () => {
    const { selection } = await new Promise(r =>
      chrome.tabs.sendMessage({ type: 'GET_SELECTION' }, r)
    );
    const resp = await new Promise(r =>
      chrome.runtime.sendMessage({
        type: 'CALL_AI', endpoint: 'impact', token,
        payload: { experienceText: selection, bulletsCount: 3 }
      }, r)
    );
    chrome.tabs.sendMessage({ type: 'INSERT_TEXT', text: resp.data.join('\n') });
  };

  document.getElementById('btn-generate-cover').onclick = async () => {
    const resp = await new Promise(r =>
      chrome.runtime.sendMessage({
        type: 'CALL_AI', endpoint: 'coverletter', token,
        payload: { resumeText, jobDescription: '', jobType: 'fulltime' }
      }, r)
    );
    chrome.tabs.sendMessage({ type: 'INSERT_TEXT', text: resp.data.coverLetter });
  };
}