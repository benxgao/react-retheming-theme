import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript';

import pkg from './package.json';

// delete old typings to avoid issues
require('fs').unlink('dist/index.d.ts', (err) => {});

export default {
  input: 'src/index.ts',
  files: ['dist/*'],
  output: [
    { file: pkg.main, format: 'cjs', exports: 'named' },
    { file: pkg.module, format: 'esm' },
  ],
  plugins: [
    resolve({
      mainFields: ['module', 'main'],
    }),
    commonjs(),
    babel({
      presets: [['@babel/preset-env', { targets: { node: 14 } }]],
      exclude: 'node_modules/**',
    }),
    typescript({
      typescript: require('typescript'),
    }),
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
};
