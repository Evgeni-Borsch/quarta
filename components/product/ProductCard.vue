<template>
  <div v-if="product" class="product-card">
    <div class="product-card__image">
      <div v-if="actions" class="product-card__image-actions">
        <component
          :is="isInCompare ? 'CompareFillIcon' : 'CompareIcon'"
          :class="{ 'text-secondary': isInCompare }"
          @click="toggleCompare"
        />
        <component
          :is="isInFavs ? `HeartFillIcon` : `HeartIcon`"
          class="product-card__fav"
          :class="{ 'text-secondary': isInFavs }"
          @click="toggleFavs"
        />
      </div>

      <component
        :is="link ? 'router-link' : 'span'"
        :to="`/product/${product.id}/${product.slug}`"
      >
        <figure>
          <img :src="product.images[0].small" :alt="product.title" />
        </figure>
      </component>
    </div>

    <router-link :to="`/product/${product.id}/${product.slug}`">
      <div class="product-card__article">Артикул: {{ product.article }}</div>
      <div class="product-card__title" v-html="product.title" />
    </router-link>

    <ProductPriceVue
      :current="product.price"
      :old="product.priceOld || null"
      :discount="product.discount || null"
      size="small"
    />
    <StarsVue v-if="stars" :rating="product.rating" :reviews="0" />

    <div v-if="addButton" class="product-card__add">
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
        class="btn btn-primary product-card__button"
        @click="() => addToCart(product.id)"
      >
        В корзину
      </button>

      <button
        v-if="remove"
        class="btn btn-light ms-2 product-card__remove"
        @click="emitRemove"
      >
        <TrashIcon />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Emit } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'

import StarsVue from '../stars/Stars.vue'
import ProductPriceVue from './ProductPrice.vue'
import CompareIcon from '~/assets/icons/compare.svg?icon'
import CompareFillIcon from '~/assets/icons/compare-fill.svg?icon'
import HeartIcon from '~/assets/icons/heart.svg?icon'
import HeartFillIcon from '@/assets/icons/heart-fill.svg?icon'
import TrashIcon from '@/assets/icons/trash.svg?icon'

import ProductMixin from '~/mixins/Product'

@Component({
  components: {
    StarsVue,
    ProductPriceVue,
    CompareIcon,
    HeartIcon,
    HeartFillIcon,
    TrashIcon,
    CompareFillIcon
  }
})
export default class ProductCardVue extends mixins(ProductMixin) {
  @Prop({ default: 'default' }) size!: string
  @Prop({ default: true }) addButton!: boolean
  @Prop({ default: true }) stars!: boolean
  @Prop({ default: true }) actions!: boolean
  @Prop({ default: true }) link!: boolean
  @Prop({ default: false }) remove!: boolean

  goToProduct() {
    if (!this.link) return null
    this.$router.push(`/product/${this.product.id}/${this.product.slug}`)
  }

  @Emit('remove')
  emitRemove() {
    return this.product
  }
}
</script>

<style lang="scss" scoped>
.product-card {
  display: flex;
  flex-direction: column;
  height: 100%;

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
      max-width: 90%;
      max-height: 90%;
    }
  }

  &__fav {
    &:hover {
      color: $secondary;
    }
  }

  &__image-actions {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0.875rem 0.75rem;
    z-index: 1;
    color: $gray-600;

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
    color: $gray-600;
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

  a {
    text-decoration: none;
  }

  &__add {
    display: flex;
    justify-content: stretch;
    // margin-top: auto;
    justify-self: flex-end;

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

  &__remove {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4rem !important;
    color: $gray-600;
    padding: 0 !important;
  }

  &::v-deep {
    .price {
      margin-top: auto;
      justify-self: flex-end;
    }
  }
}
</style>
