'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownRendererProps {
    content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
                // Style headings
                h1: ({ children }) => (
                    <h1 className="text-2xl font-bold mt-6 mb-4 first:mt-0">{children}</h1>
                ),
                h2: ({ children }) => (
                    <h2 className="text-xl font-semibold mt-6 mb-3 border-b pb-2">{children}</h2>
                ),
                h3: ({ children }) => (
                    <h3 className="text-lg font-semibold mt-4 mb-2">{children}</h3>
                ),
                // Style paragraphs
                p: ({ children, ...props }) => {
                    // Check if children contains only an image (for centered images)
                    const childArray = Array.isArray(children) ? children : [children];
                    const hasOnlyImage = childArray.length === 1 &&
                        typeof childArray[0] === 'object' &&
                        childArray[0] !== null &&
                        'type' in childArray[0] &&
                        childArray[0].type === 'img';

                    if (hasOnlyImage) {
                        return <div className="my-4 text-center">{children}</div>;
                    }
                    return <p className="my-3 leading-relaxed" {...props}>{children}</p>;
                },
                // Style lists
                ul: ({ children }) => (
                    <ul className="list-disc list-inside my-3 space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                    <ol className="list-decimal list-inside my-3 space-y-1">{children}</ol>
                ),
                li: ({ children }) => (
                    <li className="ml-2">{children}</li>
                ),
                // Style links
                a: ({ href, children }) => (
                    <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        {children}
                    </a>
                ),
                // Style images
                img: ({ src, alt }) => (
                    <img src={src} alt={alt || ''} className="max-w-full h-auto rounded my-2" />
                ),
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
                        <code className={`${className} block bg-muted p-4 rounded-lg overflow-x-auto text-sm`} {...props}>
                            {children}
                        </code>
                    );
                },
                pre: ({ children }) => (
                    <pre className="bg-muted rounded-lg my-4 overflow-x-auto">
                        {children}
                    </pre>
                ),
                // Style blockquotes
                blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">
                        {children}
                    </blockquote>
                ),
                // Style horizontal rules
                hr: () => (
                    <hr className="my-6 border-border" />
                ),
                // Style tables
                table: ({ children }) => (
                    <div className="overflow-x-auto my-4">
                        <table className="min-w-full border-collapse border border-border">
                            {children}
                        </table>
                    </div>
                ),
                thead: ({ children }) => (
                    <thead className="bg-muted">{children}</thead>
                ),
                th: ({ children }) => (
                    <th className="border border-border px-4 py-2 text-left font-semibold">
                        {children}
                    </th>
                ),
                td: ({ children }) => (
                    <td className="border border-border px-4 py-2">
                        {children}
                    </td>
                ),
                // Style strong/bold
                strong: ({ children }) => (
                    <strong className="font-semibold">{children}</strong>
                ),
            }}
        >
            {content}
        </ReactMarkdown>
    );
}
