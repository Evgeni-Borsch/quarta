<template>
  <div class="main-slider-dot">
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
  perimeter = 10 * 2 * Math.PI
  $parent!: MainSlider

  @Ref('circle') circle!: SVGCircleElement

  get progress() {
    return this.$parent.timerProgress
  }

  @Watch('progress')
  onProgress(progress: number) {
    this.circle.setAttribute(
      'stroke-dasharray',
      `${this.perimeter * progress} ${
        this.perimeter - this.perimeter * progress
      }`
    )
  }

  mounted() {
    this.onProgress(0)
    this.circle.setAttribute('stroke-dashoffset', `${this.perimeter / 4}`)
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
