<template>
  <div class="base-slider">
    <div class="container">
      <div v-swiper:swiper="swiperOptions" class="swiper">
        <div class="swiper-wrapper">
          <div
            v-for="(node, index) of slideNodes"
            :key="index"
            class="swiper-slide"
          >
            <RenderNode :node="node" />
          </div>
        </div>

        <div class="swiper-scrollbar"></div>

        <div class="base-slider__arrows">
          <div
            class="base-slider__prev"
            @click="() => swiper.slidePrev()"
          ></div>
          <div
            class="base-slider__next"
            @click="() => swiper.slideNext()"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'

import { directive } from 'vue-awesome-swiper'
import SwiperCore, { Scrollbar, Swiper } from 'swiper/core'

import RenderNode from '~/components/functional/RenderNode'

import 'swiper/swiper.scss'
import 'swiper/components/scrollbar/scrollbar.min.css'

SwiperCore.use([Scrollbar])

@Component({
  components: { RenderNode },
  directives: {
    swiper: directive,
  },
})
export default class BaseSliderVue extends Vue {
  @Prop({ default: 2 }) slidesDesktop!: number

  swiper!: Swiper
  slideNodes: Array<VNode> = []
  get swiperOptions() {
    return {
      slidesPerView: this.slidesDesktop,
      spaceBetween: 20,
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
    }
  }

  created() {
    this.slideNodes = this.$slots.default?.filter(
      (node) => node.tag
    ) as Array<VNode>
  }
}
</script>

<style lang="scss" scoped>
.base-slider {
  overflow-x: hidden;
  overflow-y: visible;
  padding-bottom: 50px;

  .base-slider::v-deep &__arrows {
    display: flex;

    position: absolute;
    right: 0;
    bottom: -2.125rem;
  }

  &::v-deep &__prev,
  &::v-deep &__next {
    width: 6px;
    height: 10px;
    margin-left: 1.5rem;
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg width='6' height='10' viewBox='0 0 6 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 8.76117L2.38281 5L6 1.23883L4.80859 -5.2078e-08L-6.95394e-07 5L4.80859 10L6 8.76117Z' fill='%23808D9A'/%3E%3C/svg%3E%0A");

    &:hover {
      background-image: url("data:image/svg+xml,%3Csvg width='6' height='10' viewBox='0 0 6 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 8.76117L2.38281 5L6 1.23883L4.80859 -5.2078e-08L-5.24749e-07 5L4.80859 10L6 8.76117Z' fill='%23004989'/%3E%3C/svg%3E%0A");
    }
  }

  &::v-deep &__next {
    transform: rotate(180deg);
  }

  &::v-deep {
    .swiper {
      &-container {
        overflow: visible;
      }

      &-scrollbar {
        height: 0.125rem;
        border-radius: 0.125rem;
        bottom: -2.125rem;
        right: 13.75rem;
        left: 0;
        width: auto;

        &-drag {
          background-color: $primary;
        }
      }
    }
  }
}
</style>
