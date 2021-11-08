<template>
  <div v-if="products.length" class="product-combo">
    <h5 class="mb-4">Вместе дешевле!</h5>
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

    <div class="row product-combo__actions">
      <div class="col-4">
        <div
          v-if="comboPrice !== comboPriceOld"
          class="product-combo__benefit mb-2"
        >
          Выгода -25%
        </div>

        <p class="text-dark fs-6">Общая стоимость выбранных товаров</p>
      </div>
      <div class="col-8">
        <div class="product-combo__price mb-2">
          Всего: {{ numberWithSpaces(comboPrice) }} ₽
          <span
            v-if="comboPrice !== comboPriceOld"
            class="product-combo__price-old"
          >
            {{ numberWithSpaces(comboPriceOld) }} ₽
          </span>
        </div>

        <div class="btn btn-primary">В корзину комплектом</div>

        <button
          class="btn bg-white mx-1"
          :class="{ 'text-secondary border-secondary': isInFavs }"
          @click="favCombo"
        >
          <HeartFillIcon v-if="isInFavs" /> <HeartIcon v-else />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import CheckboxVue from '../inputs/Checkbox.vue'
import ProductCardVue from './ProductCard.vue'
import { cart, favourites, ProductItem, products } from '~/store'

import HeartIcon from '@/assets/icons/heart.svg?icon'
import HeartFillIcon from '@/assets/icons/heart-fill.svg?icon'
import numberWithSpaces from '~/utils/numberWithSpaces'

@Component({
  components: { ProductCardVue, CheckboxVue, HeartIcon, HeartFillIcon }
})
export default class ProductComboVue extends Vue {
  products: Array<ProductItem> = []
  selected: Array<string> = []

  @Prop({ required: true }) parent!: ProductItem

  get numberWithSpaces() {
    return numberWithSpaces
  }

  async fetch() {
    this.products = [
      await products.getById('4860'),
      await products.getById('4861'),
      await products.getById('4862')
    ]
  }

  get comboPrice() {
    let price = this.parent.price

    for (const product of this.products) {
      if (this.selected.includes(product.id)) {
        price = price + product.price
      }
    }

    return price
  }

  get comboPriceOld() {
    let price = this.parent.priceOld || this.parent.price

    for (const product of this.products) {
      if (this.selected.includes(product.id)) {
        price = price + (product.priceOld || product.price)
      }
    }

    return price
  }

  get isInFavs() {
    let isInFavs = true

    for (const product of this.products) {
      isInFavs = isInFavs && favourites.hasItem(product.id)
    }

    return isInFavs
  }

  async addCombo() {
    for (const product of this.products) {
      await cart.addItem(product.id)
    }
  }

  async favCombo() {
    for (const product of this.products) {
      await favourites.addItem(product.id)
    }
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
  &__benefit {
    display: inline-block;
    background-color: $secondary;
    color: $white;
    border-radius: $border-radius-sm;
    padding: 0.125rem 0.375rem;
  }

  &__price {
    font-size: 1rem;
    font-weight: 500;
    color: $gray-800;

    &-old {
      color: $gray-600;
      font-size: 0.75rem;
      text-decoration: line-through;
    }
  }

  &__actions {
    [class*='col-']:first-of-type {
      position: relative;

      &::after {
        content: '=';
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        font-size: 1.2rem;
      }
    }
  }

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
