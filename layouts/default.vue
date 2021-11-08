<template>
  <div class="wrapper">
    <PortalTarget name="modal" />

    <client-only>
      <HeaderVue v-if="isDesktop" />
      <HeaderMobileVue v-else />
    </client-only>

    <main>
      <Nuxt />
    </main>

    <FooterVue />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ref } from '@nuxtjs/composition-api'
import { useBreakpoints, breakpointsBootstrapV5 } from '@vueuse/core'
import { PortalTarget } from 'portal-vue'

import HeaderVue from '~/components/header/Header.vue'
import HeaderMobileVue from '~/components/header/HeaderMobile.vue'
import FooterVue from '~/components/footer/Footer.vue'

import '~/assets/styles/global.scss'
import { cart, favourites, globalModule, user } from '~/store'

@Component({
  components: {
    HeaderVue,
    HeaderMobileVue,
    FooterVue,
    PortalTarget
  },
  setup() {
    const breakpoints = useBreakpoints(breakpointsBootstrapV5)
    const isDesktop = process.server
      ? ref(!globalModule.isMobileUserAgent)
      : breakpoints.greater('xl')

    return {
      isDesktop
    }
  },
  fetchOnServer: false,
  middleware: ['isMobile']
})
export default class DefaultLayout extends Vue {
  async fetch() {
    await user.init()
    await cart.pullState()
    await favourites.pullState()
  }

  beforeMount() {
    console.log(globalModule.isMobileUserAgent)
  }
}
</script>

<style lang="scss" scoped></style>
