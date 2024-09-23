import React from 'react';
import { createRoot } from 'react-dom/client';  // Import createRoot instead of ReactDOM.render
import App from './App';

// Find the root element in your index.html
const container = document.getElementById('root');
const root = createRoot(container);  // Create a root using createRoot

// Render your App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
