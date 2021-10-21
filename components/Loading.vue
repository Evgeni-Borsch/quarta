<template>
  <div class="loading" :style="styles">
    <div
      class="spinner-border text-primary"
      style="width: 2rem; height: 2rem"
      role="status"
    >
      <span class="visually-hidden">{{ text }}</span>
    </div>

    <div class="loading__text">
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class LoadingVue extends Vue {
  @Prop({ default: 15 }) height!: number
  @Prop({ default: 'Загрузка...' }) text!: string

  get styles() {
    return {
      minHeight: `${this.height}rem`
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  &__text {
    color: $primary;
    font-size: 1.5rem;
    font-weight: 400;
    margin-left: 0.75rem;
    transform: translateY(0.125rem);
  }
}
</style>
