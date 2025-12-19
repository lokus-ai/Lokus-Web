'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
    content: string;
}

// Strip HTML tags from content to render pure markdown
function stripHtml(content: string): string {
    // Remove HTML tags but keep their content
    return content
        // Remove <p align="center">...</p> wrapper tags
        .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n')
        // Remove <h1 align="center">...</h1> - convert to markdown
        .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n')
        // Remove <a> tags but keep href for links
        .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
        // Remove <img> tags - convert to markdown images
        .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)')
        .replace(/<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*\/?>/gi, '![$1]($2)')
        // Remove remaining HTML tags
        .replace(/<[^>]+>/g, '')
        // Clean up extra whitespace
        .replace(/\n\s*\n\s*\n/g, '\n\n')
        .trim();
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    const cleanContent = stripHtml(content);

    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                // Style code blocks
                code: ({ className, children, ...props }) => {
                    const isInline = !className;
                    if (isInline) {
                        return (
                            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                                {children}
                            </code>
                        );
                    }
                    return (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                },
                // Style tables
                table: ({ children }) => (
                    <div className="overflow-x-auto my-4">
                        <table className="min-w-full border-collapse border border-border">
                            {children}
                        </table>
                    </div>
                ),
                th: ({ children }) => (
                    <th className="border border-border bg-muted px-4 py-2 text-left font-semibold">
                        {children}
                    </th>
                ),
                td: ({ children }) => (
                    <td className="border border-border px-4 py-2">
                        {children}
                    </td>
                ),
            }}
        >
            {cleanContent}
        </ReactMarkdown>
    );
}
