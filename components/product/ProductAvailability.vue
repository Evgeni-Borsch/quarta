<template>
  <div class="product-availability container pb-5">
    <h3>Наличие товара</h3>

    <div class="row product-availability__header">
      <div class="col-5 product-availability__cell">Адрес</div>
      <div class="col-2 product-availability__cell">Режим работы</div>
      <div class="col-2 product-availability__cell">Наличие</div>
      <div class="col"></div>
    </div>

    <div class="row product-availability__spot">
      <div class="col-5 product-availability__cell">
        <div class="product-availability__address">
          <LocationIcon class="icon" />
          <b>Санкт-Петербург</b>, ул. Гражданский проспект, д. 39А (м.
          "Академическая")
        </div>
      </div>
      <div class="col-2 product-availability__cell">10:00 – 22:00</div>
      <div class="col-2 product-availability__cell">В наличии</div>
      <div class="col-3 product-availability__cell">
        <button class="btn">Выбрать</button>
      </div>
    </div>

    <div class="row product-availability__spot">
      <div class="col-5 product-availability__cell">
        <div class="product-availability__address">
          <LocationIcon class="icon" />
          <b>Санкт-Петербург</b>, ул. Гражданский проспект, д. 39А (м.
          "Академическая")
        </div>
      </div>
      <div class="col-2 product-availability__cell">10:00 – 22:00</div>
      <div class="col-2 product-availability__cell">В наличии</div>
      <div class="col-3 product-availability__cell">
        <button class="btn">Выбрать</button>
      </div>
    </div>

    <hr />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import LocationIcon from '~/assets/icons/location.svg?icon'

export default defineComponent({
  components: { LocationIcon },
  setup() {},
})
</script>

<style lang="scss" scoped>
.product-availability {
  color: $gray-800;

  .btn {
    color: $gray-800;
    background-color: $gray-100;
    padding: 0.8125rem 3rem;
    font-weight: 500;
  }

  &__cell {
    justify-content: flex-start;
    display: flex;
    align-items: center;
    padding: 1.125rem 1.25rem;

    &:last-child {
      justify-content: flex-end;
      padding-right: 0;
    }
  }

  &__header {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    background-color: $gray-100;
    border-radius: $border-radius-sm;
    font-size: 0.8125rem;
  }

  &__address {
    position: relative;
    padding-left: 1.25rem;

    b {
      font-weight: 500;
    }

    .icon {
      position: absolute;
      top: 0.1rem;
      left: 0;
      height: 0.8125rem;
      color: $gray-600;
    }
  }
}
</style>
