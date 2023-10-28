import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import legacy from '@vitejs/plugin-legacy';

const isLegacyBuild = process.env.BUILD_LEGACY === 'true';

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
        'MQTT_URL',
        'OAUTH_CLIENT_ID',
        'VARIANT',
    ],
    ...(isLegacyBuild ? {
        optimizeDeps: {
            esbuildOptions: {
                supported: {
                    bigint: true,
                },
            },
        },
    } : {}),
    plugins: [
        react(),
        viteCompression(),
        ...(isLegacyBuild ? [
            legacy({
                targets: ['defaults', 'android 2.3'],
            }),
        ] : []),
    ],
    server: {
        open: true,
    },
});
