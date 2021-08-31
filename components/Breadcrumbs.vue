<template>
  <ul class="breadcrumbs container">
    <li v-for="(page, index) of path" :key="index" class="breadcrumbs__item">
      <span v-if="isLast(index)">
        {{ page.title }}
      </span>
      <a v-else :href="page.slug">
        {{ page.title }}
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    path: {
      type: Array,
      required: true,
    },
  },
  setup({ path }) {
    const pathLength = path.length
    const isLast = (index: number) => pathLength - 1 === index

    return {
      isLast,
    }
  },
})
</script>

<style lang="scss" scoped>
.breadcrumbs {
  padding-top: 40px;
  padding-bottom: 60px;

  li.breadcrumbs__item {
    display: inline-block;

    &:not(:last-child):after {
      content: '';
      position: relative;
      display: inline-block;
      top: 1.5px;
      width: 6px;
      height: 10px;
      margin-right: 6px;
      background-image: url("data:image/svg+xml,%3Csvg width='6' height='10' viewBox='0 0 6 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M1.04476e-07 1.23883L3.61719 5L1.47729e-08 8.76117L1.19141 10L6 5L1.19141 2.30597e-07L1.04476e-07 1.23883Z' fill='%23808D9A'/%3E %3C/svg%3E ");
    }
  }

  a,
  span {
    font-size: 12px;
    line-height: 11px;
    color: $gray-600;
    text-decoration: none;
    margin-right: 6px;
  }

  a:hover {
    color: $primary;
  }
}
</style>
