<template>
  <div class="product-ask container">
    <div class="row">
      <div class="col-6">
        <h3>Задать вопрос</h3>
        <p>
          Нужна дополнительная информация? Пожалуйста, свяжитесь с нами, чтобы
          задать вопрос.
        </p>
        <div class="card">
          <div class="card-body">
            <form>
              <TextareaVue v-model="text" label="Введите вопрос" class="mb-4" />
              <button
                class="btn btn-primary"
                type="submit"
                :disabled="buttonDisabled"
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TextareaVue from '../inputs/Textarea.vue'

@Component({
  components: {
    TextareaVue
  }
})
export default class ProductAsk extends Vue {
  text = ''

  get buttonDisabled() {
    return this.text.length < 10
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
