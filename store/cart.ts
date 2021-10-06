import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { cart } from '~/utils/store-accessor'

export interface CartItem {
  id: string
  count: number
}

@Module({
  name: 'cart',
  stateFactory: true,
  namespaced: true,
})
export default class CartModule extends VuexModule {
  items: Map<string, CartItem> = new Map()

  get hasItem() {
    return (id: string) => this.items.has(id)
  }

  get getItem() {
    return (id: string) => this.items.get(id)
  }

  get countTotal() {
    let total = 0

    for (const item of this.items.values()) {
      total = total + item.count
    }

    return total
  }

  @Mutation
  setCount(payload: { id: string; count: number }) {
    const { id, count } = payload
    if (count <= 0) return cart.removeItem(id)

    const items = new Map(this.items)
    items.set(id, { id, count })
    this.items = items
  }

  @Mutation
  setItems(items: Map<string, CartItem>) {
    this.items = items
  }

  @Action
  addItem(id: string) {
    const items = new Map(this.items)
    items.set(id, { id, count: 1 })
    cart.setItems(items)
  }

  @Action
  removeItem(id: string) {
    const items = new Map(this.items)
    items.delete(id)
    cart.setItems(items)
  }
}
