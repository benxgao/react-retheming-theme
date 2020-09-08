import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

import pkg from './package.json';

const externalDeps = Object.keys(Object.assign({}, pkg.dependencies, pkg.peerDependencies));
const nodeDeps = ['path'];

// delete old typings to avoid issues
require('fs').unlink('dist/index.d.ts', (err) => {});

export default {
  input: 'src/index.js',
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
      presets: [['@babel/preset-env', { targets: { node: 8 } }]],
      exclude: 'node_modules/**',
    }),
    // typescript(),
  ],
  external: externalDeps.concat(nodeDeps),
};
