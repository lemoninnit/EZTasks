import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/tokens.css';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

try {
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
} catch (err) {
  const div = document.createElement('div');
  div.style.padding = '24px';
  div.style.fontFamily = 'system-ui, sans-serif';
  div.style.color = '#b91c1c';
  div.innerText = `App failed to load: ${err?.message || err}`;
  document.getElementById('root').appendChild(div);
}

