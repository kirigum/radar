import React from 'react';
import ReactDOM from 'react-dom';

// import { Main } from './pages/Main/Main';
import App from './App';

import 'antd/dist/antd.min.css';
import './index.css';

import './services/i18n';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
