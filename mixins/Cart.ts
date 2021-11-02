import { Component, Vue, Watch } from 'vue-property-decorator'
import { cart, ProductItem, user } from '~/store'
import numberWithSpaces from '~/utils/numberWithSpaces'

@Component({
  fetchOnServer: false,
})
export default class CartMixin extends Vue {
  hasFetched = false
  products: Array<ProductItem> = []
  priceTotal = 0
  bonusTotal = 0
  discountTotal = 0

  numberWithSpaces = numberWithSpaces

  get hasAuth() {
    return user.hasAuth
  }

  get bonus() {
    return user.bonus
  }

  get countTotal() {
    return cart.countTotal
  }

  get cartRaw() {
    return cart.items
  }

  async fetch() {
    await cart.pullState()
    this.products = await cart.productsListAsync()
    this.hasFetched = true
  }

  async clearCart() {
    await cart.clear()
  }

  @Watch('cartRaw')
  async onCartItemsChange() {
    this.products = await cart.productsListAsync()
  }

  @Watch('products')
  calcPriceTotal() {
    let price = 0
    let discount = 0
    let bonus = 0

    this.products.forEach((product) => {
      const count = cart.items.get(product.id)?.count ?? 1
      price = price + product.price * count
      bonus = bonus + product.bonus * count
      discount = discount - (product.priceOld ?? 0) * count
    })

    this.priceTotal = price
    this.bonusTotal = bonus
  }
}
