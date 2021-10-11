<template>
  <AuthBaseVue title="Регистрация">
    <div class="row">
      <div class="col-7">
        <!-- <div class="client-type">
          <button class="btn">Розничный покупатель</button>
          <button class="btn">Оптовый клиент</button>
        </div> -->

        <InputVue
          class="mb-4"
          size="large"
          label="Номер телефона"
          type="text"
          mask="+7 (###) ###-##-##"
          placeholder="+7 (___) ___-__-__"
        />

        <InputVue
          class="mb-4"
          size="large"
          label="Имя"
          type="text"
          placeholder="Екатерина"
        />

        <InputVue
          class="mb-4"
          size="large"
          label="Фамилия"
          type="text"
          placeholder="Иванова"
        />

        <InputVue
          class="mb-4"
          size="large"
          label="Email"
          type="email"
          placeholder="example@gmail.com"
        />

        <InputVue class="mb-4" size="large" label="Пароль" type="password" />

        <CheckboxVue :value="true" class="mb-4">
          Отправлять акции и предложения по email
        </CheckboxVue>

        <button class="btn btn-primary btn-lg w-100 mb-3">
          Зарегистрироваться
        </button>

        <small>
          Нажимая кнопку «Зарегистрироваться», я даю свое согласие на обработку
          моих персональных данных.
        </small>
      </div>
    </div>
  </AuthBaseVue>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import AuthBaseVue from '~/components/auth/AuthBase.vue'
import CheckboxVue from '~/components/inputs/Checkbox.vue'
import InputVue from '~/components/inputs/Input.vue'
import { AuthType } from '~/models/general'

@Component({
  components: { AuthBaseVue, InputVue, CheckboxVue },
  setup() {
    return { AuthType }
  },
})
export default class RegistrationPage extends Vue {
  type = AuthType.phone
}
</script>

<style lang="scss" scoped>
.row {
  justify-content: space-between;
}
</style>
