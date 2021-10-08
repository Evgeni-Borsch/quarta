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

          <div ref="tableWrapper" v-html="product.props"></div>

          <!-- <table class="table table-striped">
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
          </table> -->
        </div>
        <div class="col-6 pe-5">
          <h3>Описание</h3>

          <div v-html="product.description"></div>

          <h3>Комплектация:</h3>

          <div v-html="product.configuration"></div>
        </div>
      </div>
    </div>

    <ProductAvailabilityVue
      v-if="currentTab === 'availability'"
      :product="product"
    />
    <ProductInstructionsVue
      v-if="currentTab === 'documents'"
      :product="product"
    />
    <ProductAskVue v-if="currentTab === 'questions'" :product="product" />
    <ProductReviewsVue v-if="currentTab === 'reviews'" :product="product" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'
import ProductAskVue from './ProductAsk.vue'
import ProductAvailabilityVue from './ProductAvailability.vue'
import ProductReviewsVue from './ProductReviews.vue'
import ProductInstructionsVue from './ProductInstructions.vue'
import { ProductItem } from '~/store'

@Component({
  components: {
    ProductAvailabilityVue,
    ProductReviewsVue,
    ProductAskVue,
    ProductInstructionsVue,
  },
  setup() {},
})
export default class ProductAboutVue extends Vue {
  currentTab = 'description'

  @Prop({ required: true }) product!: ProductItem
  @Ref('tableWrapper') tableWrapper!: HTMLElement

  setCurrentTab(tab: string) {
    this.currentTab = tab
  }

  createDynamicClass(tab: string) {
    return {
      'product-about__tab--selected': this.currentTab === tab,
    }
  }

  setTableStyles() {
    const table = this.tableWrapper?.querySelector('table')
    table?.setAttribute('class', 'table table-striped')
  }

  mounted() {
    this.setTableStyles()
  }

  updated() {
    this.setTableStyles()
  }
}
</script>

<style lang="scss" scoped>
.product-about {
  margin-top: 6.25rem;
  padding-bottom: 5.625rem !important;
  background-color: $white;
  font-size: 1rem;

  &::v-deep .table-striped {
    td:last-child {
      font-weight: bold;
      text-align: center;
    }
  }

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
