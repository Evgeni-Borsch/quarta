<template>
  <a href="#" class="promo-wide-image-text">
    <small v-if="smallText">{{ smallText }}</small>
    <slot />
  </a>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class PromoWideImageTextVue extends Vue {
  @Prop({ default: null }) smallText!: string
}
</script>

<style lang="scss" scoped>
.promo-wide-image-text {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 5.625rem;
  text-decoration: none;

  small {
    margin-bottom: 1.625rem;
    color: $gray-600;
  }

  p,
  h3 {
    color: $white;
    max-width: 50%;
  }

  p {
    font-size: 1rem;
  }
}
</style>
