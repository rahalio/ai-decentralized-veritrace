import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/**/index.ts'],
  format: ['esm'],
  dts: false,
  outDir: 'dist',
  tsconfig: './tsconfig.json',
  // Do not externalize workspace paths by folder name — domain "adapters"
  // would match /adapters/ and break the services package build.
  external: [
    '@aws-sdk/lib-dynamodb',
    '@aws-sdk/client-dynamodb',
    '@aws-sdk/client-s3',
    '@veritrace/core',
    '@veritrace/adapters',
    '@veritrace/api-server',
  ],
});
