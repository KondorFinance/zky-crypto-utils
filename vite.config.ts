import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: 'dist/types'
    })
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: '@kondor-finance/zky-crypto-utils',
      fileName: format => `index.${format}.js`,
      formats: ['cjs', 'es']
    },
    rollupOptions: {
      external: [],
      output: {
        exports: 'named',
        dir: 'dist'
      }
    }
  }
});