import React, { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from 'mfe-react-component-library';
import { MFE_EVENTS, onMfeEvent, emitMfeEvent } from './events';
import './App.css';

function LibraryContent() {
  const theme = useTheme();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onMfeEvent<{ type: string; payload?: unknown }>(
      MFE_EVENTS.BLOG_ACTION,
      (e) => setMessage(`Received from Blog: ${JSON.stringify(e.detail)}`)
    );
    return unsub;
  }, []);

  const goToBlog = () => {
    emitMfeEvent(MFE_EVENTS.NAVIGATE, { path: '/blog' });
  };

  return (
    <div className="library-app">
      <h1 className="library-title">Library</h1>
      <p className="library-desc">
        Component library and design tokens. Default route for Luna UI.
      </p>
      <div className="library-actions">
        <button
          type="button"
          className="library-btn"
          onClick={goToBlog}
          style={{
            backgroundColor: theme.colors.primary,
            color: theme.colors.onPrimary,
            borderRadius: theme.radius.md,
            padding: theme.spacing.sm + ' ' + theme.spacing.md,
          }}
        >
          Navigate to Blog (via event)
        </button>
      </div>
      {message && (
        <div className="library-message" style={{ borderColor: theme.colors.border }}>
          {message}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider mode="light">
      <LibraryContent />
    </ThemeProvider>
  );
}

export default App;
