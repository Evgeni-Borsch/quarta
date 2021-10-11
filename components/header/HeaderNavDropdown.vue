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
        <li v-for="child of category.children" :key="child.slug">
          <a
            @mouseenter="() => onMouseOverChild(child)"
            @mouseleave="() => onMouseOutChild(child)"
            >{{ child.name }}</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import HeaderCategories from './HeaderCategories.vue'
import { Category, categories } from '~/store'
import getLatest from '~/utils/getLatest'

@Component({
  setup() {},
})
export default class HeaderNavDropdown extends Vue {
  $parent!: HeaderCategories
  hasOpenedSubmenu = false

  @Prop({ required: true }) category!: Category
  @Prop({ required: true }) index!: number

  get isEven() {
    return this.index % 2 === 0
  }

  onMouseOver() {
    categories.addProtectedCategory(this.category.slug)
  }

  onMouseOut() {
    setTimeout(() => {
      if (getLatest(categories.categoriesToShow) === this.category.slug) {
        categories.removeCategoryToShow(this.category.slug)
      }
      categories.removeProtectedCategory(this.category.slug)
    })
  }

  onMouseOverChild(category: Category) {
    if (category.children?.length) {
      categories.addCategoryToShow(category.slug)
    }
  }

  onMouseOutChild(category: Category) {
    setTimeout(() => {
      if (getLatest(categories.protectedCategories) !== category.slug) {
        categories.removeCategoryToShow(category.slug)
      }
    })

    // setTimeout(() => {
    //   const length = categories.categoriesToShow.length
    //   const latest = categories.categoriesToShow[length - 1]
    //   if (latest !== categories.activeCategory) {
    //     categories.removeCategoryToShow(category.slug)
    //     this.hasOpenedSubmenu = false
    //   }
    // })
  }

  getStyles() {
    return {
      transform: `translateX(${100 * this.index}%)`,
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
