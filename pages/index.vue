<template>
  <div class="index">
    <client-only>
      <MainSliderVue :slides="mainSlider" />
    </client-only>

    <section class="bg-light catalog-slider">
      <BaseSliderVue :slides-desktop="4">
        <CategoryCardVue
          title="Оружие и патроны"
          image="/barrel-gun.png"
          to="/catalog/oruzhie_i_patrony"
          :compact="true"
        />
        <CategoryCardVue
          title="Оптика и кронштейны"
          image="/scope.png"
          to="/catalog/optika_i_kronshteyny"
          :compact="true"
        />
        <CategoryCardVue
          title="Снаряжение и одежда"
          image="/equipment.png"
          to="/catalog/snaryazhenie_i_odezhda"
          :compact="true"
        />
        <CategoryCardVue
          title="Чистка, смазка и уход"
          image="/care.png"
          to="/catalog/sredstva_dlya_ukhoda_za_oruzhiem"
          :compact="true"
        />
        <CategoryCardVue
          title="Тюнинг оружия"
          image="/tunning.png"
          to="/catalog/tyuning_oruzhiya"
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
          <div v-if="firstLargeCard" class="col-6">
            <PromoCardVue
              :title="firstLargeCard.title"
              :image="firstLargeCard.image"
              :large="true"
            >
              <p v-html="firstLargeCard.text"></p>
            </PromoCardVue>
          </div>
          <div class="col-3">
            <ProductCardVue :product="products[0]" />
          </div>

          <div class="col-3">
            <ProductCardVue :product="products[1]" />
          </div>
        </div>

        <div class="row">
          <div class="col-3">
            <ProductCardVue :product="products[2]" />
          </div>

          <div class="col-3">
            <ProductCardVue :product="products[3]" />
          </div>

          <div v-if="secondLargeCard" class="col-6">
            <PromoCardVue
              :title="secondLargeCard.title"
              :image="secondLargeCard.image"
              :large="true"
            >
              <p v-html="secondLargeCard.text"></p>
            </PromoCardVue>
          </div>
        </div>
      </div>
    </section>

    <NewsSliderVue />

    <SubscribeVue />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import AdvantagesVue from '~/components/Advantages.vue'
import BaseSliderVue from '~/components/BaseSlider.vue'
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
import NewsSliderVue from '~/components/news/NewsSlider.vue'
import { ProductItem, products } from '~/store'

import { getMainSlider, MainSliderSlide } from '~/services/api/sliders'
import { API_BASE_URL } from '~/services/constants'
import { BannerResponse, getBanner } from '~/services/api/sections'

export const INDEX_PAGE: Page = {
  title: 'Главная',
  slug: 'index',
  path: '/'
}

@Component({
  components: {
    MainSliderVue,
    CategoryCardVue,
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
    NewsSliderVue
  }
})
export default class IndexPage extends Vue {
  mainSlider: Array<MainSliderSlide> = []
  products: Array<ProductItem> = []
  largeCards: Array<BannerResponse> = []

  get firstLargeCard() {
    return this.getLargeCard(0)
  }

  get secondLargeCard() {
    return this.getLargeCard(1)
  }

  getLargeCard(index = 0) {
    const card = this.largeCards[index]

    if (!card) return null

    return {
      title: card.PROPERTIES.BANNER_TITLE?.VALUE ?? '',
      text: card.PROPERTIES.BANNER_TEXT.VALUE,
      image: API_BASE_URL + card.PROPERTIES.BANNER_IMAGE.SRC
    }
  }

  async fetch() {
    await this.fetchMainSlider()
    await this.fetchProducts()
    await this.fetchBanners()
  }

  async fetchMainSlider() {
    this.mainSlider = await getMainSlider('477')

    console.log(this.mainSlider)
  }

  async fetchBanners() {
    this.largeCards = [await getBanner('4960'), await getBanner('4961')]
  }

  async fetchProducts() {
    this.products = [
      await products.getById('4321'),
      await products.getById('4322'),
      await products.getById('4323'),
      await products.getById('4324')
    ]
  }

  beforeMount() {
    this.$fetch()
  }
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
