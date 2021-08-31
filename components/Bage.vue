<template>
  <span
    class="
      position-absolute
      top-0
      start-100
      translate-middle
      badge
      bg-secondary
    "
  >
    <slot />
    <span v-if="description" class="visually-hidden">{{ description }}</span>
  </span>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    description: {
      type: String,
      default: null,
    },
  },
  setup() {},
})
</script>

<style lang="scss" scoped>
@import '~/assets/styles/base-imports';
@import '~bootstrap/scss/badge';

.badge {
  min-width: 2em;
  min-height: 2em;
  padding: 0.5em !important;
  border-radius: 1.5em;
  font-weight: 400;
}
</style>
