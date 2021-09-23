<template>
  <div
    class="star"
    :class="{
      'star--small': size === StarSize.small,
      'star--large': size === StarSize.large,
    }"
  >
    <component :is="icon" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import StarIcon from '@/assets/icons/star.svg?icon'
import StarHalfIcon from '@/assets/icons/star-half.svg?icon'
import StarFillIcon from '@/assets/icons/star-fill.svg?icon'

export enum StarType {
  outline = 'outline',
  half = 'half',
  fill = 'fill',
}

export enum StarSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export type TStarType =
  | typeof StarType.outline
  | typeof StarType.half
  | typeof StarType.fill

export type TStarSize =
  | typeof StarSize.small
  | typeof StarSize.medium
  | typeof StarSize.large

@Component({
  components: { StarIcon, StarHalfIcon, StarFillIcon },
  setup() {
    return { StarSize }
  },
})
export default class Star extends Vue {
  @Prop({ default: StarType.fill }) type!: TStarType
  @Prop({ default: StarSize.small }) size!: TStarSize

  get icon() {
    if (this.type === StarType.outline) return 'StarIcon'
    if (this.type === StarType.half) return 'StarHalfIcon'
    if (this.type === StarType.fill) return 'StarFillIcon'
    return 'Star'
  }
}
</script>

<style lang="scss" scoped>
.star {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  margin-right: 2px;

  &--small {
    margin-right: -1px;

    svg {
      transform: scale(0.75);
    }
  }

  &--large {
    margin-right: 3px;

    svg {
      transform: scale(1.25);
    }
  }
}
</style>
