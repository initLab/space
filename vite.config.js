import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        sourcemap: true,
    },
    envPrefix: [
        'TITLE',
        'BACKEND_URL',
        'DEVICE_BACKEND_URL',
        'MQTT_BACKEND_URL',
        'OAUTH_CLIENT_ID',
    ],
    plugins: [
        react(),
        viteCompression(),
    ],
    server: {
        open: true,
    },
});
