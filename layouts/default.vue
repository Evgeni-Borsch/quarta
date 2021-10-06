<template>
  <div class="wrapper">
    <HeaderVue />
    <main>
      <Nuxt />
    </main>

    <FooterVue />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import HeaderVue from '~/components/header/Header.vue'
import FooterVue from '~/components/footer/Footer.vue'

import '~/assets/styles/global.scss'

export default defineComponent({
  components: {
    HeaderVue,
    FooterVue,
  },
  setup() {},
})
</script>

<style lang="scss" scoped></style>
