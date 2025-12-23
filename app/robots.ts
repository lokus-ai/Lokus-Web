import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // Allow all crawlers
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/dashboard/', '/api/', '/studio/'],
            },
            // Explicitly allow AI crawlers (ChatGPT, Perplexity, etc.)
            {
                userAgent: 'GPTBot',
                allow: '/',
                disallow: ['/dashboard/', '/api/'],
            },
            {
                userAgent: 'ChatGPT-User',
                allow: '/',
                disallow: ['/dashboard/', '/api/'],
            },
            {
                userAgent: 'PerplexityBot',
                allow: '/',
                disallow: ['/dashboard/', '/api/'],
            },
            {
                userAgent: 'Anthropic-AI',
                allow: '/',
                disallow: ['/dashboard/', '/api/'],
            },
            {
                userAgent: 'Claude-Web',
                allow: '/',
                disallow: ['/dashboard/', '/api/'],
            },
            {
                userAgent: 'Google-Extended',
                allow: '/',
                disallow: ['/dashboard/', '/api/'],
            },
            {
                userAgent: 'cohere-ai',
                allow: '/',
                disallow: ['/dashboard/', '/api/'],
            },
        ],
        sitemap: 'https://lokusmd.com/sitemap.xml',
        host: 'https://lokusmd.com',
    }
}
