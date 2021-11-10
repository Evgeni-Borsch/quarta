<template>
  <div v-if="product">
    <BreadcrumbsVue :path="breadcrumbs" />
    <ProductVue :product="product" />
    <!-- <ReviewsSliderVue class="bg-white" /> -->

    <div class="reviews">
      <BaseSliderVue :slides-desktop="2">
        <VideoPreviewVue
          preview="/video-preview-01.jpg"
          link="https://www.youtube.com/watch?v=MabimrtMQ5U"
        />
        <VideoPreviewVue
          preview="/video-preview-02.jpg"
          link="https://www.youtube.com/watch?v=MabimrtMQ5U"
        />
        <VideoPreviewVue
          preview="/video-preview-03.jpg"
          link="https://www.youtube.com/watch?v=MabimrtMQ5U"
        />
      </BaseSliderVue>
    </div>

    <div class="recomendations">
      <div class="container">
        <h2 class="mb-4">С этим товаром покупают</h2>
      </div>

      <BaseSliderVue :slides-desktop="4">
        <ProductCardVue :product="product" />
        <ProductCardVue :product="product" />
        <ProductCardVue :product="product" />
        <ProductCardVue :product="product" />
        <ProductCardVue :product="product" />
        <ProductCardVue :product="product" />
      </BaseSliderVue>
    </div>

    <PromoCardWideVue />
    <SubscribeVue />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref, Ref } from 'vue-demi'
import { get } from '@vueuse/shared'
import { useFetch, useRoute } from '@nuxtjs/composition-api'

import { INDEX_PAGE } from '../index.vue'
import { Page } from '~/models/general'

import SubscribeVue from '~/components/Subscribe.vue'
import ProductVue from '~/components/product/Product.vue'
import BreadcrumbsVue from '~/components/Breadcrumbs.vue'
import ReviewsSliderVue from '~/components/ReviewsSlider.vue'
import { ProductItem, products } from '~/store'
import PromoCardWideVue from '~/components/promo/PromoCardWide.vue'
import BaseSliderVue from '~/components/BaseSlider.vue'
import ProductCardVue from '~/components/product/ProductCard.vue'
import VideoPreviewVue from '~/components/VideoPreview.vue'

export default Vue.extend({
  components: {
    ProductVue,
    SubscribeVue,
    BreadcrumbsVue,
    ReviewsSliderVue,
    ProductCardVue,
    BaseSliderVue,
    PromoCardWideVue,
    VideoPreviewVue
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
          INDEX_PAGE,
          ...p.breadcrumbs,
          {
            title: p.title,
            slug: p.slug,
            path: `/product/${id}/${p.slug}`
          }
        ]
      })
    })

    return { product, breadcrumbs, fetch }
  }
})
</script>

<style lang="scss" scoped>
.reviews {
  background-color: $white;
  padding-bottom: 6rem;
}

.recomendations {
  background-color: $gray-100;
  padding: 6rem 0;
}
</style>
