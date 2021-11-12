import { Context } from '@nuxt/types'
import { promotions } from '~/store'

export default function ({ route, error }: Context) {
  const slug = route.params.slug

  return promotions
    .fetch()
    .then(() => {
      if (!promotions.getByCode(slug)) throw new Error('Promo not found')
    })
    .catch((e) => {
      console.debug('[Promo Middleware]', e)
      return error({ statusCode: 404, message: e.message })
    })
}
