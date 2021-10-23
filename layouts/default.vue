<template>
  <div class="wrapper">
    <PortalTarget name="modal" />

    <HeaderVue v-if="isDesktop" />
    <HeaderMobileVue v-else />
    <main>
      <Nuxt />
    </main>

    <FooterVue />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useBreakpoints, breakpointsBootstrapV5 } from '@vueuse/core'
import { PortalTarget } from 'portal-vue'

import HeaderVue from '~/components/header/Header.vue'
import HeaderMobileVue from '~/components/header/HeaderMobile.vue'
import FooterVue from '~/components/footer/Footer.vue'

import '~/assets/styles/global.scss'

export default defineComponent({
  components: {
    HeaderVue,
    HeaderMobileVue,
    FooterVue,
    PortalTarget
  },
  setup() {
    const breakpoints = useBreakpoints(breakpointsBootstrapV5)
    const isDesktop = process.server ? ref(true) : breakpoints.greater('xl')

    return {
      isDesktop
    }
  }
})
</script>

<style lang="scss" scoped></style>
