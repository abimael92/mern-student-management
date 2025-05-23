import React from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

// const root = ReactDOM.createRoot(document.getElementById('root'));
const domNode = document.getElementById('root');
const root = createRoot(domNode);

// Rendering the app wrapped with Redux Provider
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
