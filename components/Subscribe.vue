<template>
  <section class="subscribe">
    <div class="container">
      <div class="row">
        <div class="col-6 subscribe__title">
          <h2>
            <small>Подписаться на новости</small><br />
            Будьте в курсе событий!
          </h2>
        </div>

        <div class="col-6">
          <form action="">
            <InputVue placeholder="Введите email" size="large" bg="white" />

            <div class="row mt-4">
              <div class="col-6">
                <CheckboxVue size="large" :value="true">
                  Я соглашаюсь на обработку персональных данных
                </CheckboxVue>
              </div>

              <div class="col-6 subscribe__button">
                <button class="btn btn-primary btn-lg">Подписаться</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CheckboxVue from './inputs/Checkbox.vue'
import InputVue from './inputs/Input.vue'

@Component({
  components: { InputVue, CheckboxVue },
})
export default class Subscribe extends Vue {}
</script>

<style lang="scss" scoped>
.subscribe {
  padding: 8.4375rem 0;
  background-color: $white;

  h2 {
    font-size: 2.1875rem;
    color: $gray-900;

    small {
      font-size: 1rem;
      color: $gray-600;
      font-weight: 400;
      margin-bottom: 1rem;
    }
  }

  &__title {
    padding-bottom: 6rem;
    background-image: url('~/assets/images/paper-plane.svg');
    background-repeat: no-repeat;
    background-position: 80% 100%;
  }

  &__button {
    display: flex;
    justify-content: flex-end;
  }

  &::v-deep {
    .form-check-label {
      color: $gray-600;
    }
  }
}
</style>
