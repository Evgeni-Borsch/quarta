<template>
  <section class="advantages bg-white">
    <div class="container">
      <h2>Наши преимущества</h2>
      <div class="row">
        <div class="col-3">
          <h4>
            <img src="/assets/icons/shipped.svg" class="icon" />
            Доставка
          </h4>
          <p>
            Бесплатная доставка по&nbsp;СПб и&nbsp;Москве от&nbsp;15000&nbsp;₽,
            по&nbsp;России от&nbsp;5000&nbsp;₽
          </p>
        </div>
        <div class="col-3">
          <h4>
            <img src="/assets/icons/voucher.svg" class="icon" />
            Баллы
          </h4>
          <p>
            Копите баллы за&nbsp;покупки и&nbsp;оплачивайте ими до&nbsp;50%
            стоимости товара
          </p>
        </div>
        <div class="col-3">
          <h4>
            <img src="/assets/icons/best-price.svg" class="icon" />
            Опт
          </h4>
          <p>Продажа напрямую от&nbsp;производителя и&nbsp;дистрибьютора</p>
        </div>
        <div class="col-3">
          <h4>
            <img src="/assets/icons/medal.svg" class="icon" />
            Гарантия
          </h4>
          <p>Официальный поставщик</p>
        </div>

        <div class="col-3">
          <h4>
            <img src="/assets/icons/shield.svg" class="icon" />
            Надежность
          </h4>
          <p>Продажа товаров для охоты с&nbsp;2001 года</p>
        </div>
        <div class="col-3">
          <h4>
            <img src="/assets/icons/manufacture.svg" class="icon" />
            Бренды
          </h4>
          <p>Являемся производителями и&nbsp;собственниками брендов</p>
        </div>
        <div class="col-3">
          <h4>
            <img src="/assets/icons/world.svg" class="icon" />
            Удобство
          </h4>
          <p>Доставка по&nbsp;всей России и&nbsp;странам ЕАЭС</p>
        </div>
        <div class="col-3">
          <h4>
            <img src="/assets/icons/gun.svg" class="icon" />
            Практика
          </h4>
          <p>
            Как практикующие охотники и&nbsp;стрелки знаем, что нужно
            покупателям
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class AdvantagesVue extends Vue {}
</script>

<style lang="scss" scoped>
.advantages {
  padding: 8.75rem 0;

  h2 {
    margin-bottom: 6.125rem;
  }

  h4 {
    display: flex;
    align-items: center;
    padding: 0.875rem;
    background-color: $gray-100;
    border-radius: $border-radius;
    margin-bottom: 1.25rem;
  }

  p {
    font-size: 1rem;
    max-width: 95%;
  }

  [class*='col-'] {
    margin-bottom: 6rem;
  }

  img.icon {
    margin-right: 1.25rem;
    max-height: 2.5rem;
    width: auto;
  }
}
</style>
