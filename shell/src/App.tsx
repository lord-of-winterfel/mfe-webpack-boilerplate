import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'mfe-react-component-library';
import { MFE_EVENTS, onMfeEvent } from './events';
import './App.css';

const LibraryApp = lazy(() => import('remoteLibrary/LibraryApp'));
const BlogApp = lazy(() => import('remoteBlog/BlogApp'));

function Nav() {
  const location = useLocation();
  const isLibrary = location.pathname === '/' || location.pathname === '/library';
  const isBlog = location.pathname === '/blog';

  return (
    <nav className="shell-nav">
      <div className="shell-nav-inner">
        <Link to="/" className="shell-brand">
          Luna UI
        </Link>
        <div className="shell-links">
          <Link
            to="/"
            className={`shell-link ${isLibrary ? 'active' : ''}`}
          >
            Library
          </Link>
          <Link
            to="/blog"
            className={`shell-link ${isBlog ? 'active' : ''}`}
          >
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
}

function ShellRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onMfeEvent('NAVIGATE', (e) => {
      const path = (e.detail as { path: string }).path;
      if (path) navigate(path);
    });
    return unsub;
  }, [navigate]);

  return (
    <Suspense fallback={<div className="shell-loading">Loading...</div>}>
      <Routes>
        <Route path="/" element={<LibraryApp />} />
        <Route path="/library" element={<LibraryApp />} />
        <Route path="/blog" element={<BlogApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <ThemeProvider mode="light">
      <BrowserRouter>
        <div className="shell-layout">
          <Nav />
          <main className="shell-main">
            <ShellRoutes />
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
