import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TiyogoOverlay, addNote } from '../src';

function App() {
  return (
    <main
      style={{
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
        fontFamily: 'system-ui, sans-serif',
        color: '#9ca3af',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 13, letterSpacing: '.04em' }}>
          blank page — hover & click the badge ↘
        </p>
        <button
          onClick={() => addNote('Payment & auth are mocked for this demo')}
          style={{
            marginTop: 16,
            padding: '8px 14px',
            border: '1px solid #ddd',
            borderRadius: 8,
            background: '#fff',
            cursor: 'pointer',
            fontSize: 12,
          }}
        >
          + add a note
        </button>
      </div>

      <TiyogoOverlay
        position="bottom-right"
        firstPublished="24 May 2026"
        lastUpdated="25 May 2026"
        description="A live preview built for your team. Explore freely — nothing here is wired to production."
      />
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
