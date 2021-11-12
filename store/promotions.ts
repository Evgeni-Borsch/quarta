import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { getPromotions } from '~/services/api/promo'
import { API_BASE_URL } from '~/services/constants'

export interface Promotion {
  raw: any
  id: string
  code: string
  title: string
  image: string
  text: string
  from: string
  to: string
  active: boolean
}

@Module({
  name: 'promotions',
  stateFactory: true,
  namespaced: true,
})
export default class PromotionsModule extends VuexModule {
  items: Array<Promotion> = []

  get getByCode() {
    return (code: string) => {
      return this.items.find((item) => item.code === code)
    }
  }

  get active() {
    return this.items.filter((item) => item.active)
  }

  get ended() {
    return this.items.filter((item) => !item.active)
  }

  @Action
  async fetch() {
    const response = await getPromotions()
    const promotions: Array<Promotion> = []

    response.ITEMS.forEach((item) => {
      const fromParts = item.ACTIVE_FROM.split(' ')[0].split('.')
      const toParts = item.ACTIVE_TO.split(' ')[0].split('.')

      promotions.push({
        raw: item,
        code: item.CODE,
        id: item.ID,
        title: item.NAME,
        image: API_BASE_URL + item.PREVIEW_PICTURE.SRC,
        text: item.PREVIEW_TEXT,
        from: new Date(
          `${fromParts[2]}-${fromParts[1]}-${fromParts[0]}`
        ).toLocaleDateString('RU'),
        to: new Date(
          `${toParts[2]}-${toParts[1]}-${toParts[0]}`
        ).toLocaleDateString('RU'),
        active:
          new Date(`${toParts[2]}-${toParts[1]}-${toParts[0]}`).valueOf() >
          Date.now(),
      })
    })

    this.setItems(promotions)
  }

  @Mutation
  setItems(items: Array<Promotion>) {
    this.items = items
  }
}
