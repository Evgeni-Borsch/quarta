<template>
  <div v-if="availability" class="product-availability container pb-5">
    <h3>Наличие товара</h3>

    <div class="row product-availability__header">
      <div class="col-5 product-availability__cell">Адрес</div>
      <div class="col-2 product-availability__cell">Режим работы</div>
      <div class="col-3 product-availability__cell">Наличие</div>
      <div class="col"></div>
    </div>

    <div
      v-for="store of availability.stores"
      :key="store.id"
      class="row product-availability__spot"
    >
      <div class="col-5 product-availability__cell">
        <div class="product-availability__address">
          <LocationIcon class="icon" />
          <span v-html="store.title" />
        </div>
      </div>
      <div class="col-2 product-availability__cell">{{ store.schedule }}</div>
      <div class="col-3 product-availability__cell">
        <ProductAvailabilityBageVue :avaible="!!store.amount" />
      </div>
      <div class="col-2 product-availability__cell">
        <button class="btn" :disabled="!store.amount">Выбрать</button>
      </div>
    </div>

    <hr />
  </div>
  <LoadingVue v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import LoadingVue from '../Loading.vue'
import ProductAvailabilityBageVue from './ProductAvailabilityBage.vue'
import LocationIcon from '~/assets/icons/location.svg?icon'
import { ProductAvailability, ProductItem, products } from '~/store'

@Component({
  components: { LocationIcon, ProductAvailabilityBageVue, LoadingVue }
})
export default class ProductAvailabilityVue extends Vue {
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
</script>

<style lang="scss" scoped>
.product-availability {
  color: $gray-800;

  .btn {
    color: $gray-800;
    background-color: $gray-100;
    padding: 0.8125rem 3rem;
    font-weight: 500;
  }

  &__cell {
    justify-content: flex-start;
    display: flex;
    align-items: center;
    padding: 1.125rem 1.25rem;

    &:last-child {
      justify-content: flex-end;
      padding-right: 0;
    }
  }

  &__header {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    background-color: $gray-100;
    border-radius: $border-radius-sm;
    font-size: 0.8125rem;
  }

  &__address {
    position: relative;
    padding-left: 1.25rem;

    b {
      font-weight: 500;
    }

    .icon {
      position: absolute;
      top: 0.1rem;
      left: 0;
      height: 0.8125rem;
      color: $gray-600;
    }
  }
}
</style>
