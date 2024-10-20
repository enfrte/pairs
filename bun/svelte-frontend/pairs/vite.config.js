import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [svelte()],
// })

export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: '../build123',  // Now you can place the build outside this root
  }
})