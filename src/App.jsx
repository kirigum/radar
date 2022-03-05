import React, { Suspense } from 'react';

import { Main } from './pages/Main/Main';
import { LoadingOutlined } from '@ant-design/icons';

import './services/i18n';


function App() {
  return (
    <Suspense fallback={<LoadingOutlined className="loader" />}>
      <Main />
    </Suspense>
  );
}

export default App;
