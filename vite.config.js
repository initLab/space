import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        sourcemap: true,
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
    envPrefix: [
        'OIDC_AUTHORITY_URL',
        'OIDC_CLIENT_ID',
        'PORTIER_URL',
        'MQTT_PROXY_URL',
    ],
    plugins: [
        react(),
        viteCompression(),
    ],
});
