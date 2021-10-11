<template>
  <AuthBaseVue>
    <div class="row">
      <div v-if="AuthType.phone === type" class="col-5">
        <InputVue
          class="mb-4"
          size="large"
          label="По номеру телефона"
          type="text"
          mask="+7 (###) ###-##-##"
        />

        <button class="btn btn-primary btn-lg w-100 mb-3">Получить код из СМС</button>

        <a href="/registration">Зарегистрироваться</a>
      </div>

      <div v-else class="col-5">
        <InputVue class="mb-4" size="large" label="Email" type="email" />
        <InputVue class="mb-4" size="large" label="Пароль" type="password" />

        <button class="btn btn-primary btn-lg w-100 mb-3">Войти</button>

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
import { Vue, Component } from 'vue-property-decorator'

import AuthBaseVue from '~/components/auth/AuthBase.vue'
import AuthSocialNetworksVue from '~/components/auth/AuthSocialNetworks.vue'
import InputVue from '~/components/inputs/Input.vue'
import { AuthType } from '~/models/general'

@Component({
  components: { AuthBaseVue, InputVue, AuthSocialNetworksVue },
  setup() {
    return { AuthType }
  },
})
export default class LoginPage extends Vue {
  type = AuthType.phone
}
</script>

<style lang="scss" scoped>
.row {
  justify-content: space-between;
}
</style>
