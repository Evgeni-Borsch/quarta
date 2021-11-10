<template>
  <div class="products-grid__wrapper">
    <div v-if="category" class="products-grid">
      <FiltersSortVue />
      <transition-group name="fade">
        <LoadingVue v-if="!isFetched" key="loading" />

        <div v-else-if="productsList.length" key="grid" class="row">
          <div
            v-for="product of productsList"
            :key="product.id"
            class="col-6 col-md-3"
          >
            <ProductCardVue v-if="product" :product="product" />
          </div>
        </div>
        <div v-else key="no-items">
          <center class="my-5 py-5">
            По Вашему запросу ничего не нашлось.<br />
            Попробуйте
            <a @click="clearFilters" href="#">сбросить фильтры</a>
          </center>
        </div>
      </transition-group>
      <PaginationVue
        v-if="productsList.length"
        :total="itemsTotal"
        :current="page"
        @change="setPage"
      />
    </div>
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
import LoadingVue from '../Loading.vue'
import FiltersSortVue from './filters/FiltersSort.vue'
import { Category, filters, ProductItem, products } from '~/store'
import {
  CatalogCountType,
  CatalogSortType,
  getCategory
} from '~/services/api/catalog'
import CategoryPathResolver from '~/pages/catalog/_.vue'

@Component({
  components: { PaginationVue, ProductCardVue, FiltersSortVue, LoadingVue }
})
export default class ProductsGridVue extends Vue {
  isFetched = false
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

  get priceRange() {
    return filters.priceRange
  }

  created() {
    this.fetchData()
  }

  clearFilters() {
    filters.clearActiveFilters()
  }

  @Watch('page')
  @Watch('sort')
  @Watch('itemsPerPage')
  @Watch('onlyAvailable')
  @Watch('category')
  @Watch('filtersAsString')
  @Watch('priceRange')
  async fetchData() {
    if (!this.category) return

    this.isFetched = false
    this.productsList = []

    const categoryResponse = await getCategory(this.category.id, {
      page: this.page,
      sort: this.sort,
      count: this.itemsPerPage,
      available: this.onlyAvailable,
      filters: filters.activeFilters,
      priceRange: this.priceRange
    })

    console.log(categoryResponse)

    this.itemsTotal = parseInt(categoryResponse.ELEMENT_COUNT)

    if (categoryResponse.ITEMS === undefined) {
      return (this.isFetched = true)
    }

    for (const item of categoryResponse.ITEMS) {
      if (!products.items.has(item.ID.toString())) {
        products.addItem(item)
      }

      this.productsList.push(await products.getById(item.ID.toString()))
    }

    this.isFetched = true
  }

  setPage(value: number) {
    this.categoryContext.page = value
  }
}
</script>

<style lang="scss" scoped>
.products-grid {
  &__wrapper {
    position: relative;
    min-height: 25rem;
  }

  &::v-deep {
    .loading {
      position: absolute;
    }
  }
}

[class*='col-'] {
  margin-bottom: 20px;
}
</style>
