<template>
  <div v-if="product" class="product-card">
    <div class="product-card__image">
      <div class="product-card__image-actions">
        <CompareIcon />
        <HeartIcon />
      </div>

      <router-link :to="`/product/${product.id}/${product.slug}`">
        <figure>
          <img src="/product-01-01.jpg" :alt="product.title" />
        </figure>
      </router-link>
    </div>

    <div class="product-card__article">Артикул: {{ product.article }}</div>

    <router-link
      :to="`/product/${product.id}/${product.slug}`"
      class="product-card__title"
      v-html="product.title"
    />

    <ProductPriceVue
      :current="product.price"
      :old="product.priceOld || null"
      :discount="product.discount || null"
      size="small"
    />
    <StarsVue :rating="4.7" :reviews="4" />

    <div class="product-card__add">
      <span v-if="isInCart" class="input-group product__add-count">
        <span class="btn btn-primary product__add-minus" @click="decreaseCount"
          >-</span
        >
        <input
          :value="count"
          type="number"
          class="form-control"
          @input="onCountInput"
        />
        <span class="btn btn-primary product__add-plus" @click="increaseCount"
          >+</span
        >
      </span>

      <button
        v-else
        class="btn btn-primary"
        @click="() => addToCart(product.id)"
      >
        В корзину
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'

import StarsVue from '../stars/Stars.vue'
import ProductPriceVue from './ProductPrice.vue'
import CompareIcon from '~/assets/icons/compare.svg?icon'
import HeartIcon from '~/assets/icons/heart.svg?icon'

import ProductMixin from '~/mixins/Product'

@Component({
  components: { StarsVue, ProductPriceVue, CompareIcon, HeartIcon }
})
export default class ProductCardVue extends mixins(ProductMixin) {
  @Prop({ default: 'default' }) size!: string
}
</script>

<style lang="scss" scoped>
.product-card {
  &__image {
    position: relative;
    padding: 120% 0 0;
    margin-bottom: 1.25rem;
    background: $white;
    border-radius: 0.875rem;

    figure {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      max-width: 100%;
    }

    img {
      max-width: 100%;
    }
  }

  &__image-actions {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0.875rem 0.75rem;
    z-index: 1;

    img,
    svg {
      margin-left: 0.5rem;
      cursor: pointer;
      transition: color 0.3s;
    }

    svg:hover {
      color: $primary;
    }
  }

  &__article {
    margin-bottom: 0.5rem;
  }

  &__title {
    max-width: 90%;
    height: 2.6rem;
    display: block;
    font-size: 1rem;
    line-height: 130%;
    color: $gray-800;
    margin-bottom: 0.875rem;
    text-decoration: none;
    cursor: pointer;
    overflow: hidden;
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  &__add {
    display: flex;
    justify-content: stretch;

    .btn {
      width: 100%;
      font-weight: 500;
      padding: 0.8125rem 1.5rem;
    }

    .input-group {
      &,
      & input {
        background-color: $gray-200;
      }

      input {
        text-align: center;
        color: $gray-800;
        font-size: 1rem;
      }

      .btn {
        width: auto;
        border-radius: $border-radius-sm !important;
      }
    }
  }
}
</style>
