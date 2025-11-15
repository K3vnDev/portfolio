import netlify from '@astrojs/netlify'
import react from '@astrojs/react'
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
})
