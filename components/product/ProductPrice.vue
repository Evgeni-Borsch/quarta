<template>
  <div class="price" :class="{ 'price--small': size === 'small' }">
    <span class="price__current"> {{ currentPrice }} ₽ </span>
    <span v-if="old" class="price__old"> {{ oldPrice }} ₽ </span>
    <span v-if="discount" class="price__discount"> -{{ discount }}% </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import numberWithSpaces from '@/utils/numberWithSpaces'

export default defineComponent({
  props: {
    current: {
      type: Number,
      required: true,
    },
    old: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    size: {
      type: String,
      default: 'default',
    },
  },
  setup(props) {
    const currentPrice = computed(() => numberWithSpaces(props.current))
    const oldPrice = computed(() => numberWithSpaces(props.old))

    return {
      currentPrice,
      oldPrice,
    }
  },
})
</script>

<style lang="scss" scoped>
.price {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0.75rem;

  font-weight: 500;
  line-height: 130%;

  &--small {
    margin-bottom: 0.5rem;
  }

  &__current {
    font-size: 1.625rem;
    color: $dark;
  }

  &--small &__current {
    font-size: 1rem;
  }

  &__old {
    margin-left: 0.5rem;
    text-decoration-line: line-through;
  }

  &__discount {
    display: inline-block;
    padding: 0 0.3125rem;
    line-height: 1rem;
    margin-left: 0.5rem;
    background-color: $secondary;
    color: $white;
    border-radius: $border-radius-sm;
  }
}
</style>
