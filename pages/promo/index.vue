<template>
  <div class="promo">
    <JumbotronVue background="/promo-1.jpg">
      <h1>Акции</h1>
    </JumbotronVue>

    <div class="container">
      <div class="promo__select-type">
        Показать:
        <router-link to="/promo" :class="{ disabled: showActive }" class="ms-1">
          Актуальные акции</router-link
        >

        <router-link
          to="/promo?type=ended"
          :class="{ disabled: !showActive }"
          class="ms-1"
        >
          Завершенные акции
        </router-link>
      </div>

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
                backgroundImage: `url('${promo.image}')`
              }"
            ></div>
          </div>
          <div class="col-6 promo__item-body">
            <small>с {{ promo.from }} по {{ promo.to }}</small>
            <h3>
              {{ promo.title }}
            </h3>

            <p v-html="promo.text"></p>

            <router-link
              :to="`/promo/${promo.code}`"
              class="btn btn-light px-4 bg-gray-200"
            >
              Читать подробнее
            </router-link>
          </div>
        </div>
      </div>

      <div v-else class="pb-5 mb-5">
        <p>На данный момент акций нет</p>

        <router-link to="/" class="btn btn-primary px-4 mb-5">
          Вернуться на главную
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import JumbotronVue from '~/components/Jumbotron.vue'
import { promotions } from '~/store'

@Component({ components: { JumbotronVue } })
export default class PromoPage extends Vue {
  get showActive() {
    return this.$route.query.type !== 'ended'
  }

  get promotions() {
    if (this.showActive) return promotions.active
    return promotions.ended
  }

  async fetch() {
    await promotions.fetch()
  }
}
</script>

<style lang="scss" scoped>
.promo {
  padding-bottom: 1rem;
  background-color: $white;

  &__select-type {
    display: flex;
    justify-content: flex-end;
    padding: 3.125rem 0;

    a.disabled {
      color: $gray-600;
      text-decoration: none;
      pointer-events: none;
    }
  }

  &__item {
    margin-bottom: 8.4375rem;

    small {
      display: inline-block;
      font-size: 0.75rem;
      margin-bottom: 1.875rem;
    }

    h3 {
      margin-bottom: 1.875rem;
      max-width: 80%;
    }

    p {
      font-size: 1rem;
    }

    &:nth-child(even) {
      display: flex;
      flex-direction: row-reverse;
    }
  }

  &__image {
    height: 20.625rem;
    background-position: center;
    background-size: cover;
    border-radius: $border-radius-lg;
  }

  &__item-body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .btn {
      justify-self: flex-end;
      margin-top: auto;
    }
  }

  &__item:nth-child(odd) &__item-body {
    padding-left: 2.5rem;
  }
}
</style>
