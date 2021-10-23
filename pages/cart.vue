<template>
  <div class="cart">
    <div class="container">
      <div class="row">
        <div class="col-8">
          <header class="cart__header">
            <h2>Корзина</h2>
            <small> (3 товара) </small>

            <button class="btn bg-white cart__clear">Очистить корзину</button>
          </header>
        </div>

        <div class="col-4">
          <router-link to="/catalog">Продолжить покупки</router-link>
        </div>
      </div>

      <div v-if="product" class="row">
        <div class="col-8">
          <hr class="mt-0 mb-4" />

          <ProductCardHorisontalVue :product="product" />
          <ProductCardHorisontalVue :product="product" />
          <ProductCardHorisontalVue :product="product" />

        </div>

        <div class="col-4">
          <CabinetSectionVue class="cart__summary">
            <div class="cart__total">
              Товары на сумму (3 шт.) <span> 30 340 ₽ </span>
            </div>
            <div class="cart__total-bonus">
              Баллы за покупку <span> +8 663 б. </span>
            </div>
            <hr />
            <p>
              Промокоды и&nbsp;баллы будут рассчитаны
              на&nbsp;странице&nbsp;оформления&nbsp;заказа
            </p>

            <button class="btn btn-primary btn-lg w-100">Оформить Заказ</button>
          </CabinetSectionVue>
          <CabinetSectionVue class="cart__bonus">
            <div class="cart__bonus-icon">
              <CoinStackIcon />
            </div>
            <div class="cart__bonus-text">
              <b>Доступно 2 800 бонусных баллов.</b> <br />
              Оплачивайте ими до 50% от стоимости покупки
            </div>
          </CabinetSectionVue>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import AuthBaseVue from '~/components/auth/AuthBase.vue'
import CabinetSectionVue from '~/components/cabinet/CabinetSection.vue'
import InputVue from '~/components/inputs/Input.vue'
import CabinetBonusVue from '~/components/cabinet/CabinetBonus.vue'

import PersonIcon from '~/assets/icons/person.svg?icon'
import DeliveryIcon from '~/assets/icons/delivery.svg?icon'
import CopyIcon from '~/assets/icons/copy.svg?icon'
import CoinStackIcon from '~/assets/icons/coin-stack.svg?icon'
import ProductCardHorisontalVue from '~/components/product/ProductCardHorisontal.vue'
import { ProductItem, products } from '~/store'

@Component({
  components: {
    AuthBaseVue,
    InputVue,
    CabinetSectionVue,
    CabinetBonusVue,
    PersonIcon,
    DeliveryIcon,
    CopyIcon,
    CoinStackIcon,
    ProductCardHorisontalVue
  },
  setup() {}
})
export default class CartPage extends Vue {
  product: ProductItem | null = null

  async fetch() {
    this.product = await products.getById('4691')
  }
}
</script>

<style lang="scss" scoped>
.cart {
  padding: 5.625rem 0;
  background-color: $gray-100;

  &__header {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;

    margin-bottom: 1.625rem;

    h2 {
      margin-bottom: 0;
    }

    small {
      margin-left: 1em;
    }
  }

  &__clear {
    align-self: flex-end;
    margin-left: auto;
  }

  &__summary {
    p {
      font-size: 0.75rem;
    }
  }

  &__total,
  &__total-bonus {
    font-size: 1rem;
    margin-bottom: 0.75rem;

    span {
      float: right;
    }
  }

  &__total {
    color: $gray-800;
    font-weight: 500;
  }

  &__bonus {
    background-color: $gray-200;
    color: $gray-800;

    &::v-deep > div {
      display: flex;
      flex-direction: row;
    }

    &-icon {
      color: $primary;
      padding-right: 0.75rem;
    }

    &-text {
      font-size: 1rem;
    }
  }
}
</style>
