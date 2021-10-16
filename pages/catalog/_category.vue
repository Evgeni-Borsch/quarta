<template>
  <div class="category">
    <!-- <MainSliderVue :compact="true" /> -->
    <BreadcrumbsVue :path="breadcrumbs" />

    <section class="category__header">
      <div class="container">
        <h2>{{ category ? category.name : '' }}</h2>
      </div>
    </section>

    <SubCategorySelectorVue :categories="descendants" :current-slug="slug" />

    <div class="container category__main">
      <div class="row">
        <FiltersVue :category="category" />

        <div class="col">
          <FiltersSortVue />
          <ProductsGridVue :category="category" />
        </div>
      </div>
    </div>

    <SubscribeVue />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import {
  useRoute,
  ref,
  useFetch,
  Ref,
  computed,
  watch,
  onUpdated
} from '@nuxtjs/composition-api'
import { get } from '@vueuse/shared'
import MainSliderVue from '~/components/main-slider/MainSlider.vue'
import SubCategorySelectorVue from '~/components/catalog/SubCategorySelector.vue'

import BreadcrumbsVue from '~/components/Breadcrumbs.vue'
import FiltersVue from '~/components/catalog/filters/Filters.vue'
import ProductCardVue from '~/components/product/ProductCard.vue'
import { Page } from '~/models/general'
import { categories, Category, ProductItem, products } from '~/store'
import FiltersSortVue from '~/components/catalog/filters/FiltersSort.vue'
import PaginationVue from '~/components/Pagination.vue'
import SubscribeVue from '~/components/Subscribe.vue'
import ProductsGridVue from '~/components/catalog/ProductsGrid.vue'

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
  setup() {
    const route = useRoute()
    const slug = computed(() => route.value.params.category)
    const category: Ref<Category | undefined> = ref()
    const parents: Ref<Array<Category>> = ref([])
    const parentsWithCurrent: Ref<Array<Category>> = computed(() => [
      ...parents.value,
      category.value as Category
    ])
    const descendants: Ref<Array<Category>> = ref([])
    const breadcrumbs = computed(() => {
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

      parentsWithCurrent.value.forEach((item) => {
        if (item) {
          prepared.push({
            title: item.name,
            slug: item.slug,
            path: `/catalog/${item.slug}`
          })
        }
      })

      return prepared
    })

    useFetch(async () => {
      category.value = (await categories.getBySlugAsync(slug.value)) as Category
      parents.value = (await categories.getAllParentsAsync(
        category.value.id
      )) as Array<Category>
      descendants.value = categories.getAllDescendants(
        parentsWithCurrent.value[0].id
      )
    })

    return { slug, category, parentsWithCurrent, descendants, breadcrumbs }
  }
})
export default class CategoryPathResolver extends Vue {
  product: ProductItem | null = null
  slug!: string
  category!: Category
  parentsWithCurrent!: Array<Category>
  descendants!: Array<Category>
  breadcrumbs!: Array<Page>
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
