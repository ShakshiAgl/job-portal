import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    open: true,
    middlewareMode: false,
    fs: {
      strict: false,
    },
  },
  // 👇 fallback for SPA (React Router)
  build: {
    rollupOptions: {},
  },
  preview: {
    port: 4173,
    open: true,
  },
})
