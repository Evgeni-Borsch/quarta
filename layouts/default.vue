<template>
  <div class="wrapper">
    <PortalTarget name="modal" />

    <HeaderVue />
    <main>
      <Nuxt />
    </main>

    <FooterVue />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { PortalTarget } from 'portal-vue'

import HeaderVue from '~/components/header/Header.vue'
import FooterVue from '~/components/footer/Footer.vue'

import '~/assets/styles/global.scss'

export default defineComponent({
  components: {
    HeaderVue,
    FooterVue,

    PortalTarget,
  },
  setup() {},
})
</script>

<style lang="scss" scoped></style>
