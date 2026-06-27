import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/global.css';

// This is the starting point of the app.
// React mounts the whole interface into the div with id="root".
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter lets the app use URL-based navigation like /create and /edit/1 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
