<template>
  <section v-if="product" class="product">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <ProductPhotosVue :images="product.images" />
        </div>

        <div class="col-6">
          <div class="product__article">Артикул: {{ product.article }}</div>

          <div class="product__title">
            {{ product.title }}
          </div>

          <StarsVue />

          <ProductPriceVue
            :current="product.price"
            :old="product.priceOld"
            :discount="product.discount"
          />

          <div class="product__availability">
            <span class="product__availability-in-stock"> В наличии </span>
            <a href="#"> Посмотреть наличие </a>
            <InfoVue />
          </div>

          <div class="product__bonus">
            <span class="product__bonus-points"> + {{ product.bonus }} б </span>
            Бонусные баллы
            <InfoVue />
          </div>

          <div class="product__add">
            <span v-if="isInCart" class="product__add-count">
              <span class="product__add-minus" @click="decreaseCount">-</span>
              <span class="product__add-plus" @click="increaseCount">+</span>

              <input
                :value="count"
                type="number"
                class="form-control"
                @input="onCountInput"
              />
            </span>

            <button v-else class="btn btn-primary" @click="addToCart">
              В корзину
            </button>
            <button class="btn bg-white mx-1"><HeartIcon /> В избранное</button>
            <button class="btn bg-white mx-1">
              <CompareIcon /> В сравнение
            </button>
          </div>

          <hr />

          <div class="product__delivery">
            <div class="product__delivery-option">
              <div class="product__delivery-icon">
                <DeliveryIcon />
              </div>
              Доставка по Москве: <span class="text-dark">с 11.03</span><br />
              <a href="#">Узнать стоимость</a>
            </div>
            <div class="product__delivery-option">
              <div class="product__delivery-icon">
                <LoactionIcon />
              </div>
              Доступно к самовывозу:
              <span class="text-dark">бесплатно, С 10.03,</span><br />
              <a href="#">28 магазинах</a>
            </div>
          </div>

          <ProductComboVue parent="parentId" />
        </div>
      </div>
    </div>

    <ProductAboutVue :product="product" />
  </section>
</template>

<script lang="ts">
import { Ref, ref, unref, watch } from '@nuxtjs/composition-api'
import { Component, Prop, Vue } from 'vue-property-decorator'

import ProductAboutVue from './ProductAbout.vue'

import HeartIcon from '@/assets/icons/heart.svg?icon'
import CompareIcon from '@/assets/icons/compare.svg?icon'

import DeliveryIcon from '@/assets/icons/delivery.svg?icon'
import LoactionIcon from '@/assets/icons/location.svg?icon'
import StarsVue from '@/components/stars/Stars.vue'
import InfoVue from '@/components/Info.vue'
import ProductPriceVue from '@/components/product/ProductPrice.vue'
import ProductPhotosVue from '@/components/product/ProductPhotos.vue'
import ProductComboVue from '@/components/product/ProductCombo.vue'
import { cart, ProductItem } from '~/store'

@Component({
  components: {
    InfoVue,
    StarsVue,
    ProductPriceVue,
    ProductPhotosVue,
    ProductComboVue,
    ProductAboutVue,
    DeliveryIcon,
    LoactionIcon,
    HeartIcon,
    CompareIcon,
  },
})
export default class ProductVue extends Vue {
  @Prop({ required: true }) product!: ProductItem

  get isInCart() {
    return cart.items.has(this.product.id)
  }

  get count() {
    return cart.getItem(this.product.id)?.count ?? 1
  }

  addToCart() {
    cart.addItem(this.product.id)
  }

  setCount(count: number) {
    cart.setCount({ id: this.product.id, count })
  }

  increaseCount() {
    this.setCount(this.count + 1)
  }

  decreaseCount() {
    if (this.count > 0) {
      this.setCount(this.count - 1)
    }
  }

  onCountInput(e: Event & { target: HTMLInputElement }) {
    const count = Math.abs(parseInt(e.target.value))

    if (isNaN(count)) {
      e.target.value = this.count.toString()
    }

    this.setCount(count)
  }
}
</script>

<style lang="scss" scoped>
.product {
  background-color: $body-bg;

  &__article {
    line-height: 0.6875rem;
    margin-bottom: 0.75rem;
  }

  &__title {
    font-weight: 500;
    font-size: 1.625rem;
    line-height: 120%;
    color: $dark;
    margin-bottom: 0.75rem;
  }

  &__price {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 0.75rem;

    font-weight: 500;
    line-height: 130%;

    &-current {
      font-size: 1.625rem;
      color: $dark;
    }

    &-old {
      margin-left: 0.5rem;
      text-decoration-line: line-through;
    }

    &-discount {
      display: inline-block;
      padding: 0 0.3125rem;
      line-height: 1rem;
      margin-left: 0.5rem;
      background-color: $secondary;
      color: $white;
      border-radius: $border-radius-sm;
    }
  }

  &__bonus {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1.125rem;

    &-points {
      padding: 0.3125rem 0.75rem;
      margin-right: 0.75rem;
      background-color: $gray-200;
      border-radius: $border-radius-sm;
      color: $dark;
    }
  }

  &__add {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &-count {
      position: relative;
      display: inline-block;
      width: 6.25rem;
      margin-right: 0.375rem;

      .form-control {
        font-size: 1rem;
        line-height: 130%;
        color: $black;
        text-align: center;
        background-color: $gray-200;
        border-color: $gray-200;
      }
    }

    &-minus {
      left: 0;
    }
    &-plus {
      right: 0;
    }

    &-minus,
    &-plus {
      position: absolute;
      top: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2rem;
      color: $black;
      cursor: pointer;

      &:active {
        transform: scale(0.8);
      }
    }
  }

  &__availability {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1.5rem;

    &-in-stock {
      display: inline-flex;
      align-items: center;
      color: $secondary;
      margin-right: 0.3125rem;

      &::before {
        content: '';
        display: inline-block;
        width: 0.25rem;
        height: 0.25rem;
        margin-right: 0.3125rem;
        border-radius: 50%;
        background-color: $secondary;
      }
    }
  }

  &__delivery {
    &-icon {
      position: absolute;
      top: 1px;
      left: 0;
      width: 1rem;
      display: flex;
      justify-content: center;
    }

    &-option {
      position: relative;
      padding-left: 1.75rem;
      margin-bottom: 0.875rem;
    }
  }
}
</style>
