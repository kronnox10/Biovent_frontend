import { defineConfig } from 'vite';
import svelte from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  root: './my-app',  // Apunta al directorio donde está tu app.html y src/
  build: {
    rollupOptions: {
      input: './my-app/src/app.html',  // Especificamos el archivo HTML de entrada
    }
  }
});
