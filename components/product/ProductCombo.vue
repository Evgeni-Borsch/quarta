<template>
  <div class="product-combo">
    <div class="row">
      <div class="col-4 px-3">
        <ProductCardVue />
      </div>
      <div class="col-4 px-3">
        <ProductCardVue />
      </div>
      <div class="col-4 px-3">
        <ProductCardVue />
      </div>
    </div>

    <hr />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ProductCardVue from './ProductCard.vue'

export default defineComponent({
  components: { ProductCardVue },
  props: {
    parent: {
      type: String,
      required: true,
    },
  },
  setup() {},
})
</script>

<style lang="scss" scoped>
.product-combo {
  [class*='col-'] {

    &::v-deep figure {
      position: relative;
    }

    &:not(:first-child)::v-deep figure:before {
      content: '+';
      position: absolute;
      left: -2rem;
      top: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2rem;
      font-size: 1.4rem;
    }
  }
}
</style>
