<template>
  <div
    class="nav-dropdown__wrapper"
    @mouseenter="onMouseOver"
    @mouseleave="onMouseOut"
  >
    <div
      class="nav-dropdown"
      :class="{ 'nav-dropdown--odd': !isEven }"
      :style="getStyles()"
    >
      <ul>
        <li v-for="child of category.categories" :key="child.slug">
          <router-link
            :to="`/catalog/${child.slug}`"
            @mouseenter.native="() => onMouseOverChild(child)"
            @mouseleave.native="() => onMouseOutChild(child)"
            @click.native="$parent.clear"
          >
            {{ child.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import HeaderCategories, { HeaderDropdownData } from './HeaderCategories.vue'
import { Category } from '~/store'

@Component({
  setup() {}
})
export default class HeaderNavDropdown extends Vue {
  $parent!: HeaderCategories
  hasOpenedSubmenu = false

  @Prop({ required: true }) category!: HeaderDropdownData
  @Prop({ required: true }) index!: number

  get isEven() {
    return this.index % 2 === 0
  }

  onMouseOver() {
    this.$parent.protectDropdown(this.category.id)
    this.$parent.protectDropdown('0')

    setTimeout(() => {
      clearTimeout(this.$parent.hideTimeout as NodeJS.Timeout)
    })
  }

  onMouseOut() {
    this.$parent.unprotectDropdown(this.category.id)
    this.$parent.unprotectDropdown('0')

    this.$parent.hideTimeout = setTimeout(() => {
      this.$parent.removeAllUnprotacted()
    })
  }

  onMouseOverChild(category: Category) {
    this.$parent.addDropdown(category.id)
  }

  onMouseOutChild(category: Category) {
    setTimeout(() => {
      if (!this.$parent.protectedDropdowns.includes(category.id)) {
        this.$parent.removeDropdown(category.id)
      }
    })
  }

  getStyles() {
    return {
      transform: `translateX(${100 * this.index}%)`
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-dropdown {
  position: absolute;
  left: 0;
  top: 0;
  width: 22.5rem;
  height: 31.25rem;
  background-color: $gray-100;
  box-shadow: $box-shadow-sm;
  z-index: 100;
  overflow-y: auto;

  &--odd {
    background-color: $white;
  }

  &__wrapper {
    position: absolute;
    top: 100%;
    // left: 0;
    // right: 0;
    width: auto;
    height: 0;
  }

  ul {
    padding: 1rem 0;

    li {
      display: block;
      margin: 0;

      a {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 1rem 1.875rem;
        cursor: pointer;
        text-decoration: none;
        color: $gray-800;

        &:hover,
        &:focus {
          background-color: $gray-200;
        }

        // &::before {
        //   position: absolute;
        //   display: block;
        //   left: 0;
        //   right: 0;
        //   top: -0.5rem;
        //   bottom: -0.5rem;
        //   // z-index: -1;
        //   background-color: $gray-200;
        // }
      }
    }
  }
}
</style>
