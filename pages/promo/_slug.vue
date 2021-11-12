<template>
  <div class="promo-item">
    <div class="promo-item__jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-6">
            <p>c {{ promo.from }} по {{ promo.to }}</p>
            <h1>{{ promo.title }}</h1>
            <p class="fs-6" v-html="promo.text"></p>
          </div>

          <div class="col-6">
            <figure class="promo-item__image">
              <img src="/colimator-promo.png" :alt="promo.title" />

              <object
                class="promo-item__q"
                type="image/svg+xml"
                :data="qImage"
              ></object>
            </figure>
          </div>
        </div>
      </div>
    </div>

    <div class="promo-item__body">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-8 col-lg-6">
            <p v-html="promo.text"></p>

            <p class="pt-5">
              <b class="text-dark">Внимание!</b><br /><br />

              В этой акции не будут работать ваши бонусные баллы! Это значит,
              что за покупку бонусные баллы будут начисляться, но ими нельзя
              оплатить товар, участвующий в акции!
            </p>

            <router-link
              to="/promo"
              class="btn btn-light px-4 mt-5 bg-gray-200"
            >
              Вернуться к списку акций
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Promotion, promotions } from '~/store'

import qImage from '~/assets/images/q.svg'

@Component({
  middleware: ['promo']
})
export default class PromoItemPage extends Vue {
  promo: Promotion | null = null

  qImage = qImage

  fetch() {
    this.promo = promotions.getByCode(this.$route.params.slug) as Promotion

    console.log(this.promo)
  }
}
</script>

<style lang="scss" scoped>
.promo-item {
  background-color: $white;

  &__jumbotron {
    overflow: hidden;
    padding: 5.125rem 0;
    height: 25rem;
    background-color: $gray-200;

    h1 {
      margin: 3.875rem 0 2.25rem;
    }
  }

  &__image {
    position: relative;
    max-height: 25rem;
    top: -5.125rem;

    img {
      position: relative;
      max-width: 100%;
      max-height: 100%;
      z-index: 1;
    }
  }

  &__q {
    width: 25rem;
    position: absolute;
    top: -8rem;
    right: -8rem;
  }

  &__body {
    padding: 6.25rem 0 8.5rem;
    font-size: 1rem;
  }
}
</style>
