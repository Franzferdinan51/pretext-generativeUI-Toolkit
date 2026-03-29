import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'

// Determine if we're building the library or the web app
const isWebuiBuild = process.env.BUILD_TARGET === 'webui'

export default defineConfig({
  plugins: [
    react(),
    !isWebuiBuild && dts({
      include: 'src',
      exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx']
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: isWebuiBuild ? {
    outDir: 'dist-webui',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  } : {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'PretextGenerativeUI',
      formats: ['es', 'cjs'],
      fileName: (format) => {
        return format === 'es' ? 'index.mjs' : 'index.js'
      }
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    sourcemap: true
  },
  // Development server for webui
  server: {
    port: 5173,
    open: true
  }
})
