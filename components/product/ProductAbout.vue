<template>
  <div class="product-about">
    <div class="product-about__tabs">
      <div class="container">
        <button
          class="product-about__tab"
          :class="createDynamicClass('description')"
          @click="setCurrentTab('description')"
        >
          Описание и характеристики
        </button>
        <button
          class="product-about__tab"
          :class="createDynamicClass('availability')"
          @click="setCurrentTab('availability')"
        >
          Посмотреть наличие
        </button>
        <button
          class="product-about__tab"
          :class="createDynamicClass('documents')"
          @click="setCurrentTab('documents')"
        >
          Инструкции
        </button>
        <button
          class="product-about__tab"
          :class="createDynamicClass('questions')"
          @click="setCurrentTab('questions')"
        >
          Задать вопрос
        </button>
        <button
          class="product-about__tab"
          :class="createDynamicClass('reviews')"
          @click="setCurrentTab('reviews')"
        >
          Отзывы (4)
        </button>
      </div>
    </div>

    <div v-if="currentTab === 'description'" class="container">
      <div class="row">
        <div class="col-6 pe-5">
          <h3>Характеристики</h3>

          <table class="table table-striped">
            <tbody>
              <tr
                v-for="(value, propName) of product.props"
                :key="propName"
                class="text-dark"
              >
                <td>{{ propName }}</td>
                <th scope="row">{{ value }}</th>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-6 pe-5">
          <h3>Описание</h3>

          <div v-html="product.description"></div>

          <h3>Комплектация:</h3>

          <div v-html="product.configuration"></div>
        </div>
      </div>
    </div>

    <ProductAvailabilityVue v-if="currentTab === 'availability'" />

    <ProductReviewsVue v-if="currentTab === 'reviews'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from '@nuxtjs/composition-api'
import ProductAvailabilityVue from './ProductAvailability.vue'
import ProductReviewsVue from './ProductReviews.vue'

export default defineComponent({
  components: { ProductAvailabilityVue, ProductReviewsVue },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const currentTab = ref('description')
    const setCurrentTab = (tab: string) => {
      currentTab.value = tab
    }
    const createDynamicClass = (tab: string) => {
      return {
        'product-about__tab--selected': unref(currentTab) === tab,
      }
    }

    return { currentTab, setCurrentTab, createDynamicClass }
  },
})
</script>

<style lang="scss" scoped>
.product-about {
  margin-top: 6.25rem;
  background-color: $white;
  font-size: 1rem;

  h3 {
    color: $dark;
    margin-bottom: 2.5rem;
  }

  &__tabs {
    background-color: $gray-200;
    margin-bottom: 6.25rem;

    .container {
      display: flex;
      justify-content: space-between;
    }
  }

  &__tab {
    position: relative;
    padding: 1.625rem 0;
    font-size: 1rem;
    color: $gray-800;
    font-weight: 500;
    line-height: 130%;
    cursor: pointer;
    background-color: 0;
    border: none;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 100%;
      height: 0.1875rem;
      border-radius: 0.3125rem;
      background-color: $primary;
      transition: right 0.5s;
    }

    &--selected,
    &:hover,
    &:focus {
      color: $primary;

      &::after {
        right: 0 !important;
      }
    }
  }
}
</style>
