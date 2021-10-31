<template>
  <div class="reviews">
    <BreadcrumbsVue :path="breadcrumbs" />

    <div class="container">
      <h2>{{ REVIEWS_PAGE.title }}</h2>

      <p>Получите + 300 бонусных баллов за 1 отзыв о товаре</p>
    </div>

    <div class="reviews__main">
      <div class="reviews__item">
        <div class="container">
          <div class="row">
            <div class="col-3">
              <ProductCardVue :product="product" />
            </div>
            <div class="col-6">
              <ProductAddReview :reviews-page="true" />
            </div>
          </div>
        </div>

        <hr />
      </div>
      <div class="reviews__item">
        <div class="container">
          <div class="row">
            <div class="col-3">
              <ProductCardVue :product="product" />
            </div>
            <div class="col-6">
              <ProductAddReview :reviews-page="true" />
            </div>
          </div>
        </div>

        <hr />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { INDEX_PAGE } from '../index.vue'
import { CABINER_PAGE } from './index.vue'
import BreadcrumbsVue from '~/components/Breadcrumbs.vue'
import { Page } from '~/models/general'
import SubscribeVue from '~/components/Subscribe.vue'
import ProductCardVue from '~/components/product/ProductCard.vue'
import ProductAddReview from '~/components/product/ProductAddReview.vue'
import { ProductItem, products } from '~/store'

export const REVIEWS_PAGE: Page = {
  title: 'Оставьте отзыв',
  slug: 'reviews',
  path: '/cabinet/reviews'
}

@Component({
  components: {
    BreadcrumbsVue,
    SubscribeVue,
    ProductCardVue,
    ProductAddReview
  }
})
export default class HistoryPage extends Vue {
  product!: ProductItem

  REVIEWS_PAGE = REVIEWS_PAGE
  breadcrumbs: Array<Page> = [INDEX_PAGE, CABINER_PAGE, REVIEWS_PAGE]

  async fetch() {
    this.product = await products.getById('4622')
  }
}
</script>

<style lang="scss" scoped>
.reviews {
  background: $gray-100;

  &__main {
    margin-top: 3.125rem;
    margin-bottom: 8.75rem;
    padding: 3.125rem 0;
    background-color: $white;
  }

  &__item {
    &:last-child hr {
      display: none;
    }
  }
}
</style>
