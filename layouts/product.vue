<template>
  <div>
    <HeaderVue />
    <BreadcrumbsVue :path="breadcrumbs" />
    <ProductVue />
    <section class="bg-white">
      <ReviewsSliderVue />
    </section>

    <Nuxt />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from '@nuxtjs/composition-api'
import { Page } from '@/models/general'

import HeaderVue from '~/components/header/Header.vue'
import BreadcrumbsVue from '~/components/Breadcrumbs.vue'
import ProductVue from '~/components/product/Product.vue'
import ReviewsSliderVue from '~/components/ReviewsSlider.vue'

import '~/assets/styles/global.scss'

export default defineComponent({
  components: { HeaderVue, BreadcrumbsVue, ProductVue, ReviewsSliderVue },
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

<style lang="scss" scoped></style>
