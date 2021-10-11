<template>
  <section class="news-slider">
    <BaseSliderVue>
      <NewsCardVue />
      <NewsCardVue />
      <NewsCardVue />
    </BaseSliderVue>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseSliderVue from '../BaseSlider.vue'
import NewsCardVue from './NewsCard.vue'

@Component({
  components: {
    BaseSliderVue,
    NewsCardVue,
  },
})
export default class NewsSliderVue extends Vue {}
</script>

<style lang="scss" scoped>
.news-slider {
  background-color: $white;
}
</style>
