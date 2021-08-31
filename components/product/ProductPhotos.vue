<template>
  <div class="product-photos">
    <figure class="product-photos__selected-photo">
      <img :src="images[currentImage].default" />
    </figure>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  setup({ images }) {
    const currentImage = ref(0)
    console.log(images)

    return {
      currentImage,
    }
  },
})
</script>

<style lang="scss" scoped>
.product-photos {
  &__selected-photo {
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
}
</style>
