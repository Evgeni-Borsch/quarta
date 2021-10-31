<template>
  <div class="cabinet">
    <div v-if="!hasAuth" class="container">
      <LoadingVue />
    </div>

    <div v-else class="container">
      <h2>Личный кабинет</h2>

      <div class="row">
        <div class="col-6">
          <CabinetSectionVue>
            <template #header>
              <PersonIcon class="icon" />
              <h6>Личные данные</h6>

              <router-link
                to="/cabinet/personal"
                class="btn btn-light bg-gray-200"
              >
                Изменить
              </router-link>
            </template>

            <p class="text-dark">{{ fullName }}</p>
            <p class="text-dark">
              {{ email }}<br />
              тел.: {{ phone }}
            </p>
          </CabinetSectionVue>

          <CabinetSectionVue>
            <template #header>
              <CopyIcon class="icon" />
              <h6>История заказов</h6>

              <router-link
                to="/cabinet/history"
                class="btn btn-light bg-gray-200"
              >
                Подробнее
              </router-link>
            </template>

            <div class="cabinet__history-item">
              <figure
                :style="{ backgroundImage: `url('/photo-preview.jpg')` }"
              ></figure>

              <div class="cabinet__history-title">
                Заказ от 26 мая <br />
                34522846-0037
              </div>

              <div class="cabinet__history-price">2 005,00 ₽</div>
            </div>
            <div class="cabinet__history-item">
              <figure
                :style="{ backgroundImage: `url('/photo-preview.jpg')` }"
              ></figure>

              <div class="cabinet__history-title">
                Заказ от 26 мая <br />
                34522846-0037
              </div>

              <div class="cabinet__history-price">2 005,00 ₽</div>
            </div>

            <!-- <center>История заказов пуста</center> -->
          </CabinetSectionVue>

          <CabinetSectionVue>
            <template #header>
              <DeliveryIcon class="icon" />
              <h6>Адрес доставки</h6>

              <router-link
                to="/cabinet/address"
                class="btn btn-light bg-gray-200"
              >
                Добавить
              </router-link>
            </template>

            <p class="text-dark">
              Укажите ваш адрес для доставки курьером или определения ближайщего
              пункта CДЭК
            </p>
          </CabinetSectionVue>
        </div>

        <div class="col-6">
          <CabinetBonusVue />
          <CabinetSectionVue>
            <p>
              В нашей компании существует бонусная система. Ознакомьтесь с
              ситемой накопления и управления бонусными баллами!
            </p>
            <p>
              <a href="#">Читать подробнее</a>
            </p>
          </CabinetSectionVue>

          <CabinetSectionVue>
            <template #header>
              <KeyIcon class="icon" />
              <h6 class="py-3">Сменить пароль</h6>
            </template>

            <form @submit.prevent="submitNewPassword">
              <InputVue
                v-model="oldPassword"
                class="mb-4"
                type="password"
                label="Введите старый пароль"
                :error="$v.oldPassword.$error ? FormErrors.required : false"
                @focus="$v.oldPassword.$reset()"
              />
              <InputVue
                v-model="password"
                class="my-4"
                type="password"
                label="Введите новый пароль"
                :error="$v.password.$error ? FormErrors.password : false"
                @focus="$v.password.$reset()"
              />
              <InputVue
                v-model="repeatPassword"
                class="my-4"
                type="password"
                label="Повторите новый пароль"
                :error="
                  $v.repeatPassword.$error ? FormErrors.samePassword : false
                "
                @focus="$v.repeatPassword.$reset()"
              />

              <div
                v-if="passwordServerError"
                class="alert alert-danger my-4"
                role="alert"
                v-html="passwordServerError"
              ></div>

              <button class="btn btn-primary px-5" type="submit">
                Сохранить изменения
              </button>
            </form>
          </CabinetSectionVue>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'

import { mixins } from 'vue-class-component'
import { validationMixin } from 'vuelidate'
import { minLength, required, sameAs } from 'vuelidate/lib/validators'
import AuthBaseVue from '~/components/auth/AuthBase.vue'
import CabinetSectionVue from '~/components/cabinet/CabinetSection.vue'
import InputVue from '~/components/inputs/Input.vue'
import CabinetBonusVue from '~/components/cabinet/CabinetBonus.vue'

import PersonIcon from '~/assets/icons/person.svg?icon'
import KeyIcon from '~/assets/icons/key.svg?icon'
import DeliveryIcon from '~/assets/icons/delivery.svg?icon'
import CopyIcon from '~/assets/icons/copy.svg?icon'
import { user } from '~/store'
import LoadingVue from '~/components/Loading.vue'
import PrivatePage from '~/mixins/PrivatePage'
import pageTitle from '~/utils/pageTitle'
import { Page } from '~/models/general'
import { FormErrors } from '~/services/errors'
import { setNewPassword } from '~/services/api/personal'

export const CABINER_PAGE: Page = {
  title: 'Личный кабинет',
  slug: 'cabinet',
  path: '/cabinet'
}

@Component({
  components: {
    AuthBaseVue,
    InputVue,
    CabinetSectionVue,
    CabinetBonusVue,
    PersonIcon,
    DeliveryIcon,
    CopyIcon,
    LoadingVue,
    KeyIcon
  },
  head() {
    return {
      title: pageTitle('Личный кабинет')
    }
  },
  validations: {
    oldPassword: { required },
    password: {
      required,
      minLength: minLength(8)
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  fetchOnServer: false
})
export default class CabinetPage extends mixins(PrivatePage, validationMixin) {
  FormErrors = FormErrors

  passwordServerError: string | null = null

  oldPassword = ''
  password = ''
  repeatPassword = ''

  get email() {
    return user.email ?? ''
  }

  get phone() {
    return user.phone ?? ''
  }

  get firstName() {
    return user.firstName ?? ''
  }

  get secondName() {
    return user.secondName ?? ''
  }

  get fullName() {
    return `${this.firstName} ${this.secondName}`
  }

  async submitNewPassword() {
    this.$v.oldPassword.$touch()
    this.$v.password.$touch()
    this.$v.repeatPassword.$touch()

    if (this.$v.$error) return null

    try {
      const response = await setNewPassword(this.oldPassword, this.password)
      if (response.error) {
        this.passwordServerError = response.message
      } else {
        this.oldPassword = ''
        this.password = ''
        this.repeatPassword = ''
      }
    } catch (e) {
      this.passwordServerError = e!.message
    }
  }
}
</script>

<style lang="scss" scoped>
.cabinet {
  padding: 5.625rem 0;
  background-color: $gray-100;

  h2 {
    margin-bottom: 1.625rem;
  }

  &__history-item {
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 1.5625rem;
    }

    figure {
      width: 5rem;
      height: 5rem;
      margin-bottom: 0;
      margin-right: 1.375rem;
      background-size: cover;
      background-position: center;
      border-radius: $border-radius-sm;
      border: 1px solid #eeeeee;
    }
  }

  &__history-title,
  &__history-price {
    font-size: 1rem;
    color: $gray-800;
  }

  &__history-price {
    justify-self: flex-end;
    margin-left: auto;
  }

  &::v-deep {
    .input label {
      font-size: 1rem;
    }
  }
}
</style>
