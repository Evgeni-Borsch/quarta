<template>
  <div class="catalog">
    <MainSliderVue :slides="mainSlider" :compact="true" />
    <BreadcrumbsVue :path="breadcrumbs" />

    <section class="catalog__categories">
      <div class="container">
        <div class="row">
          <div class="col-4">
            <CategoryCardVue
              title="Оружие и патроны"
              image="/barrel-gun.png"
              to="/catalog/oruzhie_i_patrony"
              :count="126"
            />
          </div>
          <div class="col-4">
            <CategoryCardVue
              title="Оптика и кронштейны"
              image="/scope.png"
              to="/catalog/optika_i_kronshteyny"
              :count="126"
            />
          </div>
          <div class="col-4">
            <CategoryCardVue
              title="Снаряжение и одежда"
              image="/equipment.png"
              to="/catalog/snaryazhenie_i_odezhda"
              :count="126"
            />
          </div>
          <div class="col-4">
            <CategoryCardVue
              title="Чистка, смазка и уход"
              image="/care.png"
              to="/catalog/sredstva_dlya_ukhoda_za_oruzhiem"
              :count="126"
            />
          </div>
          <div class="col-4">
            <CategoryCardVue
              title="Тюнинг оружия"
              image="/tunning.png"
              to="/catalog/tyuning_oruzhiya"
              :count="126"
            />
          </div>
        </div>
      </div>
    </section>

    <SubscribeVue />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import BreadcrumbsVue from '~/components/Breadcrumbs.vue'
import CategoryCardVue from '~/components/CategoryCard.vue'
import MainSliderVue from '~/components/main-slider/MainSlider.vue'
import SubscribeVue from '~/components/Subscribe.vue'
import { Page } from '~/models/general'
import { getMainSlider, MainSliderSlide } from '~/services/api/sliders'
import pageTitle from '~/utils/pageTitle'

@Component({
  components: {
    MainSliderVue,
    CategoryCardVue,
    BreadcrumbsVue,
    SubscribeVue
  },
  head() {
    return {
      title: pageTitle('Каталог')
    }
  }
})
export default class CategoryPage extends Vue {
  mainSlider: Array<MainSliderSlide> = []

  breadcrumbs: Array<Page> = [
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

  async fetch() {
    await this.fetchMainSlider()
  }

  async fetchMainSlider() {
    this.mainSlider = await getMainSlider('477')
  }
}
</script>

<style lang="scss" scoped>
.catalog {
  &__categories {
    background-color: $gray-100;
    padding-bottom: 8.4375rem;

    [class*='col-'] {
      margin-bottom: 1.5rem;
    }
  }
}
</style>
