<template>
  <div class="wrapper">
    <header>
      <div class="container">
        <a href="/">
          <LogoSvg />
        </a>
      </div>
    </header>
    <main>
      <!-- <Nuxt /> -->
      <ErrorNotFound />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import LogoSvg from '@/assets/images/logo.svg?inline'
import ErrorNotFound from '~/components/ErrorNotFound.vue'

import '~/assets/styles/global.scss'

export default defineComponent({
  components: { LogoSvg, ErrorNotFound },
  setup() {},
})
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-image: url('~/assets/images/404-bg.jpg');
  background-size: cover;
  background-position: top center;

  header {
    margin-top: 3.875rem;
  }
}
</style>
