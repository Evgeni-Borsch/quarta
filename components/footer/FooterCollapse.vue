<template>
  <div class="footer-collapse">
    <header>
      <h6 @click="toggle">
        {{ title }}
      </h6>
    </header>
    <div v-if="isDesktop || isExpanded" class="footer-collapse__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useToggle } from '@vueuse/core'
import useBreakpoints from '~/utils/useBreakpoints'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const { isDesktop } = useBreakpoints()
    const isExpanded = ref(false)
    const toggle = useToggle(isExpanded)

    return {
      isDesktop,
      isExpanded,
      toggle,
    }
  },
})
</script>

<style lang="scss" scoped>
.footer-collapse {
  
}
</style>
