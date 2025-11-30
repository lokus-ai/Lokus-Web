'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
    name: 'default',
    title: 'Lokus Studio',

    projectId,
    dataset,

    basePath: '/studio',

    plugins: [structureTool(), visionTool()],

    schema: {
        types: schemaTypes,
    },
})
