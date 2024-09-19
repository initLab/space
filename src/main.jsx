import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter } from 'react-router-dom';

import './i18n.js';
import App from './App.jsx';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bootswatch/dist/materia/bootstrap.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
                <App />
            </BrowserRouter>
        </Provider>
    </StrictMode>,
);
