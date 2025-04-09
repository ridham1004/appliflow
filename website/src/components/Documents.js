import React from 'react';

function Documents() {
  // Sample documents; in future, these might be pulled from Google Drive.
  const documents = [
    { id: 1, name: 'Resume_v1.docx' },
    { id: 2, name: 'CoverLetter_v1.docx' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Documents</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {documents.map(doc => (
          <li key={doc.id} style={{ padding: '10px', marginBottom: '5px', border: '1px solid #ddd', borderRadius: '4px' }}>
            {doc.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Documents;
