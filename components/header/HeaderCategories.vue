<template>
  <div ref="categories" class="header-categories">
    <router-link
      class="header-categories__item"
      to="/catalog"
      @mouseenter.native="(e) => onMouseOver(e, '0')"
      @mouseleave.native="(e) => onMouseOut(e, '0')"
      @click.native="clear"
    >
      <div class="header-categories__icon">
        <CatalogIcon />
      </div>
      Каталог товаров
    </router-link>
    <router-link
      v-for="category of rootCategory"
      :key="category.id"
      class="header-categories__item"
      :to="`/catalog/${category.slug}`"
      @mouseenter.native="(e) => onMouseOver(e, category.id)"
      @mouseleave.native="(e) => onMouseOut(e, category.id)"
      @click.native="clear"
    >
      {{ category.name }}
    </router-link>

    <div class="header-categories__dropdowns" :style="dropDownsStyles">
      <HeaderNavDropdown
        v-for="(dropdown, index) of dropdowns"
        :key="index"
        :index="index"
        :category="dropdown"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { ref, Ref as CompositionRef, useFetch } from '@nuxtjs/composition-api'

import { Ref, Watch } from 'vue-property-decorator'
import HeaderNavDropdown from './HeaderNavDropdown.vue'

import CatalogIcon from '~/assets/icons/catalog.svg?icon'
import { categories, Category } from '~/store'

export interface HeaderDropdownData {
  id: string
  categories: Array<Category>
}

@Component({
  components: { CatalogIcon, HeaderNavDropdown },
  setup() {
    const rootCategory: CompositionRef<Array<Category>> = ref([])

    useFetch(async () => {
      await categories.getByParentAsync('0').then((data) => {
        rootCategory.value = data as Array<Category>
      })
    })

    return { rootCategory }
  }
})
export default class HeaderCategoriesVue extends Vue {
  rootCategory!: Array<Category>
  protectedDropdowns: Array<string> = []
  dropdowns: Array<HeaderDropdownData> = []
  dropDownsLeft = 0
  hideTimeout: NodeJS.Timeout | null = null

  @Ref('categories') categoriesRef!: HTMLElement

  get categoriesToShow() {
    return categories.categoriesToShow
  }

  get dropDownsStyles() {
    return {
      left: `${this.dropDownsLeft}px`
    }
  }

  async addDropdown(categoryId: string) {
    const candidateIndex = this.dropdowns.findIndex(
      (dropdown) => dropdown.id === categoryId
    )

    if (candidateIndex !== -1) return null

    await categories.getByParentAsync(categoryId).then((categoriesList) => {
      if (!categoriesList) return null

      setTimeout(() => {
        this.dropdowns.push({
          id: categoryId,
          categories: categoriesList as Array<Category>
        })
      })
    })
  }

  clear() {
    clearTimeout(this.hideTimeout as NodeJS.Timeout)
    this.dropdowns = []
    this.protectedDropdowns = []
  }

  removeDropdown(categoryId: string) {
    const index = this.dropdowns.findIndex(
      (dropdown) => dropdown.id === categoryId
    )

    if (index !== -1) this.dropdowns.splice(index, 1)
  }

  removeAllUnprotacted() {
    const dropdownIds = this.dropdowns.map((d) => d.id)

    dropdownIds.forEach((id) => {
      if (!this.protectedDropdowns.includes(id)) this.removeDropdown(id)
    })
  }

  protectDropdown(categoryId: string) {
    if (this.protectedDropdowns.includes(categoryId)) return null
    this.protectedDropdowns.push(categoryId)
  }

  unprotectDropdown(categoryId: string) {
    if (!this.protectedDropdowns.includes(categoryId)) return null

    const index = this.protectedDropdowns.indexOf(categoryId)
    this.protectedDropdowns.splice(index, 1)
  }

  onMouseOver(e: Event & { target: HTMLElement }, categoryId: string) {
    this.clear()

    const categoriesRect = this.categoriesRef.getBoundingClientRect()
    const rect = e.target.getBoundingClientRect()
    const maxLeft = categoriesRect.width - 360
    const preparedLeft = rect.left - categoriesRect.left

    this.dropDownsLeft =
      maxLeft < preparedLeft ? maxLeft : rect.left - categoriesRect.left

    setTimeout(() => {
      this.addDropdown(categoryId)
    })
  }

  onMouseOut(_e: Event, categoryId: string) {
    setTimeout(() => {
      if (this.protectedDropdowns.includes(categoryId)) {
        return null
      }

      this.removeDropdown(categoryId)
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
