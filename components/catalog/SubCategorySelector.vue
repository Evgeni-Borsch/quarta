<template>
  <section class="subcategory-selector">
    <div class="container">
      <button
        v-for="(category, index) of subcategories"
        :key="index"
        class="btn"
        :class="{
          active: index === 0,
        }"
      >
        {{ category.title }}
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class SubCategorySelectorVue extends Vue {
  subcategories = [
    {
      title: 'Оптические прицелы',
      url: '#',
    },
    {
      title: 'Бинокли',
      url: '#',
    },
    {
      title: 'Дальномеры',
      url: '#',
    },
    {
      title: 'Зрительные трубки',
      url: '#',
    },
    {
      title: 'Коллиматорные прицелы',
      url: '#',
    },
    {
      title: 'Приборы ночного видения',
      url: '#',
    },
    {
      title: 'Цифровые приборы день/ночь',
      url: '#',
    },
    {
      title: 'Монокуляры',
      url: '#',
    },
    {
      title: 'Тепловизионные приборы',
      url: '#',
    },
    {
      title: 'Камеры',
      url: '#',
    },
  ]
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
