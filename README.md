# Luna UI – Micro Frontend Portal

Portal built with **Webpack Module Federation**, React, and TypeScript. No Vite.

## Structure

- **shell** – Host app (Luna UI). Default route: **Library**; also has **Blog** route.
- **remote-library** – Library micro frontend (default route).
- **remote-blog** – Blog micro frontend.

All apps use **mfe-react-component-library** for design tokens and styling (`ThemeProvider`, CSS variables like `var(--mfe-color-primary)`).

## Cross-MFE communication

Remotes talk to each other and to the shell via **browser events** (e.g. `luna-ui:navigate`, `luna-ui:blog:action`). The shell listens for `luna-ui:navigate` and updates React Router so remotes can trigger navigation without coupling to the shell’s router.

## Scripts

From the repo root:

```bash
# Install all dependencies (workspaces)
npm install

# Run shell + both remotes (concurrently)
npm start
```

Then open **http://localhost:3000**. The shell loads remotes from:

- Library: http://localhost:3001/remoteEntry.js  
- Blog: http://localhost:3002/remoteEntry.js  

Run individually:

```bash
npm run start:shell     # http://localhost:3000
npm run start:library   # http://localhost:3001
npm run start:blog      # http://localhost:3002
```

Build:

```bash
npm run build           # all
npm run build:shell
npm run build:library
npm run build:blog
```

## Tech

- React 18, TypeScript, Webpack 5
- Module Federation (shell consumes remotes)
- React Router in shell; default route `/` and `/library` → Library, `/blog` → Blog
- Shared: `react`, `react-dom`, `react-router-dom`, `mfe-react-component-library`
