import { StrictMode } from 'react';
import {type Container, createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'react-oidc-context';

import { oidc as oidcConfig } from './config.ts';

import './i18n.ts';
import App from './App.tsx';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bootswatch/dist/materia/bootstrap.css';

createRoot(document.getElementById('root') as Container).render(
    <StrictMode>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <AuthProvider {...oidcConfig}>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
);
