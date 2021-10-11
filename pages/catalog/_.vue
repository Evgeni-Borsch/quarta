<template>
  <div class="category">
    <MainSliderVue :compact="true" />
    <BreadcrumbsVue :path="breadcrumbs" />

    <section class="category__header">
      <div class="container">
        <h2>Оптика и кронштейны</h2>
      </div>
    </section>

    <SubCategorySelectorVue />

    <div class="container category__main">
      <div class="row">
        <FiltersVue />

        <div class="col">
          <FiltersSortVue />
          <div v-if="product" class="row category__products">
            <div class="col-3">
              <ProductCardVue :product="product" />
            </div>
            <div class="col-3">
              <ProductCardVue :product="product" />
            </div>
            <div class="col-3">
              <ProductCardVue :product="product" />
            </div>
            <div class="col-3">
              <ProductCardVue :product="product" />
            </div>
            <div class="col-3">
              <ProductCardVue :product="product" />
            </div>
            <div class="col-3">
              <ProductCardVue :product="product" />
            </div>
            <div class="col-3">
              <ProductCardVue :product="product" />
            </div>
            <div class="col-3">
              <ProductCardVue :product="product" />
            </div>
            <div class="col-3">
              <ProductCardVue :product="product" />
            </div>
            <div class="col-3">
              <ProductCardVue :product="product" />
            </div>
            <div class="col-3">
              <ProductCardVue :product="product" />
            </div>
            <div class="col-3">
              <ProductCardVue :product="product" />
            </div>
          </div>
          <PaginationVue />
        </div>
      </div>
    </div>

    <SubscribeVue />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import MainSliderVue from '~/components/main-slider/MainSlider.vue'
import SubCategorySelectorVue from '~/components/catalog/SubCategorySelector.vue'

import BreadcrumbsVue from '~/components/Breadcrumbs.vue'
import FiltersVue from '~/components/catalog/filters/Filters.vue'
import ProductCardVue from '~/components/product/ProductCard.vue'
import { Page } from '~/models/general'
import { ProductItem, products } from '~/store'
import FiltersSortVue from '~/components/catalog/filters/FiltersSort.vue'
import PaginationVue from '~/components/Pagination.vue'
import SubscribeVue from '~/components/Subscribe.vue'

@Component({
  components: {
    MainSliderVue,
    SubCategorySelectorVue,
    BreadcrumbsVue,
    FiltersVue,
    ProductCardVue,
    FiltersSortVue,
    PaginationVue,
    SubscribeVue,
  },
})
export default class CategoryPathResolver extends Vue {
  product: ProductItem | null = null

  breadcrumbs: Array<Page> = [
    {
      title: 'Главная',
      slug: 'index',
      path: '/',
    },
    {
      title: 'Каталог',
      slug: 'catalog',
      path: '/catalog',
    },
    {
      title: 'Оптика и кронштейны',
      slug: 'optics',
      path: '/catalog/optics',
    },
  ]

  created() {
    products.getById('318').then((product) => {
      this.product = product
    })
  }
}
</script>

<style lang="scss" scoped>
.category {
  background-color: $gray-100;

  & > .container > .row {
    align-items: flex-start;
  }

  &__header {
    padding-bottom: 3.125rem;
  }

  &__products {
    [class*='col-'] {
      margin-bottom: 20px;
    }
  }

  &__main {
    padding-bottom: 8.4375rem;
  }
}
</style>
