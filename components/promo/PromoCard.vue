<template>
  <a
    href="#"
    class="promo-card"
    :class="{ 'promo-card--background-image': imageAsBackground }"
  >
    <small>с 15.04.2021 09:57:00 по 01.05.2021 </small>
    <h3 v-html="title"></h3>
    <slot />
    <figure :style="figureStyles">
      <img v-if="!imageAsBackground" :src="image" />
    </figure>
  </a>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class PromoCardVue extends Vue {
  @Prop({ required: true }) title!: string
  @Prop({ required: true }) image!: string
  @Prop({ default: false }) imageAsBackground!: Boolean

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
