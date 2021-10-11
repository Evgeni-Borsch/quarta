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

      <div v-if="type === ClientType.wholesale" class="col-7">
        <InputVue class="mb-4" size="large" label="Компания" type="text" />

        <InputVue class="mb-4" size="large" label="Адрес" type="text" />

        <InputVue
          class="mb-4"
          size="large"
          label="Торговая площадка"
          type="text"
        />

        <InputVue
          class="mb-4"
          size="large"
          label="Контактное лицо"
          type="text"
        />

        <InputVue class="mb-4" size="large" label="Должность" type="text" />

        <InputVue
          class="mb-4"
          size="large"
          label="Телефон для связи"
          type="text"
          mask="+7 (###) ###-##-##"
          placeholder="+7 (___) ___-__-__"
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
import { ClientType } from '~/models/general'

@Component({
  components: { AuthBaseVue, InputVue, CheckboxVue },
  setup() {
    return { ClientType }
  },
})
export default class RegistrationPage extends Vue {
  type = ClientType.retail
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
