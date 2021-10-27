<template>
  <div class="purchase">
    <div v-if="!hasFetched && !isRestored" class="container">
      <LoadingVue />
    </div>

    <div v-else class="container">
      <div class="row">
        <div class="col-8">
          <header class="purchase__header">
            <h2>Оформление заказа</h2>
          </header>
        </div>

        <div class="col-4 d-flex">
          <router-link to="/cart" class="purchase__back"
            >Вернуться в корзину</router-link
          >
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
              Оплата при доставке
            -->

            <RadioGroupVue
              v-if="selectedPaymentOption === PaymentOptions.onReceiving"
              class="my-4"
              :options="payOnRecive"
              :value="paymentOnRecive"
              @change="(value) => (paymentOnRecive = value)"
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

              <InputVue
                v-model="inn"
                label="ИНН"
                class="my-4"
                :required="true"
                :error="$v.inn.$error ? FormErrors.required : false"
                @blur="$v.inn.$touch()"
                @focus="$v.inn.$reset()"
              />
              <InputVue
                v-model="kpp"
                label="КПП"
                class="my-4"
                :required="true"
                :error="$v.kpp.$error ? FormErrors.required : false"
                @blur="$v.kpp.$touch()"
                @focus="$v.kpp.$reset()"
              />
              <InputVue
                v-model="ogrn"
                label="ОГРН"
                class="my-4"
                :required="true"
                :error="$v.ogrn.$error ? FormErrors.required : false"
                @blur="$v.ogrn.$touch()"
                @focus="$v.ogrn.$reset()"
              />
              <InputVue
                v-model="paymentAccount"
                label="Расчетный счет"
                class="my-4"
                :required="true"
                :error="$v.paymentAccount.$error ? FormErrors.required : false"
                @blur="$v.paymentAccount.$touch()"
                @focus="$v.paymentAccount.$reset()"
              />
              <InputVue
                v-model="bank"
                label="Банк"
                class="my-4"
                :required="true"
                :error="$v.bank.$error ? FormErrors.required : false"
                @blur="$v.bank.$touch()"
                @focus="$v.bank.$reset()"
              />
              <InputVue
                v-model="bik"
                label="БИК"
                class="my-4"
                :required="true"
                :error="$v.bik.$error ? FormErrors.required : false"
                @blur="$v.bik.$touch()"
                @focus="$v.bik.$reset()"
              />
              <InputVue
                v-model="correspondentAccount"
                label="Корр. счет"
                class="my-4"
                :required="true"
                :error="
                  $v.correspondentAccount.$error ? FormErrors.required : false
                "
                @blur="$v.correspondentAccount.$touch()"
                @focus="$v.correspondentAccount.$reset()"
              />
              <InputVue
                v-model="bankPhone"
                label="Телефон"
                placeholder="+7 (___) _______"
                class="my-4"
                :required="true"
                :error="$v.bankPhone.$error ? FormErrors.required : false"
                @blur="$v.bankPhone.$touch()"
                @focus="$v.bankPhone.$reset()"
              />
              <InputVue
                v-model="bankCEO"
                label="Генеральный директор"
                class="my-4"
                :required="true"
                :error="$v.bankCEO.$error ? FormErrors.required : false"
                @blur="$v.bankCEO.$touch()"
                @focus="$v.bankCEO.$reset()"
              />
            </div>
          </section>

          <section class="purchase__section">
            <h3>3. Скидка к заказу</h3>

            <RadioGroupVue
              v-if="appliedPoints === null && appliedPromocode === null"
              class="my-4"
              :options="discountType"
              :value="selectedDiscountType"
              @change="(value) => (selectedDiscountType = value)"
            />

            <!--
              Промокод
            -->

            <form
              v-if="
                selectedDiscountType === DiscountTypes.code &&
                appliedPromocode === null
              "
              class="row"
              @submit.prevent="applyPromoCode"
            >
              <div class="col-6">
                <InputVue v-model="promoCodeToUse" :error="promoCodeError" />
              </div>
              <div class="col-6">
                <button class="btn btn-primary">Применить</button>
              </div>
            </form>

            <p v-if="appliedPromocode !== null" class="mt-4 text-secondary">
              <b> Применен промокод: {{ appliedPromocode }} </b>
            </p>

            <button
              v-if="appliedPromocode !== null"
              class="btn btn-primary"
              @click="clearPromoCode"
            >
              Сбросить
            </button>

            <!--
              Бонусы
            -->

            <form
              v-if="
                selectedDiscountType === DiscountTypes.points &&
                appliedPoints === null
              "
              class="row"
              @submit.prevent="applyBonus"
            >
              <div class="col-6">
                <InputVue
                  v-model="pointsToUse"
                  :error="bonusError"
                  type="number"
                />
              </div>
              <div class="col-2">
                <button class="btn btn-primary w-100">Списать</button>
              </div>
            </form>

            <p v-if="appliedPoints !== null" class="mt-4 text-secondary">
              <b> Применено {{ appliedPoints }} бонусов </b>
            </p>

            <button
              v-if="appliedPoints !== null"
              class="btn btn-primary"
              @click="clearBonus"
            >
              Сбросить
            </button>
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
              <div class="purchase__price--bonus">
                {{ numberWithSpaces(discountTotal) }} ₽
              </div>
            </div>

            <div class="purchase__price-line">
              <span> Стоимость доставки </span>
              <div class="purchase__price">
                {{ numberWithSpaces(priceTotal) }} ₽
              </div>
            </div>

            <div class="purchase__price-line">
              <span> <b>Итого к оплате</b> </span>
              <div class="purchase__price--final">
                {{ numberWithSpaces(priceTotal + deliveryPrice) }} ₽
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
              <CheckboxVue v-model="managerCall" class="mt-2">
                Нужен звонок менеджера
              </CheckboxVue>
            </div>
          </div>
        </div>

        <div class="col-4">
          <CabinetSectionVue class="purchase__summary">
            <div class="purchase__summary-title">
              В заказе {{ countTotal }} товара на сумму {{ priceTotal }} ₽
            </div>

            <div
              v-for="product of products"
              :key="product.id"
              class="purchase__summary-product"
            >
              <div class="purchase__summary-product-title">
                {{ product.title }}
              </div>
              {{ getProductCount(product.id) }} шт. x {{ product.price }} ₽
              <small v-if="product.priceOld">
                {{ product.priceOld }}
              </small>
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
  BankPaymentType,
  PayOnRecive
} from '~/models/purchase'
import { FormErrors } from '~/services/errors'
import { makeOrder } from '~/services/api/product'
import { checkPromoCode } from '~/services/api/order'
import { cart, user } from '~/store'

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
    },

    inn: {
      required
    },
    kpp: {
      required
    },
    ogrn: {
      required
    },
    paymentAccount: {
      required
    },
    bank: {
      required
    },
    bik: {
      required
    },
    correspondentAccount: {
      required
    },
    bankPhone: {
      required
    },
    bankCEO: {
      required
    }
  }
})
export default class PurchasePage extends mixins(CartMixin, validationMixin) {
  priceTotal!: number

  isRestored = false

  storeStateTimeout: NodeJS.Timeout | null = null
  errorFromServer: string | null = null
  bonusError: string | null = null
  promoCodeError: string | null = null

  deliveryPrice = 500

  locality = ''
  fio = ''
  email = ''
  phone = ''

  pointsToUse = ''
  promoCodeToUse = ''
  appliedPoints: number | null = null
  appliedPromocode: string | null = null

  selectedDeliveryOption = DeliveryOptions.pickup
  selectedDiscountType = DiscountTypes.points
  selectedPaymentOption = PaymentOptions.online
  onlinePaymentType = OnlinePaymentType.card
  bankPaymentType = BankPaymentType.receipt
  paymentOnRecive = PayOnRecive.cash

  // Bank Account

  inn = ''
  kpp = ''
  ogrn = ''
  paymentAccount = ''
  bank = ''
  bik = ''
  correspondentAccount = ''
  bankPhone = ''
  bankCEO = ''

  managerCall = true

  // ~~ Getters ~~

  get user() {
    return user.bonus
  }

  // ~~ Methods ~~

  async submit() {
    if (!this.validateInput()) {
      return window.scrollTo(0, 0)
    }

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
      appliedPoints: this.appliedPoints,
      appliedPromocode: this.appliedPromocode,
      selectedDeliveryOption: this.selectedDeliveryOption,
      selectedDiscountType: this.selectedDiscountType,
      selectedPaymentOption: this.selectedPaymentOption,
      onlinePaymentType: this.onlinePaymentType,
      bankPaymentType: this.bankPaymentType,
      managerCall: this.managerCall,

      paymentOnRecive: this.paymentOnRecive,

      inn: this.inn,
      kpp: this.kpp,
      ogrn: this.ogrn,
      paymentAccount: this.paymentAccount,
      bank: this.bank,
      bik: this.bik,
      correspondentAccount: this.correspondentAccount,
      bankPhone: this.bankPhone,
      bankCEO: this.bankCEO
    }
  }

  @Watch('locality')
  @Watch('fio')
  @Watch('email')
  @Watch('phone')
  @Watch('managerCall')
  // bonus
  @Watch('appliedPoints')
  @Watch('appliedPromocode')
  // delivery & payment
  @Watch('selectedDeliveryOption')
  @Watch('selectedDiscountType')
  @Watch('selectedPaymentOption')
  @Watch('onlinePaymentType')
  @Watch('bankPaymentType')
  @Watch('paymentOnRecive')
  // bank account
  @Watch('inn')
  @Watch('kpp')
  @Watch('ogrn')
  @Watch('paymentAccount')
  @Watch('bank')
  @Watch('bik')
  @Watch('correspondentAccount')
  @Watch('bankPhone')
  @Watch('bankCEO')
  storeState() {
    clearTimeout(this.storeStateTimeout as NodeJS.Timeout)

    this.storeStateTimeout = setTimeout(() => {
      storage.set('purchaseState', this.toPlainObject())
    }, 1000)
  }

  getProductCount(id: string) {
    return cart.getItem(id)?.count ?? 0
  }

  restoreState() {
    const restored = storage.get('purchaseState') || {}

    this.locality = restored.locality ?? this.locality
    this.fio = restored.fio ?? user.fullName
    this.email = restored.email ?? user.email
    this.phone = restored.phone ?? user.phone

    this.appliedPoints = restored.appliedPoints ?? this.appliedPoints
    this.appliedPromocode = restored.appliedPromocode ?? this.appliedPromocode

    this.selectedDeliveryOption =
      restored.selectedDeliveryOption ?? this.selectedDeliveryOption
    this.selectedDiscountType =
      restored.selectedDiscountType ?? this.selectedDiscountType
    this.selectedPaymentOption =
      restored.selectedPaymentOption ?? this.selectedPaymentOption
    this.onlinePaymentType =
      restored.onlinePaymentType ?? this.onlinePaymentType
    this.bankPaymentType = restored.bankPaymentType ?? this.bankPaymentType
    this.paymentOnRecive = restored.paymentOnRecive ?? this.paymentOnRecive

    this.inn = restored.inn ?? this.inn
    this.kpp = restored.kpp ?? this.kpp
    this.ogrn = restored.ogrn ?? this.ogrn
    this.paymentAccount = restored.paymentAccount ?? this.paymentAccount
    this.bank = restored.bank ?? this.bank
    this.bik = restored.bik ?? this.bik
    this.correspondentAccount =
      restored.correspondentAccount ?? this.correspondentAccount
    this.bankPhone = restored.bankPhone ?? this.bankPhone
    this.bankCEO = restored.bankCEO ?? this.bankCEO

    this.managerCall = restored.managerCall ?? this.managerCall
  }

  applyBonus() {
    const points = Math.abs(parseInt(this.pointsToUse))
    const halfPrice = Math.floor(this.priceTotal / 2)

    if (isNaN(points)) {
      return (this.bonusError = `Введите число`)
    }

    if (points > (user.bonus ?? 0)) {
      return (this.bonusError = `Доступно ${user.bonus ?? 0} б.`)
    }

    if (points > (halfPrice ?? 0)) {
      return (this.bonusError = `Не более 50% стоимости товара! Можно применить ${
        halfPrice ?? 0
      } б.`)
    }

    this.appliedPoints = points
    this.pointsToUse = ''
    this.bonusError = null
  }

  clearBonus() {
    this.appliedPoints = null
  }

  async applyPromoCode() {
    const code = this.promoCodeToUse

    try {
      const response = await checkPromoCode(code)

      if (response.error) {
        this.promoCodeError = response.message
      } else {
        this.appliedPromocode = code
        this.promoCodeToUse = ''
        this.promoCodeError = null
      }
    } catch (e) {
      this.promoCodeError = e!.message
    }
  }

  clearPromoCode() {
    this.appliedPromocode = null
  }

  validateInput() {
    if (!this.$v) return false

    this.$v.$touch()

    if (this.$v.fio.$error) return false
    if (this.$v.email.$error) return false
    if (this.$v.phone.$error) return false

    if (
      this.selectedPaymentOption === PaymentOptions.bankAccount &&
      this.bankPaymentType === BankPaymentType.account
    ) {
      if (this.$v.inn.$error) return false
      if (this.$v.kpp.$error) return false
      if (this.$v.ogrn.$error) return false
      if (this.$v.paymentAccount.$error) return false
      if (this.$v.bank.$error) return false
      if (this.$v.bik.$error) return false
      if (this.$v.correspondentAccount.$error) return false
      if (this.$v.bankPhone.$error) return false
      if (this.$v.bankCEO.$error) return false
    }

    return true
  }

  // ~~ Hooks ~~

  mounted() {
    this.restoreState()
    setTimeout(() => {
      this.isRestored = true
    })
  }

  // ~~ Enums ~~

  FormErrors = FormErrors
  DeliveryOptions = DeliveryOptions
  OnlinePaymentType = OnlinePaymentType
  DiscountTypes = DiscountTypes
  DeliveryProvider = DeliveryProvider
  PaymentOptions = PaymentOptions
  BankPaymentType = BankPaymentType
  PayOnRecive = PayOnRecive

  // ~~ Option lists ~~

  deliveryOptions: Array<RadioCardOptions> = [
    {
      title: 'Самовывоз',
      value: DeliveryOptions.pickup,
      description:
        'из магазина в Санкт-Петербурге (Московский проспект, д.222А, +7 (800) 775-03-04)'
    }
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

  payOnRecive: Array<SelectOption> = [
    { title: 'Наличными', value: PayOnRecive.cash },
    { title: 'Банковской картой', value: PayOnRecive.card }
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

  &__back {
    justify-self: flex-end;
    margin-left: auto;
    margin-top: 1rem;

    &::after {
      content: '';
      display: inline-block;
      width: 5px;
      height: 7px;
      margin-left: 0.5rem;
      background-image: url("data:image/svg+xml,%3Csvg width='5' height='7' viewBox='0 0 5 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.58905e-07 0.81823L2.48446 3.30269L1.07309e-07 5.78715L0.818315 6.60547L4.12109 3.30269L0.818316 -8.66771e-05L7.58905e-07 0.81823Z' fill='%23004989'/%3E%3C/svg%3E%0A");
    }
  }

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

  &__summary {
    background-color: $gray-200;
    color: $gray-800;

    &::v-deep > div {
      display: flex;
      flex-direction: row;
    }

    &-title {
      font-size: 1rem;
      font-weight: 500;
      color: $gray-600;
      margin-bottom: 1rem;
    }

    &-product {
      font-size: 1rem;
      color: $gray-600;

      &-title {
        margin-bottom: 0.5rem;
        color: $gray-800;

        max-width: 90%;
        height: 2.6rem;
        overflow: hidden;
        display: -webkit-box !important;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
      }

      small {
        text-decoration: line-through;
      }

      &:not(:last-child) {
        margin-bottom: 1.25rem;
      }
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
