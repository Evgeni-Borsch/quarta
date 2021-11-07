<template>
  <div v-if="products.length" class="product-combo">
    <h5>Вместе дешевле!</h5>
    <div class="row">
      <div v-for="product of products" :key="product.id" class="col-4 px-3">
        <CheckboxVue :value="selected.includes(product.id)" />
        <ProductCardVue
          :product="product"
          :add-button="false"
          :actions="false"
          :link="false"
          @click.native="(e) => toggleItem(e, product.id)"
        />
      </div>
    </div>

    <hr />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import CheckboxVue from '../inputs/Checkbox.vue'
import ProductCardVue from './ProductCard.vue'
import { ProductItem, products } from '~/store'

@Component({
  components: { ProductCardVue, CheckboxVue }
})
export default class ProductComboVue extends Vue {
  products: Array<ProductItem> = []
  selected: Array<string> = []

  @Prop({ required: true }) parent!: string

  async fetch() {
    this.products = [
      await products.getById('4860'),
      await products.getById('4861'),
      await products.getById('4862')
    ]
  }

  toggleItem(event: Event, id: string) {
    event.preventDefault()
    event.stopPropagation()

    if (this.selected.includes(id)) {
      const index = this.selected.indexOf(id)
      this.selected.splice(index, 1)
    } else {
      this.selected.push(id)
    }
  }
}
</script>

<style lang="scss" scoped>
.product-combo {
  [class*='col-'] {
    position: relative;

    &::v-deep {
      .checkbox {
        position: absolute;
        top: 0.75rem;
        right: 1rem;
        z-index: 1;
        pointer-events: none;

        input {
          border-color: $gray-600;
        }
      }
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
