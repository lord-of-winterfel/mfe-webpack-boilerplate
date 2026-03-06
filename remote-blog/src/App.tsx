import React, { useEffect } from 'react';
import { ThemeProvider, useTheme } from 'mfe-react-component-library';
import { MFE_EVENTS, emitMfeEvent } from './events';
import './App.css';

const POSTS = [
  { id: '1', title: 'Getting started with Luna UI', excerpt: 'Learn how to use the design system.' },
  { id: '2', title: 'Micro frontends and Module Federation', excerpt: 'Share React and routing across remotes.' },
  { id: '3', title: 'Cross-MFE communication', excerpt: 'Using browser events for loose coupling.' },
];

function BlogContent() {
  const theme = useTheme();

  useEffect(() => {
    emitMfeEvent(MFE_EVENTS.BLOG_ACTION, { type: 'blog-viewed', payload: { at: new Date().toISOString() } });
  }, []);

  const goToLibrary = () => {
    emitMfeEvent(MFE_EVENTS.NAVIGATE, { path: '/' });
  };

  return (
    <div className="blog-app">
      <h1 className="blog-title">Blog</h1>
      <p className="blog-desc">
        Blog micro frontend. Communicates with Library via browser events.
      </p>
      <button
        type="button"
        className="blog-btn"
        onClick={goToLibrary}
        style={{
          backgroundColor: theme.colors.primary,
          color: theme.colors.onPrimary,
          borderRadius: theme.radius.md,
          padding: theme.spacing.sm + ' ' + theme.spacing.md,
          marginBottom: theme.spacing.xl,
        }}
      >
        Back to Library (via event)
      </button>
      <ul className="blog-list">
        {POSTS.map((post) => (
          <li key={post.id} className="blog-card" style={{ borderColor: theme.colors.border }}>
            <h2 className="blog-card-title" style={{ color: theme.colors.primary }}>
              {post.title}
            </h2>
            <p className="blog-card-excerpt" style={{ color: theme.colors.textMuted }}>
              {post.excerpt}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider mode="light">
      <BlogContent />
    </ThemeProvider>
  );
}

export default App;
