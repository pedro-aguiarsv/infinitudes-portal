import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'infinitudes-studio',

  projectId: 'h4mda5gt',
  dataset: 'production',

  plugins: [
    // Menu lateral customizado: uma pasta para cada categoria do portal
    structureTool({structure}),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
