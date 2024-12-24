import { defineConfig } from 'vite';
import svelte from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  root: './frontend',  // Apunta al directorio correcto si tienes subdirectorios
});
