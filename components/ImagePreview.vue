<template>
  <div class="image-preview" :style="styles">
    <div
      v-if="type === ImagePreviewType.manage"
      class="image-preview__close"
      @click="onClose"
    >
      <CloseIcon />
    </div>

    <div class="image-preview__zoom">
      <ZoomIcon />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import CloseIcon from '~/assets/icons/close.svg?icon'
import ZoomIcon from '~/assets/icons/zoom.svg?icon'

export enum ImagePreviewType {
  view = 'view',
  manage = 'manage',
}

@Component({
  components: {
    CloseIcon,
    ZoomIcon,
  },
  setup() {
    return {
      ImagePreviewType,
    }
  },
})
export default class ImagePreview extends Vue {
  @Prop({ required: true }) src!: string
  @Prop({ default: ImagePreviewType.view }) type!: string

  get styles() {
    return {
      backgroundImage: `url(${this.src})`,
    }
  }

  @Emit('close')
  onClose() {
    return this
  }
}
</script>

<style lang="scss" scoped>
.image-preview {
  position: relative;

  width: 7.875rem;
  height: 7.875rem;
  border-radius: $border-radius-sm;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  overflow: hidden;

  &__close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 1rem;
    height: 1rem;
    display: flex;
    border-radius: $border-radius-sm;
    color: $white;
    background-color: rgba(#000000, 0.5);
    cursor: pointer;
  }

  &__zoom {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $white;
    background-color: rgba(0, 0, 0, 0.28);
    border-radius: $border-radius-sm;
    opacity: 0;
    transition: opacity 0.25s;
    cursor: pointer;
  }

  &:hover &__zoom {
    opacity: 1;
  }
}
</style>
