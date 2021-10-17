import { Context } from '@nuxt/types'
import { categories } from '~/store'

export default function (context: Context) {
  const { route, error } = context
  const [slug] = route.params.pathMatch.split('/')

  return categories
    .getBySlugAsync(slug)
    .then((category) => {
      if (category === undefined) {
        throw new Error(`Category with '${slug}' slug is not exsist`)
      }
    })
    .catch((e) => {
      console.debug('[Category Middleware]', e)
      return error({ statusCode: 404, message: 'Category not found' })
    })
}
