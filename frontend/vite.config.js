export default defineConfig({
  server: {
    proxy: {
      '/students': 'http://localhost:5000',
    },
  },
});
