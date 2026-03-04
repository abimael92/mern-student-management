import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App';
import { store } from './store/store';
import theme from './styles/theme';
import AuthLoader from './components/common/AuthLoader'; // Import the loader

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthLoader>
          {' '}
          {/* Wrap App with AuthLoader */}
          <App />
        </AuthLoader>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
