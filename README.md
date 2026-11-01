# SmilyAi

**SmilyAi** is a full-stack web application built with modern web technologies, combining a React 19 frontend with an Express 5 backend. The application features a polished glass-fold UI effect, lazy-loaded pages, and a proxy configuration for seamless front-end/back-end communication during development.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Build & Production](#build--production)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Configuration](#configuration)
- [License](#license)

## 🚀 Project Overview

SmilyAi is a responsive single-page application (SPA) that features:

- **GlassFold UI** – A visually striking glass-fold effect wrapper around the entire application
- **React Router 8** – Client-side routing with lazy-loaded code splitting
- **Tailwind CSS 4** – Utility-first styling with custom color variables
- **Express 5 API** – Backend endpoints for authentication and interactions
- **Vite 8** – Fast development server with hot module replacement and production builds

The frontend proxies `/api` requests to the Express development server, enabling a smooth development workflow.

## ⚙️ Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)
- [Git](https://git-scm.com/)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sam78Svg/SmilyAi.git
   cd SmilyAi
   ```

2. **Install dependencies**

   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   cd ClientSide && npm install

   # Install backend dependencies
   cd ../ServerSide && npm install
   ```

3. **Environment variables**

   The project uses a `.env` file for configuration. Create the necessary environment files:

   - **Root `.env`** (optional): Set `PORT` and other global variables.
   - **`ServerSide/.env`**: Configure the Express server port and any API keys.
   - **`ClientSide/.env`**: If needed, configure Vite-specific environment variables (prefixed with `VITE_`).

   Example `.env` files are not provided – copy the structure from the project and add your values.

## 💻 Development

### Running the Development Server

Start the Vite development server (which proxies `/api` to `http://localhost:5000`):

```bash
npm run dev
```

This will start Vite at `http://localhost:5173` (default) with the following features:

- Hot Module Replacement (HMR)
- Proxy: `/api` → `http://localhost:5000`
- Tailwind CSS JIT compilation
- React Fast Refresh

### Running the Backend Server (Separate Terminal)

If you need to run the Express server independently:

```bash
npm run devserver
```

This starts `node --watch ServerSide/server.ts` on port 5000 (or the value of `PORT` env var).

### Running Both Together

The recommended workflow is to have both running:

1. Terminal 1: `npm run dev` (Vite + frontend)
2. Terminal 2: `npm run devserver` (Express backend)

The Vite dev server will automatically proxy `/api` requests to the Express server.

## 🏗️ Build & Production

### Production Build

```bash
npm run build
```

This command:

1. Runs `tsc -b` to compile TypeScript
2. Runs `vite build` to create the optimized production build in `dist/`

The output is placed in the `dist/` directory and is ready for deployment.

### Preview Production Build

```bash
npm run preview
```

Starts a local static server to preview the production build at `http://localhost:4173`.

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `dev` | Starts the Vite development server |
| `build` | Compiles TypeScript and builds the production bundle |
| `preview` | Serves the production build locally |
| `server` | Starts the Express server ( `node ServerSide/server.ts`) |
| `devserver` | Starts the Express server with watch mode (`node --watch`) |
| `lint` | Runs ESLint to check for code quality issues |

## 📁 Project Structure

```
SmilyAi/
├── ClientSide/          # Frontend React application
│   ├── components/      # React components
│   │   ├── About.tsx
│   │   ├── Background.tsx
│   │   ├── ChatInterFace.tsx
│   │   ├── Documentation.tsx
│   │   ├── FooterSection.tsx
│   │   ├── Home.tsx
│   │   ├── Navigationbar.tsx
│   │   └── Support.tsx
│   ├── styles/          # Additional stylesheets
│   │   └── animation.css
│   ├── App.tsx          # Root component with routing
│   ├── App.css          # App-level styles
│   ├── index.css        # Global styles
│   ├── main.tsx         # Entry point
│   └── index.html       # HTML template
├── ServerSide/          # Backend Express server
│   ├── server.ts        # Main server entry point
│   └── src/             # Route handlers
│       ├── Routes/
│       │   ├── authRoutes.ts
│       │   └── interactionRoutes.ts
├── package.json         # Root package.json with scripts & dependencies
├── vite.config.ts       # Vite configuration (proxy, plugins, build opts)
├── tsconfig.json        # TypeScript project references
├── tsconfig.app.json    # TypeScript config for app code
├── tsconfig.node.json   # TypeScript config for Node.js
├── eslint.config.js     # ESLint configuration
├── .env                 # Environment variables
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

### Key Files Explained

- **`vite.config.ts`** – Configures React plugin, Tailwind CSS, dev server proxy (`/api` → `localhost:5000`), and manual chunk splitting for vendor dependencies.
- **`ServerSide/server.ts`** – Express app with CORS, JSON body parsing, and routes for `/api/auth` and `/api/interactions`.
- **`ClientSide/App.tsx`** – Root component using `react-router-dom` v8 with lazy-loaded page components and a `GlassFold` UI wrapper.
- **`ClientSide/components/`** – Reusable UI components: `Navigationbar`, `FooterSection`, `Background` (GlassFold), `ChatInterFace`, `About`, `Home`, `Support`, `Documentation`.

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 19, React Router 8, Vite 8, Tailwind CSS 4, TypeScript |
| **Backend** | Node.js, Express 5, CORS middleware |
| **Styling** | Tailwind CSS 4 (JIT mode), custom CSS variables |
| **Build Tools** | Vite, TypeScript, ESLint |
| **Routing** | React Router 8 (browser & memory histories) |

## ⚙️ Configuration

### Vite Configuration (`vite.config.ts`)

Key settings:

- **Plugins**: `@vitejs/plugin-react`, `@tailwindcss/vite`
- **Dev Server**: `watch.usePolling: true` (for some filesystem setups)
- **Proxy**: `/api` → `http://localhost:5000` (useful for front-end development without CORS headaches)
- **Build**: `target: 'es2020'`, `cssMinify: true`, manual chunk splitting for `node_modules` dependencies

### Express Server (`ServerSide/server.ts`)

- Listens on `PORT` env var (defaults to `5000`)
- Enables CORS globally
- Parses JSON bodies
- Mounts route handlers at `/api/auth` and `/api/interactions`
- Provides a health-check endpoint at `GET /`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Vite dev server won't start | Ensure port 5173 is not in use; check `vite.config.ts` proxy settings |
| API requests fail | Verify Express server is running on port 5000; check CORS configuration |
| TypeScript build errors | Run `tsc -b` to see detailed type errors; ensure all dependencies are installed |
| Tailwind styles not applying | Confirm `@tailwindcss/vite` plugin is installed and configured in `vite.config.ts` |

## 🚀 Deployment

### Frontend (Static Hosting)

Build the project:

```bash
npm run build
```

Deploy the contents of the `dist/` directory to any static hosting provider (Vercel, Netlify, GitHub Pages, etc.).

### Backend (Node.js Hosting)

Deploy `ServerSide/server.ts` to a Node.js hosting provider (Render, Railway, Heroku, AWS, etc.). Set the `PORT` environment variable and ensure the frontend proxy points to your production API URL.

## 📄 License

This project is **private** and source code is not publicly licensed. All rights reserved.

---

*Generated with ❤️ by Copilot SDK in VS Code*