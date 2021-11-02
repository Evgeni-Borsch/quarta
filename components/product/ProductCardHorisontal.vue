<template>
  <div class="product-card-horisontal">
    <div class="product-card-horisontal__close" @click="removeFromCart"></div>
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
  position: relative;

  &__close {
    position: absolute;
    top: 0;
    right: 0;
    width: 6px;
    height: 6px;
    background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.125881 0.125881C0.165683 0.0859786 0.212966 0.0543201 0.265022 0.0327193C0.317078 0.0111185 0.372884 0 0.429244 0C0.485604 0 0.54141 0.0111185 0.593466 0.0327193C0.645521 0.0543201 0.692805 0.0859786 0.732606 0.125881L3.00011 2.39424L5.26762 0.125881C5.30746 0.0860432 5.35475 0.0544418 5.4068 0.0328815C5.45885 0.0113213 5.51464 0.000224337 5.57098 0.000224337C5.62732 0.000224337 5.68311 0.0113213 5.73516 0.0328815C5.78721 0.0544418 5.83451 0.0860432 5.87434 0.125881C5.91418 0.165719 5.94578 0.213014 5.96734 0.265065C5.9889 0.317116 6 0.372904 6 0.429244C6 0.485583 5.9889 0.541372 5.96734 0.593423C5.94578 0.645474 5.91418 0.692768 5.87434 0.732606L3.60598 3.00011L5.87434 5.26762C5.91418 5.30746 5.94578 5.35475 5.96734 5.4068C5.9889 5.45885 6 5.51464 6 5.57098C6 5.62732 5.9889 5.68311 5.96734 5.73516C5.94578 5.78721 5.91418 5.83451 5.87434 5.87434C5.83451 5.91418 5.78721 5.94578 5.73516 5.96734C5.68311 5.9889 5.62732 6 5.57098 6C5.51464 6 5.45885 5.9889 5.4068 5.96734C5.35475 5.94578 5.30746 5.91418 5.26762 5.87434L3.00011 3.60598L0.732606 5.87434C0.692768 5.91418 0.645474 5.94578 0.593423 5.96734C0.541372 5.9889 0.485583 6 0.429244 6C0.372904 6 0.317116 5.9889 0.265065 5.96734C0.213014 5.94578 0.165719 5.91418 0.125881 5.87434C0.0860432 5.83451 0.0544418 5.78721 0.0328815 5.73516C0.0113213 5.68311 0.000224337 5.62732 0.000224337 5.57098C0.000224337 5.51464 0.0113213 5.45885 0.0328815 5.4068C0.0544418 5.35475 0.0860432 5.30746 0.125881 5.26762L2.39424 3.00011L0.125881 0.732606C0.0859786 0.692805 0.0543201 0.645521 0.0327193 0.593466C0.0111185 0.54141 0 0.485604 0 0.429244C0 0.372884 0.0111185 0.317078 0.0327193 0.265022C0.0543201 0.212966 0.0859786 0.165683 0.125881 0.125881Z' fill='%23808D9A'/%3E%3C/svg%3E%0A");
  }

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
