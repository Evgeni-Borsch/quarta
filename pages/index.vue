<template>
  <div class="index">
    <MainSliderVue />

    <section class="bg-light catalog-slider">
      <BaseSliderVue :slides-desktop="4">
        <CategoryCardVue
          title="Оружие и патроны"
          image="/barrel-gun.png"
          :compact="true"
        />
        <CategoryCardVue
          title="Оптика и кронштейны"
          image="/scope.png"
          :compact="true"
        />
        <CategoryCardVue
          title="Снаряжение и одежда"
          image="/equipment.png"
          :compact="true"
        />
        <CategoryCardVue
          title="Чистка, смазка и уход"
          image="/care.png"
          :compact="true"
        />
        <CategoryCardVue
          title="Тюнинг оружия"
          image="/tunning.png"
          :compact="true"
        />
      </BaseSliderVue>
    </section>

    <AdvantagesVue />

    <YouTubePromotionVue />

    <section class="promo">
      <div class="container">
        <PromoWideLight />
      </div>

      <BaseSliderVue class="promo__slider">
        <PromoCardVue
          title="Скидка 12% на прицелы&nbsp;Nikko&nbsp;Stirling!"
          image="/promo-scope.png"
        >
          <p>Мы рады сообщить о новом поступлении товара</p>
        </PromoCardVue>
        <PromoCardVue
          title="Скидка 12% на прицелы&nbsp;Nikko&nbsp;Stirling!"
          image="/promo-loyality.jpg"
          :image-as-background="true"
        >
          <p>Мы рады сообщить о новом поступлении товара</p>
        </PromoCardVue>

        <PromoCardVue
          title="Скидка 12% на прицелы&nbsp;Nikko&nbsp;Stirling!"
          image="/promo-scope.png"
        >
          <p>Мы рады сообщить о новом поступлении товара</p>
        </PromoCardVue>
      </BaseSliderVue>
      <div class="container">
        <div class="row">
          <div class="col-6">
            <PromoCardVue
              title="Скидка 12% на прицелы&nbsp;Nikko&nbsp;Stirling!"
              image="/promo-loyality.jpg"
              :image-as-background="true"
            >
              <p>Мы рады сообщить о новом поступлении товара</p>
            </PromoCardVue>
          </div>

          <div class="col-6">
            <PromoCardVue
              title="Скидка 12% на прицелы&nbsp;Nikko&nbsp;Stirling!"
              image="/promo-headphones.png"
            >
              <p>Мы рады сообщить о новом поступлении товара</p>
            </PromoCardVue>
          </div>
        </div>
      </div>
    </section>

    <PromoWide image="/promo-wide.jpg" class="bg-gray-200">
      <div class="row">
        <div class="col-6">
          <PromoWideImageTextVue small-text="21 апреля 2021">
            <p>Обзор коллиматорных прицелов и аксессуаров нового поколения.</p>
          </PromoWideImageTextVue>
        </div>
        <div class="col-6 pt-4">
          <BaseSliderVue :slides-desktop="1" :no-container="true">
            <PromoProductSlideVue />
            <PromoProductSlideVue />
            <PromoProductSlideVue />
          </BaseSliderVue>
        </div>
      </div>
    </PromoWide>

    <section class="promo-grid">
      <div class="container">
        <div class="row">
          <div class="col-6">
            <PromoCardVue
              title="Скидка до&nbsp;25% на&nbsp;новый товар"
              image="/promo-horn.png"
              :large="true"
            >
              <p>
                Подборка охотничьих товаров по выгодным ценам. Количество
                ограничено!
              </p>
            </PromoCardVue>
          </div>
          <div class="col-3">
            <ProductCardVue />
          </div>

          <div class="col-3">
            <ProductCardVue />
          </div>
        </div>

        <div class="row">
          <div class="col-3">
            <ProductCardVue />
          </div>

          <div class="col-3">
            <ProductCardVue />
          </div>

          <div class="col-6">
            <PromoCardVue
              title="Скидка 12% на прицелы&nbsp;Nikko&nbsp;Stirling!"
              image="/promo-pistol.png"
              :large="true"
            >
              <p>Мы рады сообщить о новом поступлении товара</p>
            </PromoCardVue>
          </div>
        </div>
      </div>
    </section>

    <SubscribeVue />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import AdvantagesVue from '~/components/Advantages.vue'
import BaseSliderVue from '~/components/BaseSlider.vue'
import BreadcrumbsVue from '~/components/Breadcrumbs.vue'
import CategoryCardVue from '~/components/CategoryCard.vue'
import MainSliderVue from '~/components/main-slider/MainSlider.vue'
import PromoCardVue from '~/components/promo/PromoCard.vue'
import SubscribeVue from '~/components/Subscribe.vue'
import PromoWide from '~/components/promo/PromoWide.vue'
import YouTubePromotionVue from '~/components/promo/YouTubePromotion.vue'
import PromoWideLight from '~/components/promo/PromoWideLight.vue'
import PromoWideImageTextVue from '~/components/promo/PromoWideImageText.vue'
import PromoProductSlideVue from '~/components/promo/PromoProductSlide.vue'
import ProductCardVue from '~/components/product/ProductCard.vue'
import { Page } from '~/models/general'

@Component({
  components: {
    MainSliderVue,
    CategoryCardVue,
    BreadcrumbsVue,
    SubscribeVue,
    BaseSliderVue,
    AdvantagesVue,
    PromoWide,
    YouTubePromotionVue,
    PromoCardVue,
    PromoWideLight,
    PromoWideImageTextVue,
    PromoProductSlideVue,
    ProductCardVue,
  },
})
export default class IndexPage extends Vue {
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
.catalog-slider {
  &::v-deep .base-slider {
    padding: 8.75rem 0;
  }
}

.promo {
  padding: 7.25rem 0;
  background-color: $white;

  &__slider {
    margin-bottom: 4.25rem;
  }
}

.promo-grid {
  padding: 7.25rem 0;
  background-color: $gray-100;

  .row {
    margin-bottom: 20px;
  }
}
</style>
