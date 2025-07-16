import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/icons/*.ts'],
      exclude: ['src/icons/index.ts'],
    },
    projects: [
      {
        extends: true,
        plugins: [storybookTest({ configDir: path.join(dirname, '.storybook') })],
        test: {
          name: 'icons',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.ts'],
        },
      },
    ],
  },
})
