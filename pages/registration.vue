<template>
  <AuthBaseVue title="Регистрация">
    <div class="client-type">
      <button
        class="btn"
        :class="{ active: type === ClientType.retail }"
        @click="type = ClientType.retail"
      >
        Розничный покупатель
      </button>
      <button
        class="btn"
        :class="{ active: type === ClientType.wholesale }"
        @click="type = ClientType.wholesale"
      >
        Оптовый клиент
      </button>
    </div>

    <div class="row">
      <div v-if="type === ClientType.retail" class="col-7">
        <form @submit.prevent="submitRetail">
          <InputVue
            v-model="phone"
            class="mb-4"
            size="large"
            label="Номер телефона"
            type="text"
            mask="+7 (###) ###-##-##"
            placeholder="+7 (___) ___-__-__"
            :error="$v.phone.$error ? FormErrors.phone : false"
            @blur="$v.phone.$touch()"
            @focus="$v.phone.$reset()"
          />

          <InputVue
            v-model="firstName"
            class="mb-4"
            size="large"
            label="Имя"
            type="text"
            placeholder="Екатерина"
            :required="true"
            :error="$v.firstName.$error ? FormErrors.required : false"
            @blur="$v.firstName.$touch()"
            @focus="$v.firstName.$reset()"
          />

          <InputVue
            v-model="secondName"
            class="mb-4"
            size="large"
            label="Фамилия"
            type="text"
            placeholder="Иванова"
            :required="true"
            :error="$v.secondName.$error ? FormErrors.required : false"
            @blur="$v.secondName.$touch()"
            @focus="$v.secondName.$reset()"
          />

          <InputVue
            v-model="email"
            class="mb-4"
            size="large"
            label="Email"
            type="email"
            placeholder="example@gmail.com"
            :required="true"
            :error="$v.email.$error ? FormErrors.email : false"
            @blur="$v.email.$touch()"
            @focus="$v.email.$reset()"
          />

          <InputVue
            v-model="password"
            class="mb-4"
            size="large"
            label="Пароль"
            type="password"
            :required="true"
            :error="$v.password.$error ? FormErrors.password : false"
            @blur="$v.password.$touch()"
            @focus="$v.password.$reset()"
          />

          <CheckboxVue v-model="promo" :value="true" class="mb-4">
            Отправлять акции и предложения по email
          </CheckboxVue>

          <button class="btn btn-primary btn-lg w-100 mb-3" type="sumbit">
            Зарегистрироваться
          </button>
        </form>

        <div v-if="errorFromServer" class="alert alert-danger" role="alert">
          {{ errorFromServer }}
        </div>

        <small>
          Нажимая кнопку «Зарегистрироваться», я даю свое согласие на обработку
          моих персональных данных.
        </small>
      </div>

      <div v-if="type === ClientType.wholesale" class="col-7">
        <form @submit.prevent="submitWholesale">
          <InputVue
            v-model="company"
            class="mb-4"
            size="large"
            label="Компания"
            type="text"
            :required="true"
            placeholder="Название вашей компании"
            :error="$v.company.$error ? FormErrors.required : false"
            @blur="$v.company.$touch()"
            @focus="$v.company.$reset()"
          />

          <InputVue
            v-model="address"
            class="mb-4"
            size="large"
            label="Адрес"
            type="text"
          />

          <InputVue
            v-model="marketplace"
            class="mb-4"
            size="large"
            label="Торговая площадка"
            type="text"
            info="Название магазина, ссылка на сайт"
            :required="true"
            :error="$v.marketplace.$error ? FormErrors.required : false"
            @blur="$v.marketplace.$touch()"
            @focus="$v.marketplace.$reset()"
          />

          <InputVue
            v-model="contactPerson"
            class="mb-4"
            size="large"
            label="Контактное лицо"
            type="text"
            :required="true"
            :error="$v.contactPerson.$error ? FormErrors.required : false"
            @blur="$v.contactPerson.$touch()"
            @focus="$v.contactPerson.$reset()"
          />

          <InputVue
            v-model="position"
            class="mb-4"
            size="large"
            label="Должность"
            type="text"
            :required="true"
            :error="$v.position.$error ? FormErrors.required : false"
            @blur="$v.position.$touch()"
            @focus="$v.position.$reset()"
          />

          <InputVue
            v-model="contactPhone"
            class="mb-4"
            size="large"
            label="Телефон для связи"
            type="text"
            mask="+7 (###) ###-##-##"
            placeholder="+7 (___) ___-__-__"
            :required="true"
            :error="$v.contactPhone.$error ? FormErrors.phone : false"
            @blur="$v.contactPhone.$touch()"
            @focus="$v.contactPhone.$reset()"
          />

          <InputVue
            v-model="email"
            class="mb-4"
            size="large"
            label="Email"
            type="email"
            placeholder="example@gmail.com"
            :required="true"
            :error="$v.email.$error ? FormErrors.email : false"
            @blur="$v.email.$touch()"
            @focus="$v.email.$reset()"
          />

          <InputVue
            class="mb-4"
            size="large"
            label="Сайт"
            type="text"
            placeholder="http://..."
          />

          <InputVue
            class="mb-4"
            size="large"
            label="Пароль"
            type="password"
            :required="true"
            :error="$v.password.$error ? FormErrors.password : false"
            @blur="$v.password.$touch()"
            @focus="$v.password.$reset()"
          />

          <CheckboxVue v-model="promo" :value="true" class="mb-4">
            Отправлять акции и предложения по email
          </CheckboxVue>

          <button class="btn btn-primary btn-lg w-100 mb-3" type="submit">
            Зарегистрироваться
          </button>
        </form>

        <div v-if="errorFromServer" class="alert alert-danger" role="alert">
          {{ errorFromServer }}
        </div>

        <small>
          Нажимая кнопку «Зарегистрироваться», я даю свое согласие на обработку
          моих персональных данных.
        </small>
      </div>
    </div>
  </AuthBaseVue>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'

import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import { FormErrors } from '~/services/errors'

import AuthBaseVue from '~/components/auth/AuthBase.vue'
import CheckboxVue from '~/components/inputs/Checkbox.vue'
import InputVue from '~/components/inputs/Input.vue'
import { ClientType } from '~/models/general'
import { getRegistration } from '~/services/auth'

@Component({
  components: { AuthBaseVue, InputVue, CheckboxVue },
  validations: {
    firstName: {
      required
    },
    secondName: {
      required
    },
    phone: {
      minLength: minLength(10)
    },
    password: {
      required,
      minLength: minLength(8)
    },
    email: {
      email,
      required
    },

    company: {
      required
    },
    marketplace: {
      required
    },
    contactPerson: {
      required
    },
    position: {
      required
    },
    contactPhone: {
      required,
      minLength: minLength(10)
    }
  }
})
export default class RegistrationPage extends mixins(validationMixin) {
  type = ClientType.retail

  ClientType = ClientType
  FormErrors = FormErrors

  errorFromServer = ''

  phone = ''
  email = ''
  firstName = ''
  secondName = ''
  password = ''
  promo = true

  company = ''
  address = ''
  marketplace = ''
  contactPerson = ''
  position = ''
  contactPhone = ''
  site = ''

  checkErrorsRetail() {
    this.$v.$touch()
    return (
      this.$v.phone.$error ||
      this.$v.email.$error ||
      this.$v.firstName.$error ||
      this.$v.secondName.$error ||
      this.$v.password.$error
    )
  }

  checkErrorsWholesale() {
    this.$v.$touch()
    return (
      this.$v.company.$error ||
      this.$v.marketplace.$error ||
      this.$v.contactPerson.$error ||
      this.$v.position.$error ||
      this.$v.contactPhone.$error ||
      this.$v.email.$error ||
      this.$v.password.$error
    )
  }

  async submitRetail() {
    if (this.checkErrorsRetail()) return null

    try {
      await getRegistration({
        type: ClientType.retail,
        phone: this.phone,
        email: this.email,
        firstName: this.firstName,
        secondName: this.secondName,
        password: this.password,
        promo: this.promo
      })
      this.$router.push({ path: '/login' })
    } catch (error) {
      this.errorFromServer = error!.message as string
    }
  }

  async submitWholesale() {
    if (this.checkErrorsWholesale()) return null

    try {
      await getRegistration({
        type: ClientType.wholesale,

        company: this.company,
        marketplace: this.marketplace,
        contactPerson: this.contactPerson,
        contactPhone: this.contactPhone,
        email: this.email,
        site: this.site,

        password: this.password,
        promo: this.promo
      })
      this.$router.push({ path: '/login' })
    } catch (error) {
      this.errorFromServer = error!.message as string
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  justify-content: space-between;
}

.client-type {
  margin-bottom: 2.5rem;

  .btn {
    background-color: $gray-100;
    color: $gray-800;

    &.active {
      border-color: $primary;
      background-color: $gray-200;
    }
  }
}
</style>
