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
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {},
})
</script>

<style lang="scss" scoped>
.subscribe {
  padding: 8.4375rem 0;
  background-color: $white;
}
</style>
