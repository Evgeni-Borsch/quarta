import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { ProductItem } from '.'
import { addToCart, getCart } from '~/services/api/product'
import { cart, products } from '~/utils/store-accessor'

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

  get toArray() {
    return () => Array.from(this.items, ([_, item]) => item)
  }

  get productsListAsync() {
    return async () => {
      const list: Array<ProductItem> = []

      for (const item of cart.toArray()) {
        list.push(await products.getById(item.id))
      }

      return list
    }
  }

  @Action
  async addItem(id: string) {
    await addToCart(id)
    await this.pullState()
  }

  @Action
  async removeItem(id: string) {
    // await addToCart(id)
    await this.pullState()
  }

  @Action
  async pullState() {
    const cart = await getCart()
    const items = new Map<string, CartItem>()

    cart.forEach((item) => {
      items.set(item.PRODUCT_ID, {
        id: item.PRODUCT_ID,
        count: item.QUANTITY,
      })
    })

    this.setItems(items)
  }

  @Mutation
  setItems(items: Map<string, CartItem>) {
    this.items = items
  }

  @Mutation
  setCount(payload: { id: string; count: number }) {
    // const { id, count } = payload
    // if (count <= 0) return cart.removeItem(id)
    // const items = new Map(this.items)
    // items.set(id, { id, count })
    // this.items = items
  }
}
