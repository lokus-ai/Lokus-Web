import { client } from "@/lib/sanity"
import { ChangelogList } from "@/components/changelog-list"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Changelog",
    description: "Latest updates and improvements to Lokus.",
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function ChangelogPage() {
    const query = `*[_type == "changelog"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    body,
    version,
    "author": author->name,
    "authorImage": author->image
  }`

    let posts = []

    try {
        posts = await client.fetch(query)
    } catch (error) {
        console.error("Failed to fetch changelog:", error)
        // Fallback or empty state is handled by the component
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                        Changelog
                    </h1>
                    <p className="text-gray-400 text-lg">
                        New updates and improvements to Lokus.
                    </p>
                </div>

                <ChangelogList posts={posts} />
            </div>
        </div>
    )
}
