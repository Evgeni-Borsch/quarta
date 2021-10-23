<template>
  <div class="product-card-horisontal">
    <div class="row">
      <div class="col-2">
        <figure class="product-card-horisontal__image">
          <img :src="mainPhoto" :alt="product.title" />
        </figure>
      </div>

      <div class="col-4 ps-4">
        <div class="product-card-horisontal__article">
          Артикул: {{ product.article }}
        </div>
        <div class="product-card-horisontal__title">
          {{ product.title }}
        </div>

        <StarsVue :rating="4.7" :reviews="4" />
      </div>

      <div class="col-2">
        <div class="product-card-horisontal__price">
          {{ numberWithSpaces(product.price) }} ₽
        </div>

        <div v-if="product.priceOld" class="product-card-horisontal__old-price">
          {{ numberWithSpaces(product.priceOld) }} ₽
        </div>

        <div v-if="product.bonus" class="product-card-horisontal__bonus">
          +{{ numberWithSpaces(product.bonus) }} на счет
        </div>
      </div>

      <div class="col-2">
        <ProductCountVue :product="product" />
      </div>

      <div class="col-2">
        <div class="product-card-horisontal__price">
          {{ numberWithSpaces(product.price * count) }} ₽
        </div>

        <div v-if="product.priceOld" class="product-card-horisontal__old-price">
          {{ numberWithSpaces(product.priceOld * count) }} ₽
        </div>

        <div v-if="product.bonus" class="product-card-horisontal__bonus">
          +{{ numberWithSpaces(product.bonus * count) }} на счет
        </div>
      </div>
    </div>

    <hr class="my-4" />
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Vue, Component, Prop } from 'vue-property-decorator'
import StarsVue from '../stars'
import ProductCountVue from './ProductCount.vue'
import ProductMixin from '~/mixins/Product'
import numberWithSpaces from '~/utils/numberWithSpaces'

@Component({
  components: {
    ProductCountVue,
    StarsVue
  }
})
export default class ProductCardHorisontalVue extends mixins(ProductMixin) {
  numberWithSpaces = numberWithSpaces
}
</script>

<style lang="scss" scoped>
.product-card-horisontal {
  &__image {
    display: flex;
    align-items: center;

    width: 128px;
    height: 9.625rem;
    margin: 0;
    background-color: $white;
    border-radius: $border-radius;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  &__article {
    margin-bottom: 0.75rem;
  }

  &__title {
    max-width: 90%;
    height: 2.6rem;
    display: block;
    font-size: 1rem;
    line-height: 130%;
    color: $gray-800;
    // margin-bottom: 0.875rem;
    text-decoration: none;
    cursor: pointer;
    overflow: hidden;
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  &__price {
    font-size: 1rem;
    font-weight: 500;
    color: $gray-800;
  }

  &__old-price {
    font-size: 0.75rem;
    font-weight: 500;
    color: $gray-600;
    text-decoration: line-through;
  }

  &__bonus {
    margin-top: 0.3125rem;
  }
}
</style>
