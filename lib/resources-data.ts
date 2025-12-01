// Types and data for brand resources page

export interface Asset {
  id: string;
  title: string;
  description: string;
  format: string;
  size: string;
  downloadUrl: string;
  previewUrl: string;
  dimensions: string;
  category: 'logo' | 'screenshot' | 'banner';
  variant?: string;
}

export interface BrandColor {
  name: string;
  hex: string;
  rgb: string;
  usage: string;
}

export interface BrandDescription {
  variant: 'short' | 'medium' | 'long';
  title: string;
  content: string;
  characterCount: number;
}

export interface Typography {
  name: string;
  family: string;
  weights: string[];
  usage: string;
  example: string;
}

// Logo Assets
export const logos: Asset[] = [
  {
    id: 'logo-light-svg',
    title: 'Logo Light (SVG)',
    description: 'White logo on transparent background for dark surfaces',
    format: 'SVG',
    size: '5.2 KB',
    downloadUrl: '/resources/logos/lokus-icon-light.svg',
    previewUrl: '/resources/logos/lokus-icon-light.svg',
    dimensions: '512x512',
    category: 'logo',
    variant: 'light'
  },
  {
    id: 'logo-dark-svg',
    title: 'Logo Dark (SVG)',
    description: 'Black logo on transparent background for light surfaces',
    format: 'SVG',
    size: '5.2 KB',
    downloadUrl: '/resources/logos/lokus-icon-dark.svg',
    previewUrl: '/resources/logos/lokus-icon-dark.svg',
    dimensions: '512x512',
    category: 'logo',
    variant: 'dark'
  },
  {
    id: 'logo-light-bg-svg',
    title: 'Logo on White (SVG)',
    description: 'Black logo with white background',
    format: 'SVG',
    size: '5.3 KB',
    downloadUrl: '/resources/logos/lokus-icon-light-bg.svg',
    previewUrl: '/resources/logos/lokus-icon-light-bg.svg',
    dimensions: '512x512',
    category: 'logo',
    variant: 'light-bg'
  },
  {
    id: 'logo-dark-bg-svg',
    title: 'Logo on Black (SVG)',
    description: 'White logo with black background',
    format: 'SVG',
    size: '5.3 KB',
    downloadUrl: '/resources/logos/lokus-icon-dark-bg.svg',
    previewUrl: '/resources/logos/lokus-icon-dark-bg.svg',
    dimensions: '512x512',
    category: 'logo',
    variant: 'dark-bg'
  },
  {
    id: 'logo-light-png',
    title: 'Logo Light (PNG)',
    description: 'White logo on transparent background for dark surfaces',
    format: 'PNG',
    size: '8.7 KB',
    downloadUrl: '/resources/logos/lokus-icon-light.png',
    previewUrl: '/resources/logos/lokus-icon-light.png',
    dimensions: '512x512',
    category: 'logo',
    variant: 'light'
  },
  {
    id: 'logo-dark-png',
    title: 'Logo Dark (PNG)',
    description: 'Black logo on transparent background for light surfaces',
    format: 'PNG',
    size: '8.4 KB',
    downloadUrl: '/resources/logos/lokus-icon-dark.png',
    previewUrl: '/resources/logos/lokus-icon-dark.png',
    dimensions: '512x512',
    category: 'logo',
    variant: 'dark'
  },
  {
    id: 'logo-light-bg-png',
    title: 'Logo on White (PNG)',
    description: 'Black logo with white background',
    format: 'PNG',
    size: '8.9 KB',
    downloadUrl: '/resources/logos/lokus-icon-light-bg.png',
    previewUrl: '/resources/logos/lokus-icon-light-bg.png',
    dimensions: '512x512',
    category: 'logo',
    variant: 'light-bg'
  },
  {
    id: 'logo-dark-bg-png',
    title: 'Logo on Black (PNG)',
    description: 'White logo with black background',
    format: 'PNG',
    size: '9.3 KB',
    downloadUrl: '/resources/logos/lokus-icon-dark-bg.png',
    previewUrl: '/resources/logos/lokus-icon-dark-bg.png',
    dimensions: '512x512',
    category: 'logo',
    variant: 'dark-bg'
  },
];

// Brand Colors
export const brandColors: BrandColor[] = [
  {
    name: 'Primary Indigo',
    hex: '#6366f1',
    rgb: '99, 102, 241',
    usage: 'Primary brand color, CTAs, links, accents'
  },
  {
    name: 'Deep Purple',
    hex: '#9333ea',
    rgb: '147, 51, 234',
    usage: 'Gradients, secondary accents, highlights'
  },
  {
    name: 'Background Black',
    hex: '#000000',
    rgb: '0, 0, 0',
    usage: 'Main background, dark mode base'
  },
  {
    name: 'Surface Dark',
    hex: '#18181b',
    rgb: '24, 24, 27',
    usage: 'Card backgrounds, elevated surfaces'
  },
  {
    name: 'Zinc 900',
    hex: '#18181b',
    rgb: '24, 24, 27',
    usage: 'Secondary surfaces, borders'
  },
  {
    name: 'White',
    hex: '#ffffff',
    rgb: '255, 255, 255',
    usage: 'Primary text, icons, light elements'
  },
  {
    name: 'Zinc 400',
    hex: '#a1a1aa',
    rgb: '161, 161, 170',
    usage: 'Secondary text, muted content'
  },
  {
    name: 'Border Subtle',
    hex: 'rgba(255, 255, 255, 0.05)',
    rgb: '255, 255, 255, 5%',
    usage: 'Subtle borders, dividers, separators'
  }
];

// Brand Descriptions
export const brandDescriptions: BrandDescription[] = [
  {
    variant: 'short',
    title: 'Short Description',
    content: 'Lokus - Local-first knowledge management for connected thinking.',
    characterCount: 67
  },
  {
    variant: 'medium',
    title: 'Medium Description',
    content: 'Lokus is a local-first note-taking and knowledge management platform. Build your personal wiki, connect ideas with a knowledge graph, and unleash your creativity while maintaining full control of your data.',
    characterCount: 218
  },
  {
    variant: 'long',
    title: 'Long Description',
    content: 'Lokus is a revolutionary local-first knowledge management platform designed for thinkers, researchers, and creators. With powerful Markdown editing, bi-directional linking, and an interactive knowledge graph, Lokus helps you capture, connect, and explore your ideas while keeping your data private and under your control. Available for macOS, Windows, and Linux.',
    characterCount: 387
  }
];

// Typography Information
export const typography: Typography[] = [
  {
    name: 'Headings',
    family: 'System Font Stack',
    weights: ['600 (Semibold)', '700 (Bold)'],
    usage: 'Page titles, section headers, emphasis',
    example: 'Lokus - Think. Connect. Create.'
  },
  {
    name: 'Body Text',
    family: 'System Font Stack',
    weights: ['400 (Regular)', '500 (Medium)'],
    usage: 'Paragraphs, descriptions, body content',
    example: 'The future of knowledge management'
  },
  {
    name: 'Code/Monospace',
    family: 'Monaco, Courier New, monospace',
    weights: ['400 (Regular)'],
    usage: 'Code blocks, technical content, inline code',
    example: 'const lokus = "awesome"'
  }
];

// Screenshots (placeholder data - add real screenshots later)
export const screenshots: Asset[] = [];

// Banners (placeholder data - add real banners later)
export const banners: Asset[] = [];
