import {StrictMode} from 'react';
import {render} from "react-dom";
import {Provider} from 'react-redux';
import {store} from './app/store';
import {BrowserRouter} from 'react-router-dom';

import './i18n';
import App from './App';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bootswatch/dist/materia/bootstrap.css';
import './index.css';

render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
    document.getElementById('root')
);
