import * as React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import './i18n';
import App from './App';
import { initMocks } from './test/server';

initMocks().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
