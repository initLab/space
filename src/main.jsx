import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './app/store';
import {BrowserRouter} from 'react-router-dom';

import './i18n';
import './mqtt';
import App from './App';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bootswatch/dist/materia/bootstrap.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
);
