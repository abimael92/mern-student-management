import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/students': 'http://localhost:5173',
    }
  }
});
