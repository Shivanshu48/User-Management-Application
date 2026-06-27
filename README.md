# User Management Application

A Vite + React demo application for viewing, creating, editing, and deleting user profiles.

## Live demo

Open the deployed app here:

- https://synergylabs-user.netlify.app/

## Deployment

This project is deployed on Netlify.

## Project setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app in your browser at:

```bash
http://localhost:5173/
```

## Important note

Do not use VS Code Live Server / `Go Live` for this project.
This application depends on Vite to compile JSX/ES modules and serve the React app correctly.

## Available scripts

- `npm run dev` - start the Vite development server
- `npm run build` - build production assets
- `npm run preview` - preview the production build locally

## Project structure

- `index.html` — app entry point
- `src/main.jsx` — React app bootstrap
- `src/App.jsx` — application shell and router setup
- `src/routes.jsx` — route definitions
- `src/pages/` — page components
- `src/components/` — shared UI components
- `src/services/` — API utilities
- `src/styles/` — global styles

## Troubleshooting

- If the page is blank, make sure you are using the Vite server at `http://localhost:5173/`.
- If you open `index.html` directly in the browser, the app will not work because the React source needs to be served and transformed by Vite.
