import { defineConfig } from 'vite';
import svelte from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  root: './my-app',  // Asegúrate de que esté apuntando al directorio correcto
  build: {
    rollupOptions: {
      input: './my-app/src/app.html'  // Ajusta la ruta a tu archivo HTML
    }
  }
});
