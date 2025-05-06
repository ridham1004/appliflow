// contentScript.js

chrome.runtime.onMessage.addListener((msg, sender, respond) => {
    if (msg.type === 'GET_JOB_DESC') {
      // Adjust selector to your target site's job-description container
      const el = document.querySelector('.job-description') || document.body;
      respond({ description: el.innerText.trim() });
    }
    if (msg.type === 'GET_SELECTION') {
      respond({ selection: window.getSelection().toString() });
    }
    if (msg.type === 'INSERT_TEXT') {
      const sel = window.getSelection();
      if (!sel.rangeCount) return;
      sel.deleteFromDocument();
      sel.getRangeAt(0).insertNode(document.createTextNode(msg.text));
      respond({ ok: true });
    }
  });