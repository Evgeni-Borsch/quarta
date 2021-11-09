<template>
  <div class="history-order">
    <div class="history-order__header">
      <div class="row">
        <div class="col-6">Заказ</div>
        <div class="col-2">Дата заказа</div>
        <div class="col-2">Сумма заказа</div>
        <div class="col-2">Статус заказа</div>
      </div>
    </div>

    <div class="history-order__summary">
      <div class="row">
        <div class="col-6">
          <span>
            <b>{{ order.id }}</b
            ><br />
            <b>Доставка:</b> {{ order.delivery }}<br />
            <b>Сумма за доставку:</b>
            {{ numberWithSpaces(order.deliveryPrice) }} ₽
          </span>
        </div>
        <div class="col-2">
          <span>
            <b> 30.11.20 </b>
          </span>
        </div>
        <div class="col-2">
          <span>
            <b> {{ numberWithSpaces(order.price) }} ₽ </b>
          </span>
        </div>
        <div class="col-2">
          <span>
            <b> В корзине </b><br />
            Обновлён 12.03.21
          </span>
        </div>
      </div>
    </div>

    <div class="history-order__body">
      <h6>Состав заказа:</h6>
      <div
        v-for="product of order.products"
        :key="product.id"
        class="row history-order__item"
      >
        <div class="col-6 history-order__item-card">
          <figure :style="{ backgroundImage: `url('/no-image.svg')` }"></figure>
          <span>
            {{ product.name }}
          </span>
        </div>
        <div class="col-2">{{ product.count }} шт</div>
        <div class="col-2">{{ product.price }} ₽</div>
        <div class="col-2">543 балла</div>
      </div>

      <router-link
        to="/cabinet/reviews"
        class="btn btn-primary btn-lg px-5 history-order__review-button"
      >
        Оставить отзыв
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Order } from '~/store'
import numberWithSpaces from '~/utils/numberWithSpaces'

@Component({})
export default class HistoryOrder extends Vue {
  @Prop({ required: true }) order!: Order

  numberWithSpaces = numberWithSpaces
}
</script>

<style lang="scss" scoped>
.history-order {
  margin-bottom: 1.875rem;

  &__header {
    padding: 1.25rem 1.875rem;
    background-color: $gray-200;
    border-radius: $border-radius-lg $border-radius-lg 0 0;
    color: $gray-800;
  }

  &__summary {
    padding: 2rem 1.875rem 3.125rem;
    background-color: $white;
    font-size: 1rem;
    color: $gray-800;

    border-bottom: 1px solid #eeeeee;

    b {
      font-weight: 500;
    }

    [class*='col-'] {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  &__body {
    padding: 1.25rem 1.875rem;
    background-color: $white;
    font-size: 1rem;
    border-radius: 0 0 $border-radius-lg $border-radius-lg;

    [class*='col-'] {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  &__item {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;

    figure {
      width: 3.5rem;
      height: 3.5rem;
      min-width: 3.5rem;
      min-height: 3.5rem;
      border: 1px solid #eeeeee;
      box-sizing: border-box;
      border-radius: 4px;
      background-size: cover;
      background-position: center;
      margin-right: 1.25rem;
      margin-bottom: 0;
    }

    [class*='col-'] {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  &__item-card {
    flex-direction: row !important;
    justify-content: flex-start;
    align-items: center;
    padding-right: 10rem;
  }

  &__review-button {
    margin-top: 1.875rem;
  }
}
</style>
