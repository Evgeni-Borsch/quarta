<template>
  <section class="subcategory-selector">
    <div class="container">
      <router-link
        v-for="category of categories"
        :key="category.slug"
        :to="`/catalog/${category.slug}`"
        class="btn"
        :class="{
          active: category.slug === currentSlug
        }"
      >
        {{ category.name }}
      </router-link>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Category } from '~/store'

@Component({})
export default class SubCategorySelectorVue extends Vue {
  @Prop({ required: true }) categories!: Array<Category>
  @Prop({ required: true }) currentSlug!: string
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
}
</style>
