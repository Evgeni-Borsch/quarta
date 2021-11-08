<template>
  <div class="promo">
    <JumbotronVue background="/promo-1.jpg">
      <h1>Акции</h1>
    </JumbotronVue>

    <div class="container">
      <div v-if="promotions.length">
        <div
          v-for="promo of promotions"
          :key="promo.id"
          class="row promo__item"
        >
          <div class="col-6">
            <div
              class="promo__image"
              :style="{
                backgroundImage: `url('${API_BASE_URL + promo.image}')`
              }"
            ></div>
          </div>
          <div class="col-6">
            <small>с {{ promo.from }} по {{ promo.to }}</small>
            <h3>
              {{ promo.title }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import JumbotronVue from '~/components/Jumbotron.vue'
import { getPromotions } from '~/services/api/promo'
import { API_BASE_URL } from '~/services/constants'

@Component({ components: { JumbotronVue } })
export default class PromoPage extends Vue {
  promotions: Array<{}> = []

  API_BASE_URL = API_BASE_URL

  async fetch() {
    const response = await getPromotions()

    response.ITEMS.forEach((item) => {
      const fromParts = item.ACTIVE_FROM.split(' ')[0].split('.')
      const toParts = item.ACTIVE_TO.split(' ')[0].split('.')

      this.promotions.push({
        raw: item,
        id: item.ID,
        title: item.NAME,
        image: item.PREVIEW_PICTURE.SRC,
        from: new Date(
          `${fromParts[2]}-${fromParts[1]}-${fromParts[0]}`
        ).toLocaleDateString('RU'),
        to: new Date(
          `${toParts[2]}-${toParts[1]}-${toParts[0]}`
        ).toLocaleDateString('RU')
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.promo {
  background-color: $white;

  &__item {
    margin-top: 8.4375rem;
    margin-bottom: 8.4375rem;
  }

  &__image {
    height: 20.625rem;
    background-position: center;
    background-size: cover;
    border-radius: $border-radius-lg;
  }
}
</style>
