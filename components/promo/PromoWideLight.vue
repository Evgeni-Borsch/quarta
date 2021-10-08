<template>
  <div class="promo-wide-light">
    <div class="row">
      <div class="col-6 promo-wide-light__text">
        <h3>Удовольствие от каждого выстрела</h3>
        <p>Коллиматор Holosun OpenReflex открытый, на Weaver/Picatinny</p>
        <button class="btn btn-primary">Подробнее</button>
      </div>

      <div class="col-6">
        <figure class="promo-wide-light__image">
          <img
            src="/collimator-scope.png"
            alt="Удовольствие от каждого выстрела"
          />
        </figure>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class PromoWideLight extends Vue {}
</script>

<style lang="scss" scoped>
.promo-wide-light {
  background-color: $white;
  height: 20.5rem;
  margin-bottom: 5.125rem;

  h3,
  p {
    position: relative;
    max-width: 20.5rem;
    margin-bottom: 1.375rem;
    z-index: 1;
  }

  p {
    font-size: 1rem;
  }

  .row,
  [class*='col-'] {
    height: 100%;
  }

  .btn {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }

  &__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  &__image {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: $gray-200;
    border-radius: $border-radius-lg;

    img {
      max-width: 100%;
    }
  }
}
</style>
