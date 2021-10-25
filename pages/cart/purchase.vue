<template>
  <div class="purchase">
    <div v-if="!hasFetch && false" class="container">
      <LoadingVue />
    </div>

    <div v-else class="container">
      <div class="row">
        <div class="col-8">
          <header class="purchase__header">
            <h2>Оформление заказа</h2>
          </header>
        </div>

        <div class="col-4">
          <router-link to="/cart">Вернуться в корзину</router-link>
        </div>
      </div>

      <div class="row">
        <div class="col-8">
          <section class="purchase__section">
            <h3>1. Где и как вы хотите получить заказ?</h3>

            <InputVue
              class="my-4"
              placeholder="Выберите регион, город"
              size="large"
            />

            <RadioCardsVue
              label="Выбор способа доставки"
              :options="deliveryOptions"
              class="mb-4"
            />

            <RadioGroupVue :options="deliveryProvider" />

            <h6 class="my-4">Укажите адрес доставки</h6>

            <InputVue label="Город" class="mb-4" :required="true" />
            <InputVue label="Улица" class="mb-4" :required="true" />

            <div class="row">
              <div class="col-6">
                <InputVue label="Дом" class="mb-4" :required="true" />
              </div>
              <div class="col-6">
                <InputVue label="Квартира" class="mb-4" :required="true" />
              </div>
            </div>
          </section>
        </div>

        <div class="col-4">
          <CabinetSectionVue class="purchase__bonus">
            <div class="purchase__bonus-icon">
              <CoinStackIcon />
            </div>
            <div v-if="hasAuth && bonus" class="purchase__bonus-text">
              <b>Доступно {{ numberWithSpaces(bonus) }} бонусных баллов.</b>
              <br />
              Оплачивайте ими до 50% от стоимости покупки
            </div>
          </CabinetSectionVue>
        </div>
      </div>
    </div>

    <!-- <div v-else class="container">
      <div class="purchase__empty">
        <h2>Ваша корзина пуста</h2>
        <p>Воспользуйтесь поиском, чтобы найти всё, что нужно.</p>
        <router-link class="btn btn-lg btn-primary" to="/catalog"
          >Продолжить покупки</router-link
        >
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Vue, Component, Prop } from 'vue-property-decorator'
import CabinetSectionVue from '~/components/cabinet/CabinetSection.vue'
import CartMixin from '~/mixins/Cart'

import InputVue from '~/components/inputs/Input.vue'
import RadioCardsVue, {
  RadioCardOptions
} from '~/components/inputs/RadioCards.vue'
import { SelectOption } from '~/models/general'
import RadioGroupVue from '~/components/inputs/RadioGroup.vue'

@Component({
  components: { CabinetSectionVue, InputVue, RadioCardsVue, RadioGroupVue },
  fetchOnServer: false
})
export default class PurchasePage extends mixins(CartMixin) {
  deliveryOptions: Array<RadioCardOptions> = [
    {
      title: 'Самовывоз',
      value: 'Самовывоз',
      description:
        'из магазина в Санкт-Петербурге (Московский проспект, д.222А, +7 (800) 775-03-04 )'
    },
    {
      title: 'Почта России',
      value: 'Почта России'
    },
    {
      title: 'Доставка',
      value: 'Доставка'
    }
  ]

  deliveryProvider: Array<SelectOption> = [
    {
      title: 'Курьер',
      value: 'Курьер'
    },
    {
      title: 'Пункт выдачи СДЭК',
      value: 'Пункт выдачи СДЭК'
    }
  ]
}
</script>

<style lang="scss" scoped>
.purchase {
  padding: 5.625rem 0;
  background-color: $gray-100;

  &__header {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;

    margin-bottom: 1.625rem;

    h2 {
      margin-bottom: 0;
    }

    small {
      margin-left: 1em;
    }
  }

  &__clear {
    align-self: flex-end;
    margin-left: auto;
  }

  &__summary {
    p {
      font-size: 0.75rem;
    }
  }

  &__total,
  &__total-bonus {
    font-size: 1rem;
    margin-bottom: 0.75rem;

    span {
      float: right;
    }
  }

  &__total {
    color: $gray-800;
    font-weight: 500;
  }

  &__bonus {
    background-color: $gray-200;
    color: $gray-800;

    &::v-deep > div {
      display: flex;
      flex-direction: row;
    }

    &-icon {
      color: $primary;
      padding-right: 0.75rem;
    }

    &-text {
      font-size: 1rem;
    }
  }

  &__empty {
    min-height: 12rem;
    text-align: center;
  }

  &__section {
    background-color: $white;
    padding: 1.875rem;
    border-radius: $border-radius-lg;
  }

  &::v-deep {
    .input {
      label,
      input {
        font-size: 1rem;
      }
    }
  }
}
</style>
