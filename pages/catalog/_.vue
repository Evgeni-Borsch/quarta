<template>
  <div class="category">
    <MainSliderVue :compact="true" :slides="mainSlider" />
    <BreadcrumbsVue :path="breadcrumbs" />

    <section class="category__header">
      <div class="container">
        <h2>{{ category ? category.name : '' }}</h2>
      </div>
    </section>

    <SubCategorySelectorVue :categories="descendants" :current-slug="slug" />

    <div class="container category__main">
      <div class="row">
        <FiltersVue />

        <div class="col">
          <ProductsGridVue />
        </div>
      </div>
    </div>

    <SubscribeVue />
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Watch,
  ProvideReactive,
  Provide
} from 'vue-property-decorator'
import MainSliderVue from '~/components/main-slider/MainSlider.vue'
import SubCategorySelectorVue from '~/components/catalog/SubCategorySelector.vue'

import BreadcrumbsVue from '~/components/Breadcrumbs.vue'
import FiltersVue from '~/components/catalog/filters/Filters.vue'
import ProductCardVue from '~/components/product/ProductCard.vue'
import { Page } from '~/models/general'
import { categories, Category, filters, ProductItem } from '~/store'
import FiltersSortVue from '~/components/catalog/filters/FiltersSort.vue'
import PaginationVue from '~/components/Pagination.vue'
import SubscribeVue from '~/components/Subscribe.vue'
import ProductsGridVue from '~/components/catalog/ProductsGrid.vue'
import { CatalogCount, CatalogSort } from '~/services/api/catalog'
import pageTitle from '~/utils/pageTitle'
import { getMainSlider, MainSliderSlide } from '~/services/api/sliders'

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
    ProductsGridVue
  },
  middleware: ['category'],
  fetchOnServer: false,
  head(this: CategoryPathResolver) {
    return {
      title: pageTitle(
        this.category ? `${this.category?.name} - Каталог` : 'Каталог'
      )
    }
  }
})
export default class CategoryPathResolver extends Vue {
  mainSlider: Array<MainSliderSlide> = []

  product: ProductItem | null = null
  descendants: Array<Category> = []
  parents: Array<Category> = []

  @ProvideReactive() slug: string | null = null
  @ProvideReactive() category: Category | null = null
  @ProvideReactive() page = 1
  @ProvideReactive() sort = CatalogSort.popularity
  @ProvideReactive() onlyAvailable = false
  @ProvideReactive() itemsPerPage = CatalogCount.twenty

  @Provide() get categoryContext() {
    return this
  }

  get parentsWithCurrent(): Array<Category> {
    return [...this.parents, this.category as Category]
  }

  get activeFilters() {
    return filters.activeFilters
  }

  get priceRange() {
    return filters.priceRange
  }

  get breadcrumbs(): Array<Page> {
    const prepared = [
      {
        title: 'Главная',
        slug: 'index',
        path: '/'
      },
      {
        title: 'Каталог',
        slug: 'catalog',
        path: '/catalog'
      }
    ]

    this.parentsWithCurrent.forEach((item) => {
      if (item) {
        prepared.push({
          title: item.name,
          slug: item.slug,
          path: `/catalog/${item.slug}`
        })
      }
    })

    return prepared
  }

  async fetch(this: CategoryPathResolver) {
    await this.fetchMainSlider()

    const [slug, pageUnsafe] = this.$route.params.pathMatch.split('/')
    const page = pageUnsafe ? parseInt(pageUnsafe) : 1

    this.setSortSafe(this.$route.query.sort as string)
    this.setItemsPerPageSafe(this.$route.query.itemsPerPage as string)

    this.slug = slug
    this.page = page
    this.onlyAvailable = this.$route.query.onlyAvailable === 'true'
    this.category = (await categories.getBySlugAsync(slug)) as Category
    this.parents = (await categories.getAllParentsAsync(
      this.category.id
    )) as Array<Category>
    this.descendants = categories.getAllDescendants(
      this.parentsWithCurrent[0].id
    )
  }

  async fetchMainSlider() {
    this.mainSlider = await getMainSlider('477')
  }

  setSortSafe(value: string) {
    if (value === CatalogSort.expensive) {
      return (this.sort = CatalogSort.expensive)
    }
    if (value === CatalogSort.cheaper) {
      return (this.sort = CatalogSort.cheaper)
    }
    this.sort = CatalogSort.popularity
  }

  setItemsPerPageSafe(value: string) {
    if (value === CatalogCount.all.toString()) {
      return (this.itemsPerPage = CatalogCount.all)
    }
    if (value === CatalogCount.fourty.toString()) {
      return (this.itemsPerPage = CatalogCount.fourty)
    }
    if (value === CatalogCount.sixty.toString()) {
      return (this.itemsPerPage = CatalogCount.sixty)
    }
    this.itemsPerPage = CatalogCount.twenty
  }

  @Watch('slug')
  onCategoryChange() {
    this.$fetch()
  }

  @Watch('page')
  onPageChange() {
    this.$router.push({
      path: `/catalog/${this.slug}` + (this.page > 1 ? `/${this.page}` : ''),
      query: this.$route.query
    })
  }

  @Watch('sort')
  @Watch('itemsPerPage')
  @Watch('activeFilters')
  @Watch('onlyAvailable')
  onActiveFiltersChange() {
    this.$router.replace({
      path: this.$route.path,
      query: {
        filters: filters.asString,
        onlyAvailable: this.onlyAvailable ? 'true' : 'false',
        sort: this.sort,
        itemsPerPage: this.itemsPerPage.toString()
      }
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
