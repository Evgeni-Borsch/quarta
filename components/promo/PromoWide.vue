<template>
  <div class="wide-promotion__wrapper">
    <div class="wide-promotion">
      <div class="wide-promotion__image" :style="imageStyles">
        <slot name="image" />
      </div>

      <div class="wide-promotion__content-backdrop" :class="backdropClass">
        <slot name="content-backdrop" />
      </div>

      <div class="wide-promotion__body">
        <div class="container">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class WidePromotionVue extends Vue {
  @Prop({ required: true }) image!: string
  @Prop({ default: null }) backdropClass!: string

  get imageStyles() {
    return {
      backgroundImage: `url(${this.image})`,
    }
  }
}
</script>

<style lang="scss" scoped>
.wide-promotion {
  max-width: 2048px;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: stretch;
  height: 28.125rem;

  @media screen and (min-width: 2048px) {
    border-radius: $border-radius-lg;
    overflow: hidden;
  }

  &__wrapper {
    background-color: $white;
  }

  &__image {
    width: 44.625%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }

  &__content-backdrop {
    position: relative;
    width: 55.375%;
    height: 100%;
  }

  &__body {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    // &::v-deep {
    //   .container,
    //   .row,
    //   [class*='col-'] {
    //     height: 100%;
    //   }
    // }
  }

  &::v-deep {
  }
}
</style>
