<template>
  <a :href="link" class="video-preview__wrapper" target="_blank">
    <div class="video-preview" :style="styles">
      <div class="video-preview__inner">
        <img :src="playButtonSrc" type="image/svg+xml" />
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import playButtonSrc from '~/assets/images/play-button.svg'

@Component({})
export default class VideoPreviewVue extends Vue {
  @Prop({ required: true }) preview!: string
  @Prop({ required: true }) link!: string

  playButtonSrc = playButtonSrc

  get styles() {
    return {
      backgroundImage: `url(${this.preview})`
    }
  }
}
</script>

<style lang="scss" scoped>
.video-preview {
  position: relative;
  padding-top: 56.25%;
  border: $border-width $border-color solid;
  border-radius: $border-radius-lg;
  background-position: center;
  background-size: cover;

  img {
    max-width: 14%;
    transition: transform 0.2s;
  }

  &:hover img {
    transform: scale(1.1);
  }

  &__wrapper {
    position: relative;
  }

  &__inner {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
