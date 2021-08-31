import { Module, VuexModule } from 'vuex-module-decorators'

export interface Category {
  name: string
  slug: string
  children?: Array<Category>
}

@Module({
  name: 'categories',
  stateFactory: true,
  namespaced: true,
})
export default class CategoriesModule extends VuexModule {
  items: Array<Category> = [
    { name: 'Оружие и патроны', slug: 'weapons', children: [] },
    { name: 'Оптика и кронштейны', slug: 'accessories', children: [] },
    { name: 'Тюнинг оружия', slug: 'tuning', children: [] },
    { name: 'Снаряжение и одежда', slug: 'gear', children: [] },
    { name: 'Чистка, смазка и уход', slug: 'consumables', children: [] },
    { name: 'Рыбалка', slug: 'fishing', children: [] },
  ]
}
