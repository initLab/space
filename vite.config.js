import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import i18nextLoader from 'vite-plugin-i18next-loader';

// https://vitejs.dev/config/
export default defineConfig({
    build: {sourcemap: true, assetsInlineLimit: 0,},
    css: {
        preprocessorOptions: {
            scss: {api: 'modern-compiler',},
        },
    },
    envPrefix: [
        'OIDC_AUTHORITY_URL',
        'OIDC_CLIENT_ID',
        'PORTIER_URL',
        'MQTT_PROXY_URL',
        'PRESENCE_URL',
    ],
    plugins: [
        react(),
        viteCompression(),
        i18nextLoader({ paths: ['./src/locales'] }),
    ],
});
