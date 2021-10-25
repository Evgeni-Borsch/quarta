<template>
  <AuthBaseVue title="Вход">
    <div
      v-if="errorFromServer"
      class="alert alert-danger"
      role="alert"
      v-html="errorFromServer"
    ></div>

    <div class="row">
      <div v-if="AuthType.phone === type" class="col-5">
        <InputVue
          class="mb-4"
          size="large"
          label="По номеру телефона"
          type="text"
          mask="+7 (###) ###-##-##"
          placeholder="+7 (___) ___-__-__"
        />

        <button class="btn btn-primary btn-lg w-100 mb-3">
          Получить код из СМС
        </button>

        <a href="/registration">Зарегистрироваться</a>
      </div>

      <div v-else class="col-5">
        <form @submit.prevent="submitWithPassword">
          <InputVue
            v-model="email"
            class="mb-4"
            size="large"
            label="Email"
            type="email"
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
            :error="$v.password.$error ? FormErrors.required : false"
            @blur="$v.password.$touch()"
            @focus="$v.password.$reset()"
          />

          <button class="btn btn-primary btn-lg w-100 mb-3" type="submit">
            Войти
          </button>
        </form>

        <a href="/registration">Зарегистрироваться</a>
      </div>

      <div class="col-6">
        <p>Войти через аккаунт в социальной сети</p>
        <AuthSocialNetworksVue />
        <a href="#" @click.prevent="type = AuthType.email">
          Войти с помощью пароля
        </a>
      </div>
    </div>
  </AuthBaseVue>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Vue, Component } from 'vue-property-decorator'

import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'

import AuthBaseVue from '~/components/auth/AuthBase.vue'
import AuthSocialNetworksVue from '~/components/auth/AuthSocialNetworks.vue'
import InputVue from '~/components/inputs/Input.vue'
import { AuthType } from '~/models/general'

import { FormErrors } from '~/services/errors'

import { getAuthByPassword } from '~/services/auth'

@Component({
  components: { AuthBaseVue, InputVue, AuthSocialNetworksVue },
  setup() {
    return { AuthType }
  },
  validations() {
    return {
      password: { required },
      email: { required, email }
    }
  }
})
export default class LoginPage extends mixins(validationMixin) {
  type = AuthType.email
  FormErrors = FormErrors

  password = ''
  email = ''

  errorFromServer = ''

  checkErrorsWithPassword() {
    this.$v.$touch()
    return this.$v.email.$error && this.$v.password.$error
  }

  async submitWithPassword() {
    if (this.checkErrorsWithPassword()) return null

    try {
      const response = await getAuthByPassword(this.email, this.password)

      if (response.error) {
        this.errorFromServer = response.message
      } else {
        this.email = ''
        this.password = ''
        this.$router.push({ path: '/cabinet' })
      }
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
</style>
