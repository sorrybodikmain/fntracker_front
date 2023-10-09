import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import unoCSS from 'unocss/vite'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), unoCSS()],
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, 'src') },
        ],
    },
})
