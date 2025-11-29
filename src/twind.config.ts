import { defineConfig } from '@twind/core'
import presetAutoprefix from '@twind/preset-autoprefix'
import presetTailwind from '@twind/preset-tailwind'

export default defineConfig({
  presets: [presetAutoprefix(), presetTailwind()],
  theme: {
    extend: {
      // Adicione suas customizações de tema aqui
    },
  },
  rules: [
    // Adicione regras customizadas aqui se necessário
  ],
})
