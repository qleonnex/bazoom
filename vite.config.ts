import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'tgbot.local',
    https: true,
    port: 443,
    proxy: {
      "/api": {
        target: "https://bot.bazoom.ru/api/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('Authorization', 'Bearer fgnokuwerDFBjcbvlijrt98Q5iwhebjasCjknfd0b293hgthvJDdlfoJ0918brklhho');
          });
        },
      },
    },
  },
  plugins: [react(), mkcert()],
});
