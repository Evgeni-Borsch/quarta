<template>
  <a
    href="#"
    class="promo-card"
    :class="{
      'promo-card--background-image': imageAsBackground,
      'promo-card--large': large,
    }"
  >
    <small v-if="smallText">{{ smallText }}</small>
    <figure :style="figureStyles">
      <img v-if="!imageAsBackground" :src="image" />
    </figure>
    <h3 v-html="title"></h3>
    <slot />
  </a>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class PromoCardVue extends Vue {
  @Prop({ required: true }) title!: string
  @Prop({ required: true }) image!: string
  @Prop({ default: null }) smallText!: string
  @Prop({ default: false }) imageAsBackground!: Boolean
  @Prop({ default: false }) large!: Boolean

  get figureStyles() {
    if (!this.imageAsBackground) return {}

    return {
      backgroundImage: `url(${this.image})`,
    }
  }
}
</script>

<style lang="scss" scoped>
.promo-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  height: 20.5rem;
  background-color: $gray-200;
  border-radius: $border-radius-lg;
  padding: 2.25rem;
  overflow: hidden;
  text-decoration: none;
  color: $gray-600;

  &--large {
    height: 34.25rem;
    padding-bottom: 3.75rem;

    figure {
      left: 0;
      // margin: -2.25rem -2.25rem 2.25rem !important;
      // position: relative !important;
      width: 100%;
      height: 100%;
      justify-content: center !important;
      align-items: flex-start !important;

      img {
        max-width: 100% !important;
        max-height: 100% !important;
      }
    }
  }

  h3,
  p {
    position: relative;
    max-width: 20.5rem;
    z-index: 1;
  }

  p {
    font-size: 1rem;
    margin: 0;
  }

  small {
    justify-self: flex-start;
    margin-bottom: auto;
    z-index: 1;
  }

  &--background-image {
    h3,
    p {
      color: $white;
    }
  }

  figure {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: transform 0.5s;

    img {
      max-width: 50%;
      max-height: 100%;
      transition: transform 0.5s;
    }
  }

  &:hover figure img {
    transform: scale(1.1);
  }

  &--background-image:hover figure {
    transform: scale(1.1);
  }
}
</style>
