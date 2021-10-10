<template>
  <div class="promo-product-slide">
    <div class="row">
      <div class="col-6">
        <h3 class="promo-product-slide__title">
          Спеццена на ножи <b>LionSteel</b>
        </h3>
        <p>
          Новая модель лимитированной серии от итальянской компании LION STEEL
        </p>
      </div>
      <div class="col-6 promo-product-slide__image">
        <figure>
          <img src="/promo-knife.png" />
        </figure>
      </div>
    </div>
    <div class="row">
      <div class="col-6 promo-product-slide__actions">
        <button class="btn btn-primary btn-lg px-5">Подробнее</button>
      </div>
      <div class="col-6 promo-product-slide__price">
        <div class="promo-product-slide__price-new">17 920 ₽</div>
        <div class="promo-product-slide__price-old">20 900 ₽</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class PromoProductSlideVue extends Vue {}
</script>

<style lang="scss" scoped>
h3 {
  font-weight: 400;
  margin-bottom: 1.25rem;

  b {
    font-weight: 500;
  }
}

p {
  font-size: 1rem;
}

figure {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 255px;
  height: 200px;

  img {
    max-width: 100%;
    max-height: 100%;
  }
}

.promo-product-slide {
  &__image {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }

  &__actions {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
  }

  &__price {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    font-weight: 500;

    &-new {
      font-size: 1.625rem;
      color: $gray-900;
    }

    &-old {
      font-size: 1.125rem;
      text-decoration: line-through;
    }
  }
}
</style>
