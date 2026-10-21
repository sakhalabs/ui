// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Canonical URL for the deployed docs site (drives canonical tags + sitemap).
  site: 'https://ui.sakhalabs.com',

  integrations: [
    starlight({
      title: 'Sakhā UI',
      description:
        'The Sakhā Labs React component library — CSS-variable themed, bilingual (Nepali/English) ready, mobile-first, and WCAG AA.',
      logo: { src: './src/assets/logo.svg', alt: 'Sakhā UI' },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/custom.css'],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/sakhalabs/ui' },
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
          items: [
            { label: 'Overview', slug: 'components' },
            { label: 'Actions', items: [{ autogenerate: { directory: 'components/actions' } }] },
            { label: 'Inputs', items: [{ autogenerate: { directory: 'components/inputs' } }] },
            { label: 'Selection', items: [{ autogenerate: { directory: 'components/selection' } }] },
            { label: 'Feedback', items: [{ autogenerate: { directory: 'components/feedback' } }] },
            {
              label: 'Data display',
              items: [{ autogenerate: { directory: 'components/data-display' } }],
            },
            {
              label: 'Navigation & overlays',
              items: [{ autogenerate: { directory: 'components/navigation' } }],
            },
          ],
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
