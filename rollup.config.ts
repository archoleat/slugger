import { defineConfig } from 'rollup';
import { dts } from 'rollup-plugin-dts';
import { minify } from 'rollup-plugin-esbuild';
import { resolve } from 'node:path';
import alias from '@rollup/plugin-alias';
import typescript from '@rollup/plugin-typescript';

const sourceFolder = 'src';
const typesFolder = `${sourceFolder}/types`;
const fileFormat = 'es';
const fileName = 'index';
const declarationFile = `${fileName}.d.ts`;
const entryFile = `${fileName}.ts`;
const outputFile = `${fileName}.js`;

export default defineConfig([
  {
    plugins: [typescript(), minify()],
    input: `${sourceFolder}/${entryFile}`,
    output: {
      file: outputFile,
      format: fileFormat,
    },
  },
  {
    plugins: [
      alias({
        entries: [
          {
            find: '#types',
            replacement: resolve(`${typesFolder}/`),
          },
        ],
      }),
      dts(),
    ],
    input: `${sourceFolder}/${entryFile}`,
    output: {
      file: declarationFile,
      format: fileFormat,
    },
  },
]);
