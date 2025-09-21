# Lokus Web Landing Page

A modern, animated landing page for Lokus - the lightning-fast extensible markdown editor. Built with Next.js, Tailwind CSS, Three.js, and Framer Motion.

## Features

- ⚡ Built with Next.js 15 and React 19
- 🎨 Styled with Tailwind CSS and shadcn/ui components
- 🌌 3D animations using Three.js and React Three Fiber
- 🎭 Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🌙 Dark theme optimized
- 🚀 Production-ready with TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
cd lokus-web

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

## Project Structure

```
lokus-web/
├── app/                # Next.js app directory
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Landing page
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── Hero3D.tsx      # 3D scene component
│   └── ui/             # shadcn/ui components
├── lib/                # Utility functions
├── public/             # Static assets
└── package.json        # Dependencies
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Customization

### Changing Colors

The color scheme can be modified in `app/globals.css`. The project uses CSS variables for theming:

```css
:root {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  /* ... other color variables */
}
```

### Modifying 3D Scene

The 3D scene can be customized in `components/Hero3D.tsx`. You can:
- Change the geometry (box, sphere, torus, etc.)
- Adjust materials and colors
- Modify animations and lighting

## Development

```bash
# Run development server with hot reload
npm run dev

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## Deployment

This project is ready to be deployed on Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## License

This project is part of the Lokus ecosystem.