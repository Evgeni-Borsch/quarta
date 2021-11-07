import { Component, Prop, Vue } from 'vue-property-decorator'
import { ProductAvailability, ProductItem, products } from '~/store'

@Component({})
export default class AvailabilityMixin extends Vue {
  availability: ProductAvailability | null = null

  @Prop({ required: true }) product!: ProductItem

  async fetchAvailability() {
    this.availability = (await products.getProductAvailability(
      this.product.id
    )) as ProductAvailability
  }

  beforeMount() {
    this.fetchAvailability()
  }
}
