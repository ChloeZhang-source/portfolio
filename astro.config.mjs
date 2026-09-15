// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://chloezhang-source.github.io',
  base: '/portfolio/',
  output: 'static',
  integrations: [mdx()],
});