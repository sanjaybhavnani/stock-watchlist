// esbuild.config.js
import { build } from 'esbuild';

build({
  entryPoints: ['src/index.ts'],
  bundle: false,
  platform: 'node',
  format: 'esm',
  outfile: 'dist/index.js',
}).catch(() => process.exit(1));