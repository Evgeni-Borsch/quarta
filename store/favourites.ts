import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { ProductItem } from '.'
import { favourites, products } from '~/utils/store-accessor'
import { getFavourites } from '~/services/api/personal'

@Module({
  name: 'favourites',
  stateFactory: true,
  namespaced: true,
})
export default class FavouritesModule extends VuexModule {
  items: Array<string> = []

  get hasItem() {
    return (id: string) => this.items.includes(id)
  }

  get productsListAsync() {
    return async () => {
      const list: Array<ProductItem> = []

      for (const item of this.items) {
        list.push(await products.getById(item))
      }

      return list
    }
  }

  @Action
  async pullState() {
    const favourites = await getFavourites()
    this.setItems(favourites.map((item) => item.ID))
  }

  @Action
  async addItem(id: string) {
    if (favourites.hasItem(id)) return null
    
    const items = Array.from(this.items)
    items.push(id)
    this.setItems(items)
  }

  @Action
  async removeItem(id: string) {
    const items = Array.from(this.items)
    const index = items.indexOf(id)

    if (index === -1) return null

    items.splice(index, 1)
    this.setItems(items)
  }

  @Mutation
  setItems(items: Array<string>) {
    this.items = items
  }
}
