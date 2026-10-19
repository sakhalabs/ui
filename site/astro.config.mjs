// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // TODO: set the real deployment URL before going live (used for canonical URLs + sitemap).
  site: 'https://sakhalabs.example.com',

  integrations: [
    starlight({
      title: 'Sakha UI',
      description:
        'The Sakhā Labs React component library — CSS-variable themed, bilingual (Nepali/English) ready, mobile-first, and WCAG AA.',
      customCss: ['./src/styles/custom.css'],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/OWNER/uiux-sakha' },
        { icon: 'npm', label: 'npm', href: 'https://www.npmjs.com/package/@sakhalabs/ui' },
      ],
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'Introduction', slug: 'index' },
            { label: 'Getting started', slug: 'getting-started' },
            { label: 'Theming', slug: 'theming' },
            { label: 'Tailwind CSS v4', slug: 'tailwind' },
          ],
        },
        {
          label: 'Components',
          items: [{ label: 'Component reference', slug: 'components' }],
        },
        {
          label: 'Template catalog',
          items: [{ autogenerate: { directory: 'catalog' } }],
        },
        {
          label: 'Project',
          items: [
            { label: 'Publishing to npm', slug: 'publishing' },
            { label: 'Changelog', slug: 'changelog' },
          ],
        },
      ],
    }),
    react(),
  ],
});
