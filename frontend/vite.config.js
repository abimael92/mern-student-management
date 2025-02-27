import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Allow Vite to be accessible from the network
    proxy: {
      '/students': 'http://localhost:5000',
    }
  }
});
