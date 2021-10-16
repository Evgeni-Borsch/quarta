<template>
  <div v-if="category" class="products-grid">
    <div class="row">
      <div v-for="product of productsList" :key="product.id" class="col-3">
        <ProductCardVue v-if="product" :product="product" />
      </div>
    </div>

    <PaginationVue />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { computed, Ref, ref, useFetch, watch } from '@nuxtjs/composition-api'
import PaginationVue from '../Pagination.vue'
import ProductCardVue from '../product/ProductCard.vue'
import { Category, ProductItem, products } from '~/store'
import { getCategory } from '~/services/api/catalog'

@Component({
  components: { PaginationVue, ProductCardVue },
  setup(props) {
    const category = computed(() => props.category as Category)
    const productsList: Ref<Array<ProductItem>> = ref([])

    const { fetch } = useFetch(async () => {
      if (!category.value) return

      const categoryResponse = await getCategory(category.value.id)
      for (const item of categoryResponse.ITEMS) {
        products.addItem(item)
        productsList.value.push(await products.getById(item.ID.toString()))
      }
    })

    watch(category, fetch)

    return { productsList }
  }
})
export default class ProductsGridVue extends Vue {
  @Prop({ required: true }) category!: Category

  created() {
    // products
    // console.log(this.category.id)
  }
}
</script>

<style lang="scss" scoped>
[class*='col-'] {
  margin-bottom: 20px;
}
</style>
