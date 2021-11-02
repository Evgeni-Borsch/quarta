import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { ProductItem } from '.'
import {
  addToCart,
  clearCart,
  getCart,
  removeCartItem,
} from '~/services/api/product'
import { cart, products } from '~/utils/store-accessor'

export interface CartItem {
  id: string
  cartId: string
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
    const cartItemId = this.items.get(id)!.cartId
    await removeCartItem(cartItemId)
    await this.pullState()
  }

  @Action
  async clear() {
    await clearCart()
    await this.pullState()
  }

  @Action
  async setCount(payload: { id: string; count: number }) {
    const { id, count } = payload

    if (count <= 0) return cart.removeItem(id)

    await addToCart(id, count)
    await this.pullState()
  }

  @Action
  async pullState() {
    const cart = await getCart()
    const items = new Map<string, CartItem>()

    cart.forEach((item) => {
      items.set(item.PRODUCT_ID, {
        id: item.PRODUCT_ID,
        cartId: item.ID,
        count: item.QUANTITY,
      })
    })

    this.setItems(items)
  }

  @Mutation
  setItems(items: Map<string, CartItem>) {
    this.items = items
  }
}
