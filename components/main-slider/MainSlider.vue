<template>
  <div
    class="main-slider"
    :class="{ 'main-slider__compact': compact }"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseOut"
  >
    <div v-swiper:_swiper="swiperOptions">
      <div class="swiper-wrapper">
        <div
          v-for="(slide, index) of slides"
          :key="index"
          :style="{ backgroundImage: `url(${slide.background})` }"
          class="swiper-slide"
        >
          <div class="main-slider__q">
            <div class="container">
              <QLetterSvg v-if="!compact" />
              <QLetterCompactSvg v-else />
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-6">
                <div class="main-slider__subtitle">{{ slide.subTitle }}</div>
                <div class="main-slider__title" v-html="slide.title"></div>
              </div>
              <div class="col-6">
                <div class="main-slider__text">
                  {{ slide.text }}
                </div>
                <div class="main-slider__aсtion">
                  <button class="btn btn-outline-light">Смотреть</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <MainSliderProgressVue v-if="!compact" />

    <div class="main-slider__arrows">
      <div class="container">
        <div
          class="main-slider__arrow-prev"
          @click="() => _swiper.slidePrev()"
        ></div>
        <div
          class="main-slider__arrow-next"
          @click="() => _swiper.slideNext()"
        ></div>
      </div>
    </div>

    <div v-if="!compact" class="main-slider__dots">
      <div class="container">
        <div
          v-for="(slide, index) of slides"
          :key="index"
          class="main-slider__dot"
          @click="() => _swiper.slideTo(index + 1)"
        >
          <MainSliderDotCircle :index="index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'
import { directive } from 'vue-awesome-swiper'
import SwiperCore, { Scrollbar, Swiper, SwiperOptions } from 'swiper/core'
import MainSliderDotCircle from './MainSliderDotCircle.vue'
import MainSliderProgressVue from './MainSliderProgress.vue'

import 'swiper/swiper.scss'
import 'swiper/components/scrollbar/scrollbar.min.css'
import { MainSliderSlide } from '~/services/api/sliders'

SwiperCore.use([Scrollbar])

@Component({
  directives: {
    swiper: directive
  },
  components: {
    MainSliderDotCircle,
    MainSliderProgressVue,
    QLetterSvg: () => import('~/assets/images/q.svg?inline'),
    QLetterCompactSvg: () => import('~/assets/images/q-compact.svg?inline')
  }
})
export default class MainSlider extends Vue {
  @Prop({ default: false }) compact!: boolean
  @Prop({ required: true }) slides!: Array<MainSliderSlide>

  _swiper: Swiper | null = null

  delay = 5000
  isHovered = false
  currentIndex = 0
  timerProgress = 0 // 0-1
  fps = 30
  timer = 0
  interval: NodeJS.Timer | null = null

  get timePerTick() {
    return 1000 / this.fps
  }

  get swiperOptions(): SwiperOptions {
    return {
      slidesPerView: 1,
      direction: 'vertical',
      height: this.compact ? 318 : 635,
      loop: true,
      on: {
        slideChangeTransitionEnd: this.slideChangeTransitionEnd
      }
    }
  }

  @Watch('isHovered')
  watchIsHovered() {
    if (this.isHovered) {
      this.stopTimer()
    } else {
      this.startTimer()
    }
  }

  startTimer() {
    if (this.interval) {
      return
    }
    this.interval = setInterval(this.tick, 1000 / this.fps)
  }

  stopTimer() {
    clearInterval(this.interval as NodeJS.Timer)
    this.interval = null
  }

  slideChangeTransitionEnd() {
    setTimeout(() => {
      this.currentIndex = this._swiper?.realIndex ?? 0
      this.stopTimer()
      this.clearTimer()

      if (!this.isHovered) this.startTimer()
    })
  }

  clearTimer() {
    this.timer = 0
  }

  onMouseEnter() {
    this.isHovered = true
  }

  onMouseOut() {
    this.isHovered = false
  }

  tick() {
    this.timer = this.timer + this.timePerTick
    this.timerProgress = this.timer / this.delay

    if (this.timer >= this.delay) {
      this.stopTimer()
      this.clearTimer()
      this._swiper?.slideNext(300)
    }
  }

  mounted() {
    this.startTimer()
  }

  beforeDestroy() {
    this.stopTimer()
    this.clearTimer()
  }
}
</script>

<style lang="scss">
$main-slider-height: 635px;
$main-slider-compact-height: 318px;

.main-slider {
  position: relative;
  height: $main-slider-height;
  overflow: hidden;
  color: $white;

  &__q {
    position: absolute;
    left: -180px;
    right: 0;
    bottom: -5px;
    z-index: 1;
  }

  &__compact &__q {
    top: 0;
    bottom: 0;
    transform: translateY(-54px);
  }

  &__compact {
    height: $main-slider-compact-height;
  }

  &__subtitle {
    position: relative;
    color: rgba($white, 0.62);
    margin-bottom: 1rem;
    z-index: 2;
  }

  &__title {
    position: relative;
    max-width: 95%;
    font-size: 3.75rem;
    line-height: 3.75rem;
    font-weight: 700;
    z-index: 2;
  }

  &__text {
    position: relative;
    margin-top: 3rem;
    font-size: 1rem;
    z-index: 2;
    max-width: 32ch;
  }

  &__aсtion {
    margin-top: 2rem;

    .btn-outline-light {
      color: $white;
      border-color: $white;

      &:hover {
        color: $gray-900;
        background-color: $white;
      }
    }
  }

  &__dots {
    position: absolute;
    z-index: 1;
    display: flex;
    bottom: 48px;
    left: 0;
    right: 0;

    .container {
      display: flex;
    }
  }

  &__dot {
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      width: 4px;
      height: 4px;
      left: 8px;
      top: 8px;
      border-radius: 50%;
      background-color: $gray-600;
    }
  }

  &__arrows {
    position: absolute;
    top: 176px;
    left: 0;
    right: 0;
    z-index: 1;
    pointer-events: none;

    .container {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }

  &__compact &__arrows {
    top: 110px;
  }

  &__arrow {
    &-prev,
    &-next {
      width: 42px;
      height: 42px;
      border: 1px solid;
      border-color: $white;
      border-radius: 50%;
      margin-bottom: 13px;
      background-image: url("data:image/svg+xml,%3Csvg width='9' height='5' viewBox='0 0 9 5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.11495 5L4.5 1.98568L7.88505 5L9 4.00716L4.5 -3.33798e-07L-3.15589e-08 4.00716L1.11495 5Z' fill='white'/%3E%3C/svg%3E%0A");
      background-repeat: no-repeat;
      background-position: 50% 47%;
      pointer-events: all;
      cursor: pointer;
    }

    &-next {
      transform: rotateX(180deg);
    }
  }
}

.main-slider .swiper {
  &-slide {
    height: $main-slider-height;
    background-size: cover;
    background-position: center;

    .container {
      margin-top: 130px;
    }
  }
}

.main-slider__compact .swiper {
  &-slide {
    height: $main-slider-compact-height;

    .container {
      margin-top: 56px;
    }
  }
}
</style>
