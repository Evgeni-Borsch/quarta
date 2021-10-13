<template>
  <div v-if="product">
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
import { useFetch, useRoute } from '@nuxtjs/composition-api'

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
  middleware: 'product',
  setup() {
    const product: Ref<ProductItem | null> = ref(null)
    const breadcrumbs: Ref<Array<Page>> = ref([])

    const { fetch } = useFetch(async () => {
      const route = useRoute()
      const [id] = get(route).params.pathMatch.split('/')

      await products.getById(id).then((p) => {
        product.value = p
        breadcrumbs.value = [
          {
            title: 'Главная',
            slug: 'index',
            path: '/',
          },
          ...p.breadcrumbs,
          {
            title: p.title,
            slug: p.slug,
            path: `/product/${id}/${p.slug}`,
          },
        ]
      })
    })

    return { product, breadcrumbs, fetch }
  },
})
</script>
