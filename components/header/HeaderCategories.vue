<template>
  <div class="header-categories">
    <a class="header-categories__item"> Каталог товаров </a>
    <a
      v-for="category of categories"
      :key="category.slug"
      class="header-categories__item"
    >
      {{ category.name }}
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore } from '@nuxtjs/composition-api'
import { Store } from 'vuex'

export default defineComponent({
  setup() {
    const store: Store<any> = useStore()
    const categories = store.state.categories

    return {
      categories: categories.items,
    }
  },
})
</script>

<style lang="scss" scoped>
.header-categories {
  display: flex;
  justify-content: space-between;
  margin-top: 1.6875rem;

  &__item {
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
}
</style>
