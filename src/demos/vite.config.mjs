import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {fileURLToPath} from 'node:url';
export default defineConfig({plugins:[vue()],define:{'process.env.NODE_ENV':'"production"'},resolve:{alias:{'@':fileURLToPath(new URL('./loyalty/',import.meta.url))}},build:{outDir:'demos',emptyOutDir:true,lib:{entry:'src/demos/mount.mjs',formats:['es'],fileName:'interactive'},rollupOptions:{output:{assetFileNames:'[name][extname]'}}}});
