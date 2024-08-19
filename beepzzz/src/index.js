import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css'; // Make sure the CSS file exists and the path is correct
import App from './App';
import reportWebVitals from './reportWebVitals';

// Ensure the 'root' element is present in your HTML file
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element. Please check your HTML file.');
}

// Report web vitals if needed
reportWebVitals();
