<template>
  <header ref="header" class="header" :class="{ 'header--phone': isPhone }">
    <router-link v-if="isPhone" to="/">
      <img :src="logo" class="header__logo mb-3" alt="QUARTA" />
    </router-link>
    <div class="row">
      <div v-if="!isPhone" class="header__logo-section col">
        <router-link to="/">
          <img :src="logo" class="header__logo" alt="QUARTA" />
        </router-link>
      </div>

      <div class="header__search col">
        <HeaderSerachVue :mobile="true" />
      </div>

      <div class="header__actions col">
        <button class="btn btn-light text-primary p-2">
          <div class="position-relative px-1">
            <BurgerIcon />
          </div>
        </button>

        <button class="btn btn-link p-2 ms-2">
          <div
            class="position-relative px-1"
            @click="showContacts = !showContacts"
          >
            <PhoneIcon />
          </div>
        </button>
      </div>
    </div>

    <div v-if="showContacts" class="header__contacts">
      <div class="container">
        <h3>Контакты Санкт-Петербург</h3>
        <a href="tel:+78007750304">+7 (800) 775-03-04</a>
        <h4>Отдел оптовых продаж СПб</h4>
        <a href="tel:+78123477727">+7 (812) 347-77-27</a>
      </div>
    </div>

    <div class="header__bottom">
      <router-link class="header__bottom-item" to="/">
        <div class="header__bottom-icon">
          <HomeIcon />
        </div>
        <span>Главная</span>
      </router-link>

      <div class="header__bottom-item">
        <div class="header__bottom-icon">
          <CompareIcon />

          <div class="header__bottom-bage">6</div>
        </div>
        <span>Сравнить</span>
      </div>

      <div class="header__bottom-item">
        <div class="header__bottom-icon">
          <CartIcon />

          <div class="header__bottom-bage">2</div>
        </div>
        <span>Корзина</span>
      </div>

      <div class="header__bottom-item">
        <div class="header__bottom-icon">
          <HeartIcon />
        </div>
        <span>Избранное</span>
      </div>

      <div class="header__bottom-item">
        <div class="header__bottom-icon">
          <PersonIcon />
        </div>
        <span>Моя Quarta</span>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { useBreakpoints, breakpointsBootstrapV5 } from '@vueuse/core'
import { Component, Vue } from 'vue-property-decorator'

import {
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  watch
} from '@nuxtjs/composition-api'
import BageVue from '../Bage.vue'
import HeaderCategoriesVue from './HeaderCategories.vue'
import HeaderSerachVue from './HeaderSerach.vue'
import ModalLocationVue from '~/components/modal/ModalLocation.vue'

import logo from '@/assets/images/logo.svg'
import HeartIcon from '@/assets/icons/heart.svg?icon'
import CompareIcon from '@/assets/icons/compare.svg?icon'
import BurgerIcon from '@/assets/icons/burger.svg?icon'
import PhoneIcon from '@/assets/icons/phone.svg?icon'
import HomeIcon from '@/assets/icons/home.svg?icon'
import CartIcon from '@/assets/icons/cart.svg?icon'
import PersonIcon from '@/assets/icons/person-outline.svg?icon'

import { cart, globalModule, location } from '~/store'

@Component({
  components: {
    HeaderSerachVue,
    BageVue,
    HeaderCategoriesVue,
    ModalLocationVue,
    HeartIcon,
    BurgerIcon,
    CompareIcon,
    PhoneIcon,
    HomeIcon,
    CartIcon,
    PersonIcon
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const breakpoints = useBreakpoints(breakpointsBootstrapV5)
    const isPhone = breakpoints.smaller('md')

    onMounted(() => {
      proxy.isPhone = isPhone.value
    })

    watch(isPhone, () => {
      proxy.isPhone = isPhone.value
    })
  }
})
export default class HeaderMobileVue extends Vue {
  showSelectLoacation = false
  logo = logo
  isPhone = true

  showContacts = false

  get cartCount() {
    return cart.countTotal
  }

  get currentLocation() {
    return location.currentItem
  }
}
</script>

<style lang="scss" scoped>
.header {
  &__wrapper {
    // position: relative;
    height: 100%;
  }

  position: sticky;
  top: 0;
  padding: 0.75rem;
  background-color: $white;
  transition: transform 0.3s;
  z-index: $zindex-sticky;

  &--phone {
    top: -2rem;
  }

  &__logo-section {
    display: flex;
    align-items: center;
    max-width: 167px;
  }

  &__search {
    width: 100%;
  }

  &__logo {
    width: 147px;
    flex-grow: 0;
  }

  &__actions {
    display: flex;
    width: 150px;
    flex-grow: 0;
  }

  &__bottom {
    display: flex;
    justify-content: center;

    position: fixed;
    height: 3.75rem;
    top: calc(100vh - 3.75rem);
    left: 0;
    right: 0;
    background-color: $white;
  }

  &__bottom-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 4px 50px 0;
    width: 50px;
    height: 100%;

    &:hover svg {
      color: $secondary;
    }

    span {
      display: inline-flex;
      margin-bottom: 0.3125rem;
      text-align: center;
      font-size: 0.6875rem;
    }
  }

  &__bottom-icon {
    position: relative;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__bottom-bage {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate3d(50%, -25%, 0);
    background-color: $secondary;
    min-width: 21px;
    height: 21px;
    border-radius: 10.5px;
    color: $white;
    line-height: 1;
  }

  &__contacts {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    height: calc(100vh - 100%);
    background-color: $gray-100;
  }

  a {
    text-decoration: none;
    color: $body-color;
  }

  @include media-breakpoint-down('md') {
    &__bottom-item {
      margin: 0 35px;

      span {
        font-size: 0.5625rem;
      }
    }
  }

  @include media-breakpoint-down('sm') {
    &__bottom-item {
      margin: 0 11px;
    }
  }
}
</style>
