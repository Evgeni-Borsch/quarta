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

export enum StarType {
  outline = 'outline',
  half = 'half',
  fill = 'fill',
}

export interface StarProps {
  type: typeof StarType.outline | typeof StarType.half | typeof StarType.fill
}

export default defineComponent({
  components: { Star, StarHalf, StarFill },
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  setup(props: StarProps) {
    const icon = computed(() => {
      if (props.type === StarType.outline) return 'Star'
      if (props.type === StarType.half) return 'StarHalf'
      if (props.type === StarType.fill) return 'StarFill'
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
