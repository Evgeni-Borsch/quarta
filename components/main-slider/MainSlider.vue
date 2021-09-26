<template>
  <div class="main-slider" @mouseenter="onMouseEnter" @mouseleave="onMouseOut">
    <div v-swiper:_swiper="swiperOptions">
      <div class="swiper-wrapper">
        <div
          v-for="(slide, index) of slides"
          :key="index"
          :style="{ backgroundImage: `url(${slide.background})` }"
          class="swiper-slide"
        >
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

      <!-- <div class="swiper-scrollbar"></div> -->
    </div>

    <div class="main-slider__dots">
      <div class="container">
        <div
          v-for="(slide, index) of slides"
          :key="index"
          class="main-slider__dot"
          @click="() => swiper.slideTo(index)"
        >
          <MainSliderDotCircle v-if="index === currentIndex" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { directive } from 'vue-awesome-swiper'
import SwiperCore, { Scrollbar, Swiper, SwiperOptions } from 'swiper/core'
import MainSliderDotCircle from './MainSliderDotCircle.vue'

import 'swiper/swiper.scss'
import 'swiper/components/scrollbar/scrollbar.min.css'

SwiperCore.use([Scrollbar])

export interface MainSliderSlide {
  subTitle?: string
  title: string
  background: string
  text: string
  buttonText?: string
  buttonLink?: string
}

@Component({
  directives: {
    swiper: directive,
  },
  components: {
    MainSliderDotCircle,
  },
})
export default class MainSlider extends Vue {
  _swiper: Swiper | null = null
  slides: Array<MainSliderSlide> = new Array(3).fill({
    title: 'Стрелковые и&nbsp;охотничьи аксессуары',
    subTitle: 'Огромный выбор товаров',
    text: 'Европейские разработки, японское качество. 3 года гарантии на все!',
    background: '/slide-01.jpg',
  })

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
      height: 635,
      loop: true,
      on: {
        slideChangeTransitionEnd: this.slideChangeTransitionEnd,
      },
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

  slideChangeTransitionEnd(swiper: Swiper) {
    setTimeout(() => {
      console.log( swiper?.realIndex);
      
      this.currentIndex = swiper?.realIndex ?? 0
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

.main-slider {
  position: relative;
  height: $main-slider-height;
  overflow: hidden;
  color: $white;

  &__subtitle {
    color: rgba($white, 0.62);
    margin-bottom: 1rem;
  }

  &__title {
    font-size: 3.75rem;
    line-height: 3.75rem;
    font-weight: 700;
  }

  &__text {
    margin-top: 3rem;
    font-size: 1rem;
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
</style>
