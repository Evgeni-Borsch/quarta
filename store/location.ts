import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

export interface LocationItem {
  code: string
  name: string
}

@Module({
  name: 'location',
  stateFactory: true,
  namespaced: true,
})
export default class LocationModule extends VuexModule {
  current: string | null = null
  items: Array<LocationItem> = [
    {
      code: 'SPB',
      name: 'Санкт-Петербург',
    },
    {
      code: 'MSK',
      name: 'Москва',
    },
    {
      code: 'KRD',
      name: 'Краснодар',
    },
    {
      code: 'NSB',
      name: 'Новосибирск',
    },
    {
      code: 'NNG',
      name: 'Нижний Новгород',
    },
    {
      code: 'RND',
      name: 'Ростов-на-Дону',
    },
    {
      code: 'SUM',
      name: 'Самара',
    },
    {
      code: 'UFA',
      name: 'Уфа',
    },
    {
      code: 'CHL',
      name: 'Челябинск',
    },
  ]

  get currentSafe(): string {
    return this.current || this.items[0].code
  }

  get currentItem(): LocationItem | undefined {
    return this.items.find((item) => item.code === this.currentSafe)
  }

  @Mutation
  setLocation(code: string) {
    this.current = code
  }
}
