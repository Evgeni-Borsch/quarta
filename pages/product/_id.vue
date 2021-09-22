<template>
  <div>
    <BreadcrumbsVue :path="breadcrumbs" />
    <ProductVue />
    <ReviewsSliderVue class="bg-white" />
    <SubscribeVue />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref, Ref } from 'vue-demi'

import { Page } from '~/models/general'

import SubscribeVue from '~/components/Subscribe.vue'
import ProductVue from '~/components/product/Product.vue'
import BreadcrumbsVue from '~/components/Breadcrumbs.vue'
import ReviewsSliderVue from '~/components/ReviewsSlider.vue'

export default Vue.extend({
  components: {
    ProductVue,
    SubscribeVue,
    BreadcrumbsVue,
    ReviewsSliderVue,
  },
  setup() {
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

    return { breadcrumbs }
  },
})
</script>
