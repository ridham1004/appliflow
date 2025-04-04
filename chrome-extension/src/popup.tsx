// popup.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'

const App = () => {
  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1>🚀 AppliFlow</h1>
      <p>Your AI-powered job app assistant</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('app')!).render(<App />)
