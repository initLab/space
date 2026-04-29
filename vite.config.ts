import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import i18nextLoader from 'vite-plugin-i18next-loader'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    build: {sourcemap: true, assetsInlineLimit: 0,},
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
        VitePWA({ registerType: 'autoUpdate',
            devOptions: {enabled: true,},
            manifest: false,
        }),
    ],
});
