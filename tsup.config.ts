import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: ['src/index.ts', 'src/icons/index.ts'],
  splitting: false,
  sourcemap: false,
  clean: true,
  outDir: 'build',
  publicDir: true,
  format: ['cjs', 'esm'],
  dts: true,
  minify: !options.watch,
}))
