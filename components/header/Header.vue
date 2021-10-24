<template>
  <header
    ref="header"
    class="header"
    :class="{
      'header--hidden': !isTop && !scrollUp
    }"
  >
    <ModalLocationVue
      v-if="showSelectLoacation"
      @hide="showSelectLoacation = false"
    />
    <div class="container">
      <div class="row header__top-row">
        <div class="header__location col">
          <a class="header__city" @click="showSelectLoacation = true">
            <LocationIcon class="mx-1" />{{ currentLocation.name }}
          </a>
          <div
            ref="spots"
            class="header__spot"
            :class="{ 'header__spot--show': showSpots }"
          >
            <span @click="showSpots = !showSpots">
              Магазины <ArrowSmallIcon class="icon" />
            </span>
            <div v-if="showSpots" class="header__spot-dropdown">
              <div class="header__spot-dropdown-item">
                <span>Адрес:</span> Санкт-Петербург, наб. Обводного канала, д.
                207Б
                <br />
                <span>Режим работы:</span> с 10:00 до 22:00
              </div>
              <div class="header__spot-dropdown-item">
                <span>Адрес:</span> Санкт-Петербург, наб. Обводного канала, д.
                207Б
                <br />
                <span>Режим работы:</span> с 10:00 до 22:00
              </div>
              <div class="header__spot-dropdown-item">
                <span>Адрес:</span> Санкт-Петербург, наб. Обводного канала, д.
                207Б
                <br />
                <span>Режим работы:</span> с 10:00 до 22:00
              </div>
            </div>
          </div>
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
          <router-link to="/login"><PersonIcon class="mx-1" />Личный кабинет</router-link>
        </div>
      </div>

      <div class="row header__main-row">
        <div class="header__logo-section">
          <router-link to="/">
            <img :src="logo" class="header__logo" alt="QUARTA" />
          </router-link>
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
            </div>
          </button>

          <button class="btn btn-link px-2 mx-2">
            <div class="position-relative px-1">
              <CartIcon />
              <BageVue v-if="cartCount">{{ cartCount }}</BageVue>
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
import { computed, onMounted, Ref, ref } from '@nuxtjs/composition-api'
import {
  useWindowScroll,
  debouncedWatch,
  onClickOutside,
  templateRef
} from '@vueuse/core'
import { Component, Vue } from 'vue-property-decorator'

import BageVue from '../Bage.vue'
import HeaderCategoriesVue from './HeaderCategories.vue'
import HeaderSerachVue from './HeaderSerach.vue'
import ModalLocationVue from '~/components/modal/ModalLocation.vue'

import logo from '@/assets/images/logo.svg'
import HeartIcon from '@/assets/icons/heart.svg?icon'
import CompareIcon from '@/assets/icons/compare.svg?icon'
import CartIcon from '@/assets/icons/cart.svg?icon'
import LocationIcon from '@/assets/icons/location.svg?icon'
import PersonIcon from '@/assets/icons/person.svg?icon'
import ArrowSmallIcon from '@/assets/icons/arrow-small.svg?icon'

import { cart, location } from '~/store'

@Component({
  name: 'Header',
  components: {
    HeaderSerachVue,
    BageVue,
    HeaderCategoriesVue,
    ModalLocationVue,
    HeartIcon,
    CartIcon,
    CompareIcon,
    LocationIcon,
    PersonIcon,
    ArrowSmallIcon
  },
  setup() {
    const showSpots = ref(false)
    const { y: scrollY } = useWindowScroll()
    const direction: Ref<string> = ref('down')
    const lastScrollY: Ref<number> = ref(0)
    const prevDirection = ref('down')
    const scrollUp = ref(false)
    const isTop = computed(() => scrollY.value < globalThis?.innerHeight ?? 200)
    const spotsRef = templateRef('spots')

    onClickOutside(spotsRef, () => {
      if (showSpots.value) showSpots.value = false
    })

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

    return { logo, direction, isTop, lastScrollY, scrollUp, showSpots }
  }
})
export default class HeaderVue extends Vue {
  showSelectLoacation = false

  get cartCount() {
    return cart.countTotal
  }

  get currentLocation() {
    return location.currentItem
  }
}
</script>

<style lang="scss" scoped>
@mixin middle-column {
  min-width: 702px;
  max-width: 702px;

  @include media-breakpoint-down('xxl') {
    min-width: 600px;
    max-width: 600px;
  }
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

    @include media-breakpoint-down('xxl') {
      min-width: 280px;
      max-width: 280px;
    }
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
    cursor: pointer;
  }

  &__spot {
    position: relative;

    .icon {
      transition: transform 0.2s, color 0.2s;
    }

    & > span {
      transition: color 0.2s;
    }

    & > span:hover {
      color: $primary;
    }

    &--show {
      .icon {
        transform: rotate(180deg);
        color: $primary;
      }
    }
  }

  &__spot-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    width: 460px;
    background-color: $white;
    box-shadow: $box-shadow-sm;
    border-radius: $border-radius-sm;
    padding: 1.375rem 0.875rem;
    z-index: $zindex-tooltip;
  }

  &__spot-dropdown-item {
    font-size: 0.75rem;
    color: $gray-800;

    &:hover {
      color: $primary !important;
    }

    &:not(:last-child) {
      margin-bottom: 1.875rem;
    }

    span {
      color: $gray-600;
    }
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
