<template>
  <div class="favourites">
    <BreadcrumbsVue :path="breadcrumbs" />

    <LoadingVue v-if="!isFetched" />

    <div v-else-if="products.length" class="container">
      <h2>Избранное</h2>
      <p class="my-4">{{ products.length }} товаров</p>
      <div class="row">
        <div v-for="product of products" :key="product.id" class="col-3">
          <ProductCardVue :product="product" />
        </div>
      </div>
    </div>

    <div v-else class="container">
      <div class="cart__empty">
        <h2>В избранном ничего нет</h2>
        <p>Воспользуйтесь поиском, чтобы найти всё, что нужно.</p>
        <router-link class="btn btn-lg btn-primary" to="/catalog"
          >Продолжить покупки</router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import BreadcrumbsVue from '~/components/Breadcrumbs.vue'
import LoadingVue from '~/components/Loading.vue'
import ProductCardVue from '~/components/product/ProductCard.vue'
import { Page } from '~/models/general'
import { favourites, ProductItem } from '~/store'

@Component({
  components: {
    ProductCardVue,
    BreadcrumbsVue,
    LoadingVue
  },
  fetchOnServer: false
})
export default class FavouritesPage extends Vue {
  breadcrumbs: Array<Page> = [
    {
      title: 'Главная',
      slug: 'index',
      path: '/'
    },
    {
      title: 'Избранное',
      slug: 'favourites',
      path: '/favourites'
    }
  ]

  products: Array<ProductItem> = []
  isFetched = false

  get favourites() {
    return favourites.items
  }

  async fetch() {
    await favourites.pullState()
    this.products = await favourites.productsListAsync()
    this.isFetched = true
  }

  @Watch('favourites')
  onFavouritesChange() {
    this.$fetch()
  }
}
</script>

<style lang="scss" scoped>
.favourites {
  background-color: $gray-100;
  padding-bottom: 8.5rem;
}
</style>
