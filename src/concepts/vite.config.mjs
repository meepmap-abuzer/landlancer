import {defineConfig} from 'vite';
export default defineConfig({
  base:'/concepts/runtime/',
  build:{outDir:'concepts/runtime',emptyOutDir:true,cssCodeSplit:false,assetsInlineLimit:0,
    rollupOptions:{input:{fitness:'src/concepts/fitness.mjs',homes:'src/concepts/homes.mjs',detailing:'src/concepts/detailing.mjs',gallery:'src/concepts/gallery.mjs'},output:{entryFileNames:'[name].js',chunkFileNames:'[name]-[hash].js',assetFileNames:'[name][extname]'}}}
});
