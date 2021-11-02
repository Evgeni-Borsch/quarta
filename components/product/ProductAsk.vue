<template>
  <div class="product-ask container">
    <div class="row">
      <div v-if="!hasSend" class="col-6">
        <h3>Задать вопрос</h3>
        <p>
          Нужна дополнительная информация? Пожалуйста, свяжитесь с нами, чтобы
          задать вопрос.
        </p>
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="onSubmit">
              <TextareaVue
                v-model="text"
                label="Введите вопрос"
                class="mb-4"
                :error="error"
              />
              <button class="btn btn-primary" type="submit">Отправить</button>
            </form>
          </div>
        </div>
      </div>

      <div v-else class="col-6">
        <h3>Вопрос успешно отправлен</h3>
        <p>Ответ придет на электронную почту указанную в аккаунте.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import TextareaVue from '../inputs/Textarea.vue'
import { FormErrors } from '~/services/errors'

@Component({
  components: {
    TextareaVue
  },
  validations: {
    text: {
      required,
      minLength: minLength(10)
    }
  }
})
export default class ProductAsk extends mixins(validationMixin) {
  text = ''
  error: string | null = ''
  hasSend = false

  onSubmit() {
    this.error = null
    this.$v.$touch()

    if (this.$v.$error) {
      this.error = 'Не менее 10 символов'
      return null
    }

    this.hasSend = true
  }
}
</script>

<style lang="scss" scoped>
.product-ask {
  p {
    margin: 1.25rem 0 1.5625rem;
    font-size: 1rem;
    color: $gray-900;
  }
}
</style>
