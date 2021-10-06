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

    <div class="container">
      <div class="row">
        <FiltersVue />

        <div class="col">
          <div class="row">
            <div class="col-3">
              <ProductCardVue />
            </div><div class="col-3">
              <ProductCardVue />
            </div><div class="col-3">
              <ProductCardVue />
            </div><div class="col-3">
              <ProductCardVue />
            </div><div class="col-3">
              <ProductCardVue />
            </div><div class="col-3">
              <ProductCardVue />
            </div><div class="col-3">
              <ProductCardVue />
            </div><div class="col-3">
              <ProductCardVue />
            </div><div class="col-3">
              <ProductCardVue />
            </div><div class="col-3">
              <ProductCardVue />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import MainSliderVue from '~/components/main-slider/MainSlider.vue'
import SubCategorySelectorVue from '~/components/catalog/SubCategorySelector.vue'

import BreadcrumbsVue, { BreadcrumbsLink } from '~/components/Breadcrumbs.vue'
import FiltersVue from '~/components/catalog/filters/Filters.vue'
import ProductCardVue from '~/components/product/ProductCard.vue'

@Component({
  components: {
    MainSliderVue,
    SubCategorySelectorVue,
    BreadcrumbsVue,
    FiltersVue,
    ProductCardVue,
  },
})
export default class CategoryVue extends Vue {
  breadcrumbs: Array<BreadcrumbsLink> = [
    {
      title: 'Главная',
      url: '/',
    },
    {
      title: 'Каталог',
      url: '/catalog',
    },
    {
      title: 'Оптика и кронштейны',
      url: '/catalog/optics',
    },
  ]
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
}
</style>
