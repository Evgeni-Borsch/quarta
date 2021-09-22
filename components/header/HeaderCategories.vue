<template>
  <div ref="categories" class="header-categories">
    <a
      class="header-categories__item"
      @mouseenter="(e) => onMouseOver(e, rootCategory)"
      @mouseleave="(e) => onMouseOut(e, rootCategory)"
    >
      <div class="header-categories__icon">
        <CatalogIcon />
      </div>
      Каталог товаров
    </a>
    <a
      v-for="category of categories"
      :key="category.slug"
      class="header-categories__item"
      @mouseenter="(e) => onMouseOver(e, category)"
      @mouseleave="(e) => onMouseOut(e, category)"
    >
      {{ category.name }}
    </a>

    <div class="header-categories__dropdowns" :style="dropDownsStyles">
      <HeaderNavDropdown
        v-for="(categorySlug, index) of categoriesToShow"
        :key="categorySlug"
        :index="index"
        :category="getCategoryBySlug(categorySlug)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Ref } from 'vue-property-decorator'

import HeaderNavDropdown from './HeaderNavDropdown.vue'

import CatalogIcon from '~/assets/icons/catalog.svg?icon'
import { categories, Category } from '~/store'

@Component({
  name: 'HeaderCategories',
  components: { CatalogIcon, HeaderNavDropdown },
  setup() {},
})
export default class HeaderCategories extends Vue {
  @Ref('categories') categoriesRef!: HTMLElement

  dropDownsLeft = 0

  get categories() {
    return categories.items
  }

  get rootCategory() {
    return categories.rootCategory
  }

  get categoriesToShow() {
    return categories.categoriesToShow
  }

  get dropDownsStyles() {
    return {
      left: `${this.dropDownsLeft}px`,
    }
  }

  getCategoryBySlug(slug: string): Category {
    return categories.getBySlug(slug) as Category
  }

  onMouseOver(e: Event & { target: HTMLElement }, category: Category) {
    const categoriesRect = this.categoriesRef.getBoundingClientRect()
    const rect = e.target.getBoundingClientRect()

    this.dropDownsLeft = rect.left - categoriesRect.left

    if (category.children?.length) {
      categories.addCategoryToShow(category.slug)
    }
  }

  onMouseOut(_e: Event, category: Category) {
    setTimeout(() => {
      if (categories.protectedCategories.includes(category.slug)) return
      categories.removeCategoryToShow(category.slug)
    })
  }
}
</script>

<style lang="scss" scoped>
.header-categories {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 1.6875rem;

  &__item {
    display: flex;
    align-items: center;
    padding-bottom: 18px;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 130%;
    color: $gray-800;
    text-decoration: none;
    transition: $transition-base;
    cursor: pointer;

    &:hover {
      color: $primary;
    }
  }

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    margin-right: 0.3125rem;
    border-radius: $border-radius-sm;
    color: $primary;
    background-color: $gray-100;
  }

  &__dropdowns {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
  }
}
</style>
