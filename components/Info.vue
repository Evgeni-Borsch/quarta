<template>
  <span class="info">
    <InfoIcon />
  </span>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import InfoIcon from '@/assets/icons/info.svg?icon'

export default defineComponent({
  components: {
    InfoIcon,
  },
  setup() {},
})
</script>

<style lang="scss" scoped>
.info {
  position: relative;
  margin: 0 0.3125rem;
}
</style>
