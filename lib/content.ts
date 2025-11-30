import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export type ContentType = "blog" | "changelog" | "docs";

export interface ContentMeta {
    slug: string;
    title: string;
    date: string;
    description?: string;
    image?: string;
    tags?: string[];
    author?: string;
    version?: string; // For changelogs
    type: ContentType;
}

export interface ContentPost {
    meta: ContentMeta;
    content: string;
}

export function getContentSlugs(type: ContentType) {
    const dir = path.join(contentDirectory, type);
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));
}

export function getContentBySlug(type: ContentType, slug: string): ContentPost | null {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = path.join(contentDirectory, type, `${realSlug}.mdx`);

    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        meta: {
            slug: realSlug,
            title: data.title,
            date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
            description: data.description,
            image: data.image,
            tags: data.tags,
            author: data.author,
            version: data.version,
            type,
        },
        content,
    };
}

export function getAllContent(type: ContentType): ContentMeta[] {
    const slugs = getContentSlugs(type);
    const content = slugs
        .map((slug) => getContentBySlug(type, slug))
        .filter((post): post is ContentPost => post !== null)
        .map((post) => post.meta)
        .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

    return content;
}
