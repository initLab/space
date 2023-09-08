import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        sourcemap: true,
    },
    envPrefix: [
        'TITLE',
        'BACKEND_URL',
        'DOOR_BACKEND_URL',
        'MQTT_URL',
        'OAUTH_CLIENT_ID',
        'VARIANT',
    ],
    plugins: [
        react(),
        viteCompression(),
        ...(process.env.BUILD_LEGACY === 'true' ? [
            legacy({
                targets: ['defaults', 'android 2.3'],
            }),
        ] : []),
    ],
    server: {
        open: true,
    },
});
