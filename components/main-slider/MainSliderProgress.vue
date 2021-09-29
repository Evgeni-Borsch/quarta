<template>
  <div class="main-slider-progress">
    <div class="container">
      <div
        v-for="(slide, index) of slides"
        :key="index"
        class="main-slider-progress__item"
        :class="{
          'main-slider-progress__item--active': currentIndex === index,
        }"
        @click="() => slideTo(index + 1)"
      >
        <div class="main-slider-progress__number">
          {{ String(index + 1).padStart(2, '0') }}
        </div>
        <span v-html="slide.title" />
      </div>
    </div>

    <div class="container">
      <div class="main-slider-progress__scroller">
        <div
          class="main-slider-progress__scroller-inner"
          :style="innerSlyles"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import MainSlider from './MainSlider.vue'

@Component({})
export default class MainSliderProgress extends Vue {
  $parent!: MainSlider

  get slides() {
    return this.$parent.slides
  }

  get currentIndex() {
    return this.$parent.currentIndex
  }

  get innerSlyles() {
    const count = this.slides.length
    const perItem = 100 / count

    return {
      left: `${perItem * this.currentIndex}%`,
      right: `${perItem * (count - this.currentIndex - 1)}%`,
    }
  }

  slideTo(index: number) {
    this.$parent._swiper!.slideTo(index)
  }
}
</script>

<style lang="scss" scoped>
.main-slider-progress {
  position: absolute;
  bottom: 152px;
  left: 0;
  right: 0;
  z-index: 1;

  .container {
    display: flex;
  }

  &__number {
    display: inline-block;
    color: $gray-600;
  }

  &__item {
    width: 100%;
    padding-bottom: 21px;
    opacity: 0.75;
    cursor: pointer;

    &--active {
      opacity: 1;
    }
  }

  &__scroller {
    position: relative;
    width: 100%;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.44);

    &-inner {
      position: absolute;
      top: 0;
      left: 0;
      right: 100%;
      height: 1px;
      background-color: $white;
      transition: $transition-base;
    }
  }
}
</style>
