<template>
  <div class="catalog">
    <MainSliderVue />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import MainSliderVue from '~/components/main-slider/MainSlider.vue'

@Component({
  components: {
    MainSliderVue,
  },
})
export default class Index extends Vue {}
</script>

<style lang="scss" scoped></style>
