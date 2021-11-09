<template>
  <section class="promo-card-wide__wrapper">
    <div class="container">
      <div class="promo-card-wide">
        <figure class="promo-card-wide__big-q">
          <object type="image/svg+xml" :data="qImage" />
        </figure>
        <div class="row">
          <div class="col-6">
            <h3>Бинокли для охоты!</h3>
            <p>
              Модели с&nbsp;возможностью установки на&nbsp;штатив, а&nbsp;также
              сочетаемые с&nbsp;фотокамерой.
            </p>

            <router-link to="/catalog/binokli" class="btn btn-lg btn-outline-light">
              Смотреть товары
            </router-link>
          </div>

          <div class="col-6">
            <figure class="promo-card-wide__image">
              <img src="/binoculars-category.png" alt="" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import qImage from '~/assets/images/q-white.svg'

@Component({})
export default class PromoCardWideVue extends Vue {
  @Prop({ required: true }) title!: string
  @Prop({ required: true }) image!: string

  qImage = qImage
}
</script>

<style lang="scss" scoped>
.promo-card-wide {
  position: relative;
  height: 20.125rem;
  background-color: $primary;
  border-radius: $border-radius-lg;
  padding: 0 5.625rem;

  &,
  h3,
  p {
    color: $white;
  }

  .row {
    height: 100%;
  }

  [class*='col-'] {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
  }

  h3 {
    margin: 0 0 1.125rem;
  }

  p {
    font-size: 1rem;
    margin: 0 0 1.625rem;
  }

  &__wrapper {
    background-color: $gray-100;
    padding-bottom: 8.75rem;
  }

  &__big-q {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  &__image {
    align-self: flex-end;
    margin-right: auto;
    position: relative;
    margin: 0;
    z-index: 2;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
