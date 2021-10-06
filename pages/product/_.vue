<template>
  <div>
    <BreadcrumbsVue :path="breadcrumbs" />
    <ProductVue :product="product" />
    <ReviewsSliderVue class="bg-white" />
    <SubscribeVue />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref, Ref } from 'vue-demi'
import { get } from '@vueuse/shared'
import { useContext, useFetch, useRoute } from '@nuxtjs/composition-api'

import { Page } from '~/models/general'

import SubscribeVue from '~/components/Subscribe.vue'
import ProductVue from '~/components/product/Product.vue'
import BreadcrumbsVue from '~/components/Breadcrumbs.vue'
import ReviewsSliderVue from '~/components/ReviewsSlider.vue'
import { ProductItem, products } from '~/store'

export default Vue.extend({
  components: {
    ProductVue,
    SubscribeVue,
    BreadcrumbsVue,
    ReviewsSliderVue,
  },
  setup() {
    const { redirect, error } = useContext()
    const product: Ref<ProductItem | null> = ref(null)
    const { fetch } = useFetch(async () => {
      const route = useRoute()
      const [id, slug] = get(route).params.pathMatch.split('/')
      let productItem = null

      try {
        productItem = await products.getById(id)
      } catch (e) {
        return error({ statusCode: 404, message: 'Product not found' })
      }

      if (slug !== productItem.slug) {
        redirect(302, `/product/${id}/${productItem.slug}`)
      }

      product.value = productItem
    })

    fetch()

    const breadcrumbs: Ref<Array<Page>> = ref([
      {
        title: 'Главная',
        slug: 'index',
      },
      {
        title: 'Каталог',
        slug: 'catalog',
      },
      {
        title: 'Оптика и кронштейны',
        slug: 'category',
      },
      {
        title: 'Бинокль Nikon Monarch 7 8x42, Призмы Porro',
        slug: 'product',
      },
    ])

    return { product, breadcrumbs }
  },
})
</script>
