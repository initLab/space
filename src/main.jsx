import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'react-oidc-context';

import { oidc as oidcConfig } from './config.js';

import './i18n.js';
import App from './App.jsx';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bootswatch/dist/materia/bootstrap.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <AuthProvider {...oidcConfig}>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
);
