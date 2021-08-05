<template>
  <div>
    <HeaderVue />
    <Nuxt />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import HeaderVue from '~/components/Header.vue'
import '~/assets/styles/global.scss'

export default defineComponent({
  components: { HeaderVue },
  setup() {},
})
</script>

<style lang="scss" scoped></style>
