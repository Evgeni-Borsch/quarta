<template>
  <section class="subscribe">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <h2>
            <small>Подписаться на новости</small><br />
            Будьте в курсе событий!
          </h2>
        </div>

        <div class="col-6">
          <form action="">
            <InputVue placeholder="Введите email" size="large" />

            <div class="row mt-3">
              <div class="col-6">
                <CheckboxVue size="large" />
              </div>

              <div class="col-6">
                <button class="btn btn-primary">Подписаться</button>
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
}
</style>
