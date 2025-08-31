import {defineContentConfig, defineCollection, z} from '@nuxt/content'

const createBaseSchema = () => z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty()
})

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'page',
      source: '0.index.yml',
      schema: createBaseSchema().extend({
        features: z.array(
          z.object({
            text: z.string().nonempty(),
            icon: z.string().editor({input: 'icon'}),
          })
        ),
      })
    }),
    changelog: defineCollection({
      type: 'page',
      source: '1.changelog.yml',
      schema: createBaseSchema().extend({
        releases: z.array(
          z.object({
            date: z.string().nonempty(),
            changes: z.array(
              z.object({
                type: z.enum(['New', 'Bugfix', 'Improvement', 'Security']),
                texts: z.array(z.string().nonempty()),
              })
            )
          })
        )
      })
    })
  }
})
