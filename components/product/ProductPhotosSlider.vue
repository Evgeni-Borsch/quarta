<template>
  <div class="photos-slider">
    <swiper ref="swiperElement" :options="swiperOptions">
      <swiper-slide
        v-for="(image, index) of images"
        :key="index"
        :style="{ backgroundImage: `url(${image.small})` }"
        class="photos-slider__item"
        :class="{ 'photos-slider__item--active': currentIndex === index }"
        @click.native="() => emitChange(index)"
      >
      </swiper-slide>
    </swiper>

    <div class="photos-slider__next">
      <div class="photos-slider__next-button" @click="next"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch, Ref } from 'vue-property-decorator'
import {
  Swiper as SwiperComponent,
  SwiperSlide,
  directive,
} from 'vue-awesome-swiper'
import { Swiper } from 'swiper/core'

import { ProductPhoto } from '~/store'
// import 'swiper/css/swiper.css'

@Component({
  components: {
    swiper: SwiperComponent,
    SwiperSlide,
  },
  directives: {
    swiper: directive,
  },
})
export default class ProductPhotosSliderVue extends Vue {
  @Ref('swiperElement') readonly swiperElement!: HTMLElement & {
    $swiper: Swiper
  }

  @Prop({ required: true }) images!: Array<ProductPhoto>
  @Prop({ required: true }) currentIndex!: number

  get swiper(): Swiper {
    return this.swiperElement.$swiper
  }

  get swiperOptions() {
    return {
      slidesPerView: 4,
      spaceBetween: 20,
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
    }
  }

  next() {
    const isLast = this.currentIndex === this.images.length - 1
    this.emitChange(isLast ? 0 : this.currentIndex + 1)
  }

  @Emit('change')
  emitChange(index: number) {
    return index
  }

  @Watch('currentIndex')
  onIndexChange() {
    this.swiper.slideTo(this.currentIndex)
  }
}
</script>

<style lang="scss" scoped>
.photos-slider {
  position: relative;
  max-width: 29.5rem;

  &__item {
    position: relative;
    background-size: cover;
    background-position: center;
    border-radius: $border-radius;
    border: 1px solid;
    border-color: transparent;
    cursor: pointer;

    max-width: 25%;

    &--active {
      border-color: $primary;
    }

    &::before {
      content: '';
      display: block;
      padding-top: 100%;
    }
  }

  &__next {
    display: flex;
    align-items: center;

    position: absolute;
    width: 2.5rem;

    left: calc(100% + 1.25rem);
    top: 0;
    bottom: 0;
  }

  &__next-button {
    width: 2.5rem;
    height: 2.5rem;
    background-color: $gray-200;
    border-radius: 50%;
    cursor: pointer;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3Csvg width='5' height='9' viewBox='0 0 5 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-3.44667e-07 1.11495L3.01432 4.5L-4.87358e-08 7.88505L0.992838 9L5 4.5L0.992838 -4.33983e-08L-3.44667e-07 1.11495Z' fill='%23808D9A'/%3E%3C/svg%3E%0A");
  }
}
</style>
