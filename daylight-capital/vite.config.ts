import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true
  },
  plugins: [react()],
  build: {
    // Output directory
    outDir: 'dist',
    // Asset size warning limit (500kb)
    chunkSizeWarningLimit: 600,
    // Minify with esbuild (default, fastest)
    minify: 'esbuild',
    // Generate source maps for debugging (disable for production privacy)
    sourcemap: false,
    // Rollup options for chunking
    rollupOptions: {
      output: {
        // Split vendor chunks for better caching
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) return 'vendor-react';
            if (id.includes('gsap') || id.includes('@gsap')) return 'vendor-gsap';
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('lenis')) return 'vendor-lenis';
          }
        },
        // Asset naming for cache busting
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] ?? '';
          if (/\.(png|jpe?g|svg|gif|webp|ico)$/i.test(name)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          if (/\.css$/i.test(name)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      }
    },
    // Target modern browsers for smaller output
    target: 'es2020',
  },
  // Optimise dependencies pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'gsap', '@gsap/react', 'lenis', 'lucide-react'],
  },
})
