<template>
  <div class="search">
    <BreadcrumbsVue :path="breadcrumbs" />
    <div class="container">
      <h2 class="mb-5">Результаты поиска</h2>
      <p v-if="results.length" class="mb-4">
        Найдено {{ results.length }} Товаров по вашему запросу
        <span class="text-primary">{{ query }}</span>
      </p>

      <p v-else class="mb-4">
        Простите, по вашему запросу товаров сейчас нет. <br />
        <router-link to="/">На главную</router-link>
      </p>

      <div class="row row-cols-5">
        <div v-for="item of results" :key="item.id" class="col mb-4">
          <ProductCardVue :product="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { INDEX_PAGE } from './index.vue'
import BreadcrumbsVue from '~/components/Breadcrumbs.vue'
import ProductCardVue from '~/components/product/ProductCard.vue'
import { Page } from '~/models/general'
import { search } from '~/services/api/catalog'
import { ProductItem, products } from '~/store'

const SERCH_PAGE: Page = {
  title: 'Результаты поиска',
  slug: 'search',
  path: '/serch'
}

@Component({
  components: { ProductCardVue, BreadcrumbsVue }
})
export default class SearchPage extends Vue {
  breadcrumbs = [INDEX_PAGE, SERCH_PAGE]

  results: Array<ProductItem> = []

  get query(): string {
    return this.$route.query.q as string
  }

  async fetch() {
    this.results = []

    if (typeof this.query !== 'string') return null

    const response = await search(this.query)

    if (!response.SEARCH) return null

    for (const item of response.SEARCH) {
      this.results.push(await products.getById(item.ID))
    }

    console.log(this.results)
  }

  @Watch('query')
  onQueryChange() {
    this.$fetch()
  }
}
</script>

<style lang="scss" scoped>
.search {
  background: $gray-100;
  padding-bottom: 8.75rem;
}
</style>
