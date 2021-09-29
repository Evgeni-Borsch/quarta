<template>
  <div v-if="index === currentIndex" class="main-slider-dot">
    <svg
      width="20px"
      height="20px"
      viewBox="-1 -1 22 22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="10"
        cy="10"
        r="10"
        fill="transparent"
        stroke-width="1"
        stroke="rgba(128, 141, 154, 0.3)"
      />
      <circle
        cx="10"
        cy="10"
        r="10"
        fill="transparent"
        stroke-width="1"
        stroke="white"
        stroke-dasharray="0 62.831853072"
        stroke-dashoffset="15.707963268"
        ref="circle"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator'
import MainSlider from './MainSlider.vue'

@Component({})
export default class MainSliderDot extends Vue {
  perimeter = 62.831853072
  $parent!: MainSlider

  @Ref('circle') circle!: SVGCircleElement
  @Prop({ required: true }) index!: number

  get progress() {
    return this.$parent.timerProgress
  }

  get currentIndex() {
    return this.$parent.currentIndex
  }

  @Watch('progress')
  onProgress(progress: number) {
    this.circle?.setAttribute(
      'stroke-dasharray',
      `${this.perimeter * progress} ${
        this.perimeter - this.perimeter * progress
      }`
    )
  }
}
</script>

<style lang="scss" scoped>
.main-slider-dot {
  width: 20px;
  height: 20px;

  stroke-linecap: round;
  transition: stroke-dashoffset 1s linear;
  paint-order: stroke;
}
</style>
