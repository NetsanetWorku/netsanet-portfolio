import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Determine base at build time. Use `VITE_BASE` env var when set,
// otherwise default to '/' for dev and to '/netsanet-portfolio/' in production.
const getBase = () => {
  if (process.env.VITE_BASE) return process.env.VITE_BASE;
  return process.env.NODE_ENV === 'production' ? '/netsanet-portfolio/' : '/';
};

// https://vitejs.dev/config/
export default defineConfig({
  base: getBase(),
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase'
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})