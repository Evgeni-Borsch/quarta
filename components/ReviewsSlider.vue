<template>
  <div class="reviews-slider">
    <div class="container">
      <h3>Обзор биноклей Nikon</h3>
    </div>
    <div v-swiper:swiper="swiperOptions" class="swiper container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
      </div>

      <div class="swiper-scrollbar"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { directive } from 'vue-awesome-swiper'
import SwiperCore, { Scrollbar } from 'swiper/core'

import 'swiper/swiper.scss'
import 'swiper/components/scrollbar/scrollbar.min.css'

SwiperCore.use([Scrollbar])

export default defineComponent({
  directives: {
    swiper: directive,
  },
  setup() {
    // const swiperElement: Ref<SwiperElement> = templateRef('swiper')
    const swiper = ref(null)
    const swiperOptions = ref({
      slidesPerView: 2,
      spaceBetween: 20,
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
    })

    return {
      swiperOptions,
      swiper,
    }
  },
})
</script>

<style lang="scss" scoped>
.reviews-slider {
  overflow-x: hidden;
  overflow-y: visible;
  // min-height: 480px;
  padding-bottom: 50px;

  &::v-deep {
    .swiper {
      &-container {
        overflow: visible;
      }

      &-slide {
        padding: 5rem;
        border: 1px $primary solid;
        border-radius: $border-radius-lg;
      }

      &-scrollbar {
        height: 0.125rem;
        border-radius: 0.125rem;
        bottom: -2.125rem;
        right: 13.75rem;
        width: auto;

        &-drag {
          background-color: $primary;
        }
      }
    }
  }
}
</style>
