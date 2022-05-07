import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bootswatch/dist/materia/bootstrap.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
