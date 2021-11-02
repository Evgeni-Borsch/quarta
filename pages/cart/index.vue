<template>
  <div class="cart">
    <BreadcrumbsVue :path="breadcrumbs" />

    <div v-if="!hasFetched" class="container">
      <LoadingVue />
    </div>

    <div v-else-if="products.length || true" class="container">
      <div class="row">
        <div class="col-8">
          <header class="cart__header">
            <h2>Корзина</h2>
            <small> ({{ countTotal }} товара) </small>

            <button class="btn bg-white cart__clear" @click="clearCart">
              Очистить корзину
            </button>
          </header>
        </div>

        <div class="col-4 d-flex">
          <router-link to="/catalog" class="cart__back">
            Продолжить покупки
          </router-link>
        </div>
      </div>

      <div class="row">
        <div class="col-8">
          <hr class="mt-0 mb-4" />

          <ProductCardHorisontalVue
            v-for="product of products"
            :key="product.id"
            :product="product"
          />
        </div>

        <div class="col-4">
          <CabinetSectionVue class="cart__summary">
            <div class="cart__total">
              Товары на сумму ({{ countTotal }} шт.)
              <span> {{ numberWithSpaces(priceTotal) }} ₽ </span>
            </div>
            <div class="cart__total-bonus">
              Баллы за покупку
              <span> +{{ numberWithSpaces(bonusTotal) }} б. </span>
            </div>
            <hr />
            <p>
              Промокоды и&nbsp;баллы будут рассчитаны
              на&nbsp;странице&nbsp;оформления&nbsp;заказа
            </p>

            <router-link
              to="/cart/purchase"
              class="btn btn-primary btn-lg w-100"
              >Оформить Заказ</router-link
            >
          </CabinetSectionVue>
          <CabinetSectionVue class="cart__bonus">
            <div class="cart__bonus-icon">
              <CoinStackIcon />
            </div>
            <div v-if="hasAuth && bonus" class="cart__bonus-text">
              <b>Доступно {{ numberWithSpaces(bonus) }} бонусных баллов.</b>
              <br />
              Оплачивайте ими до 50% от стоимости покупки
            </div>
          </CabinetSectionVue>
        </div>
      </div>
    </div>

    <div v-else class="container">
      <div class="cart__empty">
        <h2>Ваша корзина пуста</h2>
        <p>Воспользуйтесь поиском, чтобы найти всё, что нужно.</p>
        <router-link class="btn btn-lg btn-primary" to="/catalog"
          >Продолжить покупки</router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'

import { mixins } from 'vue-class-component'
import AuthBaseVue from '~/components/auth/AuthBase.vue'
import CabinetSectionVue from '~/components/cabinet/CabinetSection.vue'
import InputVue from '~/components/inputs/Input.vue'
import CabinetBonusVue from '~/components/cabinet/CabinetBonus.vue'

import PersonIcon from '~/assets/icons/person.svg?icon'
import DeliveryIcon from '~/assets/icons/delivery.svg?icon'
import CopyIcon from '~/assets/icons/copy.svg?icon'
import CoinStackIcon from '~/assets/icons/coin-stack.svg?icon'
import ProductCardHorisontalVue from '~/components/product/ProductCardHorisontal.vue'
import LoadingVue from '~/components/Loading.vue'
import BreadcrumbsVue from '~/components/Breadcrumbs.vue'

import CartMixin from '~/mixins/Cart'
import { Page } from '~/models/general'
import { cart } from '~/store'

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
    ProductCardHorisontalVue,
    LoadingVue,
    BreadcrumbsVue
  },
  setup() {},
  fetchOnServer: false
})
export default class CartPage extends mixins(CartMixin) {
  breadcrumbs: Array<Page> = [
    {
      title: 'Главная',
      slug: 'index',
      path: '/'
    },
    {
      title: 'Корзина',
      slug: 'cart',
      path: '/cart'
    }
  ]
}
</script>

<style lang="scss" scoped>
.cart {
  padding: 0 0 8.4375rem;
  background-color: $gray-100;

  &__back {
    justify-self: flex-end;
    margin-left: auto;
    margin-top: 1rem;

    &::after {
      content: '';
      display: inline-block;
      width: 5px;
      height: 7px;
      margin-left: 0.5rem;
      background-image: url("data:image/svg+xml,%3Csvg width='5' height='7' viewBox='0 0 5 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.58905e-07 0.81823L2.48446 3.30269L1.07309e-07 5.78715L0.818315 6.60547L4.12109 3.30269L0.818316 -8.66771e-05L7.58905e-07 0.81823Z' fill='%23004989'/%3E%3C/svg%3E%0A");
    }
  }

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

  &__empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 15rem;
    text-align: center;
  }
}
</style>
