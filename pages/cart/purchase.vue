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
          <div
            v-if="errorFromServer"
            class="alert alert-danger mb-4"
            role="alert"
            v-html="errorFromServer"
          ></div>

          <!--
            1. Где и как вы хотите получить заказ?
          -->
          <section class="purchase__section">
            <h3>1. Где и как вы хотите получить заказ?</h3>

            <InputVue
              v-if="selectedDeliveryOption !== DeliveryOptions.pickup"
              v-model="locality"
              class="my-4"
              placeholder="Выберите регион, город"
              size="large"
            />

            <RadioCardsVue
              label="Выбор способа доставки"
              :options="deliveryOptions"
              class="mt-4"
              @change="(value) => (selectedDeliveryOption = value)"
            />

            <!--
              ~~ Доставка ~~
            -->

            <RadioGroupVue
              v-if="selectedDeliveryOption === DeliveryOptions.delivery"
              :options="deliveryProvider"
            />

            <!--
              ~~ Самовывоз ~~
            -->

            <p v-if="selectedDeliveryOption === DeliveryOptions.pickup">
              Вы можете самостоятельно забрать заказ из нашего магазина в будние
              дни с 9:30 до 18:00. Принимаем в оплату банковские карты
            </p>

            <!--
              ~~ НЕ Самовывоз ~~
            -->

            <div v-if="selectedDeliveryOption !== DeliveryOptions.pickup">
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
            </div>

            <!-- <SelectVue
              :search="true"
              :options="[
                {
                  value: '123',
                  title: 'dffsd'
                },
              ]"
            /> -->
          </section>

          <section class="purchase__section">
            <h3>2. Как вам будет удобнее оплатить заказ?</h3>

            <RadioCardsVue
              :options="paymentOptions"
              :value="selectedPaymentOption"
              :columns="2"
              class="my-4"
              @change="(value) => (selectedPaymentOption = value)"
            />

            <!--
              Оплата онлайн
            -->

            <RadioGroupVue
              v-if="selectedPaymentOption === PaymentOptions.online"
              class="my-4"
              :options="onlinePaymentTypes"
              :value="onlinePaymentType"
              @change="(value) => (onlinePaymentType = value)"
            />

            <!--
              Банковский счет
            -->

            <RadioGroupVue
              v-if="selectedPaymentOption === PaymentOptions.bankAccount"
              class="my-4"
              :options="bankPaymentTypes"
              :value="bankPaymentType"
              @change="(value) => (bankPaymentType = value)"
            />

            <div
              v-if="
                selectedPaymentOption === PaymentOptions.bankAccount &&
                bankPaymentType === BankPaymentType.account
              "
            >
              <h6 class="mt-5">
                Укажите данные, на которые нужно выставить счет:
              </h6>

              <InputVue label="ИНН" class="my-4" />
              <InputVue label="КПП" class="my-4" />
              <InputVue label="ОГРН" class="my-4" />
              <InputVue label="Расчетный счет" class="my-4" />
              <InputVue label="Банк" class="my-4" />
              <InputVue label="БИК" class="my-4" />
              <InputVue label="Корр. счет" class="my-4" />
              <InputVue
                label="Телефон"
                placeholder="+7 (___) _______"
                class="my-4"
              />
              <InputVue label="Генеральный директор" class="my-4" />
            </div>
          </section>

          <section class="purchase__section">
            <h3>3. Скидка к заказу</h3>

            <RadioGroupVue class="my-4" :options="discountType" />

            <div class="row">
              <div class="col-6">
                <InputVue />
              </div>
              <div class="col-6">
                <button class="btn btn-primary">Применить</button>
              </div>
            </div>
          </section>

          <section class="purchase__section">
            <h3>4. Укажите данные получателя заказа</h3>

            <InputVue
              v-model="fio"
              class="my-4"
              label="Фамилия Имя Отчество"
              :required="true"
              :error="$v.fio.$error ? FormErrors.required : false"
              @blur="$v.fio.$touch()"
              @focus="$v.fio.$reset()"
            />

            <div class="row">
              <div class="col-6">
                <InputVue
                  v-model="email"
                  label="Email"
                  type="email"
                  :required="true"
                  :error="$v.email.$error ? FormErrors.email : false"
                  @blur="$v.email.$touch()"
                  @focus="$v.email.$reset()"
                />
              </div>
              <div class="col-6">
                <InputVue
                  v-model="phone"
                  label="Телефон"
                  type="phone"
                  mask="+7 (###) ###-##-##"
                  :required="true"
                  :error="$v.phone.$error ? FormErrors.phone : false"
                  @blur="$v.phone.$touch()"
                  @focus="$v.phone.$reset()"
                />
              </div>
            </div>

            <small class="d-block mt-3">
              * Email нужен для отслеживания статуса заказа и получения
              специальных предложений
            </small>
          </section>

          <hr class="my-4" />

          <div class="purchase__prices pt-2">
            <div class="purchase__price-line">
              <span> Товары на сумму </span>
              <div class="purchase__price">
                {{ numberWithSpaces(priceTotal) }} ₽
              </div>
            </div>

            <div class="purchase__price-line">
              <span> Скидка </span>
              <div class="purchase__price--bonus">0 ₽</div>
            </div>

            <div class="purchase__price-line">
              <span> Стоимость доставки </span>
              <div class="purchase__price">0 ₽</div>
            </div>

            <div class="purchase__price-line">
              <span> <b>Итого к оплате</b> </span>
              <div class="purchase__price--final">
                {{ numberWithSpaces(priceTotal) }} ₽
              </div>
            </div>
          </div>

          <div class="row mt-5">
            <div class="col-7">
              <p>
                Нажимая кнопку «Оформить заказ», я даю свое согласие на
                обработку моих персональных данных, в соответствии с Федеральным
                законом от 27.07.2006 года №152-ФЗ «О персональных данных», на
                условиях и для целей, определенных в Согласии на обработку
                персональных данных
              </p>
            </div>
            <div class="col purchase__submit-block">
              <button class="btn btn-primary btn-lg px-5" @click="submit">
                Оформить заказ
              </button>
              <CheckboxVue v-model="managerCall" class="mt-2"
                >Нужен звонок менеджера</CheckboxVue
              >
            </div>
          </div>
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
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

// ~~ Validators ~~

import { required, email, minLength } from 'vuelidate/lib/validators'

// ~~ Mixins ~~

import { validationMixin } from 'vuelidate'
import storage from '~/services/storage'
import CartMixin from '~/mixins/Cart'

// ~~ Components ~

import InputVue from '~/components/inputs/Input.vue'
import CabinetSectionVue from '~/components/cabinet/CabinetSection.vue'
import RadioCardsVue, {
  RadioCardOptions
} from '~/components/inputs/RadioCards.vue'
import RadioGroupVue from '~/components/inputs/RadioGroup.vue'
import CheckboxVue from '~/components/inputs/Checkbox.vue'
import SelectVue from '~/components/inputs/Select.vue'

// ~~ Types etc. ~~

import { SelectOption } from '~/models/general'
import {
  DeliveryOptions,
  DeliveryProvider,
  DiscountTypes,
  OnlinePaymentType,
  PaymentOptions,
  BankPaymentType
} from '~/models/purchase'
import { FormErrors } from '~/services/errors'
import { makeOrder } from '~/services/api/product'

@Component({
  components: {
    CabinetSectionVue,
    InputVue,
    RadioCardsVue,
    RadioGroupVue,
    CheckboxVue,
    SelectVue
  },
  fetchOnServer: false,
  validations: {
    fio: {
      required
    },
    phone: {
      required,
      minLength: minLength(10)
    },
    email: {
      required,
      email
    }
  }
})
export default class PurchasePage extends mixins(CartMixin, validationMixin) {
  storeStateTimeout: NodeJS.Timeout | null = null
  errorFromServer: string | null = null

  locality = ''
  fio = ''
  email = ''
  phone = ''

  pointsToUse = 0
  promocode: string | null = null
  isPromocodeValid = false

  selectedDeliveryOption = DeliveryOptions.pickup
  selectedDiscountType = DiscountTypes.points
  selectedPaymentOption = PaymentOptions.online
  onlinePaymentType = OnlinePaymentType.card
  bankPaymentType = BankPaymentType.receipt

  managerCall = true

  // ~~ Methods ~~

  async submit() {
    const payload = this.toPlainObject()

    try {
      await makeOrder(payload)
    } catch (error) {
      this.errorFromServer = error!.message
    }
  }

  toPlainObject() {
    return {
      locality: this.locality,
      fio: this.fio,
      email: this.email,
      phone: this.phone,
      pointsToUse: this.pointsToUse,
      promocode: this.promocode,
      selectedDeliveryOption: this.selectedDeliveryOption,
      selectedDiscountType: this.selectedDiscountType,
      selectedPaymentOption: this.selectedPaymentOption,
      onlinePaymentType: this.onlinePaymentType,
      bankPaymentType: this.bankPaymentType,
      managerCall: this.managerCall
    }
  }

  @Watch('locality')
  @Watch('fio')
  @Watch('email')
  @Watch('phone')
  @Watch('pointsToUse')
  @Watch('promocode')
  @Watch('selectedDeliveryOption')
  @Watch('selectedDiscountType')
  @Watch('selectedPaymentOption')
  @Watch('onlinePaymentType')
  @Watch('bankPaymentType')
  @Watch('managerCall')
  storeState() {
    clearTimeout(this.storeStateTimeout as NodeJS.Timeout)

    this.storeStateTimeout = setTimeout(() => {
      storage.set('purchaseState', this.toPlainObject())
    }, 1000)
  }

  restoreState() {
    const restored = storage.get('purchaseState') || {}

    this.locality = restored.locality ?? this.locality
    this.fio = restored.fio ?? this.fio
    this.email = restored.email ?? this.email
    this.locality = restored.phone ?? this.locality

    this.pointsToUse = restored.pointsToUse ?? this.pointsToUse
    this.promocode = restored.promocode ?? this.promocode

    this.selectedDeliveryOption =
      restored.selectedDeliveryOption ?? this.selectedDeliveryOption
    this.selectedDiscountType =
      restored.selectedDiscountType ?? this.selectedDiscountType
    this.selectedPaymentOption =
      restored.selectedPaymentOption ?? this.selectedPaymentOption
    this.onlinePaymentType =
      restored.onlinePaymentType ?? this.onlinePaymentType
    this.bankPaymentType = restored.bankPaymentType ?? this.bankPaymentType

    this.managerCall = restored.managerCall ?? this.managerCall
  }

  // ~~ Hooks ~~

  fetch() {
    this.restoreState()
  }

  // ~~ Enums ~~

  FormErrors = FormErrors
  DeliveryOptions = DeliveryOptions
  OnlinePaymentType = OnlinePaymentType
  DiscountTypes = DiscountTypes
  DeliveryProvider = DeliveryProvider
  PaymentOptions = PaymentOptions
  BankPaymentType = BankPaymentType

  // ~~ Option lists ~~

  deliveryOptions: Array<RadioCardOptions> = [
    {
      title: 'Самовывоз',
      value: DeliveryOptions.pickup,
      description:
        'из магазина в Санкт-Петербурге (Московский проспект, д.222А, +7 (800) 775-03-04)'
    },
    // {
    //   title: 'Почта России',
    //   value: DeliveryOptions.post
    // },
    // {
    //   title: 'Доставка',
    //   value: DeliveryOptions.delivery
    // }
  ]

  deliveryProvider: Array<SelectOption> = [
    {
      title: 'Курьер',
      value: DeliveryProvider.courier
    },
    {
      title: 'Пункт выдачи СДЭК',
      value: DeliveryProvider.sdek
    }
  ]

  paymentOptions: Array<RadioCardOptions> = [
    {
      title: 'Онлайн',
      value: PaymentOptions.online,
      description: 'Картой, Apple Pay, Google Pay'
    },
    {
      title: 'При получении',
      value: PaymentOptions.onReceiving,
      description: 'Наличными, картой'
    },
    {
      title: 'Электронными деньгами',
      value: PaymentOptions.emoney,
      description: 'Монета.ру, QIWI Кошелек'
    },
    {
      title: 'Банковский счет',
      value: PaymentOptions.bankAccount,
      description: 'Оплатить квитанцию в банке, банковский счет'
    }
  ]

  onlinePaymentTypes: Array<SelectOption> = [
    {
      title: 'Картами Visa, MasterCard, Мир',
      value: OnlinePaymentType.card
    },
    {
      title: 'Apple Pay',
      value: OnlinePaymentType.apple
    },
    {
      title: 'Google Pay',
      value: OnlinePaymentType.google
    }
  ]

  bankPaymentTypes: Array<SelectOption> = [
    { title: 'Оплата квитанции в банке', value: BankPaymentType.receipt },
    { title: 'Выставить счет', value: BankPaymentType.account }
  ]

  payOnHandingType: Array<SelectOption> = [
    { title: 'Оплата квитанции в банке', value: BankPaymentType.receipt },
    { title: 'Выставить счет', value: BankPaymentType.account }
  ]

  discountType: Array<SelectOption> = [
    {
      title: 'Бонусные баллы',
      value: DiscountTypes.points
    },
    {
      title: 'Промокод',
      value: DiscountTypes.code
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
    margin-bottom: 1.875rem;

    p {
      font-size: 1rem;
    }
  }

  &__price-line {
    border-bottom: 1px dashed;
    border-color: $gray-800;
    margin-bottom: 1.25rem;

    span {
      position: relative;
      display: inline-block;
      background: $gray-100;
      padding: 0 12px 0 0;
      top: 6px;
      color: $gray-800;
      font-size: 1rem;
    }
  }

  &__price {
    &,
    &--bonus,
    &--final {
      position: relative;
      top: 10px;
      width: 180px;
      text-align: right;
      float: right;
      font-size: 1rem;
      font-weight: 500;
      color: $gray-800;
      background: $gray-100;
    }

    &--bonus {
      color: $secondary;
    }

    &--final {
      top: 6px;
      font-size: 1.625rem;
    }
  }

  &__submit-block {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  &::v-deep {
    .input {
      label,
      input {
        font-size: 1rem;
      }
    }

    .checkbox {
      input {
        transform: translateY(-0.15rem);
        border-color: $gray-600;
      }
      label {
        font-size: 1rem;
      }
    }
  }
}
</style>
