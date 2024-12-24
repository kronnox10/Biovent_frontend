import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
  
export default defineConfig({
  plugins: [svelte()],
  root: './my-app',  // Apunta al directorio de tu aplicación
  build: {
    rollupOptions: {
      input: './src/app.html' // Especifica tu archivo de entrada aquí
    }
  }
});


