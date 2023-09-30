import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
 plugins: [vue()],
 test:{
   globals:false,
   environment: 'happy-dom',
 },
 resolve: {
  alias: {
    '@': path.resolve(__dirname, './src')
  },
},
})