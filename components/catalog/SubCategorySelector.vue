<template>
  <section class="subcategory-selector">
    <div ref="measureContainer" class="container"></div>
    <div
      ref="container"
      class="subcategory-selector__container"
      :class="{ container: isDesktop }"
    >
      <router-link
        v-for="category of categories"
        :key="category.slug"
        :to="{
          path: `/catalog/${category.slug}`
        }"
        class="btn"
        :class="{
          active: category.slug === currentSlug
        }"
        @click.native="onClick"
      >
        {{ category.name }}
      </router-link>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { useBreakpoints, breakpointsBootstrapV5 } from '@vueuse/core'
import { ref } from 'vue-demi'
import { Category } from '~/store'

@Component({
  setup() {
    const breakpoints = useBreakpoints(breakpointsBootstrapV5)
    const isDesktop = process.server ? ref(true) : breakpoints.greater('lg')

    return {
      isDesktop
    }
  }
})
export default class SubCategorySelectorVue extends Vue {
  @Prop({ required: true }) categories!: Array<Category>
  @Prop({ required: true }) currentSlug!: string

  @Ref('container') readonly container!: HTMLElement
  @Ref('measureContainer') readonly measureContainer!: HTMLElement

  onClick(e: Event & { target: HTMLElement }) {
    const scroll = e.target.getBoundingClientRect().left + this.$el.scrollLeft

    setTimeout(() => {
      this.$el.scrollLeft = scroll
    }, 500)

    // console.log(e.target.getBoundingClientRect().left, this.$el.scrollLeft)
  }

  get spaceLeft() {
    return (window.innerWidth - this.measureContainer.offsetWidth) / 2
  }

  get activeButton() {
    return this.container.querySelector('.btn.active')
  }

  mounted() {
    setTimeout(() => {
      this.$el.scrollLeft = this.activeButton
        ? this.activeButton.getBoundingClientRect().left - this.spaceLeft - 8
        : 0
    })
  }
}
</script>

<style lang="scss" scoped>
.subcategory-selector {
  margin-bottom: 3.125rem - 1.1875rem;

  .btn {
    background-color: $white;
    color: $gray-900;
    margin: 0 0.6875rem 1.1875rem 0;

    &:hover,
    &.active {
      background-color: $gray-200;
    }

    &.active {
      border-color: $primary;
    }
  }

  @include media-breakpoint-down('lg') {
    max-width: 100%;
    overflow-x: auto;

    &__container {
      width: max-content;
      padding: 0 calc((100vw - #{map-get($container-max-widths, 'md')}) / 2);
    }
  }

  @include media-breakpoint-down('md') {
    &__container {
      padding: 0 calc((100vw - #{map-get($container-max-widths, 'sm')}) / 2);
    }
  }
}
</style>
