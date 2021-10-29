import { Component, Prop, Vue } from 'vue-property-decorator'
import { cart, favourites, ProductItem } from '~/store'

@Component({})
export default class ProductMixin extends Vue {
  @Prop({ required: true }) product!: ProductItem

  get isInCart() {
    return cart.items.has(this.product.id)
  }

  get isInFavs() {
    return favourites.items.includes(this.product.id)
  }

  get count() {
    return cart.getItem(this.product.id)?.count ?? 1
  }

  get mainPhoto() {
    return this.product.images[0]?.small
  }

  addToCart() {
    cart.addItem(this.product.id)
  }

  toggleFavs() {
    if (this.isInFavs) {
      favourites.removeItem(this.product.id)
    } else {
      favourites.addItem(this.product.id)
    }
  }

  setCount(count: number) {
    cart.setCount({ id: this.product.id, count })
  }

  increaseCount() {
    this.setCount(this.count + 1)
  }

  decreaseCount() {
    if (this.count > 0) {
      this.setCount(this.count - 1)
    }
  }

  onCountInput(e: Event & { target: HTMLInputElement }) {
    const count = Math.abs(parseInt(e.target.value))

    if (isNaN(count)) {
      e.target.value = this.count.toString()
    }

    this.setCount(count)
  }
}
