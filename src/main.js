import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';

ReactDOM.render(
  // react严格模式主要用于识别不安全的生命周期及一些副作用检测
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);