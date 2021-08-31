<template>
  <div class="product-card">
    <figure class="product-card__image"></figure>

    <div class="product-card__article">Артикул: AB66632</div>

    <div class="product-card__title">
      Рукоять Передняя Fab Defense Rsg На Picattiny...
    </div>

    <ProductPriceVue :current="4260" :old="5260" size="small" />
    <StarsVue />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StarsVue from '../stars/Stars.vue'
import ProductPriceVue from './ProductPrice.vue'

export default defineComponent({
  components: { StarsVue, ProductPriceVue },
  props: {
    size: {
      type: String,
      default: 'default',
    },
  },
  setup() {},
})
</script>

<style lang="scss" scoped>
.product-card {
  &__image {
    padding: 100% 0 1rem;
    background: $white;
    border-radius: 0.875rem;
  }

  &__title {
    font-size: 0.75rem;
    line-height: 150%;
    color: $gray-800;
    margin-bottom: 0.875rem;
  }
}
</style>
