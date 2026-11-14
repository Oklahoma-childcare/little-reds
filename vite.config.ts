import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'node:url';
const local = (file: string) => fileURLToPath(new URL(file, import.meta.url));
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': local('./src') } },
  build: {
    rollupOptions: {
      input: {
        home: local('./index.html'),
        programs: local('./programs/index.html'),
        about: local('./about/index.html'),
        faq: local('./faq/index.html'),
        contact: local('./contact/index.html')
      }
    }
  }
});
