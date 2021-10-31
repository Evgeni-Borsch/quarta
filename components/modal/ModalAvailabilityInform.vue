<template>
  <ModalVue
    ref="modal"
    :title="!hasSubmit ? 'Сообщить о поступлении' : 'Заявка отправлена'"
    @hide="$emit('hide')"
  >
    <p v-if="!hasSubmit">
      Введите Ваши контактные данные, и мы уведомим Вас о поступлении данного
      товара на склад.
    </p>
    <p v-else>
      Менеджер свяжется с вами в рабочее время и обсудит детали заказа.
    </p>

    <form v-if="!hasSubmit" @submit.prevent="onSubmit">
      <InputVue
        v-model="name"
        label="Имя"
        class="my-4"
        :required="true"
        :error="$v.name.$error ? FormErrors.required : false"
        @blur="$v.name.$touch()"
        @focus="$v.name.$reset()"
      />
      <InputVue
        v-model="phone"
        label="Номер телефона"
        placeholder="+7 (___)___-__-__"
        mask="+7 (###) ###-##-##"
        class="my-4"
        :error="$v.phone.$error ? FormErrors.phone : false"
        @blur="$v.phone.$touch()"
        @focus="$v.phone.$reset()"
      />
      <InputVue
        v-model="email"
        label="Email"
        class="my-4"
        placeholder="example@gmail.com"
        :required="true"
        :error="$v.email.$error ? FormErrors.email : false"
        @blur="$v.email.$touch()"
        @focus="$v.email.$reset()"
      />

      <div
        v-if="errorFromServer"
        class="alert alert-danger my-4"
        role="alert"
        v-html="errorFromServer"
      ></div>

      <button class="btn btn-primary w-100">Подтвердить</button>
    </form>

    <button v-else class="btn btn-primary w-100" @click="() => modalRef.hide()">
      Вернуться к покупкам
    </button>
  </ModalVue>
</template>

<script lang="ts">
import { Vue, Component, Ref, Emit, Prop } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import ModalVue from './Modal.vue'

import InputVue from '~/components/inputs/Input.vue'
import { FormErrors } from '~/services/errors'
import { user } from '~/store'
import { requestAvailabilityInform } from '~/services/api/catalog'

@Component({
  components: {
    ModalVue,
    InputVue
  },
  validations: {
    name: { required },
    phone: {
      minLength: minLength(10)
    },
    email: { email, required }
  }
})
export default class ModalAvailabilityInformVue extends mixins(
  validationMixin
) {
  FormErrors = FormErrors

  @Ref('modal') modalRef!: ModalVue
  @Prop({ required: true }) productId!: string

  errorFromServer: string | null = null
  hasSubmit = false

  name = ''
  phone = ''
  email = ''

  async onSubmit() {
    this.$v.$touch()

    if (this.$v.$error) return null

    try {
      const response = await requestAvailabilityInform(this.productId)

      if (response.error) {
        this.errorFromServer = response.message
      } else {
        this.hasSubmit = true
      }
    } catch (e) {
      this.errorFromServer = e!.message
    }
  }

  async mounted() {
    await user.waitInitiation()

    if (user.hasAuth) {
      this.name = user.fullName ?? ''
      this.phone = user.email ?? ''
      this.email = user.email ?? ''
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  font-size: 1rem;
}
</style>
