import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: "",  // make build relative
  server: {
    proxy: {
      '/files/': 'http://localhost:5000',
      '/auth/': 'http://localhost:5000',
      '/api/': 'http://localhost:5000',
    }
  }
});
