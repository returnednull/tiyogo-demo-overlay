import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Dev-only preview of the overlay. Not part of the published package.
export default defineConfig({
  root: 'dev',
  plugins: [react()],
});
