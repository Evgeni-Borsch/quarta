<template>
  <div class="wrapper">
    <div v-if="!isLoaded" class="loader">
      <LoadingVue />
    </div>

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
import LoadingVue from '~/components/Loading.vue'

@Component({
  components: {
    HeaderVue,
    HeaderMobileVue,
    FooterVue,
    PortalTarget,
    LoadingVue
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
  isLoaded = false

  async fetch() {
    await user.init()
    await cart.pullState()
    await favourites.pullState()
  }

  beforeMount() {
    console.log(globalModule.isMobileUserAgent)
  }

  mounted() {
    window.addEventListener('load', () => {
      this.isLoaded = true
    })
  }
}
</script>

<style lang="scss" scoped>
.loader {
  display: flex;
  justify-content: center;
  align-content: center;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $white;
  z-index: $zindex-tooltip;
}
</style>
