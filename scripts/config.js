const path = require('path')
const typescript = require('rollup-plugin-typescript2')
const nodeResolve = require('@rollup/plugin-node-resolve')
const cjs = require('@rollup/plugin-commonjs')
const replace = require('@rollup/plugin-replace')
const alias = require('@rollup/plugin-alias')
const babel = require('rollup-plugin-babel')
const eslint = require('rollup-plugin-eslint').eslint
const sourceMaps = require('rollup-plugin-sourcemaps')

const util = require('./util')
const pkg = require('../package.json')
const author = pkg.author
const name = pkg.name
const version = pkg.version
const libraryName = util.camelize(name)

const extensions = ['.ts', '.js']

const banner =
  '/*!\n' +
  ` * ${name}.js v${version}\n` +
  ` * (c) 2020-${new Date().getFullYear()} ${author}\n` +
  ' * Released under the MIT License.\n' +
  ' */'

const resolve = (p) => {
  return path.resolve(__dirname, '../', p)
}

const plugins = [
  alias({
    entries: {
      '@': './src',
    },
    resolve: extensions,
  }),
  replace({
    include: 'src/index.ts',
    VERSION: version,
  }),
  eslint({
    include: 'src/**',
    extensions,
  }),
  typescript(),
  babel({
    runtimeHelpers: true,
    extensions,
  }),
  nodeResolve({
    extensions,
  }),
  cjs(),
]

const input = resolve('src/index.ts')

const buildMap = {
  esm: {
    input,
    output: {
      file: resolve(`dist/${name}.esm.js`),
      format: 'esm',
      banner,
    },
    plugins: plugins,
  },
  main: {
    input,
    output: {
      file: resolve(`dist/${name}.js`),
      format: 'umd',
      name: libraryName,
      banner,
    },
    plugins: plugins,
  },
  min: {
    input,
    output: {
      file: resolve(`dist/${name}.min.js`),
      format: 'umd',
      name: libraryName,
      banner,
    },
    plugins: plugins,
  }
}

module.exports = buildMap
