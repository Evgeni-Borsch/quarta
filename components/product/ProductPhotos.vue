<template>
  <div class="product-photos">
    <figure
      ref="photo"
      class="product-photos__selected-photo"
      @mouseenter="mountMouseHandler"
    >
      <transition name="fade">
        <div v-if="!isOutside" class="product-photos__zoom" :style="zoomStyles">
          <img :src="images[currentImage].default" :style="imageStyle" />
        </div>
      </transition>
      <img :src="images[currentImage].default" />
    </figure>

    <ProductPhotosSliderVue
      :images="images"
      :current-index="currentImage"
      @change="onIndexChange"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  computed,
  onBeforeUnmount,
  Ref,
  ref,
  watch
} from '@nuxtjs/composition-api'
import { get, templateRef, useMouseInElement } from '@vueuse/core'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import ProductPhotosSliderVue from './ProductPhotosSlider.vue'
import { ProductPhoto } from '~/store'

@Component({
  components: { ProductPhotosSliderVue },
  setup() {
    const currentImage = ref(0)
    const photoElement: Ref<HTMLElement> = templateRef('photo')
    const _isOutside = ref(true)
    const zoomStyles = ref({})
    const shiftX: Ref<number> = ref(0)
    const shiftY: Ref<number> = ref(0)
    const imageStyle = computed(() => ({
      transform: `scale(3) translate3d(${shiftX.value}%,${shiftY.value}%, 0)`
    }))
    const rect: Ref<DOMRect | null> = ref(null)
    const stops: Array<() => void> = []

    const mountMouseHandler = () => {
      const {
        elementX,
        elementY,
        isOutside,
        stop: useMouseInElementStop
      } = useMouseInElement(photoElement)

      rect.value = get(photoElement).getBoundingClientRect()

      const stopWatchXY = watch([elementX, elementY], () => {
        shiftX.value = (get(elementX) / (get(rect)?.width ?? 0) - 0.5) * -75
        shiftY.value = (get(elementY) / (get(rect)?.height ?? 0) - 0.5) * -75

        zoomStyles.value = {
          top: `${elementY.value}px`,
          left: `${elementX.value}px`
        }
      })

      const stopWatchOutside = watch([isOutside], () => {
        _isOutside.value = isOutside.value
        if (isOutside.value) unmountMouseHandler()
      })

      stops.push(useMouseInElementStop)
      stops.push(stopWatchXY)
      stops.push(stopWatchOutside)
    }

    const unmountMouseHandler = () => {
      const length = stops.length

      for (let index = 0; index < length; index++) {
        stops.pop()?.apply(null)
      }
    }

    onBeforeUnmount(() => {
      unmountMouseHandler()
    })

    return {
      currentImage,
      isOutside: _isOutside,
      zoomStyles,
      imageStyle,
      mountMouseHandler,
      unmountMouseHandler
    }
  }
})
export default class ProductPhotos extends Vue {
  currentImage!: number

  @Prop({ required: true }) images!: Array<ProductPhoto>

  onIndexChange(index: number) {
    this.currentImage = index
  }
}
</script>

<style lang="scss" scoped>
.product-photos {
  &__selected-photo {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 0 4rem;
    border-radius: $btn-border-radius-lg;
    background-color: $white;
    max-width: 33.25rem;

    img {
      max-width: 100%;
    }
  }

  &__zoom {
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    overflow: hidden;
    z-index: $zindex-popover;
    transform: translate3d(-50%, -50%, 0);
    cursor: none;
    background: $white;

    img {
      transform: scale(3);
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border-radius: 50%;
      box-shadow: inset 0px 0px 21px rgba(0, 0, 0, 0.08);
      z-index: 2;
    }
  }
}
</style>
