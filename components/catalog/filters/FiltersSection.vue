<template>
  <div
    class="filters-section"
    :class="{
      'filters-section--expanded': expanded,
      'filters-section--compact': compact,
    }"
  >
    <div class="filters-section__header">
      <h6 @click="expanded = !expanded">
        {{ title }}
      </h6>
    </div>

    <transition name="fade">
      <div v-if="expanded" class="filters-section__body">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class FiltersSectionVue extends Vue {
  expanded = false
  @Prop({ required: true }) title!: string
  @Prop({ default: false }) compact!: string
}
</script>

<style lang="scss" scoped>
.filters-section {
  padding: 1.4375rem 1.25rem;
  overflow: hidden;

  &--compact {
    padding: 0;
    overflow: visible;
  }

  &:not(:last-child) {
    border-bottom: 1px solid;
    border-color: $gray-200;
  }

  &:not(&--compact) > &__header > h6 {
    position: relative;
    margin-bottom: 0;
    cursor: pointer;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0.3rem;
      right: 0;
      width: 10px;
      height: 6px;
      background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.76117 0L5 3.61719L1.23883 0L0 1.19141L5 6L10 1.19141L8.76117 0Z' fill='%23808D9A'/%3E%3C/svg%3E%0A");
      transition: transform 0.25s;
    }
  }

  &:not(&--compact).filters-section--expanded > &__header > h6::after {
    transform: rotateZ(-180deg);
  }

  &--compact > &__header > h6 {
    position: relative;
    font-size: 0.75rem;
    cursor: pointer;

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0.4rem;
      right: 0.05rem;
      width: 8px;
      height: 2px;
      background-color: $gray-600;
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0.4rem;
      right: 0.05rem;
      width: 8px;
      height: 2px;
      background-color: $gray-600;
      transform: rotateZ(90deg);
      transition: transform 0.25s;
    }
  }

  &--expanded.filters-section--compact > &__header > h6::after {
    transform: rotateZ(0deg);
  }

  &__body {
    padding-top: 1.25rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-enter,
.fade-leave-to {
  transform: translateX(-1rem);
  opacity: 0;
}
</style>
