import { Context } from '@nuxt/types'
import { products } from '~/store'

export default function ({ route, error, redirect }: Context) {
  const [id, slug] = route.params.pathMatch.split('/')

  return products
    .getById(id)
    .then((product) => {
      if (slug !== product.slug) {
        redirect(302, `/product/${id}/${product.slug}`)
      }
    })
    .catch((e) => {
      console.debug('[Product Middleware]', e)
      return error({ statusCode: 404, message: 'Product not found' })
    })
}
