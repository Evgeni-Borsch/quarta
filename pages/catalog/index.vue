<template>
  <div class="catalog">
    <MainSliderVue :compact="true" />
    <BreadcrumbsVue :path="breadcrumbs" />

    <section class="catalog__categories">
      <div class="container">
        <div class="row">
          <div class="col-4">
            <CategoryCardVue
              title="Оружие и патроны"
              image="/barrel-gun.png"
              :count="126"
            />
          </div>
          <div class="col-4">
            <CategoryCardVue
              title="Оптика и кронштейны"
              image="/scope.png"
              :count="126"
            />
          </div>
          <div class="col-4">
            <CategoryCardVue
              title="Снаряжение и одежда"
              image="/equipment.png"
              :count="126"
            />
          </div>
          <div class="col-4">
            <CategoryCardVue
              title="Чистка, смазка и уход"
              image="/care.png"
              :count="126"
            />
          </div>
          <div class="col-4">
            <CategoryCardVue
              title="Тюнинг оружия"
              image="/tunning.png"
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
import { Vue, Component, Prop } from 'vue-property-decorator'
import BreadcrumbsVue from '~/components/Breadcrumbs.vue'
import CategoryCardVue from '~/components/CategoryCard.vue'
import MainSliderVue from '~/components/main-slider/MainSlider.vue'
import SubscribeVue from '~/components/Subscribe.vue'
import { Page } from '~/models/general'

@Component({
  components: {
    MainSliderVue,
    CategoryCardVue,
    BreadcrumbsVue,
    SubscribeVue,
  },
})
export default class CategoryPage extends Vue {
  breadcrumbs: Array<Page> = [
    {
      title: 'Главная',
      slug: 'index',
      path: '/',
    },
    {
      title: 'Каталог',
      slug: 'catalog',
      path: '/catalog',
    },
  ]
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
