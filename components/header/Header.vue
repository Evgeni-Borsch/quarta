<template>
  <header
    ref="header"
    class="header"
    :class="{
      'header--hidden': !isTop && !scrollUp,
    }"
  >
    <div class="container">
      <div class="row header__top-row">
        <div class="header__location col">
          <a href="#" class="header__city">
            <LocationIcon class="mx-1" />Санкт-Петербург
          </a>
          <a href="#" class="header__spot">Магазины</a>
        </div>

        <div class="header__nav col">
          <a href="#" class="header__nav-item header__nav-item--selected">
            Оптовикам
          </a>
          <a href="#" class="header__nav-item">О компании</a>
          <a href="#" class="header__nav-item">Новости</a>
          <a href="#" class="header__nav-item">Акции</a>
          <a href="#" class="header__nav-item">Гарантии</a>
          <a href="#" class="header__nav-item">Контакты</a>
          <a href="#" class="header__nav-item">Доставка</a>
        </div>

        <div class="header__user col">
          <a href="#"><PersonIcon class="mx-1" />Личный кабинет</a>
        </div>
      </div>

      <div class="row header__main-row">
        <div class="header__logo-section">
          <a href="/">
            <img :src="logo" class="header__logo" alt="QUARTA" />
          </a>
        </div>

        <div class="header__search-section col">
          <HeaderSerachVue />
        </div>

        <div class="header__lists-section col">
          <button class="btn btn-link px-2 mx-2">
            <div class="position-relative px-1">
              <CompareIcon />
            </div>
          </button>

          <button class="btn btn-link px-2 mx-2">
            <div class="position-relative px-1">
              <HeartIcon />
              <BageVue>3</BageVue>
            </div>
          </button>

          <button class="btn btn-link px-2 mx-2">
            <div class="position-relative px-1">
              <CartIcon />
              <BageVue>4</BageVue>
            </div>
          </button>
        </div>
      </div>

      <div class="row">
        <HeaderCategoriesVue />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  Ref,
  ref,
} from '@nuxtjs/composition-api'
import { useWindowScroll, throttledWatch, debouncedWatch } from '@vueuse/core'

import BageVue from '../Bage.vue'
import HeaderCategoriesVue from './HeaderCategories.vue'
import HeaderSerachVue from './HeaderSerach.vue'

import logo from '@/assets/images/logo.svg'
import HeartIcon from '@/assets/icons/heart.svg?icon'
import CompareIcon from '@/assets/icons/compare.svg?icon'
import CartIcon from '@/assets/icons/cart.svg?icon'
import LocationIcon from '@/assets/icons/location.svg?icon'
import PersonIcon from '@/assets/icons/person.svg?icon'

export default defineComponent({
  name: 'Header',
  components: {
    HeaderSerachVue,
    BageVue,
    HeaderCategoriesVue,
    HeartIcon,
    CartIcon,
    CompareIcon,
    LocationIcon,
    PersonIcon,
  },
  setup() {
    const { y: scrollY } = useWindowScroll()
    const direction: Ref<string> = ref('down')
    const lastScrollY: Ref<number> = ref(0)
    const prevDirection = ref('down')
    const scrollUp = ref(false)
    const isTop = computed(() => scrollY.value < globalThis.innerHeight ?? 200)

    onMounted(() => {
      debouncedWatch(
        scrollY,
        (scrollY: number) => {
          prevDirection.value = direction.value
          direction.value = lastScrollY.value < scrollY ? 'down' : 'up'
          scrollUp.value =
            direction.value === 'up' && lastScrollY.value - scrollY > 150
          lastScrollY.value = scrollY
        },
        { debounce: 250 }
      )
    })

    return { logo, direction, isTop, lastScrollY, scrollUp }
  },
})
</script>

<style lang="scss" scoped>
@mixin middle-column {
  min-width: 702px;
  max-width: 702px;
}

.btn {
  svg {
    transition: transform 0.1s ease-in-out;
  }

  &:hover,
  &:focus {
    & svg {
      transform: scale(1.1);
    }
  }
}

.header {
  // position: sticky;
  top: 0;

  padding-top: 14px;
  background-color: $white;
  z-index: $zindex-sticky;
  transition: transform 0.3s;

  a {
    text-decoration: none;
    color: $body-color;
  }

  &__top-row {
    margin-bottom: 22px;

    a {
      font-size: 0.75rem;
      transition: $transition-base;
      color: $body-color;

      &:hover,
      &:focus {
        color: $primary;
      }
    }
  }

  &__location,
  &__logo-section {
    min-width: 333px;
    max-width: 333px;
  }

  &__logo {
    width: 248px;
  }

  &__search-section {
    @include middle-column;
  }

  &__lists-section {
    display: flex;
    justify-content: flex-end;
  }

  &__location {
    display: flex;
    align-items: center;
  }

  &__city,
  &__spot {
    display: inline-flex;
    align-items: center;
    margin-right: 1rem;
  }

  &__nav {
    @include middle-column;

    font-size: 0.75rem;
    line-height: 150%;

    &-item {
      display: inline-block;
      padding: 0 6px;
      border-radius: $border-radius-sm;
      color: $body-color;
      margin-right: 15px;

      &:hover {
        color: $primary;
      }

      &--selected {
        background: $gray-200;

        &:hover {
          color: $dark;
        }
      }
    }
  }

  &__user {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    a {
      font-size: 0.75rem;
      line-height: 150%;

      &:hover,
      &:focus {
        color: $primary;
      }
    }
  }

  &--hidden {
    transform: translateY(-100%);
  }
}
</style>
