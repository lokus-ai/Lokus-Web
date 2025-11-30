import { createClient } from 'next-sanity'
// import imageUrlBuilder from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-project-id'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Set to false for fresh data
})

// const builder = imageUrlBuilder(client)

// export function urlFor(source: any) {
//   return builder.image(source)
// }
