<template>
  <div v-if="category" class="products-grid">
    <FiltersSortVue />

    <div class="row">
      <div v-for="product of productsList" :key="product.id" class="col-3">
        <ProductCardVue v-if="product" :product="product" />
      </div>
    </div>

    <PaginationVue :total="itemsTotal" :current="page" @change="setPage" />
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  InjectReactive,
  Watch,
  Inject
} from 'vue-property-decorator'
import PaginationVue from '../Pagination.vue'
import ProductCardVue from '../product/ProductCard.vue'
import FiltersSortVue from './filters/FiltersSort.vue'
import { Category, filters, ProductItem, products } from '~/store'
import {
  CatalogCountType,
  CatalogSortType,
  getCategory
} from '~/services/api/catalog'
import CategoryPathResolver from '~/pages/catalog/_.vue'

@Component({
  components: { PaginationVue, ProductCardVue, FiltersSortVue }
})
export default class ProductsGridVue extends Vue {
  onlyAvaible!: boolean
  itemsTotal = 0
  productsList: Array<ProductItem> = []

  @InjectReactive() page!: number
  @InjectReactive() slug!: string
  @InjectReactive() category!: Category
  @InjectReactive() sort!: CatalogSortType
  @InjectReactive() onlyAvailable!: boolean
  @InjectReactive() itemsPerPage!: CatalogCountType

  @Inject() categoryContext!: CategoryPathResolver

  get filtersAsString() {
    return filters.asString
  }

  created() {
    this.fetchData()
  }

  @Watch('page')
  @Watch('sort')
  @Watch('itemsPerPage')
  @Watch('onlyAvailable')
  @Watch('category')
  @Watch('filtersAsString')
  async fetchData() {
    if (!this.category) return

    this.productsList = []

    const categoryResponse = await getCategory(this.category.id, {
      page: this.page,
      sort: this.sort,
      count: this.itemsPerPage,
      available: this.onlyAvailable,
      filters: this.filtersAsString
    })

    this.itemsTotal = parseInt(categoryResponse.ELEMENT_COUNT)

    if (this.itemsTotal === 0) return

    for (const item of categoryResponse.ITEMS) {
      if (!products.items.has(item.ID.toString())) {
        products.addItem(item)
      }

      this.productsList.push(await products.getById(item.ID.toString()))
    }
  }

  setPage(value: number) {
    this.categoryContext.page = value
  }
}
</script>

<style lang="scss" scoped>
[class*='col-'] {
  margin-bottom: 20px;
}
</style>
