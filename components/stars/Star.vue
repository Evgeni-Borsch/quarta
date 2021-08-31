<template>
  <div class="star">
    <component :is="icon" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

import Star from '@/assets/icons/star.svg?icon'
import StarHalf from '@/assets/icons/star-half.svg?icon'
import StarFill from '@/assets/icons/star-fill.svg?icon'

export default defineComponent({
  components: { Star, StarHalf, StarFill },
  props: {
    grade: {
      type: Number,
      required: true,
    },
    current: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { grade, current } = props

    const icon = computed(() => {
      const rounded = Math.round(current * 2) / 2

      if (rounded >= grade) return 'StarFill'
      if (rounded - 0.5 >= grade) return 'StarHalf'
      return 'Star'
    })

    return { icon }
  },
})
</script>

<style lang="scss" scoped>
.star {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    transform: scale(0.75);
  }

  margin-right: -1px;
}
</style>
